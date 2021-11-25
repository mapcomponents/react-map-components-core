import babel from "@rollup/plugin-babel";
import external from "rollup-plugin-peer-deps-external";

import del from "rollup-plugin-delete";
import pkg from "./package.json";
import typescript from "@rollup/plugin-typescript";

export default {
  input: pkg.source,
  output: [
    { file: pkg.module, format: "esm", sourcemap:true },
    { file: pkg.main, format: "cjs", sourcemap:true },
  ],
  plugins: [
    typescript({
      tsconfig: "tsconfig.json",
      module: "esnext",
    }),
    external(),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "bundled",
    }),
    del({ targets: ["dist/*"] }),
  ],
  external: ["prop-types","d3", 'react', ...Object.keys(pkg.peerDependencies || {})],
};
