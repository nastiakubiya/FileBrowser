import { Dispatch, SetStateAction, useState } from "react";
import { observer } from "mobx-react-lite";
import fileSystemStore from "../stores/FileSystemStore";

const RenameDialog = observer(
  ({ setDialog }: { setDialog: Dispatch<SetStateAction<boolean>> }) => {
    const [rename, setRename] = useState("");
    const [error, setError] = useState("");

    const handleRename = () => {
      if (rename === "") {
        setError("You must enter a name");
      } else {
        fileSystemStore.selectedItem.setName(rename);
        setDialog(false);
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
        <div className="inputDialogContainer">
          <input
            placeholder="Enter new name here"
            onChange={(e) => {
              setRename(e.target.value);
              if (error && e.target.value.trim() !== "") {
                setError("");
              }
            }}
            className="inputDialog"
          />
        </div>
        {error}
        <div className="dialogButtons">
          <button onClick={handleRename} className="dialogButton">
            Rename
          </button>
          <button onClick={() => setDialog(false)} className="dialogButton">
            Cancel
          </button>
        </div>
      </dialog>
    );
  }
);

export default RenameDialog;
