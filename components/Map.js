import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";

function Map({ searchResult }) {
  const [selectedLocation, setSelectedLocation] = useState({});

  const cordinates = searchResult.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  const center = getCenter(cordinates);

  const [viewPort, setViewPort] = useState({
    width: "100%",
    height: "100vh",
    position: "sticky",
    top: "0px",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/aman-janwani/cks0lbl27149917pd1q6fvduq"
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewPort}
      onViewportChange={(nextViewport) => setViewPort(nextViewport)}
    >
      {searchResult.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              role="img"
              onClick={() => setSelectedLocation(result)}
              className="cursor-pointer bg-white p-2 rounded-lg text-sm animate-bounce"
              aria-lable="push-pin"
            >
              {result.price}
            </p>
          </Marker>
          {selectedLocation.long === result.long ? (
            <Popup
              onClose={() => selectedLocation({})}
              latitude={result.lat}
              longitude={result.long}
              closeOnClick={true}
            >
              {result.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
