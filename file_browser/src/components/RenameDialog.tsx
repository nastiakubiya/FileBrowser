import { useState } from "react";
import { observer } from "mobx-react-lite";
import fileSystemStore from "../stores/FileSystemStore";

const RenameDialog = observer(
  ({ onClose }: { onClose: () => void }) => {
    const [renameString, setRenameString] = useState("");
    const [error, setError] = useState("");

    const rename = () => {
      if (renameString === "") {
        setError("You must enter a name");
      } else {
        fileSystemStore.selectedItem.setName(renameString);
        onClose();
        setRenameString("");
      }
    };

    return (
      <dialog className="dialog dialog-layout" open>
        <h2>Rename Item</h2>
        <p>
          This is the current name of the item:
          <br/>
          {fileSystemStore.selectedItem.name}
        </p>
        <div className="input-dialog-layout">
          <input
            placeholder="Enter new name here"
            onChange={(e) => {
              setRenameString(e.target.value);
              if (error && e.target.value.trim() !== "") {
                setError("");
              }
            }}
            className="input-dialog"
          />
        </div>
        {error}
        <div className="dialog-btns-layout">
          <button onClick={rename} className="dialog-button dialog-btn-layout">
            Save
          </button>
          <button onClick={onClose} className="dialog-button dialog-btn-layout">
            Cancel
          </button>
        </div>
      </dialog>
    );
  }
);

export default RenameDialog;
