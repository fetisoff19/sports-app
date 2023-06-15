import React, {useMemo, useRef} from 'react';
import {MapContainer, Marker, Polyline, TileLayer} from 'react-leaflet'
import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import start from './icons/start.svg';
import stop from './icons/stop.svg';
import pizza from './icons/pizza.svg';
import donut from './icons/donut.svg';
import now from './icons/now.svg';
import iceCream from './icons/iceCream.svg';
import banana from './icons/banana.svg';
import watermelon from './icons/watermelon.svg';
import coffee from './icons/coffee.svg';
import energyBottle from './icons/energyBottle.svg';

function NewMarker({position, className, icon, iconSize, iconAnchor}) {
  const newIcon = new Leaflet.Icon({
    iconUrl: icon,
    className: className,
    iconSize: iconSize || [30, 30],
    iconAnchor: iconAnchor || [15, 29]
  });

  return (
    <Marker
      position={position}
      icon={newIcon}
    >
    </Marker>
  );
}


const Maps = (props) => {
  const tileLayerRef = useRef(null);
  const containerRef = useRef(null);
  const polylinePoints = props.polylinePoints || [];
  const polylinePowerCurve = props.polylinePowerCurve || [];

  let marketCoordinates = [];
  let i;
  if (props?.index) {
    i = props.index * props.smoothing;
    i >= polylinePoints.length - 1 ? i = polylinePoints.length - 1 : i;
    i < 0 ? i = 0 : i;
    marketCoordinates = polylinePoints[i];
  }

  const markers = [
    <NewMarker position={marketCoordinates} icon={pizza} iconSize={[30, 30]} iconAnchor={[4, 28]}/>,
    <NewMarker position={marketCoordinates} icon={donut} iconSize={[30, 30]} iconAnchor={[15, 14]}/>,
    <NewMarker position={marketCoordinates} icon={watermelon} iconSize={[30, 30]} iconAnchor={[6, 26]}/>,
    <NewMarker position={marketCoordinates} icon={energyBottle} iconSize={[30, 30]} iconAnchor={[4, 28]}/>,
    <NewMarker position={marketCoordinates} icon={coffee} iconSize={[30, 30]} iconAnchor={[6, 28]}/>,
    <NewMarker position={marketCoordinates} icon={banana} iconSize={[36, 36]} iconAnchor={[12, 28]}/>,
  ]

  const randomMarkerIndex = useMemo(() => Math.floor(Math.random() * markers.length), [])

  if (polylinePoints.length === 0) return;
  const startCoordinates = polylinePoints[0];
  const endCoordinates = polylinePoints.at(-1);
  const startZoom = props.startZoom || 7;
  const maxZoom = props.maxZoom || 19;
  const polylineStyle = props.polylineStyle || {color: 'blue'}
  const polylinePowerCurveStyle = props.polylinePowerCurveStyle || {color: 'red'}
  let bounds = polylinePoints.getBounds ? polylinePoints.getBounds() : L.latLngBounds(polylinePoints);

  return (
    <MapContainer
      style={props.style || {height: 300, width: 300}}
      zoom={startZoom}
      maxZoom={maxZoom}
      scrollWheelZoom={props.scrollWheelZoom}
      bounds={[bounds.getSouthWest(), bounds.getNorthEast()]}

    >
      <div ref={containerRef}>
        <TileLayer ref={tileLayerRef}
                   attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                   url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
      </div>

      {props.markerStart ? <NewMarker position={startCoordinates} icon={start}/> : null}
      {props.markerEnd ? <NewMarker position={endCoordinates} icon={stop}/> : null}
      {i ? ((props?.funnyMarkers && markers[randomMarkerIndex])
        || <NewMarker position={marketCoordinates} icon={now}/>)
        : null}
      {props.button ? props.button : null}
      <Polyline pathOptions={polylineStyle}
                positions={polylinePoints}/>
      <Polyline pathOptions={polylinePowerCurveStyle}
                positions={polylinePowerCurve}/>
    </MapContainer>
  );
};

export default Maps;




