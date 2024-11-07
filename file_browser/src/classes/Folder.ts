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
}

export class Folder extends SystemItem implements IFolder {
  files = observable.map<number, SystemItem>();

  constructor(name: string, parent: Folder | null) {
    super(name, parent);
    makeObservable(this, {
      files: observable,
      add: action,
      delete: action,
      getFilteredMap: computed,
    });
  }

  add(item: SystemItem) {
    this.files.set(item.id, item);
  }

  delete() {
    this.files.clear();
    this.parent?.files.delete(this.id);
  }

  get getFilteredMap(): ObservableMap<number, SystemItem> {
    if (fileSystemStore.searchText !== "") {
      return this.getFilteredMapAssist();
    }
    return this.files;
  }

  private getFilteredMapAssist(): ObservableMap<number, SystemItem> {
    let filteredMap = new ObservableMap<number, SystemItem>();
    if (this.name.includes(fileSystemStore.searchText)) {
      filteredMap.set(this.id, this);
    }
    for (const [id, item] of this.files) {
      if (item.name.includes(fileSystemStore.searchText)) {
        filteredMap.set(id, item);
      }
      if (item instanceof Folder) {
        const filteredNestedMap = item.getFilteredMap;
        if (filteredNestedMap.size > 0) {
          const folderCopy = { ...item, files: filteredNestedMap } as Folder;
          filteredMap.set(id, folderCopy);
        }
      }
    }
    return filteredMap;
  }
}
