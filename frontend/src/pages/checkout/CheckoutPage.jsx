import React from "react";
import Banner from "../../components/Banner";
import BillingSection from "../../components/CheckoutSection/BillingSection";
import ServiceHighlights from "../../components/ServiceHighlights";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen">
      <Banner title="Checkout" />
      <BillingSection />
      <ServiceHighlights />
    </div>
  );
}
