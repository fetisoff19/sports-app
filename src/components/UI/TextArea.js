import React, {useEffect, useRef, useState} from 'react';
import {dict, userLang} from "../../config/config";
import Ok from "./svgComponents/Ok";
import Close from "./svgComponents/Close";
import {changeWorkout} from "../../actions/workouts";
import {useDispatch} from "react-redux";

const TextArea = ({text, id, styles, setState}) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(text || dict.title.placeholderNote[userLang]);
  const [showButtons, setShowButtons] = useState(false);
  const ref = useRef(null);

  useEffect(() => autoGrow(ref.current), [value])

  const handleChange = e => {
    setValue(e.target.value);
  }

    function saveNote() {
    if(value && value !== text && value !== dict.title.placeholderNote[userLang])
      dispatch(changeWorkout(id, 'note', value))
      setShowButtons(false)
  }

  function autoGrow(element) {
    element.style.height = "15px";
    element.style.height = (element.scrollHeight) + "px";
  }
  return (
    <div className={styles?.note}>
      <textarea
        ref={ref} id={'about' + id}
        minLength="10" maxLength="300"
        // placeholder={value}
        value={value}
        onChange={handleChange}
        onFocus={() => {
          setState && setState(true);
          setShowButtons(true);
        value === dict.title.placeholderNote[userLang] ? setValue('') : null;
        }}
        onBlur={() => {
          setState && setState(false);
          // setShowButtons(false);
          !value ? setValue(text || dict.title.placeholderNote[userLang]) : null;
        }}
      />
      {showButtons &&
        <div className={styles?.buttons}>
          <div className={styles?.ok} onClick={saveNote}>
            <Ok fill={'grey'} height={'20px'} width={'20px'}/>
          </div>
          <div className={styles?.close} onClick={() => {
            setShowButtons(false)
            setValue(text || dict.title.placeholderNote[userLang]);
            ref.current.value = text || dict.title.placeholderNote[userLang]}}
          >
            <Close fill={'grey'} height={'20px'} width={'20px'}/>
          </div>
        </div>}
    </div>
  );
};

export default React.memo(TextArea);