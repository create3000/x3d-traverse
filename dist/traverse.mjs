/******/ // The require scope
/******/ var __webpack_require__ = {};
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const objects = new WeakMap ();

function createTraverse (X3D)
{
   let flags = 1;

   class Traverse
   {
      static NONE                          = 0;
      static EXTERNPROTO_DECLARATIONS      = flags;
      static PROTO_DECLARATIONS            = flags <<= 1;
      static ROOT_NODES                    = flags <<= 1;
      static IMPORTED_NODES                = flags <<= 1;
      static EXTERNPROTO_DECLARATION_SCENE = flags <<= 1;
      static PROTO_DECLARATION_BODY        = flags <<= 1;
      static PROTOTYPE_INSTANCES           = flags <<= 1;
      static INLINE_SCENE                  = flags <<= 1;
      static ALL                           = (flags << 1) - 1;

      /**
       *
       * @param {X3DScene|X3DExecutionContext|MFNode|Array<SFNode>|SFNode} object
       * @param {number} flags
       * @returns boolean
       */
      static *traverse (object, flags)
      {
         const seen = new Set ()

         if (object instanceof X3D .X3DExecutionContext)
            yield* this .#traverseScene (object, flags, seen);

         if (object instanceof X3D .ExternProtoDeclarationArray)
            yield* this .#traverseNodes (object, flags, seen);

         if (object instanceof X3D .ProtoDeclarationArray)
            yield* this .#traverseNodes (object, flags, seen);

         if (object instanceof X3D .SFNode)
            yield* this .#traverseNode (object .getValue (), flags, seen);

         if (object instanceof X3D .MFNode || Array .isArray (object))
            yield* this .#traverseNodes (object, flags, seen);

         if (object instanceof X3D .X3DBaseNode)
            yield* this .#traverseNode (object, flags, seen);
      }

      static *#traverseScene (executionContext, flags, seen)
      {
         if (!executionContext)
            return true;

         if (flags & Traverse .EXTERNPROTO_DECLARATIONS)
         {
            for (const externproto of executionContext .externprotos)
               yield* this .#traverseNode (externproto, flags, seen);
         }

         if (flags & Traverse .PROTO_DECLARATIONS)
         {
            for (const proto of executionContext .protos)
               yield* this .#traverseNode (proto, flags, seen);
         }

         if (flags & Traverse .ROOT_NODES)
         {
            yield* this .#traverseNodes (executionContext .rootNodes, flags, seen);
         }

         yield executionContext;
      }

      static *#traverseNodes (nodes, flags, seen)
      {
         for (const node of nodes)
         {
            yield* this .#traverseNode (node instanceof X3D .SFNode ? node .getValue () : node, flags, seen);
         }

         return true;
      }

      static *#traverseNode (node, flags, seen)
      {
         if (!node)
            return;

         if (seen .has (node))
            return;

         seen .add (node);

         yield* this .#traverseFields (node .getUserDefinedFields (), flags, seen);
         yield* this .#traverseFields (node .getPredefinedFields (),  flags, seen);

         const type = node .getType ();

         for (let t = type .length - 1; t >= 0; -- t)
         {
            switch (type [t])
            {
               case X3D .X3DConstants .X3DExternProtoDeclaration:
               {
                  if (flags & this .EXTERNPROTO_DECLARATION_SCENE)
                  {
                     yield* this .#traverseScene (node .getInternalScene (), flags, seen);
                  }

                  break;
               }
               case X3D .X3DConstants .X3DProtoDeclaration:
               {
                  if (flags & Traverse .PROTO_DECLARATION_BODY)
                  {
                     yield* this .#traverseScene (node .getBody (), flags, seen);
                  }

                  break;
               }
               case X3D .X3DConstants .X3DPrototypeInstance:
               {
                  if (flags & Traverse .PROTOTYPE_INSTANCES)
                  {
                     yield* this .#traverseScene (node .getBody (), flags, seen);
                  }

                  break;
               }
               case X3D .X3DConstants .Inline:
               {
                  if (flags & this .INLINE_SCENE)
                  {
                     yield* this .#traverseScene (node .getInternalScene (), flags, seen);;
                  }

                  break;
               }
               default:
               {
                  continue;
               }
            }

            break;
         }

         yield X3D .SFNodeCache .get (node);
      }

      static *#traverseFields (fields, flags, seen)
      {
         for (const field of fields)
         {
            switch (field .getType ())
            {
               case X3D .X3DConstants .SFNode:
               {
                  yield* this .#traverseNode (field .getValue (), flags, seen);;
                  break;
               }
               case X3D .X3DConstants .MFNode:
               {
                  yield* this .#traverseNodes (field, flags, seen);;
                  break;
               }
            }
         }
      }
   }

   objects .set (X3D, Traverse);

   X3D .SFNode .prototype .traverse = function* (flags)
   {
      yield* Traverse .traverse (this, flags);
   };

   X3D .MFNode .prototype .traverse = function* (flags)
   {
      yield* Traverse .traverse (this, flags);
   };

   X3D .X3DExecutionContext .prototype .traverse = function* (flags)
   {
      yield* Traverse .traverse (this, flags);
   };

   X3D .ProtoDeclarationArray .prototype .traverse = function* (flags)
   {
      yield* Traverse .traverse (this, flags);
   };

   X3D .ExternProtoDeclarationArray .prototype .traverse = function* (flags)
   {
      yield* Traverse .traverse (this, flags);
   };

   return Traverse;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(X3D)
{
   return objects .get (X3D) ?? createTraverse (X3D);
};

var __webpack_exports__default = __webpack_exports__.A;
export { __webpack_exports__default as default };