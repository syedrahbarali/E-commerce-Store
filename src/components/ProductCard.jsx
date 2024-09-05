import storageService from "@/appwrite/storage";
import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({
  $id,
  title,
  imageId,
  price,
  desc,
  slug = "product",
}) => {
  return (
    <div className="w-[300px] h-fit aspect-square border space-y-4 flex flex-col items-center p-4 rounded-lg hover:scale-[1.01] transition-[transform]">
      <Link to={`${slug}/${$id}`}>
        <img src={storageService.getImagePreview(imageId)} alt="" />
      </Link>

      <div className="space-y-2">
        <h3 className="font-bold text-base">{title.slice(0, 30)} . . .</h3>
        <p className="font-bold text-lg">₹ {price}</p>

        <small className="text-xs text-gray-400">
          {desc.slice(0, 80)} . . . .
        </small>
      </div>
    </div>
  );
};

export default ProductCard;
