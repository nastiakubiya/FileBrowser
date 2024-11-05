import { action, makeObservable, observable } from "mobx";
import { SystemItem } from "./SystemItem";
import { Folder } from "./Folder";

interface IFile {
  id: number;
  name: string;
  content: string;
  parent: Folder | null;
}

export class FileClass extends SystemItem implements IFile {
  content: string;

  constructor(name: string, parent: Folder, content: string) {
    super(name, parent);
    this.content = content;
    makeObservable(this, {
      content: observable,
      setContent: action,
      delete: action,
    });
  }

  setContent(content: string) {
    this.content = content;
  }

  delete() {
    this.parent?.files.delete(this.id);
  }
}
