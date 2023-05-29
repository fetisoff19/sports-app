import React from 'react';
import ValidateFile from "./ValidateFile";
import NonValidateFile from "./NonValidateFile";
import DuplicateFile from "./DuplicateFile";

const FilesList = ({validatedFiles, setValidatedFiles, styles}) => {
  return (
    <>
      {validatedFiles ?
        <div className={styles.files}>
          {validatedFiles?.validate.map((item, index) => <ValidateFile key={index} className={styles?.validateFiles + ' ' + styles?.file} validatedFiles={validatedFiles} setState={setValidatedFiles} index={index} name={item.name}/>)}
          {validatedFiles?.duplicate.map((item, index) => <DuplicateFile data={item} key={index} className={styles?.duplicateFiles + ' ' + styles?.file}/>)}
          {validatedFiles?.nonValidate.map((item, index) => <NonValidateFile key={index} name={item} className={styles?.nonValidateFiles + ' ' + styles?.file}/>)}
        </div>
        : null}
    </>
  );
};

export default FilesList;