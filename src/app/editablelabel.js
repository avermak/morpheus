import { useCallback, useRef } from "react";

export default ({defaultValue, onChange}) => {

  const divRef = useRef();

  const onKeyDown = useCallback(e => {
    if (e.key === 'Escape') {
      e.preventDefault();
      divRef.current.innerText = defaultValue;
      e.target.blur();
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      e.target.blur();
      onChange && onChange(e, divRef.current.innerText);
    }
  }, [defaultValue, onChange, divRef]);

  return (
    // <input type="text" defaultValue={defaultValue} className="editableLabel" />
    <div className="editableLabel" contentEditable={true} suppressContentEditableWarning={true} onKeyDown={onKeyDown} ref={divRef}>{defaultValue}</div>
  );
}