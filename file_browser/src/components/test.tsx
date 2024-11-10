import { observer } from 'mobx-react-lite';
import React from 'react'
import { Folder } from '../classes/Folder';
import fileSystemStore from '../stores/FileSystemStore';
import { SystemItem } from '../classes/SystemItem';

const test = observer(({folder} : {folder: Folder}) => {

    const handleSelectItem = (item: SystemItem) => {
        fileSystemStore.setSelected(item);
      };
      
  return (
    <>
            {/* //    <ul>
            //    {[...folder.filteredChildren.keys()].map((id) => (
            //      <li key={id}>
            //        {folder.files.get(id) instanceof Folder ? (
            //          <>
            //            {(folder.files.get(id) as Folder).setIsOpened(true)}
            //            <FolderView folder={folder.files.get(id) as Folder} />
            //          </>
            //        ) : (
            //          <FileView
            //            file={folder.files.get(id) as FileClass}
            //            handleSelectItem={handleSelectItem}
            //          />
            //        )}
            //      </li>
            //    ))}
            //  </ul> */}
  </>
  )
});
