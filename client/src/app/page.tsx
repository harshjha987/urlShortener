"use client"
import CTA from "./components/CTA";
import { FeaturesSectionDemo } from "./components/Features";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ReactNode } from "react";

const fadeInVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
};

// Define the props type for Section component
interface SectionProps {
  children: ReactNode;
}

function Section({ children }: SectionProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeInVariants}>
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <div>
      <Section>
        <Hero />
      </Section>
      <Section>
        <FeaturesSectionDemo />
      </Section>
      <Section>
        <CTA />
      </Section>
      <Section>
        <Footer />
      </Section>
    </div>
  );
}
