import storageService from "@/appwrite/storage";
import FileInput from "@/components/FileInput";
import LabelInput from "@/components/LabelInput";
import Select from "@/components/Select";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";

const AddProduct = () => {
  const [options, setOptions] = useState([]);
  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    storageService.getCategories().then((response) => {
      if (response.length) {
        setOptions(response);
      }
    });
  }, []);

  const handleAddProduct = async (data) => {
    setLoading(true);
    storageService
      .uploadImage(data.image)
      .then(async (response) => {
        toast.success("Image uploaded successfully");
        if (response?.$id) {
          await storageService
            .addProduct({ ...data, imageId: response.$id })
            .then((response) => {
              if (response?.$id) {
                toast.success("Product added successfully");
              }
            });
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <h2 className="text-2xl font-bold">Add Product</h2>
      <form
        onSubmit={handleSubmit(handleAddProduct)}
        className="w-1/2 space-y-4"
      >
        <LabelInput label="Title" {...register("title")} />
        <LabelInput label="Description" {...register("desc")} />
        <div className="flex w-full gap-4">
          <div className="flex flex-col w-fit space-y-2">
            <label htmlFor="category">Category</label>
            <Select
              label="Category"
              options={options}
              className="border h-full px-4 rounded-md"
              {...register("category")}
            />
          </div>
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
    </div>
  );
};

export default AddProduct;
