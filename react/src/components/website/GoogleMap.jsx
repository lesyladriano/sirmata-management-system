
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps';

function Map() {
  const coordinates = { lat: 12.957777, lng: 121.324127 }; // Replace with actual coordinates

  return (
    <GoogleMap defaultZoom={15} defaultCenter={coordinates}>
      <Marker position={coordinates} />
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

function GoogleMapComponent() {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY`}
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '100%' }} />}
        mapElement={<div style={{ height: '100%' }} />}
      />
    </div>
  );
}

export default GoogleMapComponent;
