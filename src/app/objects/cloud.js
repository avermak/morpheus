import React, {memo} from 'react';
import icons from '@/app/icons';
import defaultHandles from "@/app/objects/defaultHandles";

import './object.css';

export default memo(({data, isConnectable, mode}) => {
  return (
      <div className={"objectWrapper"}>
        <div>
          <img src={icons['cloud'].src} alt={'Cloud'} className={"objectIcon"} />
        </div>
        <div className={"objectLabel"}>Cloud</div>
        {mode !== "icon" ? defaultHandles(isConnectable) : null}
      </div>
  );
})
