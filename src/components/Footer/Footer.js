import React, {useContext, useEffect, useState} from 'react';
import {db, setIndexedDbUsageInfo} from "../../API/db.js";
import AppContext from "../../context/AppContext.js";
import {dict, userLang} from "../../config/config";

const Footer = () => {
  const [state, setState] = useState([])
  const {loading, random} = useContext(AppContext)

  useEffect(() => {
      async function getData() {
        await setIndexedDbUsageInfo()
          .then(result => setState(result))
      }
      getData()
    }
  ,[random]);

  return (
    <footer>
      <div>
        {loading && state ?
          dict.title.loading[userLang]
          : (dict.title.footer1[userLang] + state[0]
          + dict.title.footer2[userLang] + (state[1] ? state[1]
            : (dict.title.footer3[userLang] + ' 1'))
            + dict.title.footer4[userLang])
        }
        </div>
    </footer>
  );
};

export default Footer;