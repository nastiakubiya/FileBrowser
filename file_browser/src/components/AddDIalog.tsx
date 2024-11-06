import { useState } from "react";
import { SystemItem } from "../classes/SystemItem";
import { FileClass } from "../classes/File";
import { Folder } from "../classes/Folder";
import { observer } from "mobx-react-lite";
import fileSystemStore from "../stores/FileSystemStore";

const options = ["File", "Folder"];

const AddDialog = observer(({
  onClose
}: {
  onClose: (state: boolean) => void;
}) => {
  const [selected, setSelected] = useState<number>(0);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleAdd = (item: SystemItem) => {
    (fileSystemStore.selectedItem as Folder).add(item);
  };

  const onChange = (i: any) => {
    setSelected((prev: any) => (i === prev ? null : i));
    setError("")
  }

  const createNewItem = () => {
    let item: SystemItem;
    /// folder
    if (selected === 1) {
      if (name !== "") {
        item = new Folder(name, fileSystemStore.selectedItem as Folder);
        handleAdd(item);
        onClose(false);
      } else setError("You must choose a name for the folder");
    }
    //// file
    else {
      if (name !== "") {
        item = new FileClass(
          name,
          fileSystemStore.selectedItem as Folder,
          content
        );
        handleAdd(item);
        onClose(false);
      } else setError("You must choose name for the file");
    }
  }

  return (
    <dialog className="dialog" open>
      {options.map((option, index) => (
        <label key={index}>
          {option}
          <input
            type="checkbox"
            checked={index === selected}
            onChange={() => onChange(index)}
          />
        </label>
      ))}
      <br />
      {selected === 1 && (
        <div className="input-dialog-container">
          <input
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter the name of the folder"
            className="input-dialog"
          />
        </div>
      )}
      {selected === 0 && (
        <>
          <div className="input-dialog-container">
            <input
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter the name of the file"
              className="input-dialog"
            />
          </div>
          <div className="input-dialog-container">
            <textarea
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter the content of the file"
              className="input-dialog"
            />
          </div>
        </>
      )}
      {error}
      <div className="dialog-buttons">
        <button onClick={createNewItem} className="dialog-button">
          Add
        </button>
        <button onClick={() => onClose(false)} className="dialog-button">
          Cancel
        </button>
      </div>
    </dialog>
  );
})

export default AddDialog;
