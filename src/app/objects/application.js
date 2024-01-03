import React, {memo, useCallback, useEffect, useState} from 'react';
import icons from '@/app/icons';
import defaultHandles from "@/app/objects/defaultHandles";
import AppSelectorModal from './appselectormodal';
import apps from './appdata';

import './object.css';
import {useMorpheusStore} from "@/app/store";
import {getFindingsForNodeId} from "@/app/rules/engine";
import ObjectMarker from "@/app/objects/objectmarker";
import Editablelabel from '../editablelabel';

const getIcon = type => {
  switch (type) {
    case "application" : return '⚙️';
    case "platform": return '📦';
    case "journey": return '✈️';
    default: return '⚠️';
  }
}

export default memo(({id, label, data, isConnectable, mode}) => {

  const setCustomNodeData = useMorpheusStore(state => state.setCustomNodeData);
  const findings = useMorpheusStore(state => state.rules.findings);

  const [modalOpen, setModalOpen] = useState(false);

  const promptChooseAppData = useCallback(async () => {
    console.log(`Prompting for app selection for node ${id}`);
    setModalOpen(true);
  }, []);

  const [] = useState(() => {
    if (data && data.userDropped) {
      promptChooseAppData().then(()=>{});
    }
    return true;
  });

  const onModalOK = useCallback(res => {
    const app = [...apps.platforms, ...apps.applications, ...apps.journeys].find(a => a.id === res);
    console.log(`Selected: `, app);
    if (app) {
      setModalOpen(false);
      setCustomNodeData(id, {...app, label: app.name});
    }
  }, []);

  const onModalCancel = useCallback(() => {
    console.log(`Canceled`);
    setModalOpen(false);
  }, []);

  const getFindings = useCallback(() => {
    return getFindingsForNodeId(findings, id);
  }, [findings, id]);

  if (mode === "icon") {
    return (
    <div className={"objectWrapper"}>
      <div>
        <img src={icons['application'].src} alt={'Application'} className={"objectIcon"} />
      </div>
    </div>
    );
  }

  return (
    <div className={"objectWrapper"}>
      <div>
        <img src={icons['application'].src} alt={'Application'} className={"objectIcon"} />
      </div>
      <div className={`objectLabel ${getFindings().length > 0 ? 'objectLabelWithFindings' : ''}`}>
       <Editablelabel defaultValue={data ? data.label : label} style={{textAlign: 'center'}} />
      </div>
      {defaultHandles(isConnectable)}
      <div className={"objectTypeIcon"}>
        <button onClick={promptChooseAppData}>
          {data ? getIcon(data.type) : '⌛️'}
        </button>
        <AppSelectorModal open={modalOpen} onOK={onModalOK} onCancel={onModalCancel} />
      </div>
      {data && data.findingAlert ? <ObjectMarker /> : ''}
    </div>
  );
})
