import { TokenKind } from "../src/token";
import { parseToken } from "../src/token";

describe("parseToken", () => {
  it("parse function ", () => {
    const string = `function sayHello(){
	println("Hello","World!");
    } 

    sayHello();
    `;
    expect(parseToken(string)).toEqual([
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
      { kind: TokenKind.Identifier, text: "sayHello" },
      { kind: TokenKind.Separator, text: "(" },
      { kind: TokenKind.Separator, text: ")" },
      { kind: TokenKind.Separator, text: ";" },
      { kind: TokenKind.EOF, text: "" },
    ]);
  });

  describe(" Whitespace characters", () => {
    it(" ", () => {
      expect(parseToken(" hi")).toEqual([
        { kind: TokenKind.Identifier, text: "hi" },
        { kind: TokenKind.EOF, text: "" },
      ]);
    });

    it("\nhi", () => {
      expect(parseToken("\nhi")).toEqual([
        { kind: TokenKind.Identifier, text: "hi" },
        { kind: TokenKind.EOF, text: "" },
      ]);
    });

    it("\thi", () => {
      expect(parseToken("\thi")).toEqual([
        { kind: TokenKind.Identifier, text: "hi" },
        { kind: TokenKind.EOF, text: "" },
      ]);
    });

    it(" \n\thi", () => {
      expect(parseToken(" \n\thi")).toEqual([
        { kind: TokenKind.Identifier, text: "hi" },
        { kind: TokenKind.EOF, text: "" },
      ]);
    });
  });

  it("identifier", () => {
    expect(parseToken("hi")).toEqual([
      { kind: TokenKind.Identifier, text: "hi" },
      { kind: TokenKind.EOF, text: "" },
    ]);

    expect(parseToken("h1i")).toEqual([
      { kind: TokenKind.Identifier, text: "h1i" },
      { kind: TokenKind.EOF, text: "" },
    ]);

    expect(parseToken("h1_i")).toEqual([
      { kind: TokenKind.Identifier, text: "h1_i" },
      { kind: TokenKind.EOF, text: "" },
    ]);
  });

  it("StringLiteral", () => {
    expect(parseToken('"xiaohong"')).toEqual([
      { kind: TokenKind.StringLiteral, text: "xiaohong" },
      { kind: TokenKind.EOF, text: "" },
    ]);
  });

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
      { kind: TokenKind.EOF, text: "" },
    ]);
  });
});
