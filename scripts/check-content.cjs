const assert = require("node:assert/strict");
const fs = require("node:fs");
const ts = require("typescript");
require.extensions[".ts"] = (module, filename) => {
  module._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
  }).outputText, filename);
};
const { promises, projects, representatives, getRepresentativePromises } = require("../lib/data.ts");
assert.equal(representatives.length, 10);
assert.equal(new Set(promises.map(p => p.slug)).size, promises.length);
for (const official of representatives) {
  const records = getRepresentativePromises(official.slug);
  assert.ok(records.length >= 4, official.slug + " needs at least four promises");
  assert.ok(records.some(p => p.status === "Completed"), official.slug + " needs a completed scenario");
  console.log(official.role + ": " + records.length + " promises");
}
for (const promise of promises) {
  assert.ok(["sourced", "simulated"].includes(promise.origin));
  assert.equal(promise.confidence, "Unrated");
  assert.ok(promise.progress >= 0 && promise.progress <= 100);
  for (const slug of promise.officialSlugs) assert.ok(representatives.some(r => r.slug === slug));
  for (const slug of promise.projectSlugs) assert.ok(projects.some(p => p.slug === slug && !p.unpromised));
  if (promise.origin === "sourced") assert.ok(promise.sourceUrl.startsWith("https://"));
  else assert.equal(promise.sourceUrl, "");
}
assert.ok(promises.some(p => p.origin === "sourced"));
assert.ok(promises.some(p => p.origin === "simulated"));
for (const slug of ["president", "vice-president"]) {
  const records = getRepresentativePromises(slug);
  assert.equal(records.length, 5);
  assert.ok(records.every(p => p.origin === "sourced" && p.sourcePage && p.sourceUrl));
}
console.log(promises.length + " unique promises; content integrity checks passed.");
