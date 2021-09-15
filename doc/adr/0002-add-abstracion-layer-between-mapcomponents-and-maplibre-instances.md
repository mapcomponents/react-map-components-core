# 2. add abstracion layer between MapComponents and MapLibre instances

Date: 2021-09-15

## Status

Draft

## Context

When interacting only in a direct way with MapLibre instances cleanup functions become very verbose. A lot of if clauses are required when cleaning up everything that has been added to make sure all the required properties are still populated and don't produce errors within the mapLibre-gl code.

## Decision

Create a MapContextMapLibre Class that is returned by the mapContext.getMap function instead of the MapLibre instance itself. The MapContextMapLibre class will hold a reference to the MapLibre instance on its "map" property. It implements addMap, removeLayer, addSource, removeSource, on, off functions. 

## Consequences

Functions addMap, removeLayer, addSource, removeSource, on, off can be safely called without making sure the style property is still populated. An additional parameter MapComponentId on the addLayer, addSource, on functions is possible to keep track of what has been added by a specific component enabling a cleanup function that only expects the MapCOmponentId parameter to clean up everything in one call.
