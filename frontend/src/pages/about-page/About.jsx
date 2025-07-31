import React from "react";

import AboutSection from "../../components/AboutSection/AboutSection";
import Banner from "../../components/Banner";

export default function About() {
  return (
    <div className="min-h-screen">
      <Banner title="About" />
      <AboutSection />;
    </div>
  );
}
