import { forwardRef, useId, useState } from "react";

const FileInput = ({ name, setValue, ...props }, ref) => {
  const id = useId();
  const [imgSrc, setImgSrc] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImgSrc(e.target.result);
      };

      reader.readAsDataURL(file);
      setValue(name, file);
    }
  };

  return (
    <div className="border p-2 rounded-md w-[100px] h-[125px] aspect-square">
      <input
        type="file"
        id={id}
        onChange={handleImageChange}
        className="hidden"
        ref={ref}
        name={name}
      />
      <label
        htmlFor={id}
        className="h-full w-full overflow-y-hidden cursor-pointer"
      >
        {imgSrc ? (
          <img src={imgSrc} className="h-full w-full" />
        ) : (
          <div className=" w-fit aspect-square p-4 text-center">
            <span className="font-bold text-3xl">+</span>
            <p>Upload Image</p>
          </div>
        )}
      </label>
    </div>
  );
};

export default forwardRef(FileInput);
