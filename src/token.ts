export enum TokenKind {
  Keyword,
  Identifier,
  StringLiteral,
  Seperator,
  Operator,
  EOF,
}

export type Token = {
  kind: TokenKind;
  text: string;
};

// 暂时是没有词法分析的
// 直接写死
// TODO 学习完词法分析后，来用程序实现
// function sayHello(){
//     println("Hello World!");
// }
// //调用刚才声明的函数
// sayHello();
export const tokenArray: Token[] = [
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
  { kind: TokenKind.Identifier, text: "sayHello" },
  { kind: TokenKind.Seperator, text: "(" },
  { kind: TokenKind.Seperator, text: ")" },
  { kind: TokenKind.Seperator, text: ";" },
  { kind: TokenKind.EOF, text: "" },
];
