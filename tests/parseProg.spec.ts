import { parseProg } from "../src/parseProg";
import { createTokenizer } from "../src/Tokenizer";
import { Token, TokenKind } from "../src/token";

describe("parseProg", () => {
  it("parseFunctionBody happy path", () => {
    const tokenArray: Token[] = [
      { kind: TokenKind.Keyword, text: "function" },
      { kind: TokenKind.Identifier, text: "sayHello" },
      { kind: TokenKind.Separator, text: "(" },
      { kind: TokenKind.Separator, text: ")" },
      { kind: TokenKind.Separator, text: "{" },
      { kind: TokenKind.Identifier, text: "println" },
      { kind: TokenKind.Separator, text: "(" },
      { kind: TokenKind.StringLiteral, text: "Hello" },
      { kind: TokenKind.Separator, text: "," },
      { kind: TokenKind.StringLiteral, text: "World!" },
      { kind: TokenKind.Separator, text: ")" },
      { kind: TokenKind.Separator, text: ";" },
      { kind: TokenKind.Separator, text: "}" },
      { kind: TokenKind.EOF, text: "" },
    ];
    const prog = parseProg(createTokenizer(tokenArray));
  });

  it("parseFunctionBody have two functionCall", () => {
    const tokenArray: Token[] = [
      { kind: TokenKind.Keyword, text: "function" },
      { kind: TokenKind.Identifier, text: "sayHello" },
      { kind: TokenKind.Separator, text: "(" },
      { kind: TokenKind.Separator, text: ")" },
      { kind: TokenKind.Separator, text: "{" },
      { kind: TokenKind.Identifier, text: "println" },
      { kind: TokenKind.Separator, text: "(" },
      { kind: TokenKind.Separator, text: ")" },
      { kind: TokenKind.Separator, text: ";" },
      { kind: TokenKind.Identifier, text: "println" },
      { kind: TokenKind.Separator, text: "(" },
      { kind: TokenKind.Separator, text: ")" },
      { kind: TokenKind.Separator, text: ";" },
      { kind: TokenKind.Separator, text: "}" },
      { kind: TokenKind.EOF, text: "" },
    ];
    const prog = parseProg(createTokenizer(tokenArray));
  });
});
