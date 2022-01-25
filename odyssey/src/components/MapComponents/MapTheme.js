import { TileLayer } from "react-leaflet"
export default function MapTheme(props) {

    return (
        <>
            {props.mapTheme === 'TOPO' && <TileLayer
                attribution={'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'}
                url={'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'}
                continuousWorld={true}
                noWrap={true}
                zIndex={1}
            />}
            {props.mapTheme === 'SATELLITE' && <TileLayer
                attribution={'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'}
                url={'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'}
                continuousWorld={true}
                noWrap={true}
                zIndex={1}
            />}

            <TileLayer
                attribution={'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}
                url={'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
                continuousWorld={true}
                noWrap={true}
                zIndex={-1}
            />
        </>
    )
}