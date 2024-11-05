import { Dispatch, SetStateAction, useState } from "react";
import { SystemItem } from "../classes/SystemItem";
import { FileClass } from "../classes/File";
import { Folder } from "../classes/Folder";
import { observer } from "mobx-react-lite";
import fileSystemStore from "../stores/FileSystemStore";

const options = ["File", "Folder"];

function AddDialog({
  setDialog,
}: {
  setDialog: Dispatch<SetStateAction<boolean>>;
}) {
  const [selected, setSelected] = useState<any>(0);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleAdd = (item: SystemItem) => {
    (fileSystemStore.selectedItem as Folder).add(item);
  };

  function onChange(i: any) {
    setSelected((prev: any) => (i === prev ? null : i));
    setError("")
  }

  function createNewItem() {
    let item;
    /// folder
    if (selected === 1) {
      if (name !== "") {
        item = new Folder(name, fileSystemStore.selectedItem as Folder);
        handleAdd(item);
        setDialog(false);
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
        setDialog(false);
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
        <div className="inputDialogContainer">
          <input
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter the name of the folder"
            className="inputDialog"
          />
        </div>
      )}
      {selected === 0 && (
        <>
          <div className="inputDialogContainer">
            <input
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter the name of the file"
              className="inputDialog"
            />
          </div>
          <div className="inputDialogContainer">
            <textarea
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter the content of the file"
              className="inputDialog"
            />
          </div>
        </>
      )}
      {error}
      <div className="dialogButtons">
        <button onClick={createNewItem} className="dialogButton">
          Add
        </button>
        <button onClick={() => setDialog(false)} className="dialogButton">
          Cancel
        </button>
      </div>
    </dialog>
  );
}

export default observer(AddDialog);
