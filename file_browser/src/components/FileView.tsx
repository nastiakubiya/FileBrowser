import { observer } from "mobx-react-lite";
import fileSystemStore from "../stores/FileSystemStore";
import { FileClass } from "../classes/File";
import { SystemItem } from "../classes/SystemItem";

/// icons
import fileIcon from "../assets/file.png";
import whiteFileIcon from "../assets/fileWhite.png";

export const FileView = observer(({ file, handleSelectItem }: { file: FileClass, handleSelectItem: (item: SystemItem) => void }) => {
  return (
    file.name.toLowerCase().includes(fileSystemStore.searchText) ? (
    <div
      className="fileBrowserItem"
      onClick={() =>
        handleSelectItem(file)
      }
      style={{
        backgroundColor:
          fileSystemStore.selectedId === file.id ? "#2f84ea" : "#e6e8eb",
        color: fileSystemStore.selectedId === file.id ? "white" : "black",
      }}
    >
      <img
        className="icon"
        src={fileSystemStore.selectedId === file.id ? whiteFileIcon : fileIcon}
        alt="file"
      />
      <span className="systemItemName">
        {file.name}
      </span>
    </div>
    ) : (
        <></>
    )
  );
});
