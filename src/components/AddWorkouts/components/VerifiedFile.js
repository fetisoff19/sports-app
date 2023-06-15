import React from 'react';
import Delete from "../../UI/svgComponents/Delete";
import Ok from "../../UI/svgComponents/Ok";

const VerifiedFile = ({files, setFiles, name, className, index, ok}) => {

  function deleteFile(){
    setFiles( [...files?.slice(0, index),
      ...files?.slice(index + 1)])
  }

  return (
    <div className={className}>
      <div>{name}</div>
      <div>
        {ok
          ? <Ok fill={'green'}/>
          : <div onClick={deleteFile}>
              <Delete/>
            </div>}
      </div>
    </div>
  );
};

export default VerifiedFile;

// : <div onClick={() => setState(prev =>
//   ({...prev, validate: [...validatedFiles.validate.slice(0, index),
//       ...validatedFiles.validate.slice(index + 1)]}))}>