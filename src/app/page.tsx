import Hero from "@/components/Hero";
import { Navbar } from "@/components/mainNavbar";
import Features from "@/components/Features"
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
export default function Home() {
  return (
    <div className="container mx-auto w-full">
      <Navbar />
       <Hero />
       <Features />
       <Pricing />
       <Testimonials />
    </div>
  );
}
