import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import LabelInput from "@/components/LabelInput";
import { Button } from "@/components/ui/button";
import storageService from "@/appwrite/storage";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const AddCategory = () => {
  const { register, handleSubmit, watch } = useForm();
  const userData = useSelector((store) => store.auth.userData);

  const title = watch("title");
  const [slug, setSlug] = useState("");

  useEffect(() => {
    setSlug(
      title
        ?.toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")
    );
  }, [title]);

  const handleAddCategory = () => {
    storageService.addCategory({ title, slug, userData }).then((response) => {
      if (response) {
        toast.success("Category added successfully");
      }
    });
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <h2 className="text-2xl font-bold">Add Category</h2>
      <form
        onSubmit={handleSubmit(handleAddCategory)}
        className="space-y-4 w-1/2"
      >
        <LabelInput
          label="Title"
          {...register("title", { required: "Title is required" })}
        />
        <LabelInput
          label="Slug"
          value={slug ? slug : ""}
          readOnly
          {...register("slug")}
        />

        <Button type="submit" className="w-full">
          Add Category
        </Button>
      </form>
    </div>
  );
};

export default AddCategory;
