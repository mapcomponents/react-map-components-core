# react-map-components-core

Library of react components for rapid web map application creation.

## Usage / Installation

Add this line to the dependency array of your package.json

```"react-map-components-core": "https://map_components:k3zW6xJmx-nqVCv_H1eq@repo.wheregroup.com/tweber/react-map-components-core.git#master"```

and run ```yarn install```

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

### MapLibreMap

The MapLibreMap component will create the MapLibre-gl instance and set the reference at ```MapContext.map``` after the MapLibre-gl load event has fired. That way (since the map refence is created using the useState hook) you can use the react useEffect hook in depending components to access the MapLibre-gl instance like ```useEffect(() => { /** code */ }, [mapContext.map])``` and be sure the code is executed once the MapLibre-gl instance has fired the load event.


### MapContext

The MapContext component can be used to access the MapLibre-gl instance by components located in the component tree somewhere below the MapComponentsProvider.
In the import section import the useContext hook from react and the MapContext component from react-map-components core (both named exports).

```
import { useContext } from "react";
import { MapContext } from "react-map-components-core";
```
In body of your function component add the following:
```
const mapContext = useContext(MapContext);
```
You can now access the MapLibreMaps component through ```mapContext.map```
