import { action, makeObservable, observable } from "mobx";
import { Folder } from "./Folder";

function generateID(): number {
  return Math.floor(Math.random() * 100000);
}

export abstract class SystemItem {
  id: number;
  name: string;
  parent: Folder | null;

  constructor(name: string, parent: Folder | null) {
    this.name = name;
    this.id = generateID();
    this.parent = parent;

    makeObservable(this, {
      name: observable,
      setName: action,
    });
  }

  setName(name: string) {
    this.name = name;
  }
  
  abstract delete(): void;
}
