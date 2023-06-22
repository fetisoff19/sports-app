import React, {useEffect, useRef, useState} from 'react';
import {dict, userLang} from "../../config/config";
import Ok from "./svgComponents/Ok";
import Close from "./svgComponents/Close";
import {editWorkout} from "../../redux/actions/workouts";
import {useDispatch, useSelector} from "react-redux";
import AppLoader from "../Loaders/AppLoader";

const TextArea = ({text, _id, styles, setState}) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(text || dict.title.placeholderNote[userLang]);
  const [showButtons, setShowButtons] = useState(false);
  const ref = useRef(null);
  const smallLoader = useSelector(state => state.app.smallLoader);
  const smallLoaderId = useSelector(state => state.app.smallLoaderId);

  useEffect(() => autoGrow(ref.current), [value])

  const handleChange = e => {
    setValue(e.target.value);
  }

    function saveNote() {
    if(value && value !== text && value !== dict.title.placeholderNote[userLang])
      dispatch(editWorkout(_id, 'note', value))
      setShowButtons(false)
  }

  function autoGrow(element) {
    element.style.height = "15px";
    element.style.height = (element.scrollHeight) + "px";
  }
  return (
    <div className={styles?.note}>
      <textarea
        ref={ref} id={'about' + _id}
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
            <Ok fill={'grey'}/>
          </div>
          <div className={styles?.close} onClick={() => {
            setShowButtons(false)
            setValue(text || dict.title.placeholderNote[userLang]);
            ref.current.value = text || dict.title.placeholderNote[userLang]}}
          >
            <Close fill={'grey'}/>
          </div>
        </div>}
      {smallLoader && smallLoaderId === _id
        && <AppLoader height={'20'} width={'20'}/>}
    </div>
  );
};

export default React.memo(TextArea);