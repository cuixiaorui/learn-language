import { parseProg } from "../src/parseProg";
import { createTokenizer } from "../src/Tokenizer";
import { Token, TokenKind, tokenArray } from "../src/token";

describe("parseProg", () => {
  it.only("happy path", () => {
    parseProg(createTokenizer(tokenArray));
  });
  it("parseFunctionBody happy path", () => {
    const tokenArray: Token[] = [
      { kind: TokenKind.Keyword, text: "function" },
      { kind: TokenKind.Identifier, text: "sayHello" },
      { kind: TokenKind.Seperator, text: "(" },
      { kind: TokenKind.Seperator, text: ")" },
      { kind: TokenKind.Seperator, text: "{" },
      { kind: TokenKind.Identifier, text: "println" },
      { kind: TokenKind.Seperator, text: "(" },
      { kind: TokenKind.StringLiteral, text: "Hello" },
      { kind: TokenKind.Seperator, text: "," },
      { kind: TokenKind.StringLiteral, text: "World!" },
      { kind: TokenKind.Seperator, text: ")" },
      { kind: TokenKind.Seperator, text: ";" },
      { kind: TokenKind.Seperator, text: "}" },
      { kind: TokenKind.EOF, text: "" },
    ];
    const prog = parseProg(createTokenizer(tokenArray));
  });

  it("parseFunctionBody have two functionCall", () => {
    const tokenArray: Token[] = [
      { kind: TokenKind.Keyword, text: "function" },
      { kind: TokenKind.Identifier, text: "sayHello" },
      { kind: TokenKind.Seperator, text: "(" },
      { kind: TokenKind.Seperator, text: ")" },
      { kind: TokenKind.Seperator, text: "{" },
      { kind: TokenKind.Identifier, text: "println" },
      { kind: TokenKind.Seperator, text: "(" },
      { kind: TokenKind.Seperator, text: ")" },
      { kind: TokenKind.Seperator, text: ";" },
      { kind: TokenKind.Identifier, text: "println" },
      { kind: TokenKind.Seperator, text: "(" },
      { kind: TokenKind.Seperator, text: ")" },
      { kind: TokenKind.Seperator, text: ";" },
      { kind: TokenKind.Seperator, text: "}" },
      { kind: TokenKind.EOF, text: "" },
    ];
    const prog = parseProg(createTokenizer(tokenArray));
  });
});
