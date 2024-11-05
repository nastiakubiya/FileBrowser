import { Folder } from "../classes/Folder";
import { FileClass } from "../classes/File";
import { FileSystem } from "../classes/FileSystem";

function createInitialFileSystem() {
  const rootFolder = new Folder("Root", null); 
  const file1 = new FileClass("abc", rootFolder, "texty text"); 
  const file2 = new FileClass("edf", rootFolder, "texty text"); 
  const file3 = new FileClass("aaaa", rootFolder, "texty text"); 
  const file4 = new FileClass("kkk", rootFolder, "texty text"); 
  const file5 = new FileClass("mno", rootFolder, "texty text"); 
  const folder2 = new Folder("folder2", rootFolder); 
  const folder3 = new Folder("folder3", rootFolder); 
  const file7 = new FileClass("file7", folder3, "texty text"); 
  const file6 = new FileClass("file6", folder3, "texty text"); 
  
  rootFolder.add(file1); 
  rootFolder.add(file2); 
  rootFolder.add(file3); 
  rootFolder.add(file4); 
  rootFolder.add(file5)
  rootFolder.add(folder2); 
  rootFolder.add(folder3); 
  folder3.add(file7)
  folder3.add(file6)

  return new FileSystem(rootFolder, rootFolder);
}

const fileSystemStore = createInitialFileSystem();

export default fileSystemStore;
