import { observer } from "mobx-react-lite";
import fileSystemStore from "../stores/FileSystemStore";
import { FileClass } from "../classes/File";
import { SystemItem } from "../classes/SystemItem";
import s from "./FileView.module.scss";

/// icons
import fileIcon from "../assets/file.png";
import whiteFileIcon from "../assets/fileWhite.png";

export const FileView = observer(
  ({
    file,
    handleSelectItem,
  }: {
    file: FileClass;
    handleSelectItem: (item: SystemItem) => void;
  }) => {
    if (!file.name.toLowerCase().includes(fileSystemStore.searchText)) {
      return null;
    }
    return (
      <div
        className={
          fileSystemStore.selectedId === file.id
            ? s["selected"]
            : "file-browser-item"
        }
        onClick={() => handleSelectItem(file)}
      >
        <img
          className="icon"
          src={
            fileSystemStore.selectedId === file.id ? whiteFileIcon : fileIcon
          }
          alt="file"
        />
        <span className="system-item-name">{file.name}</span>
      </div>
    );
  }
);
