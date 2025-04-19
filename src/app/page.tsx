import Hero from "@/components/Hero";
import { Navbar } from "@/components/mainNavbar";
import Features from "@/components/Features"
import Pricing from "@/components/Pricing";
import { getCurrent } from "@/features/auth/getCurrUser";

export default async function Home() {
  const current = await getCurrent();
  
    return (
       <div className="container mx-auto w-full">
      <Navbar />
       <Hero />
       <Features />
       <Pricing />
    </div>
    );
}
