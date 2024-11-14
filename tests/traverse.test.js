const
   X3D      = require ("x_ite-node"),
   Traverse = require ("../") (X3D);

const { browser } = X3D .createBrowser ();

test ("first", async () =>
{
   expect (Traverse) .toBeInstanceOf (Object);
});

test ("MFNode", async () =>
{
   const scene = await browser .createX3DFromURL (new X3D .MFString ("https://create3000.github.io/media/examples/Geometry3D/Box/Box.x3d"));

   expect (scene .rootNodes) .not .toHaveLength (0);

   const nodes = Array .from (scene .rootNodes .traverse ());

   expect (scene .rootNodes) .toHaveLength (5);
   expect (nodes) .toHaveLength (11);
});
