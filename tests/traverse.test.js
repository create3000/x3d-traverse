const
   X3D      = require ("x_ite-node"),
   Traverse = require ("../") (X3D),
   path     = require ("path"),
   url      = require ("url");

const { browser } = X3D .createBrowser ();

test ("Traverse.traverse", async () =>
{
   const scene = await browser .createX3DFromURL (new X3D .MFString (url .pathToFileURL (path .join (__dirname, "files/Box/Box.x3d"))));

   for (const node of Traverse .traverse (scene .rootNodes))
      expect (node .getNodeTypeName ()) .not .toHaveLength (0);
});

test ("MFNode.traverse", async () =>
{
   const names = [
      "WorldInfo",
      "NavigationInfo",
      "Background",
      "Viewpoint",
      "Material",
      "ImageTexture",
      "TextureTransform",
      "Appearance",
      "Box",
      "Shape",
      "Transform",
   ];

   const scene = await browser .createX3DFromURL (new X3D .MFString (url .pathToFileURL (path .join (__dirname, "files/Box/Box.x3d"))));

   expect (scene .rootNodes) .not .toHaveLength (0);

   const nodes1 = Array .from (scene .rootNodes .traverse ());

   expect (scene .rootNodes) .toHaveLength (5);
   expect (nodes1) .toHaveLength (11);
   expect (nodes1 .every (node => node instanceof X3D .SFNode)) .toBe (true);
   expect (nodes1 .filter (node => node .getNodeType () .at (-1) === X3D .X3DConstants .WorldInfo)) .toHaveLength (1);
   expect (nodes1 .filter (node => node .getNodeType () .at (-1) === X3D .X3DConstants .NavigationInfo)) .toHaveLength (1);
   expect (nodes1 .filter (node => node .getNodeType () .at (-1) === X3D .X3DConstants .Background)) .toHaveLength (1);
   expect (nodes1 .filter (node => node .getNodeType () .at (-1) === X3D .X3DConstants .Viewpoint)) .toHaveLength (1);
   expect (nodes1 .filter (node => node .getNodeType () .at (-1) === X3D .X3DConstants .Transform)) .toHaveLength (1);
   expect (nodes1 .filter (node => node .getNodeType () .at (-1) === X3D .X3DConstants .Shape)) .toHaveLength (1);
   expect (nodes1 .filter (node => node .getNodeType () .at (-1) === X3D .X3DConstants .Appearance)) .toHaveLength (1);
   expect (nodes1 .filter (node => node .getNodeType () .at (-1) === X3D .X3DConstants .Material)) .toHaveLength (1);
   expect (nodes1 .filter (node => node .getNodeType () .at (-1) === X3D .X3DConstants .ImageTexture)) .toHaveLength (1);
   expect (nodes1 .filter (node => node .getNodeType () .at (-1) === X3D .X3DConstants .TextureTransform)) .toHaveLength (1);
   expect (nodes1 .filter (node => node .getNodeType () .at (-1) === X3D .X3DConstants .Box)) .toHaveLength (1);
   expect (nodes1 .map (node => node .getNodeTypeName ())) .toEqual (names);

   const nodes2 = Array .from (scene .traverse ());

   expect (nodes2) .toHaveLength (12);
   expect (nodes2 .filter (node => node instanceof X3D .X3DScene)) .toHaveLength (1);
   expect (nodes2 .filter (node => node instanceof X3D .SFNode) .map (node => node .getNodeTypeName ())) .toEqual (names);
});

test ("null", async () =>
{
   const scene = await browser .createX3DFromString (`
Group {
   children [NULL, NULL]
}
NULL
NULL
   `);

   const nodes = Array .from (scene .rootNodes .traverse ());

   expect (nodes) .toHaveLength (1);
   expect (nodes [0] .getNodeTypeName ()) .toBe ("Group");
});
