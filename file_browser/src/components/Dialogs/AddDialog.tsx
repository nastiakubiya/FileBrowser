import { ChangeEvent, useState } from "react";
import { SystemItem } from "../../classes/SystemItem";
import { FileClass } from "../../classes/File";
import { Folder } from "../../classes/Folder";
import { observer } from "mobx-react-lite";
import fileSystemStore from "../../stores/FileSystemStore";

const AddDialog = observer(
  ({ onClose }: { onClose: () => void }) => {
    enum Options {
      Folder,
      File,
    }

    const [selected, setSelected] = useState("Folder");
    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");

    const addToFolder = (item: SystemItem) => {
      (fileSystemStore.selectedItem as Folder).add(item);
    };

    const handleChangeOption = (e: ChangeEvent<HTMLInputElement>) => {
      setSelected(e.target.value);
      setError("");
    };

    const createNewItem = () => {
      let item: SystemItem;
      /// folder
      if (selected === Options[0]) {
        if (name !== "") {
          item = new Folder(name, fileSystemStore.selectedItem as Folder);
          addToFolder(item);
          onClose();
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
          addToFolder(item);
          onClose();
        } else setError("You must choose name for the file");
      }
    };

    return (
      <dialog className="dialog dialog-layout" open>
        {Object.values(Options)
          .filter((value) => typeof value === "string")
          .map((opt) => (
            <label key={opt}>
              {opt}
              <input
                value={opt}
                type="radio"
                name="option"
                onChange={(e) => handleChangeOption(e)}
                checked={selected === opt}
              />
            </label>
          ))}
        <br />
        {selected === Options[0] && (
          <div className="input-dialog-layout">
            <input
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter the name of the folder"
              className="input-dialog"
            />
          </div>
        )}
        {selected === Options[1] && (
          <>
            <div className="input-dialog-layout">
              <input
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter the name of the file"
                className="input-dialog"
              />
            </div>
            <div className="input-dialog-layout">
              <textarea
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter the content of the file"
                className="input-dialog"
              />
            </div>
          </>
        )}
        {error}
        <div className="dialog-btns-layout">
          <button onClick={createNewItem} className="dialog-button dialog-btn-layout">
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

export default AddDialog;
