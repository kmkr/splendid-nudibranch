/* eslint-env jest */

const idGenerator = require("./id-generator");

it("generation of id", () => {
  expect(idGenerator.id()).toMatch(/[a-z0-9]{4}-[a-z0-9]{4}/);
});
