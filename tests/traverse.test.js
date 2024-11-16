const
   X3D      = require ("x_ite-node"),
   Traverse = require ("../") (X3D),
   path     = require ("path"),
   url      = require ("url");

const { browser } = X3D .createBrowser ();

test ("basic", async () =>
{
   expect (Traverse) .toBeInstanceOf (Object);
   expect (Traverse) .toBe (require ("../") (X3D));
   expect (Traverse .NONE) .toBe (0);
});

test ("traverse1", async () =>
{
   const scene = await browser .createX3DFromURL (new X3D .MFString (url .pathToFileURL (path .join (__dirname, "files/Box/Box.x3d"))));

   for (const node of Traverse .traverse (scene .rootNodes))
      expect (node .getNodeTypeName ()) .not .toHaveLength (0);
});

test ("traverse2", async () =>
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

test ("find1", async () =>
{
   const scene = await browser .createX3DFromURL (new X3D .MFString (url .pathToFileURL (path .join (__dirname, "files/Box/Box.x3d"))));

   const appearanceNode = scene .rootNodes .at (-1) .children [0] .appearance;
   const hierarchies1   = Array .from (scene .find (appearanceNode));

   expect (hierarchies1) .toHaveLength (1);
   expect (hierarchies1 [0]) .toBeInstanceOf (Array);
   expect (hierarchies1 [0]) .toHaveLength (9);

   expect (hierarchies1 [0] [0]) .toBe (scene);
   expect (hierarchies1 [0] [1]) .toBe ("rootNodes");
   expect (hierarchies1 [0] [2]) .toBe (4);
   expect (hierarchies1 [0] [3]) .toBeInstanceOf (X3D .SFNode);
   expect (hierarchies1 [0] [3] .getNodeTypeName ()) .toBe ("Transform");
   expect (hierarchies1 [0] [4]) .toBe ("children");
   expect (hierarchies1 [0] [5]) .toBe (0);
   expect (hierarchies1 [0] [6]) .toBeInstanceOf (X3D .SFNode);
   expect (hierarchies1 [0] [6] .getNodeTypeName ()) .toBe ("Shape");
   expect (hierarchies1 [0] [7]) .toBe ("appearance");
   expect (hierarchies1 [0] [8]) .toBeInstanceOf (X3D .SFNode);
   expect (hierarchies1 [0] [8] .getNodeTypeName ()) .toBe ("Appearance");
   expect (hierarchies1 [0] [8]) .toBe (appearanceNode);

   const hierarchies2 = Array .from (scene .find (appearanceNode .getField ("material")));

   expect (hierarchies2) .toHaveLength (1);
   expect (hierarchies2 [0]) .toBeInstanceOf (Array);
   expect (hierarchies2 [0]) .toHaveLength (10);

   expect (hierarchies2 [0] [0]) .toBe (scene);
   expect (hierarchies2 [0] [1]) .toBe ("rootNodes");
   expect (hierarchies2 [0] [2]) .toBe (4);
   expect (hierarchies2 [0] [3]) .toBeInstanceOf (X3D .SFNode);
   expect (hierarchies2 [0] [3] .getNodeTypeName ()) .toBe ("Transform");
   expect (hierarchies2 [0] [4]) .toBe ("children");
   expect (hierarchies2 [0] [5]) .toBe (0);
   expect (hierarchies2 [0] [6]) .toBeInstanceOf (X3D .SFNode);
   expect (hierarchies2 [0] [6] .getNodeTypeName ()) .toBe ("Shape");
   expect (hierarchies2 [0] [7]) .toBe ("appearance");
   expect (hierarchies2 [0] [8]) .toBeInstanceOf (X3D .SFNode);
   expect (hierarchies2 [0] [8] .getNodeTypeName ()) .toBe ("Appearance");
   expect (hierarchies2 [0] [8]) .toBe (appearanceNode);
   expect (hierarchies2 [0] [9]) .toBe ("material");
});
