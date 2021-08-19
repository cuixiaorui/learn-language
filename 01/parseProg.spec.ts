import { parseProg } from "./parseProg";
import { createTokenizer } from "./Tokenizer";




describe("parseProg", () => {
  it("run", () => {
    parseProg(createTokenizer());
  });
});
