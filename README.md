# x3d-traverse

[![npm Version](https://badgen.net/npm/v/x3d-traverse)](https://www.npmjs.com/package/x3d-traverse)
[![npm Downloads](https://badgen.net/npm/dm/x3d-traverse)](https://npmtrends.com/x3d-traverse)
[![DeepScan grade](https://deepscan.io/api/teams/23540/projects/28574/branches/920517/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=23540&pid=28574&bid=920517)

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
* `Traverse.IMPORTED_ROOT_NODES`
* `Traverse.EXTERNPROTO_DECLARATION_SCENE`
* `Traverse.PROTO_DECLARATION_BODY`
* `Traverse.PROTOTYPE_INSTANCES`
* `Traverse.INLINE_SCENE`
* `Traverse.ALL`

## Traverse

There is a method `traverse` on some classes listed here:

* `X3DScene.prototype.traverse`
* `X3DExecutionContext.prototype.traverse`
* `X3DExternProtoDeclaration.prototype.traverse`
* `X3DProtoDeclaration.prototype.traverse`
* `NamedNodesArray.prototype.traverse`
* `ExternProtoDeclarationArray.prototype.traverse`
* `ProtoDeclarationArray.prototype.traverse`
* `SFNode.prototype.traverse`
* `MFNode.prototype.traverse`

### traverse (flags?: number): Iterable \<TraversedObjects\>

Traverse all objects and its successors. Returns every node on its way through the scene graph tree.

The *flags* parameter is a number `or`ed, for instance like this: `Traverse .ROOT_NODES | Traverse .PROTO_DECLARATIONS`.

The return value is an iterator with all traversed object, which can be of type:

* `X3DScene`
* `X3DExecutionContext`
* `X3DExternProtoDeclaration`
* `X3DProtoDeclaration`
* `SFNode`

### Traverse.traverse (object: TraverseObjects, flags?: number): Iterable \<TraversedObjects\>

There is also a method `Traverse.traverse` with an additional first argument `object`, which can be of type:

* `X3DScene`
* `X3DExecutionContext`
* `X3DExternProtoDeclaration`
* `X3DProtoDeclaration`
* `NamedNodesArray`
* `ExternProtoDeclarationArray`
* `ProtoDeclarationArray`
* `MFNode`
* `Array <SFNode | X3DExternProtoDeclaration | X3DProtoDeclaration>`
* `SFNode`

## Find

There is a method `find` on some classes listed here:

* `X3DScene.prototype.find`
* `X3DExecutionContext.prototype.find`

### find (object: FindObjects | Array \<FindObjects\>, flags?: number): Iterable \<Array \<FoundObjects\>\>

Traverse all objects and its successors. Returns an array of all paths of the object to be found.

The parameter *object can be of type:

* `X3DScene`
* `X3DExecutionContext`
* `X3DExternProtoDeclaration`
* `X3DProtoDeclaration`
* `X3DImportedNode`
* `X3DField`
* `SFNode`

The *flags* parameter is a number `or`ed, for instance like this: `Traverse .ROOT_NODES | Traverse .PROTO_DECLARATIONS`.

The array of found objects contains a list with the `X3DExecutionContext`, the `X3DField` name, maybe the index in the `X3DArrayField`, the `SFNode`, and then everything repeats with the X3DField name.

### Traverse.find (scene: X3DScene, object: FindObjects | Array \<FindObjects\>, flags?: number): Iterable \<Array \<FoundObjects\>\>

There is also a method `Traverse.find` with an additional first argument `scene`, which can be of type:

* `X3DScene`
* `X3DExecutionContext`

## See Also

* [X_ITE](https://create3000.github.io/x_ite/) - X3D Browser
