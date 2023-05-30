import React from 'react';
import {dict, userLang} from "../../../config/config";

const StartStats = () => {
  return (
      <div style={{fontWeight: 100, fontStyle: 'italic', whiteSpace: "pre-wrap"}}>
        {dict.title.inDeveloping[userLang]}
      </div>

  );
};

export default StartStats;