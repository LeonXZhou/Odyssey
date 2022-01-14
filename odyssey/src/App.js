<<<<<<< HEAD
import './App.css';


import MapEditor from './Components/MapComponents/MapEditor';
import MapDisplay from './Components/MapComponents/MapDisplay';
=======
import { Link } from 'react-router-dom';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
>>>>>>> main
function App() {

  return (
<<<<<<< HEAD
    <div className="App">
      <MapDisplay
        //the MapDisplay component can accept an options prop. which will determine how it is rendered
        mapOptions={{
          zoom: 10,
          center: [49.246292, -123.116226],
          themeAttribution: "TOPO", //needed for theme: converted to url by helper functions in mapHelpers.js
          themeURL: "TOPO" //needed for theme: converted to url by helper functions in mapHelpers.js
          //route_id: we can pass in the id from the db later
        }}
        
        //the markers prop is an array of "marker" objects that will tell MapDisplay where to draw markers
        //these are not leaflet markers, just our custom objects which represent marker information
        //this would eventually be populated by a get request to our server/db
        markers={[
          { position: [49.246292, -123.116226], iconSize: [40,40]},
          { position: [49.286292, -123.136226], icon: "TENT", iconSize: [20,20] }, //icon string is converted to actual url like the theme strings
          { position: [49.346292, -123.166226], icon: "TENT", iconSize: [20,20], popUp:{name: "First Night", description: "I <3 Camping"} } 
        ]}
      >
      </MapDisplay>
      <br></br>

      <MapEditor
        //same map options as Mapdisplay
        mapOptions={{
          zoom: 5,
          center: [51.505, -0.09]
          //route_id: we can pass in the id from the db later so we can make axios requests to the right map
        }}
        markers={[]}
      >
      </MapEditor>
=======
    <div>
      <BrowserRouter>
        <h1>always here</h1>
        <Link to='/'>home</Link>
        <br />
        <Link to='/planning'>planning</Link>
        <br />
        <Link to='/asdf'>asdf</Link>
        
        <Routes>
          <Route path="/" element={<h1>this is: home</h1>} />
          <Route path="/planning" element={<h1>this is: planning</h1>} />
          <Route path="/asdf" element={<h1>this is: asdf</h1>} />
        </Routes>
      </BrowserRouter>
>>>>>>> main
    </div>
  );
}

export default App;
