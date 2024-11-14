const objects = new WeakMap ();

function createTraverse (X3D)
{
   const Traverse = {

   };

   objects .set (X3D, Traverse);

   return Traverse;
}

module .exports = function (X3D)
{
   return objects .get (X3D) ?? createTraverse (X3D);
};
