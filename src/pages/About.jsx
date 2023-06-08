import React from 'react';

import {dict, userLang} from "../config/config";

const About = () => {
  return (
    <div className='content about'>
      <h1>
        {dict.title.about[userLang]}
      </h1>
      <p>
        {dict.title.aboutApp1[userLang]}
        <a href='https://drive.google.com/drive/folders/1NCrcDjoPpgEUH09G-hz3cVeMb9vs1rhc?usp=drive_link'>
        {dict.title.link[userLang] + '.'}
        </a>
        {dict.title.aboutApp2[userLang]}
        <a href='https://github.com/fetisoff19/sports-app'>github.com/fetisoff19/sports-app</a>
      </p>
    </div>
  );
};

export default About;