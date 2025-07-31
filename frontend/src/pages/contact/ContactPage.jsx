import React from "react";
import Banner from "../../components/Banner";
import ContactInfo from "../../components/ContactSection/ContactInfo";
import ServiceHighlights from "../../components/ServiceHighlights";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Banner title="Contact" />
      <ContactInfo />
      <ServiceHighlights />
    </div>
  );
}
