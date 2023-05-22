import React, {useContext, useEffect, useState} from 'react';
import {db, setIndexedDbUsageInfo} from "../../API/db.js";
import AppContext from "../../context/AppContext.js";
import FooterLoader from "../Loaders/FooterLoader.jsx";

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
        { loading && state ? <FooterLoader/> : 'Размер базы: ' + state[0] + ' Мб. Занимает ' + (state[1] ? state[1] : 'менее 1' ) + ' % от выделенной браузером памяти.'}
        </div>
    </footer>
  );
};

export default Footer;