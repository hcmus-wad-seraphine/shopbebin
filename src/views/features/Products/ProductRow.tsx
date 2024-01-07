import { type ShopbebinProduct, type ShopbebinTopping } from "@models/interface";
import { type ProductSize, type ToppingMetadata } from "@prisma/client";
import { shortenId } from "@utils/converter";
import { ModalHeader, modalStyles } from "@views/components/Modal";
import { type FC, useState } from "react";
import Modal from "react-modal";

import ProductBuilder from "./ProductBuilder";

interface ProductRowProps {
  product: ShopbebinProduct;
  categories: string[];
  toppings: ToppingMetadata[];
  onCreateProduct?: (product: ShopbebinProduct) => void;
  onUpdateProduct?: (product: ShopbebinProduct) => void;
  onDeleteProduct?: (product: ShopbebinProduct) => void;
}

const sizesToString = (sizes: ProductSize[]) => {
  if (sizes.length === 0) {
    return "None";
  }
  return sizes.map((size) => `${size.size}`).join(", ");
};

const toppingsToString = (toppings: ShopbebinTopping[]) => {
  if (toppings.length === 0) {
    return "None";
  }
  return toppings.map((topping) => `${topping.topping.name}`).join(", ");
};

const ProductRow: FC<ProductRowProps> = ({
  product,
  categories,
  toppings,
  onCreateProduct,
  onUpdateProduct,
  onDeleteProduct,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <>
      {onCreateProduct ? (
        <button
          className="mx-auto w-fit px-4 py-2 text-center border border-primary rounded-md hover:bg-primary hover:text-white transition"
          onClick={openEditModal}
        >
          Add new product
        </button>
      ) : (
        <div className="grid grid-cols-10 gap-4 whitespace-pre-wrap">
          <div className="col-span-1">{shortenId(product.id)}</div>
          <div className="col-span-1">
            <img
              className="w-12 h-12 object-cover"
              src={product.images[0]}
              alt={product.name}
            />
          </div>
          <div className="col-span-2">{product.name}</div>
          <div className="col-span-1">{product.basePrice}</div>
          <div className="col-span-1">{product.category}</div>
          <div className="col-span-1">{sizesToString(product.availableSizes)}</div>
          <div className="col-span-2">{toppingsToString(product.availableToppings)}</div>
          <div className="col-span-1 flex items-center justify-around gap-2">
            <i
              className="fa-solid fa-pen-to-square hover:text-primary hover:cursor-pointer transition"
              onClick={openEditModal}
            />
            <i
              className="fa-solid fa-trash hover:text-error hover:cursor-pointer transition"
              onClick={openDeleteModal}
            />
          </div>
        </div>
      )}

      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        style={modalStyles}
        contentLabel={`Delete ${product.name}`}
      >
        <ModalHeader
          title={`Delete ${product.name}`}
          closeModal={closeDeleteModal}
        />

        <p className="py-8 text-center">Are you sure you want to delete {product.name}?</p>

        <button
          className="mx-auto px-2 py-1 w-[120px] border border-primary rounded-md hover:bg-primary hover:text-white transition"
          onClick={() => {
            onDeleteProduct && onDeleteProduct(product);
            closeDeleteModal();
          }}
        >
          Delete
        </button>
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        style={modalStyles}
        contentLabel={`Edit ${product.name}`}
      >
        <ModalHeader
          title={`Edit ${product.name}`}
          closeModal={closeEditModal}
        />

        <ProductBuilder
          defaultProduct={product}
          buildButtonText="Update"
          categories={categories}
          toppings={toppings}
          onBuild={(product) => {
            onCreateProduct && onCreateProduct(product);
            onUpdateProduct && onUpdateProduct(product);
            closeEditModal();
          }}
        />
      </Modal>
    </>
  );
};

export default ProductRow;
