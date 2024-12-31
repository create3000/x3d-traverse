(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["traverse"] = factory();
	else
		root["traverse"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const traverses = new WeakMap ();

function createTraverse (X3D)
{
   // class Traverse

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

      static traverse (object, flags = this .NONE)
      {
         const seen = new Set ();

         switch (true)
         {
            case object instanceof X3D .X3DExecutionContext:
               return this .#traverseScene (object, flags, seen);
            case object instanceof X3D .NamedNodesArray:
            case object instanceof X3D .ExternProtoDeclarationArray:
            case object instanceof X3D .ProtoDeclarationArray:
            case object instanceof X3D .MFNode:
            case Array .isArray (object):
               return this .#traverseNodes (object, flags, seen);
            case object instanceof X3D .SFNode:
               return this .#traverseNode (object .getValue (), flags, seen);
            case object instanceof X3D .X3DBaseNode:
               return this .#traverseNode (object, flags, seen);
         }
      }

      static *#traverseScene (executionContext, flags, seen)
      {
         if (!executionContext)
            return;

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

         yield node instanceof X3D .X3DNode
            ? X3D .SFNodeCache .get (node)
            : node;
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

      static find (scene, object, flags = this .NONE)
      {
         const
            hierarchy = [ ],
            seen      = new Set ();

         if (object instanceof X3D .SFNode)
         {
            if (object === X3D .SFNodeCache .get (object .getValue ()))
               object = object .getValue ();
         }

         return this .#findInScene (scene, object, flags, hierarchy, seen);
      }

      static *#findInScene (executionContext, object, flags, hierarchy, seen)
      {
         if (!executionContext)
            return;

         hierarchy .push (executionContext);

         if (executionContext === object)
         {
            yield hierarchy .slice ();
         }
         else
         {
            if (flags & this .EXTERNPROTO_DECLARATIONS)
            {
               const externprotos = executionContext .getExternProtoDeclarations ();

               hierarchy .push ("externprotos");

               for (const [i, externproto] of externprotos .entries ())
               {
                  yield* this .#findInNode (externproto, object, flags, hierarchy, seen);

                  hierarchy .pop ();
               }

               hierarchy .pop ();
            }

            if (flags & this .PROTO_DECLARATIONS)
            {
               const prototypes = executionContext .getProtoDeclarations ();

               hierarchy .push ("protos");

               for (const [i, prototype] of prototypes .entries ())
               {
                  hierarchy .push (i);

                  yield* this .#findInNode (prototype, object, flags, hierarchy, seen);

                  hierarchy .pop ();
               }

               hierarchy .pop ();
            }

            if (flags & this .ROOT_NODES)
            {
               const rootNodes = executionContext .getRootNodes ();

               hierarchy .push ("rootNodes");

               for (const [i, rootNode] of rootNodes .entries ())
               {
                  hierarchy .push (i);

                  yield* this .#findInNode (rootNode ?.getValue (), object, flags, hierarchy, seen);

                  hierarchy .pop ();
               }

               hierarchy .pop ();
            }

            if (flags & this .IMPORTED_NODES)
            {
               hierarchy .push ("importedNodes");

               for (const [i, importedNode] of executionContext .getImportedNodes () .entries ())
               {
                  hierarchy .push (i);
                  hierarchy .push (importedNode);

                  if (importedNode === object)
                  {
                     yield hierarchy .slice ();
                  }
                  else
                  {
                     try
                     {
                        const exportedNode = importedNode .getExportedNode ();

                        yield* this .#findInNode (exportedNode, object, flags, hierarchy, seen);
                     }
                     catch (error)
                     {
                        //console .log (error .message)
                     }
                  }

                  hierarchy .pop ();
                  hierarchy .pop ();
               }

               hierarchy .pop ();
            }
         }

         hierarchy .pop ();
      }

      static *#findInNode (node, object, flags, hierarchy, seen)
      {
         if (!node)
            return;

         if (seen .has (node))
            return;

         seen .add (node);
         hierarchy .push (node instanceof X3D .X3DNode ? X3D .SFNodeCache .get (node) : node);

         if (node .valueOf () === object ?.valueOf ())
         {
            yield hierarchy .slice ();
         }
         else
         {
            if (!node .getType () .includes (X3D .X3DConstants .X3DExternProtoDeclaration))
            {
               yield* this .#findInFields (node .getUserDefinedFields (), object, flags, hierarchy, seen);
               yield* this .#findInFields (node .getPredefinedFields (),  object, flags, hierarchy, seen);
            }

            const type = node .getType ();

            for (let t = type .length - 1; t >= 0; -- t)
            {
               switch (type [t])
               {
                  case X3D .X3DConstants .X3DExternProtoDeclaration:
                  {
                     if (flags & this .EXTERNPROTO_DECLARATION_SCENE)
                        yield* this .#findInScene (node .getInternalScene (), object, flags, hierarchy, seen);

                     break;
                  }
                  case X3D .X3DConstants .X3DProtoDeclaration:
                  {
                     if (flags & this .PROTO_DECLARATION_BODY)
                        yield* this .#findInScene (node .getBody (), object, flags, hierarchy, seen);

                     break;
                  }
                  case X3D .X3DConstants .X3DPrototypeInstance:
                  {
                     if (flags & this .PROTOTYPE_INSTANCES)
                        yield* this .#findInScene (node .getBody (), object, flags, hierarchy, seen);

                     break;
                  }
                  case X3D .X3DConstants .Inline:
                  {
                     if (flags & this .INLINE_SCENE)
                        yield* this .#findInScene (node .getInternalScene (), object, flags, hierarchy, seen);

                     break
                  }
                  default:
                     break;
               }
            }
         }

         hierarchy .pop ();
         seen .delete (node);
      }

      static *#findInFields (fields, object, flags, hierarchy, seen)
      {
         for (const field of fields)
         {
            hierarchy .push (field .getName ());

            if (field === object)
            {
               yield hierarchy .slice ();
            }
            else
            {
               switch (field .getType ())
               {
                  case X3D .X3DConstants .SFNode:
                  {
                     yield* this .#findInNode (field .getValue (), object, flags, hierarchy, seen);
                     break;
                  }
                  case X3D .X3DConstants .MFNode:
                  {
                     for (const [i, node] of field .entries ())
                     {
                        hierarchy .push (i);

                        yield* this .#findInNode (node ?.getValue (), object, flags, hierarchy, seen);

                        hierarchy .pop ();
                     }

                     break;
                  }
                  default:
                     break;
               }
            }

            hierarchy .pop ();
         }
      }
   }

   // Add traverse to classes.

   X3D .X3DExecutionContext .prototype .traverse = function (flags = Traverse .ROOT_NODES)
   {
      return Traverse .traverse (this, flags);
   };

   X3D .X3DExternProtoDeclaration .prototype .traverse = function (flags)
   {
      return Traverse .traverse (this, flags);
   };

   X3D .X3DProtoDeclaration .prototype .traverse = function (flags)
   {
      return Traverse .traverse (this, flags);
   };

   X3D .NamedNodesArray .prototype .traverse = function (flags)
   {
      return Traverse .traverse (this, flags);
   };

   X3D .ExternProtoDeclarationArray .prototype .traverse = function (flags)
   {
      return Traverse .traverse (this, flags);
   };

   X3D .ProtoDeclarationArray .prototype .traverse = function (flags)
   {
      return Traverse .traverse (this, flags);
   };

   X3D .SFNode .prototype .traverse = function (flags)
   {
      return Traverse .traverse (this, flags);
   };

   X3D .MFNode .prototype .traverse = function (flags)
   {
      return Traverse .traverse (this, flags);
   };

   // Add find to classes.

   X3D .X3DExecutionContext .prototype .find = function (object, flags = Traverse .ROOT_NODES)
   {
      return Traverse .find (this, object, flags);
   };

   // Finish

   traverses .set (X3D, Traverse);

   return Traverse;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(X3D)
{
   return traverses .get (X3D) ?? createTraverse (X3D);
};

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});