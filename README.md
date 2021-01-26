# react-map-components-core

Library of react components for rapid web map application creation.

## Usage / Installation

Add this line to the dependency array of your package.json

```"react-map-components-core":"git+ssh://git@repo.wheregroup.com:tweber/react-map-components-core.git#master"```

If your ssh key has a password ```npm install``` will prompt for that while asynchronously proceeding to install all the other dependencies (it may appear frozen). ```history -d -2``` if your password accidentally ends up in bash history.
To update the package remove the corresponding lines from package-lock.json and run ```npm i``` again. This process will be more convenient once it is published as an npm module.

In this state it is better to just ```ǹpm update && npm run build``` this project after updating it and copying the contents of dist to ```{Project_folder}/node_modules/react-map-components-core/dist```.


## Available Scripts

### `npm update && npm run build`

Build the component library and save it to ```./dist```.
