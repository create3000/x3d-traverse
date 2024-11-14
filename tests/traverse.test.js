const
   X3D      = require ("x_ite-node"),
   Traverse = require ("../") (X3D);

test ("first", () =>
{
   expect (Traverse) .toBeInstanceOf (Object);
});
