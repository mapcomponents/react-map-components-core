import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { MapContextProvider } from "./MapContext";

/**
 * MapComponentsProvider must be imported and wrapped around component where at least one of its child nodes requires access to a MapLibre-gl or openlayers instance that is registered in this mapContext.
MapComponentsProvider must be used one level higher than the first use of MapContext.
 *
 * MapComponentsProvider requires at least one use of the MapLibreMap component somewhere down the component tree that will create the MapLibre-gl object and set the reference at MapContext.map. For MapLibre maps it is a good idea to provide a mapId attribute to the MapLibreMap Component even if you are only using a single map instance at start. It will make a later transition to using multiple instances within the same project much easier.
 */
type Props = {
  children?: JSX.Element;
};
type MapInstance = Object;

const MapComponentsProvider = ({ children }: Props) => {
  const [map, setMap] = useState<MapInstance | undefined>(undefined);
  const [mapIds, setMapIds] = useState<string[]>([]);
  let mapIds_raw = useRef<string[]>([]);
  let maps = useRef<{[key: string]:MapInstance}>({});

  const value = {
    map: map,
    setMap: (mapInstance:MapInstance) => {
      mapInstance.once('load',() => {
        console.log('Map is ready')
        console.log(mapInstance)
        console.log(mapInstance.style)
        setMap(mapInstance);

        if(mapIds.length === 0){
          setMapIds([...mapIds, 'map_1']);
          maps.current['map_1'] = mapInstance;
        }
      });
    },
    maps: maps.current,
    mapIds: mapIds,
    registerMap: (mapId:string, mapInstance:MapInstance) => {
      if(mapId && mapInstance){
        mapInstance.once('load',() => {
          console.log('Map is ready')
          console.log(mapInstance)
          console.log(mapInstance.style)
          maps.current[mapId] = mapInstance;
          mapIds_raw.current.push(mapId);
          setMapIds([...mapIds_raw.current]);

          if(!map){
            setMap(mapInstance);
          }
        });
      }
    },
    removeMap: (mapId:string) => {
      if(mapId){
        if(typeof maps.current[mapId] !== 'undefined'){
          maps.current[mapId] = null;
        }
        let mapIdIndex = mapIds_raw.current.indexOf(mapId);
        if (mapIdIndex > -1) {
          mapIds_raw.current.splice(mapIdIndex, 1);
        }
        setMapIds([...mapIds_raw.current]);

        if(map){
          setMap(null);
        }
      }else{
        setMap(null);
        mapIds_raw.current = [];
        setMapIds([]);
        maps.current = {};
      }
    },
    mapExists: (mapId:string) => {
      if (mapId && mapIds.indexOf(mapId) === -1) {
        return false;
      } else if (!mapId && !map) {
        return false;
      }
      return true;
    },
    getMap: (mapId:string) => {
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
