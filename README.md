![MapComponents](https://avatars.githubusercontent.com/u/64851912)
# [MapComponents Core](https://mapcomponents.org/) &middot;

A React component library for declarative web map application development.

## Usage / Installation

1. ```yarn add react-map-components-core"``` to install and add this package as a dependency to your projects package.json

## Available Scripts

### `yarn build`

Build the component library and save it to ```./dist```.

### `yarn test` or `yarn test --coverage --watchall=false`

Run tests.

## Components

### MapComponentsProvider

MapComponentsProvider must be imported and wrapped around component where at least one of its child nodes requires access to the MapLibre-gl instance.
MapComponentsProvider must be used one level higher than the first use of MapContext.

MapComponentsProvider requires exactly one use of the MapLibreMap component somewhere down the component tree that will create the MapLibre-gl instance and set the reference at MapContext.map.

### MapContext

The MapContext component can be used to access the registered map-eninge instances from components located in the component tree somewhere below the MapComponentsProvider.
Import the useContext hook from react and the MapContext component from react-map-components-core (both named exports).

```js
import { useContext } from "react";
import { MapContext } from "react-map-components-core";
```
In the body of your function component add the following:
```js
const mapContext = useContext(MapContext);
```
You can now retrieve map-engine instances using `mapContext.getMap(mapId)`
