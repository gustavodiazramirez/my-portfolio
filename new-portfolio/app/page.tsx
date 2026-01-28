import AboutMe from "@/components/about-me";
import Certifications from "@/components/certifications";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Projects from "@/components/projects";
import Contact from "@/components/contact";
import TechStack from "@/components/tech-stack";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <AboutMe />
      <Projects />
      <Certifications />
      <Contact />
      <TechStack />
    </main> 
  );
}
