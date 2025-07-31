import React, { useState } from "react";
import Banner from "../../components/Banner";
import BlogSection from "../../components/BlogSection/BlogSection";
import ServiceHighlights from "../../components/ServiceHighlights";

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  return (
    <div className="min-h-screen">
      <Banner title="Blog" />
      <BlogSection
        setCurrentPage={setCurrentPage}
        setItemsPerPage={setItemsPerPage}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
      />

      <ServiceHighlights />
    </div>
  );
}
