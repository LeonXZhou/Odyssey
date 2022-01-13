import './App.css';


import MapEditor from './Components/MapComponents/MapEditor';
import MapDisplay from './Components/MapComponents/MapDisplay';
function App() {

  return (
    <div className="App">
      <MapDisplay

        mapOptions={{
          zoom: 10,
          center: [49.246292, -123.116226],
          themeAttribution: "TOPO",
          themeURL: "TOPO"
        }}

        markers={[
          { position: [49.246292, -123.116226], iconSize: [40,40]},
          { position: [49.286292, -123.136226], icon: "TENT", iconSize: [20,20] },
          { position: [49.346292, -123.166226], icon: "TENT", iconSize: [20,20], popUp:{name: "First Night", description: "I <3 Camping"} }
        ]}
      >
      </MapDisplay>
      <br></br>
      <MapEditor
        mapOptions={{
          zoom: 5,
          center: [51.505, -0.09]
        }}
      >
      </MapEditor>
    </div>
  );
}

export default App;
