const
   X3D      = require ("x_ite-node"),
   Traverse = require ("../") (X3D),
   path     = require ("path"),
   url      = require ("url");

const { browser } = X3D .createBrowser ();

test ("X3DScene.find node", async () =>
{
   const scene = await browser .createX3DFromURL (new X3D .MFString (url .pathToFileURL (path .join (__dirname, "files/Box/Box.x3d"))));

   const appearanceNode = scene .rootNodes .at (-1) .children [0] .appearance;
   const hierarchies    = Array .from (scene .find (appearanceNode));

   expect (hierarchies) .toHaveLength (1);
   expect (hierarchies [0]) .toBeInstanceOf (Array);
   expect (hierarchies [0]) .toHaveLength (9);

   expect (hierarchies [0] [0]) .toBe (scene);
   expect (hierarchies [0] [1]) .toBe ("rootNodes");
   expect (hierarchies [0] [2]) .toBe (4);
   expect (hierarchies [0] [3]) .toBeInstanceOf (X3D .SFNode);
   expect (hierarchies [0] [3] .getNodeTypeName ()) .toBe ("Transform");
   expect (hierarchies [0] [4]) .toBe ("children");
   expect (hierarchies [0] [5]) .toBe (0);
   expect (hierarchies [0] [6]) .toBeInstanceOf (X3D .SFNode);
   expect (hierarchies [0] [6] .getNodeTypeName ()) .toBe ("Shape");
   expect (hierarchies [0] [7]) .toBe ("appearance");
   expect (hierarchies [0] [8]) .toBeInstanceOf (X3D .SFNode);
   expect (hierarchies [0] [8] .getNodeTypeName ()) .toBe ("Appearance");
   expect (hierarchies [0] [8]) .toBe (appearanceNode);
});

test ("X3DScene.find field", async () =>
{
   const scene = await browser .createX3DFromURL (new X3D .MFString (url .pathToFileURL (path .join (__dirname, "files/Box/Box.x3d"))));

   const appearanceNode = scene .rootNodes .at (-1) .children [0] .appearance;
   const hierarchies    = Array .from (scene .find (appearanceNode .getField ("material")));

   expect (hierarchies) .toHaveLength (1);
   expect (hierarchies [0]) .toBeInstanceOf (Array);
   expect (hierarchies [0]) .toHaveLength (10);

   expect (hierarchies [0] [0]) .toBe (scene);
   expect (hierarchies [0] [1]) .toBe ("rootNodes");
   expect (hierarchies [0] [2]) .toBe (4);
   expect (hierarchies [0] [3]) .toBeInstanceOf (X3D .SFNode);
   expect (hierarchies [0] [3] .getNodeTypeName ()) .toBe ("Transform");
   expect (hierarchies [0] [4]) .toBe ("children");
   expect (hierarchies [0] [5]) .toBe (0);
   expect (hierarchies [0] [6]) .toBeInstanceOf (X3D .SFNode);
   expect (hierarchies [0] [6] .getNodeTypeName ()) .toBe ("Shape");
   expect (hierarchies [0] [7]) .toBe ("appearance");
   expect (hierarchies [0] [8]) .toBeInstanceOf (X3D .SFNode);
   expect (hierarchies [0] [8] .getNodeTypeName ()) .toBe ("Appearance");
   expect (hierarchies [0] [8]) .toBe (appearanceNode);
   expect (hierarchies [0] [9]) .toBe ("material");
});

test ("null", async () =>
{
   const scene = await browser .createX3DFromString (`
Group {
   children [NULL, NULL]
}
NULL
NULL
Transform { }
   `);

   const hierarchies = Array .from (scene .find (scene .rootNodes .at (-1)));

   expect (hierarchies) .toHaveLength (1);
   expect (hierarchies [0]) .toHaveLength (4);
   expect (hierarchies [0] [0]) .toBe (scene);
   expect (hierarchies [0] [1]) .toBe ("rootNodes");
   expect (hierarchies [0] [2]) .toBe (3);
   expect (hierarchies [0] [3]) .toBe (scene .rootNodes .at (-1));
});
