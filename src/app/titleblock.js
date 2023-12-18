import React, {memo} from 'react';

import './objects/object.css';
import {useMorpheusStore} from "@/app/store";
import ObjectMarker from "@/app/objects/objectmarker";

export default memo(() => {
  const tb = useMorpheusStore(store => store.titleBlock);
  return (
      <div className={"title-block" }>
        {tb.findingAlert ? (<div style={{position: "absolute", width:'100%', height:'100%', border: '#a41f1faa 6px solid'}}></div>) : null}
        <table cellPadding={0} cellSpacing={1}>
          <tbody>
          <tr>
            <td width={"25%"}>
              <div>Business unit</div>
              <div>{tb.businessUnit}</div>
            </td>
            <td width={"50%"}>
              <div>Document type</div>
              <div>{tb.documentType}</div>
            </td>
            <td width={"25%"}>
              <div>Document status</div>
              <div>{tb.documentStatus}</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Platform</div>
              <div>{tb.platform}</div>
            </td>
            <td rowSpan={2}>
              <div>Title</div>
              <div>{tb.title}</div>
            </td>
            <td>
              <div>Create date</div>
              <div>{tb.createDate}</div>
            </td>
          </tr>
          <tr>
            <td rowSpan={2} style={{verticalAlign:"bottom", textAlign: "center", paddingBottom: "6px"}}>
              <div><img src={"./amex-two-lines-blue.svg"} alt={"American Express"} style={{width:"90%"}} /></div>
            </td>
            <td>
              <div>Last revision date</div>
              <div>{tb.lastRevisionDate}</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Created by</div>
              <div>{tb.createdBy}</div>
            </td>
            <td>
              <div>Version</div>
              <div>{tb.version}</div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
  );
})
