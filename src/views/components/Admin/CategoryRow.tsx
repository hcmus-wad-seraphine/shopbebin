import { type Category } from "@prisma/client";
import { shortenId } from "@utils/converter";
import { appState } from "@views/valtio";
import { useState } from "react";

interface Props {
  category: Category;
  onDelete: (id: string) => void;
}

const CategoryRow = ({ category, onDelete }: Props) => {
  const [currentCategory, setCurrentCategory] = useState<Category>(category);
  const { id, name, itemCount } = currentCategory;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [nameState, setNameState] = useState<string>(name);

  const handleChange = () => {
    const updatedCategory = { ...category, name: nameState };
    const handleUpdateCategory = async () => {
      const data = await fetch(`/api/categories`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${appState.profile?.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCategory),
      });

      setCurrentCategory(await data.json());
    };

    handleUpdateCategory().catch((err) => {
      console.log(err);
    });
  };

  const handleDelete = () => {
    const handleDeleteCategory = async () => {
      await fetch(`/api/categories/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${appState.profile?.token}`,
        },
      });
    };

    onDelete(id);

    handleDeleteCategory().catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className="grid grid-cols-8 gap-4 font-semibold">
      <div className="col-span-2 font-normal">{shortenId(id)}</div>
      {isEditing ? (
        <input
          type="text"
          className="col-span-2 font-normal"
          value={nameState}
          autoFocus={true}
          onChange={(text) => {
            setNameState(text.target.value);
          }}
        />
      ) : (
        <div className="col-span-2 font-normal">{nameState}</div>
      )}
      <div className="col-span-2 font-normal">{itemCount}</div>
      <button
        className="col-span-1"
        onClick={() => {
          if (isEditing) {
            handleChange();
          }
          setIsEditing(!isEditing);
        }}
      >
        <i className="fa-solid fa-pen text-primary hover:text-secondary flex self-start"></i>
      </button>
      <button
        className="col-span-1"
        onClick={handleDelete}
      >
        <i className="fa-solid fa-trash text-primary hover:text-secondary flex self-start"></i>
      </button>
    </div>
  );
};

export default CategoryRow;
