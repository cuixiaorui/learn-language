// 管理所有的 token
// 方便获取 token
// 3个行为
// - 获取下一个 token
// - 获取当前的位置
// - 回溯
// 	就是重新设置一下 position （位置）
import type { Token } from "./token";
export class Tokenizer {
  private _tokens: Array<Token>;
  private _position: any;
  // Implement
  constructor(tokens: Array<any>) {
    this._tokens = tokens;
    this._position = 0;
  }

  next() {
    // 到尾巴的时候，应该返回 tokens 的最后一个值
    if (this._position >= this._tokens.length)
      return this._tokens[this._position - 1];

    return this._tokens[this._position++];
  }

  peer() {
    return this._tokens[this._position];
  }

  position() {
    return this._position;
  }

  traceBack(number: number) {
    this._position = number;
  }
}

export function createTokenizer(tokens: Array<Token>) {
  return new Tokenizer(tokens);
}

// function sayHello(){
//     println("Hello World!");
// }
// //调用刚才声明的函数
// sayHello();

// 词法解析
// getToken
// 1. 先跳过所有的空白符
// 1.1. 看看如果是 eof 的话（结尾）就直接返回
// 2. 看看第一个字符，
// 1. 如果是字母或者数字的话， 那么他就是一个标识符
// 2. 如果是 " 开头的话，那么他就是一个字符串
// 3. 如果是 ( ) { } ; , 那么返回 TokenKind.Separator ,直接过掉（next）
// 4. 如果是 / 开头的话，
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
