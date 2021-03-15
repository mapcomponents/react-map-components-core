import React, { useState } from "react";
import PropTypes from "prop-types";
import { MapContextProvider } from "./MapContext";

/**
 * TODO Update readme for multi instance functionality
 * MapComponentsProvider must be imported and wrapped around component where at least one of its child nodes requires access to the MapLibreMaps object.
MapComponentsProvider must be used one level higher than the first use of MapContext.
 *
 * MapComponentsProvider requires exactly one use of the MapLibreMap component somewhere down the component tree that will create the MapLibre-gl object and set the reference at MapContext.map.
 */
const MapComponentsProvider = ({ children }) => {
  const [map, setMap] = useState(null);
  const [mapIds, setMapIds] = useState([]);
  let mapIds_raw = [];
  let maps = {};

  const value = {
    map: map,
    setMap: (mapInstance) => {
      setMap(mapInstance);

      if(mapIds.length === 0){
        setMapIds([...mapIds, 'map_1']);
      }
    },
    maps: maps,
    mapIds: mapIds,
    registerMap: (mapId, mapInstance) => {
      if(mapId && mapInstance){
        maps[mapId] = mapInstance;
        mapIds_raw.push(mapId);
        setMapIds(mapIds_raw);

        if(!map){
          setMap(mapInstance);
        }
      }
    }
  };

  return <MapContextProvider value={value}>{children}</MapContextProvider>;
};

MapComponentsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MapComponentsProvider;
