import React, {memo, useCallback} from 'react';

import './objects/object.css';
import {useMorpheusStore} from "@/app/store";
import ObjectMarker from "@/app/objects/objectmarker";
import EditableLabel from './editablelabel';

export default memo(() => {
  const tb = useMorpheusStore(store => store.titleBlock);
  const setTitleBlock = useMorpheusStore(store => store.setTitleBlock);

  const fieldChanged = useCallback((fieldName, value)=>{
    const tb1 = {...tb};
    tb1[fieldName] = value;
    setTitleBlock(tb1);
  }, [tb, setTitleBlock]);

  return (
      <div className={"title-block" }>
        {tb.findingAlert ? (<div style={{position: "absolute", width:'100%', height:'100%', border: '#a41f1faa 6px solid'}}></div>) : null}
        <table cellPadding={0} cellSpacing={1}>
          <tbody>
          <tr>
            <td width={"25%"}>
              <div>
                <div>Business unit</div>
                <EditableLabel defaultValue={tb.businessUnit} onChange={(e, text) => fieldChanged("businessUnit", text)} />
              </div>
            </td>
            <td width={"50%"}>
              <div>
                <div>Document type</div>
                <EditableLabel defaultValue={tb.documentType} onChange={(e, text) => fieldChanged("documentType", text)} />
              </div>
            </td>
            <td width={"25%"}>
              <div>
                <div>Document status</div>
                <EditableLabel defaultValue={tb.documentStatus} onChange={(e, text) => fieldChanged("documentStatus", text)} />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div>
                <div>Platform</div>
                <EditableLabel defaultValue={tb.platform} onChange={(e, text) => fieldChanged("platform", text)} />
              </div>
            </td>
            <td rowSpan={2}>
              <div>
                <div>Title</div>
                <EditableLabel defaultValue={tb.title} onChange={(e, text) => fieldChanged("title", text)} />
              </div>
            </td>
            <td>
              <div>
                <div>Create date</div>
                <EditableLabel defaultValue={tb.createDate} onChange={(e, text) => fieldChanged("createDate", text)} />
              </div>
            </td>
          </tr>
          <tr>
            <td rowSpan={2}>
              <div style={{justifyContent:"flex-end", alignItems:"center"}}>
                <img src={"./amex-two-lines-blue.svg"} alt={"American Express"} style={{width:"90%", marginBottom:"2px"}} />
              </div>
            </td>
            <td>
              <div>
                <div>Last revision date</div>
                <div><EditableLabel defaultValue={tb.lastRevisionDate} onChange={(e, text) => fieldChanged("lastRevisionDate", text)} /></div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div>
                <div>Created by</div>
                <div><EditableLabel defaultValue={tb.createdBy} onChange={(e, text) => fieldChanged("createdBy", text)} /></div>
              </div>
            </td>
            <td>
              <div>
                <div>Version</div>
                <div><EditableLabel defaultValue={tb.version} onChange={(e, text) => fieldChanged("version", text)} /></div>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
  );
})
