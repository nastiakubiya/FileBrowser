import { useState } from "react";
import { observer } from "mobx-react-lite";
import fileSystemStore from "../stores/FileSystemStore";

const RenameDialog = observer(
  ({ onClose }: { onClose: (state: boolean) => void }) => {
    const [renameString, setRenameString] = useState("");
    const [error, setError] = useState("");

    const rename = () => {
      if (renameString === "") {
        setError("You must enter a name");
      } else {
        fileSystemStore.selectedItem.setName(renameString);
        onClose(false);
        setRenameString("");
      }
    };

    return (
      <dialog className="dialog" open>
        <h2>Rename Item</h2>
        <p>
          This is the current name of the item:
          <br/>
          {fileSystemStore.selectedItem.name}
        </p>
        <div className="input-dialog-container">
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
        <div className="dialog-buttons">
          <button onClick={rename} className="dialog-button">
            Save
          </button>
          <button onClick={() => onClose(false)} className="dialog-button">
            Cancel
          </button>
        </div>
      </dialog>
    );
  }
);

export default RenameDialog;
