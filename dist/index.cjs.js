'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PropTypes = require('prop-types');
var d3 = require('d3');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);

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
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
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

var MapContext = /*#__PURE__*/React__default['default'].createContext({});
var MapContextProvider = MapContext.Provider;

/**
 * MapComponentsProvider must be imported and wrapped around component where at least one of its child nodes requires access to a MapLibre-gl or openlayers instance that is registered in this mapContext.
MapComponentsProvider must be used one level higher than the first use of MapContext.
 *
 * MapComponentsProvider requires at least one use of the MapLibreMap component somewhere down the component tree that will create the MapLibre-gl object and set the reference at MapContext.map. For MapLibre maps it is a good idea to provide a mapId attribute to the MapLibreMap Component even if you are only using a single map instance at start. It will make a later transition to using multiple instances within the same project much easier.
 */

var MapComponentsProvider = function MapComponentsProvider(_ref) {
  var children = _ref.children;

  var _useState = React.useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      map = _useState2[0],
      _setMap = _useState2[1];

  var _useState3 = React.useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      mapIds = _useState4[0],
      setMapIds = _useState4[1];

  var mapIds_raw = React.useRef([]);
  var maps = React.useRef({});
  var value = {
    map: map,
    setMap: function setMap(mapInstance) {
      _setMap(mapInstance);

      if (mapIds.length === 0) {
        setMapIds([].concat(_toConsumableArray(mapIds), ['map_1']));
        maps.current['map_1'] = mapInstance;
      }
    },
    maps: maps.current,
    mapIds: mapIds,
    registerMap: function registerMap(mapId, mapInstance) {
      if (mapId && mapInstance) {
        console.log('register map');
        maps.current[mapId] = mapInstance;
        mapIds_raw.current.push(mapId);
        setMapIds(_toConsumableArray(mapIds_raw.current));
        console.log(mapIds_raw.current);

        if (!map) {
          _setMap(mapInstance);
        }
      }
    },
    mapExists: function mapExists(mapId) {
      if (mapId && mapIds.indexOf(mapId) === -1) {
        return false;
      } else if (!mapId && !map) {
        return false;
      }

      return true;
    },
    getMap: function getMap(mapId) {
      if (mapId && mapIds.indexOf(mapId) === -1) {
        return maps.current[mapId];
      } else if (!mapId && map) {
        return map;
      }

      return null;
    }
  };
  return /*#__PURE__*/React__default['default'].createElement(MapContextProvider, {
    value: value
  }, children);
};

MapComponentsProvider.propTypes = {
  children: PropTypes__default['default'].node.isRequired
};

var SimpleDataContext = /*#__PURE__*/React__default['default'].createContext({});
var SimpleDataContextProvider = SimpleDataContext.Provider;

var SimpleDataProvider = function SimpleDataProvider(props) {
  var _useState = React.useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      data = _useState2[0],
      setData = _useState2[1];

  React.useEffect(function () {
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

          if (props.formatData) {
            setData(received_data.map(props.formatData));
          } else {
            setData(received_data);
          }
        }
      });
    }
  }, [props.url]);
  var value = {
    data: data,
    setData: setData
  };
  return /*#__PURE__*/React__default['default'].createElement(SimpleDataContextProvider, {
    value: value
  }, props.children);
};

SimpleDataProvider.propTypes = {
  children: PropTypes__default['default'].node.isRequired
};

exports.MapComponentsProvider = MapComponentsProvider;
exports.MapContext = MapContext;
exports.SimpleDataContext = SimpleDataContext;
exports.SimpleDataProvider = SimpleDataProvider;
