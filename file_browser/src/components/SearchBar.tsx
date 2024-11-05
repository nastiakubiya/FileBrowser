import s from "./SearchBar.module.scss"
import fileSystemStore from "../stores/FileSystemStore";

export default function SearchBar() {

  const handleChangeText = (e: any) => {
    const text = e.target.value;
    fileSystemStore.setSearchText(text.toLowerCase())
  }
  return (
    <div className={s["searchInput"]}>
      <input type="text" placeholder="Search items here..." onChange={handleChangeText} className="inputDialog" />
    </div>
  );
}
