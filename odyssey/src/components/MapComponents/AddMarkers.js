import 'leaflet/dist/leaflet.css';
import { useMapEvents } from 'react-leaflet'

function AddMarkers(props) {
  //useMapEvents from what I can tell accepts a object. each key represents a listener like click,drag...
  //value of the key is the callback function that gets called for that event
  useMapEvents({
    // when the map is clicked we update both the editable state and set markerstate
    click: (e) => {
      console.log(e)
      props.setMarkers((prev) => {
        return [...prev, {
          position: [e.latlng.lat, e.latlng.lng], iconSize: [20, 20], icon: props.icon, popUp: {
            content: <form>
              <textarea></textarea>
            </form>  }
        }]
      })
    },
  })
  return null //doesnt actually generate any jsx. only used to attach listener to map
}


export default AddMarkers;
