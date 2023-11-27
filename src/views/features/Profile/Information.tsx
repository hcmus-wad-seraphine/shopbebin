interface InformationTitleProps {
  isEditMode: boolean;
  setIsEditMode: (isEdit: boolean) => void;
}

export const InformationItems = [];

const InformationTitle = ({ isEditMode, setIsEditMode }: InformationTitleProps) => {
  return (
    <div className="gap-5 min-w-[300px]">
      <h2 className="text-white text-lg font-medium">Your information</h2>
      {isEditMode ? (
        <button
          onClick={() => {
            setIsEditMode(false);
          }}
          className="text-white items-center gap-2"
        >
          <i className="fa-regular fa-floppy-disk text-white mr-1"></i>
          Save
        </button>
      ) : (
        <button
          onClick={() => {
            setIsEditMode(true);
          }}
          className="text-white items-center gap-2"
        >
          <i className="fa-regular fa-pen-to-square text-white mr-1"></i>
          Edit
        </button>
      )}
    </div>
  );
};

export default InformationTitle;
