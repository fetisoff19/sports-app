import React from 'react';
import Delete from "../../UI/svgComponents/Delete";
import Ok from "../../UI/svgComponents/Ok";
import Close from "../../UI/svgComponents/Close";

const ValidateFile = ({name, className, index, setState, validatedFiles, upLoadedFiles}) => {
  function deleteFile(){
    setState( [...validatedFiles?.slice(0, index),
      ...validatedFiles?.slice(index + 1)])
  }

  return (
    <div className={className}>
      <div>{name}</div>
      <div>
        {upLoadedFiles[index] === true ?
          <Ok fill={'green'}/>
          : upLoadedFiles[index] === false ?
            <Close fill={'red'}/>
            : <div onClick={deleteFile}>
            <Delete/>
          </div>}
      </div>
    </div>
  );
};

export default ValidateFile;

// : <div onClick={() => setState(prev =>
//   ({...prev, validate: [...validatedFiles.validate.slice(0, index),
//       ...validatedFiles.validate.slice(index + 1)]}))}>