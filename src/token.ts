export enum TokenKind {
  Keyword,
  Identifier,
  StringLiteral,
  Separator,
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
// v1
// function sayHello(){
//     println("Hello World!");
// }
// //调用刚才声明的函数
// sayHello();

// v1
// export const tokenArray: Token[] = [
//   { kind: TokenKind.Keyword, text: "function" },
//   { kind: TokenKind.Identifier, text: "sayHello" },
//   { kind: TokenKind.Seperator, text: "(" },
//   { kind: TokenKind.Seperator, text: ")" },
//   { kind: TokenKind.Seperator, text: "{" },
//   { kind: TokenKind.Identifier, text: "println" },
//   { kind: TokenKind.Seperator, text: "(" },
//   { kind: TokenKind.StringLiteral, text: "Hello" },
//   { kind: TokenKind.Seperator, text: "," },
//   { kind: TokenKind.StringLiteral, text: "World!" },
//   { kind: TokenKind.Seperator, text: ")" },
//   { kind: TokenKind.Seperator, text: ";" },
//   { kind: TokenKind.Seperator, text: "}" },
//   { kind: TokenKind.Identifier, text: "sayHello" },
//   { kind: TokenKind.Seperator, text: "(" },
//   { kind: TokenKind.Seperator, text: ")" },
//   { kind: TokenKind.Seperator, text: ";" },
//   { kind: TokenKind.EOF, text: "" },
// ];

// v2
// function sayHello(){
//     println("Hello World!");
//     hi();
// }
// function hi () {
//     println("hi");
// }
// //调用刚才声明的函数
// sayHello();

// 把 function 关键字变成中文的话，也可以执行起来
// 函数 sayHello(){
//     println("Hello World!");
//     hi();
// }
// 函数 hi () {
//     println("hi");
// }
// //调用刚才声明的函数
// sayHello();

// v2
// export const tokenArray: Token[] = [
//   { kind: TokenKind.Keyword, text: "function" },
//   { kind: TokenKind.Identifier, text: "sayHello" },
//   { kind: TokenKind.Seperator, text: "(" },
//   { kind: TokenKind.Seperator, text: ")" },
//   { kind: TokenKind.Seperator, text: "{" },

//   { kind: TokenKind.Identifier, text: "println" },
//   { kind: TokenKind.Seperator, text: "(" },
//   { kind: TokenKind.StringLiteral, text: "Hello" },
//   { kind: TokenKind.Seperator, text: "," },
//   { kind: TokenKind.StringLiteral, text: "World!" },
//   { kind: TokenKind.Seperator, text: ")" },
//   { kind: TokenKind.Seperator, text: ";" },

//   { kind: TokenKind.Identifier, text: "hi" },
//   { kind: TokenKind.Seperator, text: "(" },
//   { kind: TokenKind.Seperator, text: ")" },
//   { kind: TokenKind.Seperator, text: ";" },

//   { kind: TokenKind.Seperator, text: "}" },

//   { kind: TokenKind.Keyword, text: "function" },
//   { kind: TokenKind.Identifier, text: "hi" },
//   { kind: TokenKind.Seperator, text: "(" },
//   { kind: TokenKind.Seperator, text: ")" },
//   { kind: TokenKind.Seperator, text: "{" },
//   { kind: TokenKind.Identifier, text: "println" },
//   { kind: TokenKind.Seperator, text: "(" },
//   { kind: TokenKind.StringLiteral, text: "hi" },
//   { kind: TokenKind.Seperator, text: ")" },
//   { kind: TokenKind.Seperator, text: ";" },
//   { kind: TokenKind.Seperator, text: "}" },

//   { kind: TokenKind.Identifier, text: "sayHello" },
//   { kind: TokenKind.Seperator, text: "(" },
//   { kind: TokenKind.Seperator, text: ")" },
//   { kind: TokenKind.Seperator, text: ";" },
//   { kind: TokenKind.EOF, text: "" },
// ];

// 给定一个字符串，然后输出一个 token 数组

// 词法解析
// getToken
// 1. 先跳过所有的空白符
// 1.1. 看看如果是 eof 的话（结尾）就直接返回
// 2. 看看第一个字符，
// 1. 如果是字母或者数字的话， 那么他就是一个标识符
// 2. 如果是 " 开头的话，那么他就是一个字符串
// 3. 如果是 ( ) { } ; , 那么返回 TokenKind.Separator ,直接过掉（next）
// 4. 如果是 / 开头的话， TODO
// 如果是 /* 多行注释
// 如果是 // 的话，单行注释
// 如果是 = 的话,那么就是一个操作符 /=
// 不然他就是一个操作符 /
// 5. +
//  ++ 操作符
//  += 操作符
// 不然就是 +
// 6. -
// -- 操作符
// -= 操作符
// 不然就是 -
// 7. *
// *= 操作符
// 不然就是 *
// 上面都不是的话 过掉（next） ，继续看看下一个 getToken
class CharStream {
  private _position: number;
  private _data: string;
  // TODO 还需要知道行的信息
  constructor(stringStream: string) {
    this._data = stringStream;
    this._position = 0;
  }

  peer() {
    return this._data.charAt(this._position);
  }

  next() {
    if (this._position >= this._data.length) {
      return this._data.charAt(this._position - 1);
    }
    return this._data.charAt(this._position++);
  }

  eof() {
    return this.peer() === "";
  }
}

export function parseToken(program: string): Array<Token> {
  // 解析标识符
  // 如果是字母或者数字的话， 那么他就是一个标识符
  const tokens: Array<Token> = [];
  let token;

  const stream = new CharStream(program);

  while (!stream.eof()) {
    let ch = stream.peer();

    // 如果是一个空白符的话，那么就直接跳过去
    while (
      stream.peer() === " " ||
      stream.peer() === "\n" ||
      stream.peer() === "\t"
    ) {
      stream.next();
    }

    ch = stream.peer();

    // 优化点，如果所有的空白符都过完，在检测一下 因为有可能是结尾
    if (stream.eof()) break;

    if (isLetter(ch)) {
      // 1. 要获取 program 第一个 字符
      //    看看第一个字符是不是字母的话
      // LL(1)文法
      token = parseIdentifier(ch, stream);
    } else if (ch === '"') {
      token = parseStringLiteral(stream);
    } else if (isSeparator(ch)) {
      token = parseSeparator(stream);
    }
    tokens.push(token);
  }

  tokens.push({ kind: TokenKind.EOF, text: "" });

  return tokens;
}

function parseSeparator(stream: CharStream) {
  const text = stream.next();
  return { kind: TokenKind.Separator, text };
}

function parseStringLiteral(stream: CharStream) {
  stream.next();

  let stringLiteral = "";
  //不可以是结尾，并且没有遇到下一个 " 那么就需要收集起来
  while (!stream.eof() && stream.peer() !== '"') {
    stringLiteral += stream.next();
  }
  // 在多调用一次 next ，跳过后面的 "
  stream.next();
  return { kind: TokenKind.StringLiteral, text: stringLiteral };
}

export function isSeparator(ch) {
  return (
    ch == "(" || ch == ")" || ch == "{" || ch == "}" || ch == ";" || ch == ","
  );
}

export function isLetter(char) {
  return /[a-zA-Z]/.test(char);
}

export function isDigit(char) {
  return /[0-9]/.test(char);
}

export function isUnderline(char) {
  return /_/.test(char);
}

function parseIdentifier(ch, stream): Token {
  // 如果后面的是字符或者数字或者下划线的话 ，那么都 ok
  let identifier = ch;
  stream.next();

  const isLetterOrDigitOrUnderline = () =>
    isLetter(stream.peer()) ||
    isDigit(stream.peer()) ||
    isUnderline(stream.peer());

  while (isLetterOrDigitOrUnderline() && !stream.eof()) {
    identifier += stream.next();
  }

  // 如果说 identifier 是一个关键字的话，那么需要改变一下类型
  if (identifier === "function") {
    return { kind: TokenKind.Keyword, text: identifier };
  }

  return { kind: TokenKind.Identifier, text: identifier };
}
