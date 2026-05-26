const
   X3D      = require ("x_ite"),
   Traverse = require ("../");

test ("basic", async () =>
{
   expect (Traverse) .toBeInstanceOf (Object);
   expect (Traverse) .toBe (require ("../"));
   expect (Traverse .NONE) .toBe (0);
});
