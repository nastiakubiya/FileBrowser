import { useState } from "react";
import { observer } from "mobx-react-lite";
import fileSystemStore from "../stores/FileSystemStore";

const RenameDialog = observer(
  ({ onClose }: { onClose: (state: boolean) => void }) => {
    const [rename, setRename] = useState("");
    const [error, setError] = useState("");

    const handleRename = () => {
      if (rename === "") {
        setError("You must enter a name");
      } else {
        fileSystemStore.selectedItem.setName(rename);
        onClose(false);
        setRename("");
      }
    };

    return (
      <dialog className="dialog" open>
        <h2>Rename Item</h2>
        <p>
          This is the current name of the item:{" "}
          {fileSystemStore.selectedItem.name}
        </p>
        <div className="input-dialog-container">
          <input
            placeholder="Enter new name here"
            onChange={(e) => {
              setRename(e.target.value);
              if (error && e.target.value.trim() !== "") {
                setError("");
              }
            }}
            className="input-dialog"
          />
        </div>
        {error}
        <div className="dialog-buttons">
          <button onClick={handleRename} className="dialog-button">
            Rename
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
