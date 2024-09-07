import storageService from "@/appwrite/storage";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import { PulseLoader } from "react-spinners";
import Select from "@/components/Select";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const user = useSelector((store) => store.auth.userData);
  const [loading, setLoading] = useState(true);
  // const [quantity, setQuantity] = useState(1);
  const quantity = useRef(1);

  useEffect(() => {
    setLoading(true);
    storageService
      .getProduct(id)
      .then((response) => {
        if (response) {
          setProduct(response);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAddToCart = () => {
    console.log(quantity.target);
    // storageService
    //   .addToCart({ userId: user.$id, productId: product.$id, quantity })
    //   .then((response) => {
    //     console.log(response);
    //     if (response) {
    //       toast.success("Product added to cart successfully");
    //     }
    //   });
  };

  return loading ? (
    <div className="w-full h-full flex items-center justify-center">
      <PulseLoader color="white" />
    </div>
  ) : (
    <div className="flex gap-10">
      <div className="w-[300px] rounded-xl overflow-hidden">
        <img
          src={storageService.getImagePreview(product.imageId)}
          alt=""
          className="w-full"
        />
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl font-semibold">{product.title}</h1>

        <div className="flex items-center gap-1">
          <FaStar color="#ffa534" />
          <FaStar color="#ffa534" />
          <FaStar color="#ffa534" />
          <FaStar color="#ffa534" />
          <FaStar color="#ffa534" />
          <span className="text-sm font-medium opacity-80">( 5 )</span>
        </div>

        <div className="flex items-end gap-2">
          <p className="line-through opacity-80">₹ {product.price + 1500}</p>
          <p className="text-3xl font-semibold">₹ {product.price}</p>
        </div>

        <div className="flex items-center gap-2">
          <label className="font-semibold">Qty</label>
          <Select
            options={[1, 2, 3, 4, 5]}
            className="px-4 py-2 border"
            ref={quantity}
          />
        </div>

        <Button variant="default" className="w-full">
          Buy Now
        </Button>
        <Button
          variant="secondary"
          className="w-full"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default Product;
