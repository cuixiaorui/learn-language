import { parseProg } from "../src/parseProg";
import { createTokenizer } from "../src/Tokenizer";
import { parseToken, Token, TokenKind } from "../src/token";

describe("parseProg", () => {
  it("happy path", () => {
    const progString = `function sayHello(){
	      println("Hello","World!");
    } 

    sayHello();
    `;
    const tokens = parseToken(progString);
    const prog = parseProg(createTokenizer(tokens));
    expect(prog.stmts[0]).toEqual({
      type: "functionDecl",
      name: "sayHello",
      functionBody: {
        type: "functionBody",
        stats: [
          {
            type: "functionCall",
            name: "println",
            params: ["Hello", "World!"],
          },
        ],
      },
    });
  });
});
