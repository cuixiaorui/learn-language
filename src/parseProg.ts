import { Tokenizer } from "./Tokenizer";
import { TokenKind } from "./token";
import type { Token } from "./token";

abstract class AstNode {}

/**
 * 语句
 * 其子类包括函数声明和函数调用
 */
export abstract class Statement extends AstNode {
  type: string;
  constructor(type) {
    super();
    this.type = type;
  }
}

// ast 的 root node
export class Prog extends AstNode {
  stmts: Array<Statement>;
  // Implement
  constructor(stmts) {
    super();
    this.stmts = stmts;
  }
}

// function 声明
export class FunctionDecl extends Statement {
  name: any;
  functionBody: FunctionBody;
  constructor(name: string, functionBody) {
    super("functionDecl");
    // 声明需要名称和 body 的内容
    this.name = name;
    this.functionBody = functionBody;
  }
}

class FunctionBody extends Statement {
  stats: any;
  constructor(stat) {
    super("functionBody");
    this.stats = stat;
  }
}

// function 的调用
export class FunctionCall extends Statement {
  name: any;
  params: any;
  definition: any;
  constructor(name, params: Array<Token>) {
    super("functionCall");
    this.name = name;
    this.params = params.map((token) => token.text);
  }
}

/**
 * 解析Prog
 * 语法规则：
 * prog = (functionDecl | functionCall)* ;
 */

export function parseProg(tokenizer: Tokenizer) {
  const stmts: Array<Statement> = [];

  // 如果说 遇到了token 结尾的话 那么就跳出循环
  while (tokenizer.peer().kind !== TokenKind.EOF) {
    // statements
    // 先尝试看看是不是 functionDecl
    const token = tokenizer.peer();
    let statement;

    if (token.kind === TokenKind.Keyword && token.text === "function") {
      // 1. 先取出一个 token 来， 看看是不是 function 开头
      //    如果是 function 开头的话，那么就是一个 函数声明
      statement = parseFunctionDecl(tokenizer);
    } else if (token.kind === TokenKind.Identifier) {
      // 如果是标识符开始的话，这里就认为是 函数调用
      statement = parseFunctionCall(tokenizer);
    }

    if (statement) {
      stmts.push(statement);
    }
  }

  // 这个就是 AST 的根节点
  return new Prog(stmts);
}

/**
 * 解析函数声明
 * 语法规则：
 * functionDecl: "function" Identifier "(" ")"  functionBody;
 */
function parseFunctionDecl(tokenizer: Tokenizer): Statement | null | void {
  // 跳过 function
  // 因为进到这个函数的话，就已经确认了必然是函数声明
  // 只会有2个结果：要不就解析语法是正确的，要不就是语法有问题
  tokenizer.next();
  let functionName = "";
  // 那么可以看看第二个 是不是 Identifier 类型的值
  let token = tokenizer.next();
  if (token.kind === TokenKind.Identifier) {
    functionName = token.text;
    token = tokenizer.next();
    if (token.text === "(") {
      token = tokenizer.next();
      if (token.text === ")") {
        // 看看是不是 functionBody 了
        const functionBodyStat = parseFunctionBody(tokenizer);
        if (functionBodyStat) {
          // 解析 functionDec 成功了
          return new FunctionDecl(functionName, functionBodyStat);
        }
      } else {
        console.log("不好意思 没有找到 )");
        return;
      }
    } else {
      console.log("不好意思 没有找到 (");
      return;
    }
  }
}

/**
 * 解析函数体
 * 语法规则：
 * functionBody : '{' functionCall* '}' ;
 */
function parseFunctionBody(tokenizer: Tokenizer): any {
  let token = tokenizer.next();
  let stats: Array<Statement> = [];
  if (token.kind === TokenKind.Separator && token.text === "{") {
    // 看看 token 是不是一个标识符 如果是的话，那么认为是函数调用
    // 就可以去解析函数调用了
    while (tokenizer.peer().kind === TokenKind.Identifier) {
      let functionCallStat = parseFunctionCall(tokenizer);
      if (functionCallStat) {
        stats.push(functionCallStat);
      }
    }

    token = tokenizer.next();
    if (token.text === "}") {
      return new FunctionBody(stats);
    } else {
      console.log("没有找到 }");
      return;
    }
  } else {
    console.log("没有找到 {");
  }
}

/**
 * 解析函数调用
 * 语法规则：
 * functionCall : Identifier '(' parameterList? ')' ;
 * parameterList : StringLiteral (',' StringLiteral)* ;
 */
function parseFunctionCall(tokenizer: Tokenizer): Statement | void {
  let token = tokenizer.next();
  let parameters: Array<Token> = [];
  let functionName = "";
  // 看看第一个 token 是不是 Identifier 类型
  functionName = token.text;
  // 看看第二个 token 是不是 (
  token = tokenizer.next();
  if (token.text === "(") {
    // 那么我们需要把 parameter 都取出来
    // 碰到 ) 的时候结束收集参数
    let t2 = tokenizer.next();
    // 因为参数是允许有多个的，所以需要循环的找
    // 而循环的结束条件就是碰到 )
    while (t2.text !== ")") {
      if (!(t2.text === "," && t2.kind === TokenKind.Separator)) {
        // 把 , 给过滤掉
        parameters.push(t2);
      }
      t2 = tokenizer.next();
    }

    // 到这里就以为这遇到 ) 了，
    // 结束对参数的收集了

    // 还需要看看最后一个 token 是不是分号 (;)
    if (tokenizer.next().text === ";") {
      return new FunctionCall(functionName, parameters);
    } else {
      console.log("没有找到分号;");
      return;
    }
  } else {
    console.log("没有找到 (");
    return;
  }
}
