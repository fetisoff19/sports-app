import React from 'react';
import {dict, userLang} from "../../../config/config";
import styles from "../styles.modules.scss";
import Body from "../../UI/svgComponents/Body";

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <Body height={'150px'} width={'150px'} fill={'lightgray'}/>
      <h3>
        {dict.title.notFound[userLang]}
      </h3>
    </div>
  );
};

export default NotFound;