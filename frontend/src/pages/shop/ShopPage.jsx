import React, { useMemo, useState } from "react";
import ShopBanner from "../../components/Banner";
import Banner from "../../components/Banner";
import ShopFilterBar from "../../components/ShopSection/ShopFilterBar";
import ProductList from "../../components/ShopSection/ProductList";
import ServiceHighlights from "../../components/ServiceHighlights";
import {
  useGetAllProductQuery,
  useHighPricedProductQuery,
  useLatestProductQuery,
  useLowPricedProductQuery,
  useRelevantProductQuery,
} from "../../features/product/productApi";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function ShopPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectFilter, setSelectFilter] = useState("Relevance");

  const { data: allData } = useGetAllProductQuery();
  const { data: latestData, isLoading: isLatestLoading } =
    useLatestProductQuery();
  const { data: highPricedData, isLoading: isHighPricedLoading } =
    useHighPricedProductQuery();
  const { data: relevantData, isLoading: isRelevantLoading } =
    useRelevantProductQuery();
  const { data: lowPricedData, isLoading: isLowPricedLoading } =
    useLowPricedProductQuery();

  const products = useMemo(() => {
    switch (selectFilter) {
      case "Newest":
        return latestData?.products || [];
      case "HighToLow":
        return highPricedData?.products || [];
      case "LowToHigh":
        return lowPricedData?.products || [];
      case "Relevance":
        return relevantData?.products || [];
      default:
        return allData?.product || [];
    }
  }, [
    selectFilter,
    latestData,
    highPricedData,
    lowPricedData,
    relevantData,
    allData,
  ]);

  const totalProducts = products.length;
  if (
    isLatestLoading ||
    isHighPricedLoading ||
    isRelevantLoading ||
    isLowPricedLoading
  )
    return <LoadingSpinner />;

  return (
    <div className="bg-white min-h-screen">
      <Banner title="Shop" />
      <ShopFilterBar
        selectFilter={selectFilter}
        setSelectFilter={setSelectFilter}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalProducts={totalProducts}
        onChangeItemsPerPage={(value) => {
          setItemsPerPage(value);
          setCurrentPage(1); // Reset to first page
        }}
      />
      <ProductList
        products={products}
        setCurrentPage={setCurrentPage}
        setItemsPerPage={setItemsPerPage}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
      />

      <ServiceHighlights />
    </div>
  );
}
