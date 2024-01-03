import React, {memo, useCallback} from 'react';
import icons from '@/app/icons';
import defaultHandles from "@/app/objects/defaultHandles";

import './object.css';
import ObjectMarker from "@/app/objects/objectmarker";
import {useMorpheusStore} from "@/app/store";
import {getFindingsForNodeId} from "@/app/rules/engine";
import Editablelabel from '../editablelabel';

export default memo(({id, data, label, isConnectable, mode}) => {
  const findings = useMorpheusStore(state => state.rules.findings);

  const getFindings = useCallback(() => {
    return getFindingsForNodeId(findings, id);
  }, [findings, id]);

  if (mode === 'icon') {
    return (
        <div className={"objectWrapper"}>
          <div>
            <img src={icons['customer'].src} alt={'Customer'} className={"objectIcon"} />
          </div>
        </div>
    );
  }

  return (
    <div className={"objectWrapper"}>
      <div>
        <img src={icons['customer'].src} alt={'Customer'} className={"objectIcon"} />
      </div>
      <div className={`objectLabel ${getFindings().length > 0 ? 'objectLabelWithFindings' : ''}`}>
        <Editablelabel defaultValue={data ? data.label : label} style={{textAlign: 'center'}} />
      </div>
      {defaultHandles(isConnectable)}
      {data && data.findingAlert ? <ObjectMarker /> : ''}
    </div>
  );
})
