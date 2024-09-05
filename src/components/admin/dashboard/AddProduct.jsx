import storageService from "@/appwrite/storage";
import FileInput from "@/components/FileInput";
import LabelInput from "@/components/LabelInput";
import Select from "@/components/Select";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";
import ProductCard from "./ProductCard";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    category: [],
    products: [],
    loading: true,
  });
  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    storageService
      .getCategories()
      .then((category) => {
        if (category.length) {
          setProductData((prevData) => ({
            ...prevData,
            category,
          }));
        }

        storageService.getProducts().then((response) => {
          if (response.documents.length) {
            setProductData((prevData) => ({
              ...prevData,
              products: response.documents,
            }));
          }
        });
      })
      .finally(() => {
        setProductData((prevData) => ({
          ...prevData,
          loading: false,
        }));
      });
  }, []);

  const handleAddProduct = (data) => {
    setLoading(true);
    storageService
      .uploadImage(data.image)
      .then(async (image) => {
        if (image.$id) {
          await storageService
            .addProduct({ ...data, imageId: image.$id })
            .then((response) => {
              if (response?.$id) {
                toast.success("Product added successfully");
              }
            });
        } else {
          await storageService.deleteFile(image.$id);
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="w-full h-full flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-bold">Add Product</h2>
      <form
        onSubmit={handleSubmit(handleAddProduct)}
        className="w-1/2 space-y-4"
      >
        <LabelInput label="Title" {...register("title")} />
        <LabelInput label="Description" {...register("desc")} />

        <div className="space-y-2">
          <label className="font-semibold">Cateogry</label>
          <Select
            label="Category"
            options={productData.category}
            className="border w-full py-2 px-4 rounded-md"
            {...register("category")}
          />
        </div>

        <div className="flex gap-4">
          <LabelInput label="Price" type="number" {...register("price")} />
          <LabelInput label="Qty" type="number" {...register("quantity")} />
        </div>

        {/* //TODO: Here we have create uploading multiple images */}
        {/* <div className="w-full  flex gap-4 flex-wrap">
          {Array.from({ length: imageCount }).map((_, index) => (
            <FileInput
              key={index}
              {...register(`image-${index}`)}
              setValue={setValue}
            />
          ))}
        </div> */}

        <FileInput {...register("image")} setValue={setValue} />

        <Button type="submit" className="w-full">
          {loading ? <PulseLoader /> : "Add Product"}
        </Button>
      </form>

      <div className="w-1/2">
        {productData.loading ? (
          <PulseLoader color="white" />
        ) : productData.products.length ? (
          productData.products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))
        ) : (
          <div className="text-center text-gray-300 font-semibold">
            No Products Found
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
