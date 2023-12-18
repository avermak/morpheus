import Modal from "react-modal";
import React, {useCallback, useRef, useState} from "react";

import './appselectormodal.css';

import apps from './appdata';


const search = (searchText, list) => {
  return list.filter(p => (p.name.toLowerCase().indexOf(searchText) > -1 || p.keywords.filter(k => k.toLowerCase().indexOf(searchText) > -1).length > 0));
}
export default ({open, onOK, onCancel}) => {

  const [results, setResults] = useState({platforms:[], applications:[], journeys:[]});
  const cbFilterApplications = useRef();
  const cbFilterPlatforms = useRef();
  const cbFilterJourneys = useRef();
  const tfSearchText = useRef();
  const selResults = useRef();

  const onSearchChange = useCallback(e => {
    const searchText = tfSearchText.current.value;
    if (searchText.trim().length < 2) {
      setResults({platforms: [], applications: [], journeys: []});
      return;
    }
    const res = {};
    res.platforms = cbFilterPlatforms.current.checked ? search(searchText, apps.platforms) : [];
    res.applications = cbFilterApplications.current.checked ? search(searchText, apps.applications) : [];
    res.journeys = cbFilterJourneys.current.checked ? search(searchText, apps.journeys) : [];
    setResults(res);
  }, []);

  const onAfterOpen = useCallback(e => {
    tfSearchText.current.focus();
  }, []);

  return (
      <Modal onAfterOpen={onAfterOpen} isOpen={open} className={"appSelectorModalWrapper"} overlayClassName={"appSelectorModalWrapperOverlay"} closeTimeoutMS={200} >
        <div className={"modalWrapper"}>
          Select an application, platform or journey.
          <div className={"tabs"}>
            <div><input type={"checkbox"} id={"cbFilterPlatforms"} ref={cbFilterPlatforms} defaultChecked={true} onChange={onSearchChange} /><label htmlFor={"cbFilterPlatforms"}>📦 Platforms</label></div>
            <div><input type={"checkbox"} id={"cbFilterApplications"} ref={cbFilterApplications} defaultChecked={true} onChange={onSearchChange} /><label htmlFor={"cbFilterApplications"}>⚙️ Applications</label></div>
            <div><input type={"checkbox"} id={"cbFilterJourneys"} ref={cbFilterJourneys} defaultChecked={true} onChange={onSearchChange} /><label htmlFor={"cbFilterJourneys"}>✈️ Journeys</label></div>
          </div>
          <input type={"text"} onChange={onSearchChange} ref={tfSearchText} />
          <div className={"results"}>
            <select size={10} ref={selResults} >
              {results.platforms.map(r => (<option key={r.id} value={r.id}>📦 &nbsp;&nbsp;{r.name}</option>))}
              {results.applications.map(r => (<option key={r.id} value={r.id}>⚙️ &nbsp;&nbsp;{r.name}</option>))}
              {results.journeys.map(r => (<option key={r.id} value={r.id}>✈️ &nbsp;&nbsp;{r.name}</option>))}
            </select>
          </div>
          <div className={"buttons"}>
            <button onClick={() => {
              onOK && onOK(selResults.current.value);
            }}>OK</button>
            <button onClick={() => {
              onCancel && onCancel();
            }}>Cancel</button>
          </div>
        </div>
      </Modal>
  );
}