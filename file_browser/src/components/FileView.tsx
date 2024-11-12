import { observer } from "mobx-react-lite";
import fileSystemStore from "../stores/FileSystemStore";
import { FileClass } from "../classes/File";

/// icons
import fileIcon from "../assets/file.png";
import whiteFileIcon from "../assets/fileWhite.png";

export const FileView = observer(
  ({
    file,
  }: {
    file: FileClass;
  }) => {
    return (
      <div
        className={
          fileSystemStore.selectedId === file.id
            ? "selected-item-button selected-item-layout"
            : "file-browser-item-button file-browser-item-layout"
        }
        onClick={() => fileSystemStore.setSelected(file)}
      >
        <img
          className="icon-layout"
          src={
            fileSystemStore.selectedId === file.id ? whiteFileIcon : fileIcon
          }
          alt="file"
        />
        <span className="system-item-name-layout">{file.name}</span>
      </div>
    );
  }
);
