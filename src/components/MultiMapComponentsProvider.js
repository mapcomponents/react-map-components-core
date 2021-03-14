import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { MapContextProvider } from "./MapContext";

/**
 * TODO: Update comments for multi instance
 *
 * MultiMapComponentsProvider must be imported and wrapped around component where at least one of its child nodes requires access to the MapLibreMaps object.
MultiMapComponentsProvider must be used one level higher than the first use of MultiMapContext.
 *
 * MultiMapComponentsProvider requires exactly one use of the MapLibreMap component somewhere down the component tree that will create the MapLibre-gl object and set the reference at MultiMapContext.map.
 */
const MultiMapComponentsProvider = ({ children }) => {
  const [mapIds, setMapIds] = useState([]);
  let maps = {};

  const value = {
    maps: maps,
    registerMap: (mapId, map) => {
      if(mapId && map){
        maps[mapId] = map;
        setMapIds([...mapIds, mapId]);
      }
    }
  };

  return <MapContextProvider value={value}>{children}</MapContextProvider>;
};

MultiMapComponentsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MultiMapComponentsProvider;
