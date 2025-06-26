import X3D from "x_ite";

export = traverse;

declare function traverse (X3DObject: typeof X3D): typeof Traverse;

/**
 * Static class Traverse to traverse a X3D scene-graph.
 */
declare class Traverse
{
   static readonly NONE: number;
   static readonly EXTERNPROTO_DECLARATIONS: number;
   static readonly PROTO_DECLARATIONS: number;
   static readonly ROOT_NODES: number;
   static readonly IMPORTED_NODES: number;
   static readonly EXTERNPROTO_DECLARATION_SCENE: number;
   static readonly PROTO_DECLARATION_BODY: number;
   static readonly PROTOTYPE_INSTANCES: number;
   static readonly INLINE_SCENE: number;
   static readonly ALL: number;

   /**
    * Traverse object and return all nodes.
    */
   static traverse (object: TraverseObjects, flags?: number): Iterable <TraversedObjects>;

   /**
    * Find all occurrences of object(s) and return all hierarchies.
    */
   static find (scene: X3D .X3DScene, object: FindObjects | Array <FindObjects>, flags?: number): Iterable <Array <FoundObjects>>;
}

type TraverseObjects = X3D .X3DScene
   | X3D .X3DExecutionContext
   | X3D .X3DExternProtoDeclaration
   | X3D .X3DProtoDeclaration
   | X3D .ExternProtoDeclarationArray
   | X3D .ProtoDeclarationArray
   | X3D .SFNode
   | X3D .MFNode
   | Array <X3D .SFNode>;

type TraversedObjects = X3D .X3DScene
   | X3D .X3DExecutionContext
   | X3D .X3DExternProtoDeclaration
   | X3D .X3DProtoDeclaration
   | X3D .SFNode;

type FindObjects = X3D .X3DScene
   | X3D .X3DExecutionContext
   | X3D .X3DExternProtoDeclaration
   | X3D .X3DProtoDeclaration
   | X3D .X3DImportedNode
   | X3D .X3DField
   | X3D .SFNode; // TODO: declare type X3D .X3DBaseNode and add it here.

type FoundObjects = X3D .X3DScene
   | X3D .X3DExecutionContext
   | X3D .X3DExternProtoDeclaration
   | X3D .X3DProtoDeclaration
   | X3D .X3DImportedNode
   | string
   | number
   | X3D .SFNode;

// Augmenting the type definition for X3D namespace:

declare module "x_ite"
{
   interface X3DExecutionContext
   {
      /**
       * Traverse object and return all nodes.
       */
      traverse (flags?: number): Iterable <TraversedObjects>;

      /**
       * Find all occurrences of object and return all hierarchies.
       */
      find (object: FindObjects, flags?: number): Iterable <Array <FoundObjects>>;
   }

   interface X3DExternProtoDeclaration
   {
      /**
       * Traverse object and return all nodes.
       */
      traverse (flags?: number): Iterable <TraversedObjects>;
   }

   interface X3DProtoDeclaration
   {
      /**
       * Traverse object and return all nodes.
       */
      traverse (flags?: number): Iterable <TraversedObjects>;
   }

   interface NamedNodesArray
   {
      /**
       * Traverse object and return all nodes.
       */
      traverse (flags?: number): Iterable <TraversedObjects>;
   }

   interface ExternProtoDeclarationArray
   {
      /**
       * Traverse object and return all nodes.
       */
      traverse (flags?: number): Iterable <TraversedObjects>;
   }

   interface ProtoDeclarationArray
   {
      /**
       * Traverse object and return all nodes.
       */
      traverse (flags?: number): Iterable <TraversedObjects>;
   }

   interface SFNode
   {
      /**
       * Traverse object and return all nodes.
       */
      traverse (flags?: number): Iterable <TraversedObjects>;
   }

   interface MFNode
   {
      /**
       * Traverse object and return all nodes.
       */
      traverse (flags?: number): Iterable <TraversedObjects>;
   }
}
