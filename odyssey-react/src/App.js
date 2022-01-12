import './App.css';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import L from 'leaflet';


function LocationMarker() {
  const [markerPosition, setPosition] = useState([])
  useMapEvents({ //apprently the only way to add listners to a map container is in a child element
    click(e) {
      console.log(e)
      setPosition((prev) => { return [...prev, [e.latlng.lat, e.latlng.lng]] })
    }
  })
  console.log(markerPosition)
  const markers = markerPosition.map((mP,i) => {
    return (<Marker position={mP} icon={new L.Icon({
      iconUrl: "https://i.imgur.com/LpaY82x.png",
      popupAnchor: [0, 0],
      iconSize: new L.Point(20, 20),
      className: 'leaflet-div-icon'
    })}
    key={i}></Marker>)
  })
  return (<>{markers}</>) //we would return null if our listener for mapContainer shouldn't make any changes
}

function App() {
  return (
    <div className="App">
      <MapContainer center={[51.505, -0.09]} zoom={10} scrollWheelZoom={false} doubleClickZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]} icon={new L.Icon({
          iconUrl: "https://i.imgur.com/LpaY82x.png",
          popupAnchor: [0, 0],
          iconSize: new L.Point(20, 20),
          className: 'leaflet-div-icon'
        })}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <LocationMarker></LocationMarker>
      </MapContainer>
    </div>
  );
}

export default App;
