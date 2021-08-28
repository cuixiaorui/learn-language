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
  while (true) {
    // statements
    // 先尝试看看是不是 functionDecl
    const functionDeclStatement = parseFunctionDecl(tokenizer);
    if (functionDeclStatement) {
      stmts.push(functionDeclStatement);
      continue;
    }

    const functionCallStatement = parseFunctionCall(tokenizer);
    if (functionCallStatement) {
      stmts.push(functionCallStatement);
      continue;
    }

    if (!functionCallStatement && !functionDeclStatement) {
      break;
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
  let startPosition = tokenizer.position();
  let token = tokenizer.next();
  let functionName = "";
  if (token.text === "function" && token.kind === TokenKind.Keyword) {
    // 那么可以看看第二个 是不是 Identifier 类型的值
    token = tokenizer.next();
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

  // 如果上面的出现了问题的话
  // 那么需要回溯
  // 因为后面还需要尝试看看是不是别的语句
  tokenizer.traceBack(startPosition);
}

/**
 * 解析函数体
 * 语法规则：
 * functionBody : '{' functionCall* '}' ;
 */
function parseFunctionBody(tokenizer: Tokenizer): any {
  let startPoint = tokenizer.position();
  let token = tokenizer.next();
  let stats: Array<Statement> = [];
  if (token.kind === TokenKind.Seperator && token.text === "{") {
    let functionCallStat = parseFunctionCall(tokenizer);

    while (functionCallStat) {
      stats.push(functionCallStat);
      functionCallStat = parseFunctionCall(tokenizer);
    }

    token = tokenizer.next();
    if (token.text === "}") {
      return new FunctionBody(stats);
    } else {
      console.log("没有找到 }");
      return;
    }
  }

  tokenizer.traceBack(startPoint);
}

/**
 * 解析函数调用
 * 语法规则：
 * functionCall : Identifier '(' parameterList? ')' ;
 * parameterList : StringLiteral (',' StringLiteral)* ;
 */
function parseFunctionCall(tokenizer: Tokenizer): Statement | null | void {
  let startPoint = tokenizer.position();
  let token = tokenizer.next();
  let parameters: Array<Token> = [];
  let functionName = "";
  // 看看第一个 token 是不是 Identifier 类型
  if (token.kind === TokenKind.Identifier) {
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
        if (!(t2.text === "," && t2.kind === TokenKind.Seperator)) {
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

  tokenizer.traceBack(startPoint);
}
