import React from "react";
import Banner from "../../components/Banner";
import Auth from "../../components/AuthSection/Auth";
import ServiceHighlights from "../../components/ServiceHighlights";

export default function AuthPageLayout() {
  return (
    <div className="min-h-screen">
      <Banner title="My Account" />
      <Auth />
      <ServiceHighlights />
    </div>
  );
}
