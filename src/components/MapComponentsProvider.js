import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { MapContextProvider } from "./MapContext";

/**
 * MapComponentsProvider must be imported and wrapped around component where at least one of its child nodes requires access to a MapLibre-gl or openlayers instance that is registered in this mapContext.
MapComponentsProvider must be used one level higher than the first use of MapContext.
 *
 * MapComponentsProvider requires at least one use of the MapLibreMap component somewhere down the component tree that will create the MapLibre-gl object and set the reference at MapContext.map. For MapLibre maps it is a good idea to provide a mapId attribute to the MapLibreMap Component even if you are only using a single map instance at start. It will make a later transition to using multiple instances within the same project much easier.
 */

const MapComponentsProvider = ({ children }) => {
  const [map, setMap] = useState(undefined);
  const [mapIds, setMapIds] = useState([]);
  let mapIds_raw = useRef([]);
  let maps = useRef({});

  const value = {
    map: map,
    setMap: (mapInstance) => {
        setMap(mapInstance);

        if(mapIds.length === 0){
          let mapId = Math.round(Math.random()*100000000);
          setMapIds([...mapIds, mapId]);
          maps.current[mapId] = mapInstance;
        }
    },
    maps: maps.current,
    mapIds: mapIds,
    registerMap: (mapId, mapInstance) => {
      if(mapId && mapInstance){
          maps.current[mapId] = mapInstance;
          mapIds_raw.current.push(mapId);
          setMapIds([...mapIds_raw.current]);

          if(!map){
            setMap(mapInstance);
          }
      }
    },
    removeMap: (mapId) => {
      if(mapId){
        if(typeof maps.current[mapId] !== 'undefined'){
          maps.current[mapId] = null;
        }
        let mapIdIndex = mapIds_raw.current.indexOf(mapId);
        if (mapIdIndex > -1) {
          mapIds_raw.current.splice(mapIdIndex, 1);
        }
        setMapIds([...mapIds_raw.current]);

        if(mapIds.length === 1 && map){
          setMap(undefined);
        }
      }else{
        setMap(undefined);
        mapIds_raw.current = [];
        setMapIds([]);
        maps.current = {};
      }
    },
    mapExists: (mapId) => {
      if (mapId && mapIds.indexOf(mapId) === -1) {
        return false;
      } else if (!mapId && !map) {
        return false;
      }
      return true;
    },
    getMap: (mapId) => {
      if (mapId && mapIds.indexOf(mapId) !== -1) {
        return maps.current[mapId];
      } else if (!mapId && map) {
        return map;
      }

      return null;
    },
  };

  return <MapContextProvider value={value}>{children}</MapContextProvider>;
};

MapComponentsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MapComponentsProvider;
