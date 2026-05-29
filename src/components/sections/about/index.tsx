import type { AboutPageContent } from "@/sanity/lib/queries";
import About from "./About";

type AboutSectionProps = {
  aboutInfo?: AboutPageContent | null;
};

const AboutSection = ({ aboutInfo }: AboutSectionProps) => {
  return (
    <section className="min-h-screen">
      <About aboutInfo={aboutInfo} />
    </section>
  );
};

export default AboutSection;
