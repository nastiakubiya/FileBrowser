import { observer } from "mobx-react-lite";
import { useState } from "react";
import fileSystemStore from "../stores/FileSystemStore";
import { FileClass } from "../classes/File";

const EditDialog = observer(({onClose}: {onClose: (state: boolean) => void}) => {
  const [editContentString, setEditContentString] = useState("");

  const editContent = () => {
    (fileSystemStore.selectedItem as FileClass).setContent(editContentString);
    onClose(false);
    setEditContentString("");
  };
  return (
    <dialog className="dialog" open>
      <h2>Edit File</h2>
      <h4>This is the current content of the file:</h4>
      <p>{(fileSystemStore.selectedItem as FileClass).content}</p>
      <div className="input-dialog-container">
        <input
          onChange={(e) => setEditContentString(e.target.value)}
          placeholder="Enter here the new content"
          className="input-dialog"
        />
      </div>
      <div className="dialog-buttons">
        <button onClick={editContent} className="dialog-button">
          Save
        </button>
        <button onClick={() => onClose(false)} className="dialog-button">
          Close
        </button>
      </div>
    </dialog>
  );
})

export default EditDialog
