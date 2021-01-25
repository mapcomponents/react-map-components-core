import React, { useRef, useEffect, useContext } from "react";
import MapContext from "./MapContext";

import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/mapbox-gl.css";

const MapLibreMap = (props) => {
  const map = useRef(null);
  const mapContainer = useRef(null);

  const mapContext = useContext(MapContext);

  const mapOptions = props.options;

  useEffect(() => {
    mapContext.setLoading(true);

    // TODO: adjust defaults
    let defaultOptions = {
      lng: 8.607,
      lat: 53.1409349,
      zoom: 10,
      container: mapContainer.current,
    };

    map.current = new maplibregl.Map({ ...defaultOptions, ...mapOptions });

    map.current.on("load", () => {
      mapContext.setMap(map.current);
    });
  }, []);

  return <div ref={mapContainer} className="mapContainer" />;
};

export default MapLibreMap;
