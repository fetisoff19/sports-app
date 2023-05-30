import React from 'react';
import Delete from "../../UI/svgComponents/Delete";
import Ok from "../../UI/svgComponents/Ok";
import Close from "../../UI/svgComponents/Close";

const ValidateFile = ({name, className, index, setState, validatedFiles, upLoadedFiles}) => {
  return (
    <div className={className}>
      <div>{name}</div>
      <div>
        {upLoadedFiles[index] === true ?
          <Ok fill={'green'}/>
          : upLoadedFiles[index] === false ?
            <Close fill={'red'}/>
          : <div onClick={() => setState(prev =>
            ({...prev, validate: [...validatedFiles.validate.slice(0, index),
                ...validatedFiles.validate.slice(index + 1)]}))}>
            <Delete/>
          </div>}
      </div>
    </div>
  );
};

export default ValidateFile;