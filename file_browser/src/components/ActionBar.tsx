import { useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import fileSystemStore from "../stores/FileSystemStore";
import { FileClass } from "../classes/File";
import AddDialog from "./AddDialog";
import RenameDialog from "./RenameDialog";
import EditDialog from "./EditDialog";
import s from "./ActionBar.module.scss";

// icons
import deleteIcon from "../assets/delete.png";
import plus from "../assets/plus.png";
import edit from "../assets/edit.png";
import renameIcon from "../assets/rename.png";

const ActionBar = observer(() => {
  enum DialogState {
    None,
    Rename,
    Edit,
    Add,
  }

  const [dialogState, setDialogState] = useState(DialogState.None);

  const deleteItem = () => {
    fileSystemStore.selectedItem.delete();
    fileSystemStore.setSelected(fileSystemStore.root);
  };

  const closeDialog = () => {
    setDialogState(DialogState.None)
  }

  const currentDialog = useMemo(() => {
    switch (dialogState) {
      case DialogState.Rename:
        return (
          <RenameDialog onClose={closeDialog} />
        );
      case DialogState.Edit:
        return <EditDialog onClose={closeDialog} />;
      case DialogState.Add:
        return <AddDialog onClose={closeDialog} />;
      default:
        return null;
    }
  }, [dialogState]);

  return (
    <div>
      <div className={s["action-bar"]}>
        {fileSystemStore.selectedItem instanceof FileClass ? (
          <button
            className={s["action-bar-button"]}
            onClick={() => {
              setDialogState(DialogState.Edit);
            }}
          >
            <img src={edit} className="icon-layout" alt="Edit" />
          </button>
        ) : (
          <>
            <button
              className={s["action-bar-button"]}
              onClick={() => {
                setDialogState(DialogState.Add);
              }}
            >
              <img src={plus} className="icon-layout" alt="Add" />
            </button>
          </>
        )}
        <button className={s["action-bar-button"]} onClick={deleteItem}>
          <img src={deleteIcon} className="icon-layout" alt="delete" />
        </button>
        <button
          className={s["action-bar-button"]}
          onClick={() => {
            setDialogState(DialogState.Rename);
          }}
        >
          <img src={renameIcon} className="icon-layout" alt="Rename" />
        </button>
      </div>
      {currentDialog}
    </div>
  );
});

export default ActionBar;
