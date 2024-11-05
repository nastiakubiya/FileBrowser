import {
  observable,
  action,
  ObservableMap,
  makeObservable,
} from "mobx";
import { SystemItem } from "./SystemItem";

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
    });
  }

  add(item: SystemItem) {
    this.files.set(item.id, item);
  }

  delete() {
    this.files.clear();
    this.parent?.files.delete(this.id);
  }
}
