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
   expect (nodes .every (node => node instanceof X3D .SFNode)) .toBe (true);
   expect (nodes .filter (node => node .getNodeType () .at (-1) === X3D .X3DConstants .WorldInfo)) .toHaveLength (1);
   expect (nodes .filter (node => node .getNodeType () .at (-1) === X3D .X3DConstants .NavigationInfo)) .toHaveLength (1);
   expect (nodes .filter (node => node .getNodeType () .at (-1) === X3D .X3DConstants .Background)) .toHaveLength (1);
   expect (nodes .filter (node => node .getNodeType () .at (-1) === X3D .X3DConstants .Viewpoint)) .toHaveLength (1);
   expect (nodes .filter (node => node .getNodeType () .at (-1) === X3D .X3DConstants .Transform)) .toHaveLength (1);
   expect (nodes .filter (node => node .getNodeType () .at (-1) === X3D .X3DConstants .Shape)) .toHaveLength (1);
   expect (nodes .filter (node => node .getNodeType () .at (-1) === X3D .X3DConstants .Appearance)) .toHaveLength (1);
   expect (nodes .filter (node => node .getNodeType () .at (-1) === X3D .X3DConstants .Material)) .toHaveLength (1);
   expect (nodes .filter (node => node .getNodeType () .at (-1) === X3D .X3DConstants .ImageTexture)) .toHaveLength (1);
   expect (nodes .filter (node => node .getNodeType () .at (-1) === X3D .X3DConstants .TextureTransform)) .toHaveLength (1);
   expect (nodes .filter (node => node .getNodeType () .at (-1) === X3D .X3DConstants .Box)) .toHaveLength (1);
});
