# x3d-traverse

Traverse X3D nodes and scenes to filter, process and analyze nodes.

## Installation

### Node

```sh
npm i x3d-traverse
```

### Browser

```js
import traverse from "https://cdn.jsdelivr.net/npm/x3d-traverse@latest/dist/x3d-traverse.mjs";
```

## Usage

The package can be used with CJS `require` or with ES6 `import` statement;

```js
import X3D      from "x_ite";
import traverse from "x3d-traverse";

const Traverse = traverse (X3D);
const canvas   = X3D .createBrowser ();
const browser  = canvas .browser;
const scene    = await browser .createX3DFromURL (new X3D .MFString ("https://create3000.github.io/media/examples/Geometry3D/Box/Box.x3d"));

// Traverse all root nodes and its successors.
for (const node of scene .rootNodes .traverse ())
   console .log (node .getNodeTypeName ());
```

## See Also

* [X_ITE](https://create3000.github.io/x_ite/)
