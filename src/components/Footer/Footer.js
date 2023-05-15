import React, {useContext, useEffect, useState} from 'react';
import {db, setIndexedDbUsageInfo} from "../../API/db.js";
import AppContext from "../../context/AppContext.js";
import FooterLoader from "../Loaders/FooterLoader.jsx";

const Footer = () => {
  const [state, setState] = useState(null)
  const {loading, random} = useContext(AppContext)
    // console.log('Footer')

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
        { loading && state ? <FooterLoader/> : 'Размер базы: ' + state + 'Mb'}
        </div>
    </footer>
  );
};

export default Footer;