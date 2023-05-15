import React, {useContext, useRef, useState} from 'react';
import {MapContainer, Marker, Polyline, Popup, TileLayer, useMap} from 'react-leaflet'
import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import {divIcon} from "leaflet/dist/leaflet-src.esm";
import domtoimage from "dom-to-image";

const Maps = (props) => {
  const tileLayerRef = useRef(null);
  const containerRef = useRef(null);
  const polylinePoints = props.polylinePoints || [];
  let marketCoordinates = [];
  let i;
  if (props.index) {
    i = props.index * props.smoothing;
    i >= polylinePoints.length - 1 ? i = polylinePoints.length - 1 : i;
    i < 0 ? i = 0 : i;
    marketCoordinates = polylinePoints[i];
  }

  if (polylinePoints.length === 0) return;

  const startCoordinates = polylinePoints[0];
  const endCoordinates = polylinePoints.at(-1);
  const startZoom = props.startZoom || 7;
  const maxZoom = props.maxZoom || 19;

  const polylineStyle = props.polylineStyle || {color: 'blue'}


  let bounds = polylinePoints.getBounds ? polylinePoints.getBounds() : L.latLngBounds(polylinePoints);

  // async function mapsToPng() {
  //   if(tileLayerRef.current)
  //   tileLayerRef.current .on("load", () =>
  //   { domtoimage.toPng(tileLayerRef.current, {height, width}).then((r) => console.log(r))})
  // }
  // mapsToPng().then((r)=>console.log(r))
  // const height = props.style.height || 300;
  // const width = props.style.width || 300;

  // new Promise(resolve => tileLayerRef.current?.on("load", () => resolve()));
  // const dataURL = domtoimage.toPng(tileLayerRef.current, {height, width});
  // console.log(dataURL)
  // document.body.removeChild(ref.current);

  // const imgElement = <img src={dataURL}/>
  // containerRef.current
  // document.body.appendChild(imgElement);

  // function exportToPng(dom) {
  //   domtoimage
  //     .toPng(dom)
  //     .then(function (dataUrl) {
  //       var img = new Image();
  //       img.src = dataUrl;
  //       document.body.appendChild(img);
  //     })
  //     .catch(function (error) {
  //       console.error("oops, something went wrong!", error);
  //     });
  // }

  const customMarkerIcon = divIcon({
    html:
      <div>
        <svg
          width="99"
          height="122"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>ionicons-v5-n</title>
          <path
            d="M256,48c-79.5,0-144,61.39-144,137,0,87,96,224.87,131.25,272.49a15.77,15.77,0,0,0,25.5,0C304,409.89,400,272.07,400,185,400,109.39,335.5,48,256,48Z"
            style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/>
          <circle cx="256" cy="192" r="48"
                  style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/>
        </svg>
      </div>

  });
  return (
    <MapContainer
      style={props.style || {height: 300, width: 300}}
      zoom={startZoom}
      maxZoom={maxZoom}
      scrollWheelZoom={props.scrollWheelZoom}
      // scrollWheelZoom={false}
      bounds={[bounds.getSouthWest(), bounds.getNorthEast()]}

    >
      <div ref={containerRef}>
        <TileLayer ref={tileLayerRef}
                   attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                   url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
      </div>

      {props.markerStart ? <DraggableMarker position={startCoordinates} className={'start'}/> : null}
      {props.markerEnd ? <DraggableMarker position={endCoordinates} className={'end'}/> : null}
      {i ? <DraggableMarker position={marketCoordinates} className={'marker'}/> : null}
      {/*<Marker*/}
      {/*  style={{color: 'red'}}*/}
      {/*  position={startCoordinates}*/}
      {/*  icon={customMarkerIcon}*/}
      {/*>*/}
      {/*  {props.popupStartText*/}
      {/*  ? <Popup>{props.popupStartText}</Popup>*/}
      {/*  : null}*/}
      {/*</Marker>*/}
      {/*<Marker*/}
      {/*  style={{color: 'blue'}}*/}
      {/*  position={endCoordinates}*/}
      {/*  icon={customMarkerIcon}*/}
      {/*>*/}
      {/*  {props.popupEndText*/}
      {/*    ? <Popup>{props.popupEndText}</Popup>*/}
      {/*    : null}*/}
      {/*</Marker>*/}
      <Polyline pathOptions={polylineStyle}
                positions={polylinePoints}/>
      {/*<MyComponent polyline={polylinePoints}/>*/}
      {/*</MyComponent>*/}

    </MapContainer>
  );
};

export default Maps;



import iconUrl from './location.svg';
import {garminLatLongToNormal} from "../../API/utils";
import ViewWorkoutContext from "../ViewWorkout/ViewWorkoutContext";
import {map} from "highcharts";

function DraggableMarker(props) {
  const newIcon = new Leaflet.Icon({
    iconUrl,
    className: props.className,
    // iconAnchor: [5, 55],
    // popupAnchor: [10, -44],
    iconSize: [25, 55],
  });

  // const [draggable, setDraggable] = React.useState(false);
  // const [position, setPosition] = React.useState(center);
  // const markerRef = React.useRef(null);
  // const eventHandlers = React.useMemo(
  //   () => ({
  //     dragend() {
  //       const marker = markerRef.current;
  //       if (marker != null) {
  //         setPosition(marker.getLatLng());
  //       }
  //     }
  //   }),
  //   []
  // );
  // const toggleDraggable = React.useCallback(() => {
  //   setDraggable((d) => !d);
  // }, []);

  return (
    <Marker
      // draggable={draggable}
      // eventHandlers={eventHandlers}
      position={props.position}
      icon={newIcon}
      // ref={markerRef}
    >
      {/*<Popup minWidth={90}>*/}
      {/*  /!*<span onClick={toggleDraggable}>*!/*/}
      {/*  /!*  {draggable*!/*/}
      {/*  /!*    ? "Marker is draggable"*!/*/}
      {/*  /!*    : "Click here to make marker draggable"}*!/*/}
      {/*  /!*</span>*!/*/}
      {/*</Popup>*/}
    </Marker>
  );
}
