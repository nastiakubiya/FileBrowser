import { SystemItem } from "../classes/SystemItem";
import { Folder } from "../classes/Folder";
import { observer } from "mobx-react-lite";
import { useMemo, useState } from "react";
import fileSystemStore from "../stores/FileSystemStore";
import { FileView } from "./FileView";
import { FileClass } from "../classes/File";

// icons
import openedIcon from "../assets/openedFolder.png";
import whiteOpenedIcon from "../assets/openedFolderWhite.png";
import closedIcon from "../assets/closedFolder.png";
import whiteClosedIcon from "../assets/closedFolderWhite.png";
import leftArrow from "../assets/chevron.png";
import whiteLeftArrow from "../assets/whiteLeftArrow.png";
import downArrow from "../assets/down-arrow.png";
import whiteDownArrow from "../assets/whiteDownArrow.png";

const FolderView = observer(({ folder }: { folder: Folder }) => {
  const [isFolderOpened, setIsFolderOpened] = useState(false);

  const folderIcon = useMemo(() => {
    if (isFolderOpened && folder.files.size !== 0) {
      if (fileSystemStore.selectedId === folder.id) {
        return whiteOpenedIcon;
      } else return openedIcon;
    } else {
      if (fileSystemStore.selectedId === folder.id) {
        return whiteClosedIcon;
      } else return closedIcon;
    }
  }, [
    isFolderOpened,
    folder.files.size,
    fileSystemStore.selectedId,
    folder.id,
  ]);

  const arrowIcon = useMemo(() => {
    if (isFolderOpened) {
      if (fileSystemStore.selectedId === folder.id) {
        return whiteDownArrow;
      } else return downArrow;
    } else {
      if (fileSystemStore.selectedId === folder.id) {
        return whiteLeftArrow;
      } else return leftArrow;
    }
  }, [isFolderOpened, fileSystemStore.selectedId, folder.id]);

  const handleSelectItem = (item: SystemItem) => {
    fileSystemStore.setSelected(item);
  };

  return (
    <div>
      {folder.name.toLowerCase().includes(fileSystemStore.searchText) ? (
        <div
          className="file-browser-item"
          onClick={() => handleSelectItem(folder)}
          style={{
            backgroundColor:
              fileSystemStore.selectedId === folder.id ? "#2f84ea" : "#e6e8eb",
            color: fileSystemStore.selectedId === folder.id ? "white" : "black",
          }}
        >
          <img className="icon" src={folderIcon} alt="closed" />
          {folder.files.size !== 0 && (
            <button
              className="icon-button"
              onClick={(e) => {
                e.stopPropagation();
                setIsFolderOpened((prev) => !prev);
              }}
            >
              <img className="icon" src={arrowIcon} alt="arrow" />
            </button>
          )}
          <span className="system-item-name">{folder.name}</span>
        </div>
      ) : (
        <></>
      )}
      {isFolderOpened && (
        <ul>
          {[...folder.files.keys()].map((id) => (
            <li key={id}>
              {folder.files.get(id) instanceof Folder ? (
                <FolderView folder={folder.files.get(id) as Folder} />
              ) : (
                <FileView
                  file={folder.files.get(id) as FileClass}
                  handleSelectItem={handleSelectItem}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default FolderView;