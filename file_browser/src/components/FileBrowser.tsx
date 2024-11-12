import { observer } from "mobx-react-lite";
import ActionBar from "./ActionBar";
import FolderView from "./FolderView";
import fileSystemStore from "../stores/FileSystemStore";

function FileBrowser() {
  return (
    <div className="file-browser-layout">
      <ActionBar />
      <FolderView folder={fileSystemStore.root} />
    </div>
  );
}

export default observer(FileBrowser);
