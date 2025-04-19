<<<<<<< HEAD
import Hero from "@/components/Hero";
import { Navbar } from "@/components/mainNavbar";
import Features from "@/components/Features"
import Pricing from "@/components/Pricing";
import { getCurrent } from "@/features/auth/getCurrUser";
=======
import { redirect } from "next/navigation";
import { getCurrent } from "@/features/auth/queries";

import Hero from "@/components/Hero";
import { getWorkspaces } from "@/features/workspaces/queries";
import { Navbar } from "@/components/mainNavbar";
>>>>>>> f0171ef1949ea98bccbfb868d49f89021478caa8

export default async function Home() {
  const current = await getCurrent();

  if (!current) {
    return (
<<<<<<< HEAD
       <div className="container mx-auto w-full">
      <Navbar />
       <Hero />
       <Features />
       <Pricing />
    </div>
    );
=======
      <div className="container mx-auto w-full">
        <Navbar />
        <Hero />
      </div>
    );
  }

  const workspaces = await getWorkspaces();
  if (workspaces?.total === 0) {
    return redirect("/workspaces/create");
  } else {
    return redirect(`/workspaces/${workspaces?.documents[0]?.$id}`);
  }
>>>>>>> f0171ef1949ea98bccbfb868d49f89021478caa8
}
