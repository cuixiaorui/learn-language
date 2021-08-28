"use strict";
exports.__esModule = true;
exports.tokenArray = exports.TokenKind = void 0;
var TokenKind;
(function (TokenKind) {
    TokenKind[TokenKind["Keyword"] = 0] = "Keyword";
    TokenKind[TokenKind["Identifier"] = 1] = "Identifier";
    TokenKind[TokenKind["StringLiteral"] = 2] = "StringLiteral";
    TokenKind[TokenKind["Seperator"] = 3] = "Seperator";
    TokenKind[TokenKind["Operator"] = 4] = "Operator";
    TokenKind[TokenKind["EOF"] = 5] = "EOF";
})(TokenKind = exports.TokenKind || (exports.TokenKind = {}));
// 暂时是没有词法分析的
// 直接写死
// TODO 学习完词法分析后，来用程序实现
// function sayHello(){
//     println("Hello World!");
// }
// //调用刚才声明的函数
// sayHello();
exports.tokenArray = [
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
