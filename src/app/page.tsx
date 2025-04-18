import { SignInCard } from "@/features/auth/components/sign-in-card";
import { getCurrent } from "@/features/auth/getCurrUser";
import { getWorkspaces } from "@/features/workspaces/queries";
import { redirect } from "next/navigation";

export default async function Home() {
  const current = await getCurrent();
  const workspaces = await getWorkspaces();
  console.log("workspaces", workspaces);

  if (!current) {
    return (
      <div className="container mx-auto w-full">
        <SignInCard />
      </div>
    );
  }
  if (workspaces.documents.length === 0 && current) {
    redirect("/workspaces/create");
  }

  return <div className="container mx-auto w-full">Hey There!</div>;
}
