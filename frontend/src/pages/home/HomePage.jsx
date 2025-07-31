import React from "react";

import HeroSection from "../../components/HomeSection/HeroSection";
import HighlightTables from "../../components/HomeSection/HighlightTables";
import FeaturedTables from "../../components/HomeSection/FeaturedTables";
import NewArrivalBanner from "../../components/HomeSection/NewArrivalBanner";
import Blogs from "../../components/HomeSection/Blogs";
import InstagramFeed from "../../components/HomeSection/InstagramFeed";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <HighlightTables />
      <FeaturedTables />
      <NewArrivalBanner />
      <Blogs />
      <InstagramFeed />
    </div>
  );
}
