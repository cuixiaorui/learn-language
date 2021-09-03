import { TokenKind } from "../src/token";
import { parseToken, add } from "../src/token";

describe("parseToken", () => {
  it("identifier", () => {
    expect(parseToken("hi")).toEqual([
      { kind: TokenKind.Identifier, text: "hi" },
    ]);

    expect(parseToken("h1i")).toEqual([
      { kind: TokenKind.Identifier, text: "h1i" },
    ]);

    expect(parseToken("h1_i")).toEqual([
      { kind: TokenKind.Identifier, text: "h1_i" },
    ]);
  });

  it("StringLiteral", () => {
    expect(parseToken('"xiaohong"')).toEqual([
      { kind: TokenKind.StringLiteral, text: "xiaohong" },
    ]);
  });

  //   it.each([["(", "("]])(".add(%i, %i)", (a, expected) => {
  //     expect(a + b).toBe(expected);
  //   });

  it.each([
    ["(", "("],
    [")", ")"],
    ["{", "{"],
    ["}", "}"],
    [";", ";"],
    [",", ","],
  ])("Seperator: %s", (text, expected) => {
    expect(parseToken(text)).toEqual([
      { kind: TokenKind.Separator, text: expected },
    ]);
  });
});
