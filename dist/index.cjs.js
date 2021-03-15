'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PropTypes = require('prop-types');

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
 * MapComponentsProvider must be imported and wrapped around component where at least one of its child nodes requires access to the MapLibreMaps object.
MapComponentsProvider must be used one level higher than the first use of MapContext.
 *
 * MapComponentsProvider requires exactly one use of the MapLibreMap component somewhere down the component tree that will create the MapLibre-gl object and set the reference at MapContext.map.
 */

var MapComponentsProvider = function MapComponentsProvider(_ref) {
  var children = _ref.children;

  var _useState = React.useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      map = _useState2[0],
      setMap = _useState2[1];

  var value = {
    map: map,
    setMap: setMap
  };
  return /*#__PURE__*/React__default['default'].createElement(MapContextProvider, {
    value: value
  }, children);
};

MapComponentsProvider.propTypes = {
  children: PropTypes__default['default'].node.isRequired
};

/**
 * TODO: Update comments for multi instance
 *
 * MultiMapComponentsProvider must be imported and wrapped around component where at least one of its child nodes requires access to the MapLibreMaps object.
MultiMapComponentsProvider must be used one level higher than the first use of MultiMapContext.
 *
 * MultiMapComponentsProvider requires exactly one use of the MapLibreMap component somewhere down the component tree that will create the MapLibre-gl object and set the reference at MultiMapContext.map.
 */

var MultiMapComponentsProvider = function MultiMapComponentsProvider(_ref) {
  var children = _ref.children;

  var _useState = React.useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      mapIds = _useState2[0],
      setMapIds = _useState2[1];

  var maps = {};
  var value = {
    maps: maps,
    registerMap: function registerMap(mapId, map) {
      if (mapId && map) {
        maps[mapId] = map;
        setMapIds([].concat(_toConsumableArray(mapIds), [mapId]));
      }
    }
  };
  return /*#__PURE__*/React__default['default'].createElement(MapContextProvider, {
    value: value
  }, children);
};

MultiMapComponentsProvider.propTypes = {
  children: PropTypes__default['default'].node.isRequired
};

exports.MapComponentsProvider = MapComponentsProvider;
exports.MapContext = MapContext;
exports.MultiMapComponentsProvider = MultiMapComponentsProvider;
