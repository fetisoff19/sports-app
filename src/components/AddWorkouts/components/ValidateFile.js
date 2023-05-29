import React from 'react';
import Delete from "../../UI/svgComponents/Delete";

const ValidateFile = ({name, className, index, setState, validatedFiles}) => {
  return (
    <div className={className}>
      <div>{name}</div>
      <div onClick={() => setState(prev =>
        ({...prev, validate: [...validatedFiles.validate.slice(0, index),
            ...validatedFiles.validate.slice(index + 1)]}))}>
        <Delete fill={'gray'} height={'24px'} width={'24px'}/>
      </div>
    </div>
  );
};

export default ValidateFile;