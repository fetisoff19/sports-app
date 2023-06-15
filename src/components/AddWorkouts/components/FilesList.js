import React from 'react';
import VerifiedFile from "./VerifiedFile.js";
import NonValidateFile from "./NonValidateFile";
import DuplicateFile from "./DuplicateFile";
import {useSelector} from "react-redux";

const FilesList = ({files, setFiles, styles}) => {
  const uploadedFiles = useSelector(state => state.workouts.uploadedFiles)

  return (
    <>
      {files ?
        <div className={styles.files}>
          {files?.map((item, index) => {
            if (uploadedFiles[index]) {
              if (uploadedFiles[index].name) {
                return (
                  <VerifiedFile
                    ok={true}
                    files={files} setFiles={setFiles}
                    key={index} index={index} name={item.name}
                    className={styles?.validateFiles + ' ' + styles?.file}
                  />)
              } else if(Array.isArray(uploadedFiles[index])){
               return (
                 <DuplicateFile
                  data={uploadedFiles[index]}
                  className={styles?.duplicateFiles + ' ' + styles?.file}
                  key={index}
                 />)
              } else if (uploadedFiles[index] === 'error') {
                return (
                  <NonValidateFile
                    text={'ошибка на сервере'}
                    key={index} name={item.name}
                    className={styles?.nonValidateFiles + ' ' + styles?.file}/>
                )
              } else if (uploadedFiles[index] === 'unknown error') {
                return (
                  <NonValidateFile
                    text={'что-то пошло не так'}
                    key={index} name={item.name}
                    className={styles?.nonValidateFiles + ' ' + styles?.file}/>
                )
              }
            } else return (
              <VerifiedFile
                ok={false}
                files={files} setFiles={setFiles}
                key={index} index={index} name={item.name}
                className={styles?.validateFiles + ' ' + styles?.file}
              />
            )
          })}
        </div>
      : null}
    </>
  );
};

export default FilesList;