// One Line of Earned Pride — make.fun entry
// Writes a single line of text (1-240 chars) to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Node 22, stdlib-only, deterministic: the same run always writes the same bytes.
// Resolves paths from this script's location, never from process.cwd().
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Mum failed her driving test four times; on the fifth morning she parked the car straight, cut the engine, and sat there staring at her own hands like they had finally kept a promise.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
writeFileSync(join(outputDir, "entry.txt"), ENTRY, "utf8");
