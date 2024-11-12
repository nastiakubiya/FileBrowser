import { Folder } from "../classes/Folder";
import { observer } from "mobx-react-lite";
import { useMemo } from "react";
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
  const folderIcon = useMemo(() => {
    if (folder.isOpened && folder.files.size !== 0) {
      if (fileSystemStore.selectedId === folder.id) {
        return whiteOpenedIcon;
      } else return openedIcon;
    } else {
      if (fileSystemStore.selectedId === folder.id) {
        return whiteClosedIcon;
      } else return closedIcon;
    }
  }, [
    folder.isOpened,
    folder.files.size,
    fileSystemStore.selectedId,
    folder.id,
  ]);

  const arrowIcon = useMemo(() => {
    if (folder.isOpened) {
      if (fileSystemStore.selectedId === folder.id) {
        return whiteDownArrow;
      } else return downArrow;
    } else {
      if (fileSystemStore.selectedId === folder.id) {
        return whiteLeftArrow;
      } else return leftArrow;
    }
  }, [folder.isOpened, fileSystemStore.selectedId, folder.id]);

  return (
    <>
      <div
        className={
          fileSystemStore.selectedId === folder.id
            ? "selected-item-button selected-item-layout"
            : "file-browser-item-button file-browser-item-layout"
        }
        onClick={() => fileSystemStore.setSelected(folder)}
      >
        <img className="icon-layout" src={folderIcon} alt="closed" />
        {folder.files.size !== 0 && (
          <button
            className="icon-button"
            onClick={(e) => {
              e.stopPropagation();
              folder.setIsOpened(!folder.isOpened);
            }}
          >
            <img className="icon-layout" src={arrowIcon} alt="arrow" />
          </button>
        )}
        <span className="system-item-name-layout">{folder.name}</span>
      </div>
      {folder.isOpened && (
        <ul className="list-view">
          {[...folder.filteredChildren.keys()].map((id) => {
            const item = folder.files.get(id);
            if (item instanceof Folder) {

              return (
                <li key={id}>
                  <FolderView folder={item as Folder} />
                </li>
              );
            } else {
              return (
                <li key={id}>
                  <FileView
                    file={item as FileClass}
                  />
                </li>
              );
            }
          })}
        </ul>
      )}
    </>
  );
});

export default FolderView;
