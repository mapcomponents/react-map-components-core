import React, { useState, useEffect, useRef, useContext } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/mapbox-gl.css';

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

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
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

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
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

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var MapContext = /*#__PURE__*/React.createContext({});
var MapContextProvider = MapContext.Provider;

var MapComponentsProvider = function MapComponentsProvider(_ref) {
  var children = _ref.children;

  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      map = _useState2[0],
      setMap = _useState2[1];

  var _useState3 = useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      mapLocation = _useState4[0],
      setMapLocation = _useState4[1];

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      loading = _useState6[0],
      setLoading = _useState6[1];

  var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      loadingMsg = _useState8[0],
      setLoadingMsg = _useState8[1];

  var _useState9 = useState(false),
      _useState10 = _slicedToArray(_useState9, 2),
      showErrorMessage = _useState10[0],
      setShowErrorMessage = _useState10[1];

  var _useState11 = useState(""),
      _useState12 = _slicedToArray(_useState11, 2),
      errorMessage = _useState12[0],
      setErrorMessage = _useState12[1]; // reset loading message after loading is switched back to false


  useEffect(function () {
    if (!loading) {
      setLoadingMsg("loading");
    }
  }, [loading]); // reset error message after loading is switched back to false

  useEffect(function () {
    if (!showErrorMessage) {
      setErrorMessage("");
    }
  }, [showErrorMessage]);
  var value = {
    map: map,
    setMap: setMap,
    mapLocation: mapLocation,
    setMapLocation: setMapLocation,
    loading: loading,
    setLoading: setLoading,
    loadingMsg: loadingMsg,
    setLoadingMsg: setLoadingMsg,
    showErrorMessage: showErrorMessage,
    setShowErrorMessage: setShowErrorMessage,
    errorMessage: errorMessage,
    setErrorMessage: setErrorMessage
  };
  return /*#__PURE__*/React.createElement(MapContextProvider, {
    value: value
  }, children);
};

var MapLibreMap = function MapLibreMap(props) {
  var map = useRef(null);
  var mapContainer = useRef(null);
  var mapContext = useContext(MapContext);
  var mapOptions = props.options;
  useEffect(function () {
    mapContext.setLoading(true); // TODO: adjust defaults

    var defaultOptions = {
      lng: 8.607,
      lat: 53.1409349,
      zoom: 10,
      container: mapContainer.current
    };
    map.current = new maplibregl.Map(_objectSpread2(_objectSpread2({}, defaultOptions), mapOptions));
    map.current.on("load", function () {
      mapContext.setMap(map.current);
    });
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    ref: mapContainer,
    className: "mapContainer"
  });
};

export { MapComponentsProvider, MapContext, MapLibreMap };
