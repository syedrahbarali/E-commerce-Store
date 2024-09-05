import storageService from "@/appwrite/storage";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const ProductCard = ({ $id, title, imageId }) => {
  const handleDeleteProduct = () => {
    storageService.deleteProduct({ $id, imageId }).then((response) => {
      if (response) {
        toast.success("Product deleted successfully");
      }
    });
  };

  return (
    <div className="flex items-center justify-between gap-4 border p-2 h-[50px] w-full">
      <img
        src={storageService.getImagePreview(imageId)}
        alt={title}
        className="h-full"
      />

      <h3 className="flex-1">{title.slice(0, 30)} . . .</h3>

      <div>
        <Button variant="outline">Edit</Button>
        <Button variant="destructive" onClick={handleDeleteProduct}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
