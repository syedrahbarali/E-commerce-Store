import storageService from "@/appwrite/storage";
import LabelInput from "@/components/LabelInput";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { MdDelete } from "react-icons/md";
import { PulseLoader } from "react-spinners";

const UpdateProduct = () => {
  const { id } = useParams();
  const { register, handleSubmit, setValue } = useForm();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    storageService.getProduct(id).then((response) => {
      if (response) {
        console.log(response);
        setProduct(response);
        setValue("title", response.title);
        setValue("desc", response.desc);
        setValue("price", response.price);
        setValue("quantity", response.quantity);
        setValue("imageId", response.imageId);
      }
    });
  }, []);

  const handleDeleteProduct = () => {
    storageService
      .deleteProduct({
        $id: product.$id,
        imageId: product.imageId,
      })
      .then((response) => {
        if (response) {
          toast.success("Product deleted successfully");
          setTimeout(() => {
            navigate("/dashboard/admin/all-products");
          }, 1500);
        }
      });
  };

  const handleUpdateProduct = (data) => {
    setLoading(true);
    storageService
      .updateProduct(product.$id, { ...data })
      .then((response) => {
        if (response) {
          toast.success("Product updated successfully");
          setTimeout(() => {
            navigate("/dashboard/admin/all-products");
          }, 1500);
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-1/2 space-y-4">
        <h2 className="text-center text-2xl font-bold">Update Product</h2>

        <form
          onSubmit={handleSubmit(handleUpdateProduct)}
          className="space-y-4"
        >
          <LabelInput
            label="Title"
            value={product.title ? product.title : ""}
            {...register("title")}
            onChange={(e) => {
              setProduct((prevState) => ({
                ...prevState,
                title: e.target.value,
              }));

              setValue("title", e.target.value);
            }}
          />

          <div className="space-y-2">
            <label htmlFor="desc" className="font-semibold">
              Description
            </label>
            <Textarea
              id="desc"
              className="min-h-[150px]"
              value={product.desc ? product.desc : ""}
              {...register("desc")}
              onChange={(e) => {
                setProduct((prevState) => ({
                  ...prevState,
                  desc: e.target.value,
                }));

                setValue("desc", e.target.value);
              }}
            />
          </div>

          <div className="flex gap-4">
            <LabelInput
              type="number"
              label="Price"
              value={product.price ? product.price : ""}
              {...register("price")}
              onChange={(e) => {
                setProduct((prevState) => ({
                  ...prevState,
                  price: e.target.value,
                }));

                setValue("price", e.target.value);
              }}
            />

            <LabelInput
              type="number"
              label="Quantity"
              value={product.quantity ? product.quantity : ""}
              {...register("quantity")}
              onChange={(e) => {
                setProduct((prevState) => ({
                  ...prevState,
                  quantity: e.target.value,
                }));

                setValue("quantity", e.target.value);
              }}
            />
          </div>

          <Button type="submit" className="w-full">
            {loading ? <PulseLoader /> : "Update"}
          </Button>
        </form>

        <Button variant="destructive" onClick={handleDeleteProduct}>
          <MdDelete size={20} />
        </Button>
      </div>
    </div>
  );
};

export default UpdateProduct;
