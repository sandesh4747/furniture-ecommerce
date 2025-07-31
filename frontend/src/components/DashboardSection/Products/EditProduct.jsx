import React, { useEffect, useState } from "react";
import { UploadCloud } from "lucide-react";
import { toast } from "react-hot-toast";
import { input, Option, Select, Switch } from "@material-tailwind/react";
import {
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "../../../features/product/productApi";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../LoadingSpinner";
import { Loader } from "lucide-react";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetSingleProductQuery(id);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const product = data?.product;

  const [sku, setSku] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [images, setImages] = useState([]);
  const [basePrice, setBasePrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [inStock, setInStock] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);

  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");

  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (product) {
      setImages(product.images || []);
      setName(product.name || "");
      setSku(product.sku || "");
      setStock(product.stock || "");
      setDescription(product.description || "");
      setBasePrice(product.price || "");
      setDiscount(product.discount || "");
      setInStock(product.inStock || true);
      setIsFeatured(product.isFeatured || false);
      setStatus(product.status || "");
      setCategory(product.category || "");
      setTags(product.tags || []);
    }
  }, [product]);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && inputValue.trim()) {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
      }
      setInputValue("");
    }

    if (e.key === "Backspace" && !inputValue && tags.length) {
      setTags(tags.slice(0, tags.length - 1));
    }
  };
  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("sku", sku);
    formData.append("stock", stock);
    formData.append("description", description);
    formData.append("price", basePrice);
    formData.append("discount", discount);
    formData.append("inStock", inStock);
    formData.append("isFeatured", isFeatured);
    formData.append("status", status);
    formData.append("category", category);

    tags.forEach((tag) => formData.append("tags[]", tag));

    const existingImageUrls = images.filter((img) => !(img instanceof File));
    const newImageFiles = images.filter((img) => img instanceof File);

    formData.append(
      "existingImages",
      JSON.stringify(existingImageUrls.map((img) => img.url))
    );

    newImageFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await updateProduct({
        id: product._id,
        formData,
      }).unwrap();
      console.log("response", response);
      navigate("/dashboard/product-list");
      // console.log("response", response);
      toast.success("Product updated successfully");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 4) {
      toast.error("You can upload a maximum of 4 images.");
      return;
    }
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleRemoveImage = (index, e) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };
  if (isLoading) {
    return <LoadingSpinner />;
  }

  console.log(inStock, isFeatured);
  return (
    <div className="flex flex-col w-full ">
      <form className="w-full " onSubmit={handleSubmit}>
        <div>
          <div className="flex flex-col md:flex-row bg-white justify-between mt-5 py-10 px-5 md:p-10 rounded-md shadow-md w-full gap-5">
            <div className="px-1 md:px-4">
              {" "}
              <h1 className="text-2xl md:text-3xl xl:text-4xl pb-1 font-medium">
                Update Product
              </h1>
              <p className="text-[#646E78] text-base font-normal">
                Orders placed across your store
              </p>
            </div>
            <div>
              <button
                type="submit"
                disabled={isUpdating}
                className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-all duration-300  hover:-translate-y-1 hover:scale-105"
              >
                {isUpdating ? (
                  <div className="flex items-center gap-2">
                    <Loader className="animate-spin" />
                    publishing...
                  </div>
                ) : (
                  "Publish Product"
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row ">
          <div className=" mt-10 w-full  ">
            <div className="bg-white p-10 rounded-lg shadow-md ">
              <h5 className="text-xl font-medium">Product information</h5>

              {/* Name */}
              <div className="mt-8">
                <div className="pb-2">
                  {" "}
                  <label
                    className="text-base font-regular pb-1 text-[#384551]"
                    htmlFor="name"
                  >
                    Name
                  </label>
                </div>

                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  id="name"
                  placeholder="Product title"
                  type="text"
                  className=" border border-[#9F9F9F] w-full py-2 rounded-lg px-4"
                />
              </div>
              {/* SKU */}
              <div className="mt-5 flex  w-full gap-5">
                <div className="w-1/2">
                  {" "}
                  <div className="pb-2">
                    <label
                      className="text-base font-regular pb-1 text-[#384551]"
                      htmlFor="sku1"
                    >
                      SKU
                    </label>
                  </div>
                  <input
                    onChange={(e) => setSku(e.target.value)}
                    value={sku}
                    id="sku1"
                    placeholder="SKU"
                    type="text"
                    className=" border border-[#9F9F9F] w-full py-2 rounded-lg px-4"
                  />
                </div>
                <div className="w-1/2">
                  {" "}
                  <div className="pb-2">
                    {" "}
                    <label
                      className="text-base font-regular  text-[#384551]"
                      htmlFor="stock no"
                    >
                      Stock No
                    </label>
                  </div>
                  <input
                    id="stock no"
                    placeholder="Stock No"
                    onChange={(e) => setStock(e.target.value)}
                    value={stock}
                    type="text"
                    className=" border border-[#9F9F9F] w-full py-2 rounded-lg px-4"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="mt-8">
                <div className="pb-2">
                  {" "}
                  <label
                    className="text-base font-regular  text-[#384551]"
                    htmlFor="description"
                  >
                    Description(Optional)
                  </label>
                </div>
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  id="description"
                  rows={6}
                  placeholder="Product Description"
                  type="text"
                  className=" border border-[#9F9F9F] w-full py-2 rounded-lg px-4"
                />
              </div>
            </div>

            {/* Product Image */}
            <div className="mt-10 bg-white p-6 rounded-xl shadow-md max-w-5xl mx-auto">
              <h5 className="text-xl font-medium mb-6 text-gray-[#384551]">
                Product Images
              </h5>

              {/* Upload Button */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-8">
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleImageChange}
                  accept="image/*"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center justify-center text-gray-500 hover:text-blue-600 transition"
                >
                  <UploadCloud size={42} className="mb-3" />
                  <p>
                    <span className="text-blue-500 font-medium">
                      Click to upload
                    </span>{" "}
                  </p>
                  <p className="text-sm text-gray-400">
                    Max 4 images. Only image files allowed.
                  </p>
                </label>
              </div>

              {/* Preview Section */}
              {images?.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                  {images?.map((img, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition p-3 relative"
                    >
                      <img
                        src={
                          img instanceof File
                            ? URL.createObjectURL(img)
                            : img?.url
                        }
                        alt={`preview`}
                        className="w-full h-32 object-cover rounded-md"
                      />
                      <div className="mt-2">
                        <p className="text-sm font-medium truncate">
                          {product.name}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          handleRemoveImage(index);
                        }}
                        className="absolute top-2 right-2 text-red-500 bg-white rounded-full px-2 py-0.5 text-xs shadow hover:bg-red-50 transition"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="w-full lg:w-1/2 p-0 pl-4">
            {/* Pricing */}
            <div className=" w-full mt-10 bg-white  rounded-lg shadow-md   py-10 px-5">
              <h5 className="text-xl font-medium text-[#384551]">Pricing</h5>
              <div className="mt-8">
                <div className="pb-2">
                  {" "}
                  <label
                    className="text-base font-regular pb-1 text-[#384551]"
                    htmlFor="Price"
                  >
                    Base Price
                  </label>
                </div>

                <input
                  onChange={(e) => setBasePrice(e.target.value)}
                  value={basePrice}
                  id="Price"
                  placeholder="Price"
                  type="number"
                  className=" border border-[#9F9F9F] w-full py-2 rounded-lg px-4"
                />
              </div>

              <div className="mt-8">
                <div className="pb-2">
                  {" "}
                  <label
                    className="text-base font-regular pb-1 text-[#384551]"
                    htmlFor="Discounted Price"
                  >
                    Discounted Price
                  </label>
                </div>

                <input
                  onChange={(e) => setDiscount(e.target.value)}
                  value={discount}
                  id="Discounted Price"
                  placeholder="Discounted Price"
                  type="number"
                  className=" border border-[#9F9F9F] w-full py-2 rounded-lg px-4"
                />
              </div>

              <div className="flex justify-between mt-5">
                <p className="text-[#646D78]">In Stock</p>
                <Switch
                  onChange={(e) => setInStock(e.target.checked)}
                  checked={inStock}
                  crossOrigin={undefined}
                  color="amber"
                />
              </div>

              <div className="flex justify-between mt-5">
                <p className="text-[#646D78]">Is Featured </p>
                <Switch
                  onChange={() => setIsFeatured(!isFeatured)}
                  crossOrigin={undefined}
                  checked={isFeatured}
                  color="amber"
                />
              </div>
            </div>

            {/* Organize */}
            <div className=" w-full mt-10 bg-white   py-10 px-5 rounded-lg shadow-md">
              <h5 className="text-xl font-medium text-[#384551]">Organize</h5>
              <div className="mt-8">
                <p>Category</p>{" "}
                <div className="mt-2">
                  <Select
                    label="Category"
                    value={category}
                    onChange={(value) => setCategory(value)}
                    className="!border !border-gray-500 focus:!border-black focus:!ring-0 hover:!border-black rounded-md"
                    labelProps={{ className: "hidden" }}
                  >
                    <Option value="Sofas">Sofas</Option>
                    <Option value="Chairs">Chairs</Option>
                    <Option value="Tables">Tables</Option>
                    <Option value="Outdoor">Outdoor</Option>
                    <Option value="Desks">Desks</Option>
                  </Select>
                </div>
              </div>

              {/* status */}
              <div className="mt-5">
                <label>Status</label>
                <div className="mt-2">
                  <Select
                    label="Status"
                    value={status}
                    onChange={(value) => setStatus(value)}
                    className="!border !border-gray-500 focus:!border-black focus:!ring-0 hover:!border-black rounded-md"
                    labelProps={{ className: "hidden" }}
                  >
                    <Option value="Published">Published</Option>
                    <Option value="Scheduled">Scheduled</Option>
                    <Option value="Inactive">Inactive</Option>
                  </Select>
                </div>
              </div>

              <div className="mt-5">
                <label>Tags</label>
                <div
                  className=" mt-2 flex flex-wrap
                 focus-within:border-black focus-within:ring-1 focus-within:ring-black transition items-center gap-2 px-3 py-2 border-1 border-gray-400 rounded-md min-h-[56px]"
                >
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="flex items-center px-2 py-1 rounded-full bg-gray-200 text-sm text-gray-800"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(index)}
                        className="ml-1 text-gray-500 hover:text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    className="flex-grow outline-none bg-transparent text-sm py-1 "
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type and press Enter"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
