import s from "./SearchBar.module.scss"
import fileSystemStore from "../stores/FileSystemStore";
import { ChangeEvent } from "react";

export default function SearchBar() {

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    fileSystemStore.setSearchText(text.toLowerCase())
    fileSystemStore.root.setIsOpened(true)
  }
  return (
    <div className={s["search-input"]}>
      <input type="text" placeholder="Search items here..." onChange={(e) => handleChangeText(e)} className="input-dialog" />
    </div>
  );
}
