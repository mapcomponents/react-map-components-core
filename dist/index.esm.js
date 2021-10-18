import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var MapContext = /*#__PURE__*/React.createContext({});
var MapContextProvider = MapContext.Provider;

/**
 * MapComponentsProvider must be imported and wrapped around component where at least one of its child nodes requires access to a MapLibre-gl or openlayers instance that is registered in this mapContext.
MapComponentsProvider must be used one level higher than the first use of MapContext.
 *
 * MapComponentsProvider requires at least one use of the MapLibreMap component somewhere down the component tree that will create the MapLibre-gl object and set the reference at MapContext.map. For MapLibre maps it is a good idea to provide a mapId attribute to the MapLibreMap Component even if you are only using a single map instance at start. It will make a later transition to using multiple instances within the same project much easier.
 */

var MapComponentsProvider = function MapComponentsProvider(_ref) {
  var children = _ref.children;

  var _useState = useState(undefined),
      _useState2 = _slicedToArray(_useState, 2),
      map = _useState2[0],
      setMap = _useState2[1];

  var _useState3 = useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      mapIds = _useState4[0],
      setMapIds = _useState4[1];

  var mapIds_raw = useRef([]);
  var maps = useRef({});

  var _useState5 = useState({}),
      _useState6 = _slicedToArray(_useState5, 2);
      _useState6[0];
      var setMapStates = _useState6[1];

  var mapStatesRef = useRef({});

  var removeMap = function removeMap(mapId) {
    if (mapId) {
      if (typeof maps.current[mapId] !== 'undefined') {
        delete maps.current[mapId];
      }

      var mapIdIndex = mapIds_raw.current.indexOf(mapId);

      if (mapIdIndex > -1) {
        mapIds_raw.current.splice(mapIdIndex, 1);
      }

      setMapIds(_toConsumableArray(mapIds_raw.current));

      if (mapIds.length === 1 && map) {
        setMap(undefined);
      }
    } else {
      setMap(undefined);
      removeMap('anonymous_map');
    }
  };

  var setMapHandler = function setMapHandler(mapInstance, mapState) {
    setMap(mapInstance);

    if (mapIds.length === 0) {
      var mapId = 'anonymous_map';
      setMapIds([].concat(_toConsumableArray(mapIds), [mapId]));
      maps.current[mapId] = mapInstance;
      mapStatesRef.current[mapId] = mapState;
      setMapStates(_objectSpread2({}, mapStatesRef.current));
    }
  };

  var value = {
    map: map,
    setMap: setMapHandler,
    maps: maps.current,
    mapIds: mapIds,
    registerMap: function registerMap(mapId, mapInstance, mapState) {
      if (mapId && mapInstance) {
        maps.current[mapId] = mapInstance;
        mapIds_raw.current.push(mapId);
        setMapIds(_toConsumableArray(mapIds_raw.current));
        mapStatesRef.current[mapId] = mapState;

        if (!map) {
          setMap(mapInstance);
          mapStatesRef.current['anonymous_map'] = mapState;
        }

        setMapStates(_objectSpread2({}, mapStatesRef.current));
      }
    },
    removeMap: removeMap,
    mapExists: function mapExists(mapId) {
      if (mapId && Object.keys(maps.current).indexOf(mapId) === -1) {
        return false;
      } else if (!mapId && !map) {
        return false;
      }

      return true;
    },
    getMap: function getMap(mapId) {
      if (mapId && mapIds.indexOf(mapId) !== -1) {
        return maps.current[mapId];
      } else if (!mapId && map) {
        return map;
      }

      return null;
    }
  };
  return /*#__PURE__*/React.createElement(MapContextProvider, {
    value: value
  }, children);
};

MapComponentsProvider.propTypes = {
  children: PropTypes.node.isRequired
};

var SimpleDataContext = /*#__PURE__*/React.createContext({});
var SimpleDataContextProvider = SimpleDataContext.Provider;

var SimpleDataProvider = function SimpleDataProvider(props) {
  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      data = _useState2[0],
      setData = _useState2[1];

  useEffect(function () {
    if (!props.url) return;
    var data_promise = null;

    if (props.format === "json") {
      data_promise = d3.json(props.url);
    } else if (props.format === "csv") {
      data_promise = d3.csv(props.url);
    } else if (props.format === "xml") {
      data_promise = d3.xml(props.url);
    }

    if (data_promise) {
      data_promise.then(function (received_data) {
        if (props.format === "xml") {
          if (props.nodeType) {
            var dataTmp = [];
            received_data.querySelectorAll(props.nodeType).forEach(function (el) {
              dataTmp.push(props.formatData(el));
            });
            setData(dataTmp);
          }
        } else {
          if (props.data_property) {
            received_data = received_data[props.data_property];
          }

          if (typeof props.formatData === "function") {
            setData(received_data.map(props.formatData));
          } else {
            setData(received_data);
          }
        }

        if (typeof props.onData === "function") {
          props.onData();
        }
      });
    }
  }, [props.url, props]);
  var value = {
    data: data,
    setData: setData
  };
  return /*#__PURE__*/React.createElement(SimpleDataContextProvider, {
    value: value
  }, props.children);
};

SimpleDataProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { MapComponentsProvider, MapContext, SimpleDataContext, SimpleDataProvider };
//# sourceMappingURL=index.esm.js.map
