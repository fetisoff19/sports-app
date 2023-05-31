import React, {useContext, useEffect, useRef, useState} from 'react';
import {dict, userLang} from "../../config/config";
import Ok from "./svgComponents/Ok";
import Close from "./svgComponents/Close";
import {db} from "../../API/db";
import AppContext from "../../context/AppContext";

const TextArea = ({text, id, styles, setState}) => {
  const {setRandom} = useContext(AppContext)
  const [value, setValue] = useState(text || dict.title.placeholderNote[userLang]);
  const ref = useRef(null)

  useEffect(() => autoGrow(ref.current), [value])

  const handleChange = e => setValue(e.target.value)

  async function saveNote() {
    if(value && value !== text && value !== dict.title.placeholderNote[userLang])
      await db.get('workouts', id).then(r => {
        r.dateEdit = new Date;
        r.note = value;
        db.put('workouts', r)
          .then(() => setValue(text))
          .then(() => setRandom(Math.random()))
      })
  }

  function autoGrow(element) {
    element.style.height = "15px";
    element.style.height = (element.scrollHeight)+"px";
  }

  return (
    <div className={styles?.note}>
      <textarea
        ref={ref} id={'about' + id}
        minLength="10" maxLength="300"
        value={value}
        onChange={handleChange}
        onFocus={() => {
          setState && setState(true);
        value === dict.title.placeholderNote[userLang] ? setValue('') : null;
        }}
        onBlur={() => {
          setState && setState(false);
          !value ? setValue(text || dict.title.placeholderNote[userLang]) : null;
        }}
      />
      {value === text || value === dict.title.placeholderNote[userLang]
      ? null
        : <div className={styles?.buttons}>
            <div className={styles?.ok} onClick={saveNote}>
              <Ok fill={'grey'} height={'20px'} width={'20px'}/>
            </div>
            <div className={styles?.close} onClick={() => {
              setValue(text || dict.title.placeholderNote[userLang]);
              ref.current.value = text || dict.title.placeholderNote[userLang];
            }}>
              <Close fill={'grey'} height={'20px'} width={'20px'}/>
            </div>
        </div>}
    </div>
  );
};

export default React.memo(TextArea);