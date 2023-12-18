import React, {memo} from 'react';
import icons from '@/app/icons';
import defaultHandles from "@/app/objects/defaultHandles";

import './object.css';

export default memo(({data, isConnectable, mode}) => {
  return (
      <div className={"objectWrapper"}>
        <div>
          <img src={icons['merchant'].src} alt={'Merchant'} className={"objectIcon"} />
        </div>
        <div className={"objectLabel"}>Merchant</div>
        {mode !== "icon" ? defaultHandles(isConnectable) : null}
      </div>
  );
})
