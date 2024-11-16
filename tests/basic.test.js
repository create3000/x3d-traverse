const
   X3D      = require ("x_ite-node"),
   Traverse = require ("../") (X3D);

test ("basic", async () =>
{
   expect (Traverse) .toBeInstanceOf (Object);
   expect (Traverse) .toBe (require ("../") (X3D));
   expect (Traverse .NONE) .toBe (0);
});
