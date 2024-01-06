import { type Category } from "@prisma/client";
import { appState } from "@views/valtio";
import { useState } from "react";

interface Props {
  category: Category;
  onChange: (name: string) => void;
  onDelete: () => void;
}

const CategoryRow = ({ category, onChange, onDelete }: Props) => {
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

  return (
    <div className="grid grid-cols-8 gap-4 font-semibold">
      <div className="col-span-2">{id}</div>
      {isEditing ? (
        <input
          type="text"
          className="col-span-2"
          value={nameState}
          autoFocus={true}
          onChange={(text) => {
            setNameState(text.target.value);
          }}
        />
      ) : (
        <div className="col-span-2">{nameState}</div>
      )}
      <div className="col-span-2">{itemCount}</div>
      <button
        className="col-span-1"
        onClick={() => {
          if (isEditing) {
            handleChange();
          }
          setIsEditing(!isEditing);
        }}
      >
        <i className="fa-solid fa-pen hover:text-secondary"></i>
      </button>
      <button className="col-span-1">
        <i className="fa-solid fa-trash hover:text-secondary"></i>
      </button>
    </div>
  );
};

export default CategoryRow;
