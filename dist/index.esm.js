import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __spreadArray(to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
}

var MapContext = React.createContext({});
var MapContextProvider = MapContext.Provider;

var MapComponentsProvider = function (_a) {
    var children = _a.children;
    var _b = useState(undefined), map = _b[0], setMap = _b[1];
    var _c = useState([]), mapIds = _c[0], setMapIds = _c[1];
    var mapIds_raw = useRef([]);
    var maps = useRef({});
    var value = {
        map: map,
        setMap: function (mapInstance) {
            setMap(mapInstance);
            if (mapIds.length === 0) {
                setMapIds(__spreadArray(__spreadArray([], mapIds), ['map_1']));
                maps.current['map_1'] = mapInstance;
            }
        },
        maps: maps.current,
        mapIds: mapIds,
        registerMap: function (mapId, mapInstance) {
            if (mapId && mapInstance) {
                console.log('register map');
                maps.current[mapId] = mapInstance;
                mapIds_raw.current.push(mapId);
                setMapIds(__spreadArray([], mapIds_raw.current));
                console.log(mapIds_raw.current);
                if (!map) {
                    setMap(mapInstance);
                }
            }
        },
        mapExists: function (mapId) {
            if (mapId && mapIds.indexOf(mapId) === -1) {
                return false;
            }
            else if (!mapId && !map) {
                return false;
            }
            return true;
        },
        getMap: function (mapId) {
            if (mapId && mapIds.indexOf(mapId) !== -1) {
                return maps.current[mapId];
            }
            else if (!mapId && map) {
                return map;
            }
            return null;
        },
    };
    return React.createElement(MapContextProvider, { value: value }, children);
};
MapComponentsProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

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

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

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

          if (typeof props.formatData === 'function') {
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
  return /*#__PURE__*/React.createElement(SimpleDataContextProvider, {
    value: value
  }, props.children);
};

SimpleDataProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { MapComponentsProvider, MapContext, SimpleDataContext, SimpleDataProvider };
//# sourceMappingURL=index.esm.js.map
