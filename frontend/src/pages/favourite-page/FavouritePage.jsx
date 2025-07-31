import React from "react";
import FavouriteProduct from "../../components/FavouriteSection/FavouriteProduct";
import ServiceHighlights from "../../components/ServiceHighlights";

import Banner from "../../components/Banner";

export default function FavouritePage() {
  return (
    <div className="min-h-screen">
      <Banner title="Favourite" />
      <FavouriteProduct />
      <ServiceHighlights />
    </div>
  );
}
