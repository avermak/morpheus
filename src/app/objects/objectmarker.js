import './object.css';

import markerImage from '../icons/handmarker.svg';

export default () => {
  return (
      <div className={"objectMarker"}>
        <img src={markerImage.src} alt={"Marker"} />
      </div>
  );
}