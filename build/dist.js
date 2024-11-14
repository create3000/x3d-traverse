#!/usr/bin/env node
"use strict";

const { systemSync } = require ("shell-tools");

function main ()
{
   systemSync (`cp src/traverse.d.ts dist/`);
   systemSync (`npx webpack`);
}

main ();
