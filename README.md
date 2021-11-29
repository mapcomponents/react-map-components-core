<img src="https://avatars.githubusercontent.com/u/64851912" alt="MapComponents logo" width="200"/>

# [MapComponents Core](https://mapcomponents.org/)

A React component library for declarative web map application development.


[![npm version](https://badge.fury.io/js/@mapcomponents%2Freact-core.svg)](https://badge.fury.io/js/@mapcomponents%2Freact-core) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) ![downloads](https://img.shields.io/npm/dt/@mapcomponents%2Freact-core.svg) ![downloads](https://img.shields.io/npm/dm/@mapcomponents%2Freact-core.svg)

![Tests](https://github.com/mapcomponents/react-map-components-core/actions/workflows/node_version_test.yml/badge.svg)
## Usage / Installation

1. ```yarn add @mapcomponents/react-core``` to install and add this package as a dependency to your projects package.json

## Available Scripts

### `yarn build`

Build esm and csm packages and save them to ```./dist```.

### `yarn test` or `yarn test --coverage --watchall=false`

Run tests and watch & rerun tests for affected components if the filesystem changes.

## Components

### MapComponentsProvider

MapComponentsProvider must be imported and wrapped around all MapComponents.

MapComponentsProvider requires exactly one use of the MapLibreMap or OpenLayersMap components somewhere down the component tree that will create a map engine instance and register it to MapContext (using ```mapContext.registerMap()```).

### MapContext

The MapContext component can be used to access the registered map eninge instances from components located in the component tree somewhere below MapComponentsProvider.
Import the useContext hook from React and the MapContext component from react-map-components-core (both named exports).

```js
import { useContext } from "react";
import { MapContext } from "react-map-components-core";
```
In the body of your function component add the following:
```js
const mapContext = useContext(MapContext);
```
You can now retrieve map engine instances using `mapContext.getMap(mapId)`
