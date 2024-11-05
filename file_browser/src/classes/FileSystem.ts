import { makeAutoObservable } from "mobx";
import { Folder } from "./Folder";
import { SystemItem } from "./SystemItem";

export class FileSystem {
  selectedItem: SystemItem;
  root: Folder;
  searchText: string;

  constructor(selectedItem: SystemItem, root: Folder) {
    this.selectedItem = selectedItem;
    this.root = root;
    this.searchText = "";
    makeAutoObservable(this);
  }

  setSelected(selected: SystemItem) {
    this.selectedItem = selected;
  }

  setSearchText(text: string) {
    this.searchText = text
  }

  get selectedId() {
    return this.selectedItem.id;
  }
}
