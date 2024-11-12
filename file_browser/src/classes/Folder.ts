import {
  observable,
  action,
  ObservableMap,
  makeObservable,
  computed,
} from "mobx";
import { SystemItem } from "./SystemItem";
import fileSystemStore from "../stores/FileSystemStore";

export interface IFolder {
  id: number;
  name: string;
  files: ObservableMap<number, SystemItem>;
  parent: Folder | null;
  isOpened: boolean;
}

export class Folder extends SystemItem implements IFolder {
  files = observable.map<number, SystemItem>();
  isOpened: boolean = false;

  constructor(name: string, parent: Folder | null, isOpened?: boolean) {
    super(name, parent);
    if (isOpened) {
      this.isOpened = isOpened;
    } else {
      this.isOpened = false;
    }
    makeObservable(this, {
      files: observable,
      isOpened: observable,
      add: action,
      delete: action,
      setIsOpened: action,
      filteredChildren: computed,
    });
  }

  setIsOpened(state: boolean) {
    this.isOpened = state;
  }

  add(item: SystemItem) {
    this.files.set(item.id, item);
  }

  delete() {
    this.files.clear();
    this.parent?.files.delete(this.id);
  }

  get filteredChildren(): Map<number, SystemItem> {
    let filteredMap = new Map<number, SystemItem>();
    if (fileSystemStore.searchText === "") {
      return this.files;
    } else {
      this.setIsOpened(true);
      for (const [id, item] of this.files) {
        if (item.name.includes(fileSystemStore.searchText)) {
          filteredMap.set(id, item);
        }
        if (item instanceof Folder) {
          const filteredNestedMap = item.filteredChildren;
          if (filteredNestedMap.size > 0) {
            filteredMap.set(id, item);
          }
        }
      }
      return filteredMap;
    }
  }
}
