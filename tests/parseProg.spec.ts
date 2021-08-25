import { parseProg, parseFunctionCall } from "../src/parseProg";
import { createTokenizer } from "../src/Tokenizer";

describe("parseProg", () => {
  it("run", () => {
    parseProg(createTokenizer());
  });
});

describe("parseFunctionCall", () => {
  it("run", () => {
    // 临时为了 test
    parseFunctionCall(createTokenizer());
  });
});
