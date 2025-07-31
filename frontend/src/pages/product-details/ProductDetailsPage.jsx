import React from "react";
import BreadCrumbs from "../../components/ProductDetails/BreadCrumbs";
import ProductOverview from "../../components/ProductDetails/ProductOverview";
import ProductDetailsTabs from "../../components/ProductDetails/ProductDetailsTabs";
import RelatedProducts from "../../components/ProductDetails/RelatedProducts";
import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../../features/product/productApi";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { data, isLoading, refetch } = useGetSingleProductQuery(id);
  const product = data?.product;
  if (isLoading) return <h1>Loading...</h1>;
  return (
    <div className="min-h-screen bg-white py-15 xl:px-20 lg:px-15 md:px-10 px-5 ">
      <BreadCrumbs product={product} />
      <ProductOverview product={product} isLoading={isLoading} />
      <div className="h-[1px] mt-15 w-full bg-[#D9D9D9] "></div>
      <ProductDetailsTabs product={product} refetch={refetch} />
      <div className="h-[1px] mt-15 w-full bg-[#D9D9D9] "></div>
      <RelatedProducts />
    </div>
  );
}
