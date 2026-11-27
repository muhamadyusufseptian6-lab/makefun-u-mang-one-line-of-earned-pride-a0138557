// TDD-lite checks for the One Line of Earned Pride entry.
// Run: node test.mjs  (from the entry directory)
// Each check mirrors a kit requirement:
//  - gate: entry.txt is UTF-8 text of 1 to 240 characters, not only whitespace
//  - one line: no newline characters in the entry
//  - deterministic: two runs produce byte-identical output
//  - stdlib-only: main.ts imports nothing outside the Node standard library
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const entryDir = dirname(fileURLToPath(import.meta.url));
const mainTs = join(entryDir, "main.ts");

let failures = 0;
function check(name, ok, detail = "") {
  console.log(`${ok ? "PASS" : "FAIL"} ${name}${detail ? " — " + detail : ""}`);
  if (!ok) failures++;
}

function runOnce(outDir) {
  execFileSync(process.execPath, [mainTs], {
    env: { ...process.env, MAKEFUN_OUTPUT_DIR: outDir },
    stdio: "pipe",
  });
  return readFileSync(join(outDir, "entry.txt"), "utf8");
}

// 1. Gate: 1-240 characters, not only whitespace.
const dirA = mkdtempSync(join(tmpdir(), "earned-pride-a-"));
const textA = runOnce(dirA);
check("gate: length 1-240 chars", textA.length >= 1 && textA.length <= 240, `${textA.length} chars`);
check("gate: not only whitespace", textA.trim().length > 0);
check("gate: valid UTF-8 round-trip", Buffer.from(textA, "utf8").toString("utf8") === textA);

// 2. One line: no newline characters, no trailing newline needed.
check("one line: no newline characters", !textA.includes("\n") && !textA.includes("\r"));

// 3. Determinism: a second run produces byte-identical output.
const dirB = mkdtempSync(join(tmpdir(), "earned-pride-b-"));
const textB = runOnce(dirB);
check("deterministic: two runs byte-identical", textA === textB);

// 4. Stdlib-only: every import is a node: module.
const src = readFileSync(mainTs, "utf8");
const imports = [...src.matchAll(/from\s+["']([^"']+)["']/g)].map((m) => m[1]);
const nonStd = imports.filter((i) => !i.startsWith("node:"));
check("stdlib-only imports", nonStd.length === 0, nonStd.length ? `non-std: ${nonStd.join(", ")}` : `${imports.length} node: imports`);

rmSync(dirA, { recursive: true, force: true });
rmSync(dirB, { recursive: true, force: true });

console.log(failures === 0 ? "ALL CHECKS PASSED" : `${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
