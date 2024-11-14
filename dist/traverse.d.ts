export = traverse;

declare function traverse(X3D: typeof X3D): typeof Traverse;

class Traverse
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
    * Traverse object.
    */
   static *traverse (object: any, flags?: number = 0): Iterable <X3D .SFNode>;
}
