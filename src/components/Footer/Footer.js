import React, {useContext, useEffect, useState} from 'react';

import AppContext from "../../context/AppContext.js";
import {dict, userLang} from "../../config/config";
import {useSelector} from "react-redux";

const Footer = () => {
  const [state, setState] = useState([])
  // const loader = useSelector(state => state.app.appLoader)
  const workouts = useSelector(state => state.workouts.workouts)

  // useEffect(() => {
  //     async function getData() {
  //       await setIndexedDbUsageInfo()
  //         .then(result => setState(result))
  //     }
  //     getData()
  //   }
  // ,[workouts]);

  return (
    <footer>
      <div>
        {!(workouts || state) ?
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