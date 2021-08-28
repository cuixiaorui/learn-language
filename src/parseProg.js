"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.parseProg = exports.FunctionCall = exports.FunctionDecl = exports.Prog = exports.Statement = void 0;
var token_1 = require("./token");
var AstNode = /** @class */ (function () {
    function AstNode() {
    }
    return AstNode;
}());
/**
 * 语句
 * 其子类包括函数声明和函数调用
 */
var Statement = /** @class */ (function (_super) {
    __extends(Statement, _super);
    function Statement(type) {
        var _this = _super.call(this) || this;
        _this.type = type;
        return _this;
    }
    return Statement;
}(AstNode));
exports.Statement = Statement;
// ast 的 root node
var Prog = /** @class */ (function (_super) {
    __extends(Prog, _super);
    // Implement
    function Prog(stmts) {
        var _this = _super.call(this) || this;
        _this.stmts = stmts;
        return _this;
    }
    return Prog;
}(AstNode));
exports.Prog = Prog;
// function 声明
var FunctionDecl = /** @class */ (function (_super) {
    __extends(FunctionDecl, _super);
    function FunctionDecl(name, functionBody) {
        var _this = _super.call(this, "functionDecl") || this;
        // 声明需要名称和 body 的内容
        _this.name = name;
        _this.functionBody = functionBody;
        return _this;
    }
    return FunctionDecl;
}(Statement));
exports.FunctionDecl = FunctionDecl;
var FunctionBody = /** @class */ (function (_super) {
    __extends(FunctionBody, _super);
    function FunctionBody(stat) {
        var _this = _super.call(this, "functionBody") || this;
        _this.stats = stat;
        return _this;
    }
    return FunctionBody;
}(Statement));
// function 的调用
var FunctionCall = /** @class */ (function (_super) {
    __extends(FunctionCall, _super);
    function FunctionCall(name, params) {
        var _this = _super.call(this, "functionCall") || this;
        _this.name = name;
        _this.params = params.map(function (token) { return token.text; });
        return _this;
    }
    return FunctionCall;
}(Statement));
exports.FunctionCall = FunctionCall;
/**
 * 解析Prog
 * 语法规则：
 * prog = (functionDecl | functionCall)* ;
 */
function parseProg(tokenizer) {
    var stmts = [];
    while (true) {
        // statements
        // 先尝试看看是不是 functionDecl
        var functionDeclStatement = parseFunctionDecl(tokenizer);
        if (functionDeclStatement) {
            stmts.push(functionDeclStatement);
            continue;
        }
        var functionCallStatement = parseFunctionCall(tokenizer);
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
exports.parseProg = parseProg;
/**
 * 解析函数声明
 * 语法规则：
 * functionDecl: "function" Identifier "(" ")"  functionBody;
 */
function parseFunctionDecl(tokenizer) {
    var startPosition = tokenizer.position();
    var token = tokenizer.next();
    var functionName = "";
    if (token.text === "function" && token.kind === token_1.TokenKind.Keyword) {
        // 那么可以看看第二个 是不是 Identifier 类型的值
        token = tokenizer.next();
        if (token.kind === token_1.TokenKind.Identifier) {
            functionName = token.text;
            token = tokenizer.next();
            if (token.text === "(") {
                token = tokenizer.next();
                if (token.text === ")") {
                    // 看看是不是 functionBody 了
                    var functionBodyStat = parseFunctionBody(tokenizer);
                    if (functionBodyStat) {
                        // 解析 functionDec 成功了
                        return new FunctionDecl(functionName, functionBodyStat);
                    }
                }
                else {
                    console.log("不好意思 没有找到 )");
                    return;
                }
            }
            else {
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
function parseFunctionBody(tokenizer) {
    var token = tokenizer.next();
    var startPoint = tokenizer.position();
    var stats = [];
    if (token.kind === token_1.TokenKind.Seperator && token.text === "{") {
        var functionCallStat = parseFunctionCall(tokenizer);
        while (functionCallStat) {
            stats.push(functionCallStat);
            functionCallStat = parseFunctionCall(tokenizer);
        }
        token = tokenizer.next();
        if (token.text === "}") {
            return new FunctionBody(stats);
        }
        else {
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
function parseFunctionCall(tokenizer) {
    var token = tokenizer.next();
    var startPoint = tokenizer.position();
    var parameters = [];
    var functionName = "";
    // 看看第一个 token 是不是 Identifier 类型
    if (token.kind === token_1.TokenKind.Identifier) {
        functionName = token.text;
        // 看看第二个 token 是不是 (
        token = tokenizer.next();
        if (token.text === "(") {
            // 那么我们需要把 parameter 都取出来
            // 碰到 ) 的时候结束收集参数
            var t2 = tokenizer.next();
            // 因为参数是允许有多个的，所以需要循环的找
            // 而循环的结束条件就是碰到 )
            while (t2.text !== ")") {
                if (!(t2.text === "," && t2.kind === token_1.TokenKind.Seperator)) {
                    // 把 , 给过滤掉
                    parameters.push(t2);
                }
                t2 = tokenizer.next();
            }
            // 到这里就以为这遇到 ) 了，
            // 结束对参数的收集了
            // 还需要看看最后一个 token 是不是分号 (;)
            if (tokenizer.peer().text === ";") {
                return new FunctionCall(functionName, parameters);
            }
            else {
                console.log("没有找到分号;");
                return;
            }
        }
        else {
            console.log("没有找到 (");
            return;
        }
    }
    tokenizer.traceBack(startPoint);
}
