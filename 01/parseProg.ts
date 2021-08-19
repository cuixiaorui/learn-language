import { Tokenizer } from "./Tokenizer";
import { Prog } from "./Prog";
import { TokenKind } from "./token";

abstract class AstNode {}

/**
 * 语句
 * 其子类包括函数声明和函数调用
 */
export abstract class Statement extends AstNode {}

export default class FunctionDecl extends Statement {
  name: any;
  functionBody: any;
  constructor(name: string, functionBody) {
    super();
    // 声明需要名称和 body 的内容
    this.name = name;
    this.functionBody = functionBody;
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

    const functionCallStatement = parseFunctionCall();
    if (functionCallStatement) {
      stmts.push(functionCallStatement);
      continue;
    }

    if (!functionCallStatement && !functionDeclStatement) {
      break;
    }
  }

  // 这个就是 AST 的根节点
  return new Prog();
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
          const functionBodyStat = parseFunctionBody();
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
  return null;
}

function parseFunctionBody(): any {
  return true;
}

function parseFunctionCall(): Statement {
  // Implement
  return null;
}
