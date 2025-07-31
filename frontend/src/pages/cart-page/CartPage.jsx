import React from "react";
import Banner from "../../components/Banner";
import CartSummary from "../../components/CartSection/CartSummary";
import ServiceHighlights from "../../components/ServiceHighlights";

export default function CartPage() {
  return (
    <div className="min-h-screen">
      <Banner title="Cart" />
      <CartSummary />
      <ServiceHighlights />
    </div>
  );
}
