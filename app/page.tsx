"use client";

import { GutterSmoke } from "@/components/GutterSmoke";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HighlightsStrip } from "@/components/HighlightsStrip";
import { WhoWeHelp } from "@/components/WhoWeHelp";
import { Services } from "@/components/Services";
import { Advantages } from "@/components/Advantages";
import { HowWeWork } from "@/components/HowWeWork";
import { FAQ } from "@/components/FAQ";
import { Contacts } from "@/components/Contacts";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <div>
      <Header />
      <GutterSmoke />
      <main className="relative z-10">
        <Hero />
        <HighlightsStrip />
        <Services />
        <WhoWeHelp />
        <Advantages />
        <HowWeWork />
        <FAQ />
        <Contacts />
      </main>
      <Footer className="relative z-10" />
    </div>
  );
}
