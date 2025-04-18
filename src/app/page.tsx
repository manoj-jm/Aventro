import { getCurrent } from "@/features/auth/getCurrUser";

export default async function Home() {
  const current = await getCurrent();
  
    return (
      <div className="container mx-auto w-full">
        Hey There!
      </div>
    );
}