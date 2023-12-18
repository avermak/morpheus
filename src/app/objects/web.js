import React, {memo} from 'react';
import icons from '@/app/icons';
import defaultHandles from "@/app/objects/defaultHandles";

import './object.css';

export default memo(({data, isConnectable, mode}) => {
  return (
      <div className={"objectWrapper"}>
        <div>
          <img src={icons['web'].src} alt={'Web'} className={"objectIcon"} />
        </div>
        <div className={"objectLabel"}>Web</div>
        {mode !== "icon" ? defaultHandles(isConnectable) : null}
      </div>
  );
})
