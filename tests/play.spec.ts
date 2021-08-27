import { Tokenizer } from "../src/Tokenizer";

describe("Tokenizer", () => {
  it('should is "function" when first call next', () => {
    const token = { kind: "Keyword", text: "function" };
    const tokens = [token];
    const tokenizer = new Tokenizer(tokens);
    expect(tokenizer.next().text).toBe("function");
  });

  it('should is "" when first call next', () => {
    const functionToken = { kind: "Keyword", text: "function" };
    const identifierToken = { kind: "Identifier", text: "sayHello" };
    const EOFToken = { kind: "EOF", text: "" };
    const tokens = [functionToken, identifierToken, EOFToken];
    const tokenizer = new Tokenizer(tokens);
    expect(tokenizer.next().text).toBe("function");
    expect(tokenizer.next().text).toBe("sayHello");
    expect(tokenizer.next().text).toBe("");
    expect(tokenizer.next().text).toBe("");
  });

  it('should is "EOF" when last', () => {
    const functionToken = { kind: "Keyword", text: "function" };
    const EOFToken = { kind: "EOF", text: "" };
    const tokens = [functionToken, EOFToken];
    const tokenizer = new Tokenizer(tokens);

    // when
    tokenizer.next();
    tokenizer.next();
    tokenizer.next();

    // then
    expect(tokenizer.next().kind).toBe("EOF");
  });
});
