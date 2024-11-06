import { observer } from "mobx-react-lite";
import { useState } from "react";
import fileSystemStore from "../stores/FileSystemStore";
import { FileClass } from "../classes/File";

const EditDialog = observer(({onClose}: {onClose: (state: boolean) => void}) => {
  const [editContent, setEditContent] = useState("");

  const handleEditContent = () => {
    (fileSystemStore.selectedItem as FileClass).setContent(editContent);
    onClose(false);
    setEditContent("");
  };
  return (
    <dialog className="dialog" open>
      <h2>Edit File</h2>
      <h4>This is the current content of the file:</h4>
      <p>{(fileSystemStore.selectedItem as FileClass).content}</p>
      <div className="input-dialog-container">
        <input
          onChange={(e) => setEditContent(e.target.value)}
          placeholder="Enter here the new content"
          className="input-dialog"
        />
      </div>
      <div className="dialog-buttons">
        <button onClick={handleEditContent} className="dialog-button">
          Edit
        </button>
        <button onClick={() => onClose(false)} className="dialog-button">
          Close
        </button>
      </div>
    </dialog>
  );
})

export default EditDialog
