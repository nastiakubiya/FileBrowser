import { observer } from "mobx-react-lite";
import ActionBar from "./ActionBar";
import FolderView from "./FolderView";
import fileSystemStore from "../stores/FileSystemStore";
import s from "./FileBrowser.module.scss";

function FileBrowser() {
  return (
    <div className={s["file-browser"]}>
      <ActionBar />
      <FolderView folder={fileSystemStore.root} />
    </div>
  );
}

export default observer(FileBrowser);
