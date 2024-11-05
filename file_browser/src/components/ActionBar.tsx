import { useState } from "react";
import { observer } from "mobx-react-lite";
import fileSystemStore from "../stores/FileSystemStore";
import { FileClass } from "../classes/File";
import AddDialog from "./AddDIalog";
import RenameDialog from "./RenameDialog";
import EditDialog from "./EditDialog";
import s from "./ActionBar.module.scss";

// icons
import deleteIcon from "../assets/delete.png";
import plus from "../assets/plus.png";
import edit from "../assets/edit.png";
import renameIcon from "../assets/rename.png";

const ActionBar = observer(() => {
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleDelete = () => {
    fileSystemStore.selectedItem.delete();
    fileSystemStore.setSelected(fileSystemStore.root)
  };

  return (
    <div>
      <div className={s["ActionBar"]}>
        {fileSystemStore.selectedItem instanceof FileClass ? (
          <button
            className={s["action_bar_button"]}
            onClick={() => {
              setIsAddDialogOpen(false)
              setIsRenameDialogOpen(false)
              setIsEditDialogOpen(true)}}
          >
            <img src={edit} className="icon" alt="Edit" />
          </button>
        ) : (
          <>
            <button
              className={s["action_bar_button"]}
              onClick={() => {
                setIsEditDialogOpen(false)
                setIsRenameDialogOpen(false)
                setIsAddDialogOpen(true)}}
            >
              <img src={plus} className="icon" alt="Add" />
            </button>
          </>
        )}
        <button className={s["action_bar_button"]} onClick={handleDelete}>
          <img src={deleteIcon} className="icon" alt="delete" />
        </button>
        <button
          className={s["action_bar_button"]}
          onClick={() => {
            setIsEditDialogOpen(false)
            setIsAddDialogOpen(false)
            setIsRenameDialogOpen(true)
          }}
        >
          <img src={renameIcon} className="icon" alt="Rename" />
        </button>
      </div>
      {isRenameDialogOpen && <RenameDialog setDialog={setIsRenameDialogOpen} />}
      {isEditDialogOpen && <EditDialog setDialog={setIsEditDialogOpen} />}
      {isAddDialogOpen && <AddDialog setDialog={setIsAddDialogOpen} />}
    </div>
  );
});

export default ActionBar;
