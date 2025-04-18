import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { ID, Query } from "node-appwrite";
import { sessionMiddleware } from "@/lib/session-middleware";

import {
  DATABASE_ID,
  IMAGES_BUCKET_ID,
  WORKSPACE_ID,
  MEMBERS_ID,
} from "@/config";

import { createWorkspaceSchema } from "../schemas";
import { MemberRole } from "@/features/members/types";

const app = new Hono()
  .post(
    "/",
    zValidator("form", createWorkspaceSchema),
    sessionMiddleware,
    async (c) => {
      try {
        const databases = c.get("databases");
        const storage = c.get("storage");
        const user = c.get("user");

        const { name, image } = c.req.valid("form");

        let uploadedImage: string | undefined;
        if (image instanceof File) {
          const file = await storage.createFile(
            IMAGES_BUCKET_ID,
            ID.unique(),
            image
          );
          const buffer: ArrayBuffer = await storage.getFilePreview(
            IMAGES_BUCKET_ID,
            file.$id
          );
          uploadedImage = `data:image/png;base64,${Buffer.from(buffer).toString(
            "base64"
          )}`;
        }

        const existingWorkspace = await databases.listDocuments(
          DATABASE_ID,
          WORKSPACE_ID,
          [
            Query.equal("name", name),
            Query.equal("userId", user.$id),
            Query.limit(1),
          ]
        );

        if (existingWorkspace.total !== 0) {
          return c.json({ error: "Workspace already exists" }, 400);
        } else {
          const workspace = await databases.createDocument(
            DATABASE_ID,
            WORKSPACE_ID,
            ID.unique(),
            {
              name,
              userId: user.$id,
              imageUrl: uploadedImage,
            }
          );

          await databases.createDocument(DATABASE_ID, MEMBERS_ID, ID.unique(), {
            userId: user.$id,
            workspaceId: workspace.$id,
            role: MemberRole.ADMIN,
          });
          return c.json({ data: workspace });
        }
      } catch (error) {
        console.log(error);
      }
    }
  )
  .get("/", sessionMiddleware, async (c) => {
    const user = c.get("user");
    const databases = c.get("databases");
    const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
      Query.equal("userId", user.$id),
    ]);

    if (members.total == 0) {
      return c.json({ data: { documents: [] }, total: 0 });
    }
    const workspaceIds = members.documents.map((member) => member.workspaceId);
    const workspaces = await databases.listDocuments(
      DATABASE_ID,
      WORKSPACE_ID,
      [Query.orderDesc("$createdAt"), Query.contains("$id", workspaceIds)]
    );
    return c.json({ data: workspaces });
  });

export default app;
