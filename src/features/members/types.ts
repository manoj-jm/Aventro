import { Models } from "node-appwrite";

export enum MemberRole {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

export type Member = Models.Document & {
  workspaceId: string;
  userId: string;
  role: MemberRole;
<<<<<<< HEAD
};
=======
};
>>>>>>> f0171ef1949ea98bccbfb868d49f89021478caa8
