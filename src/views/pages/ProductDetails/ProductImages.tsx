import { useRef, useState } from "react";

interface ProductImageProps {
  images: string[];
}

const ProductImage = ({ images }: ProductImageProps) => {
  const [mainImg, setMainImg] = useState(images[0]);
  const ref = useRef();

  const scroll = (scrollOffset: number) => {
    ref.current.scrollLeft += scrollOffset;
  };

  return (
    <div className="flex-col w-full md:w-1/2 max-w-md border border-secondary bg-white rounded shadow-lg">
      <div className="relative h-96 w-full">
        <img
          src={mainImg}
          alt={mainImg}
          className="transform duration-500 ease-in-out hover:scale-105 aspect-square object-cover w-full"
        />
      </div>
      <div className="relative flex border-t border-secondary">
        <button
          aria-label="left-scroll"
          className="h-32 bg-secondary/70 hover:bg-palette-light  absolute left-0 z-10 opacity-75 px-1"
          onClick={() => {
            scroll(-300);
          }}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>

        <div
          ref={ref}
          style={{ scrollBehavior: "smooth" }}
          className="space-x-1 w-full overflow-auto border-t border-secondary"
        >
          {images.map((imgItem, index) => (
            <button
              key={index}
              className="relative w-32 h-32 flex-shrink-0 rounded-sm"
              onClick={() => {
                setMainImg(imgItem);
              }}
            >
              <img
                src={imgItem}
                alt={imgItem}
                className="object-cover w-32 h-32"
              />
            </button>
          ))}
        </div>

        <button
          aria-label="right-scroll"
          className="h-32 bg-secondary/70 hover:bg-palette-light  absolute right-0 z-10 opacity-75 px-1"
          onClick={() => {
            scroll(300);
          }}
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default ProductImage;
