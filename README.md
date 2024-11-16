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

The package can be used with CJS `require` or with ES6 `import` statement:

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

## Flags

* `Traverse.NONE`
* `Traverse.EXTERNPROTO_DECLARATIONS`
* `Traverse.PROTO_DECLARATIONS`
* `Traverse.ROOT_NODES`
* `Traverse.IMPORTED_NODES`
* `Traverse.EXTERNPROTO_DECLARATION_SCENE`
* `Traverse.PROTO_DECLARATION_BODY`
* `Traverse.PROTOTYPE_INSTANCES`
* `Traverse.INLINE_SCENE`
* `Traverse.ALL`

## Traverse

There is a method `traverse` on some nodes listed here:

* `X3DScene.prototype.traverse (flags?: number): Iterable <TraversedObjects>`
* `X3DExecutionContext.prototype.traverse (flags?: number): Iterable <TraversedObjects>`
* `X3DExternProtoDeclaration.prototype.traverse (flags?: number): Iterable <TraversedObjects>`
* `X3DProtoDeclaration.prototype.traverse (flags?: number): Iterable <TraversedObjects>`
* `ExternProtoDeclarationArray.prototype.traverse (flags?: number): Iterable <TraversedObjects>`
* `ProtoDeclarationArray.prototype.traverse (flags?: number): Iterable <TraversedObjects>`
* `SFNode.prototype.traverse (flags?: number): Iterable <TraversedObjects>`
* `MFNode.prototype.traverse (flags?: number): Iterable <TraversedObjects>`

### traverse (flags?: number): Iterable <TraversedObjects>

Traverse all objects and its successors. Return every node on its way through the scene graph tree.

## Find

There is a method `find` on some nodes listed here:

* `X3DScene.prototype.find (object: FindObjects, flags?: number): Iterable <Array <FoundObjects>>;`
* `X3DExecutionContext.prototype.find (object: FindObjects, flags?: number): Iterable <Array <FoundObjects>>;`

### find (object: FindObjects, flags?: number): Iterable <Array <FoundObjects>>

Traverse all objects and its successors. Returns an array of all paths of the object to be found.
The parameter *object can be of type:

* `X3DScene`
* `X3DExecutionContext`
* `X3DExternProto`

## See Also

* [X_ITE](https://create3000.github.io/x_ite/)
