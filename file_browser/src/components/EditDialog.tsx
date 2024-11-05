import { observer } from "mobx-react-lite";
import { Dispatch, SetStateAction, useState } from "react";
import fileSystemStore from "../stores/FileSystemStore";
import { FileClass } from "../classes/File";

function EditDialog({
  setDialog,
}: {
  setDialog: Dispatch<SetStateAction<boolean>>;
}) {
  const [editContent, setEditContent] = useState("");

  const handleEditContent = () => {
    (fileSystemStore.selectedItem as FileClass).setContent(editContent);
    setDialog(false);
    setEditContent("");
  };
  return (
    <dialog className="dialog" open>
      <h2>Edit File</h2>
      <h4>This is the current content of the file:</h4>
      <p>{(fileSystemStore.selectedItem as FileClass).content}</p>
      <div className="inputDialogContainer">
        <input
          onChange={(e) => setEditContent(e.target.value)}
          placeholder="Enter here the new content"
          className="inputDialog"
        />
      </div>
      <div className="dialogButtons">
        <button onClick={handleEditContent} className="dialogButton">
          Edit
        </button>
        <button onClick={() => setDialog(false)} className="dialogButton">
          Close
        </button>
      </div>
    </dialog>
  );
}

export default observer(EditDialog);
