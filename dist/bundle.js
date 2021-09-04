(function () {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var TokenKind;
    (function (TokenKind) {
        TokenKind[TokenKind["Keyword"] = 0] = "Keyword";
        TokenKind[TokenKind["Identifier"] = 1] = "Identifier";
        TokenKind[TokenKind["StringLiteral"] = 2] = "StringLiteral";
        TokenKind[TokenKind["Separator"] = 3] = "Separator";
        TokenKind[TokenKind["Operator"] = 4] = "Operator";
        TokenKind[TokenKind["EOF"] = 5] = "EOF";
    })(TokenKind || (TokenKind = {}));
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
    var CharStream = /** @class */ (function () {
        // TODO 还需要知道行的信息
        function CharStream(stringStream) {
            this._data = stringStream;
            this._position = 0;
        }
        CharStream.prototype.peer = function () {
            return this._data.charAt(this._position);
        };
        CharStream.prototype.next = function () {
            if (this._position >= this._data.length) {
                return this._data.charAt(this._position - 1);
            }
            return this._data.charAt(this._position++);
        };
        CharStream.prototype.eof = function () {
            return this.peer() === "";
        };
        return CharStream;
    }());
    function parseToken(program) {
        // 解析标识符
        // 如果是字母或者数字的话， 那么他就是一个标识符
        var tokens = [];
        var token;
        var stream = new CharStream(program);
        while (!stream.eof()) {
            var ch = stream.peer();
            // 如果是一个空白符的话，那么就直接跳过去
            while (stream.peer() === " " ||
                stream.peer() === "\n" ||
                stream.peer() === "\t") {
                stream.next();
            }
            ch = stream.peer();
            // 优化点，如果所有的空白符都过完，在检测一下 因为有可能是结尾
            if (stream.eof())
                break;
            if (isLetter(ch)) {
                // 1. 要获取 program 第一个 字符
                //    看看第一个字符是不是字母的话
                // LL(1)文法
                token = parseIdentifier(ch, stream);
            }
            else if (ch === '"') {
                token = parseStringLiteral(stream);
            }
            else if (isSeparator(ch)) {
                token = parseSeparator(stream);
            }
            tokens.push(token);
        }
        tokens.push({ kind: TokenKind.EOF, text: "" });
        return tokens;
    }
    function parseSeparator(stream) {
        var text = stream.next();
        return { kind: TokenKind.Separator, text: text };
    }
    function parseStringLiteral(stream) {
        stream.next();
        var stringLiteral = "";
        //不可以是结尾，并且没有遇到下一个 " 那么就需要收集起来
        while (!stream.eof() && stream.peer() !== '"') {
            stringLiteral += stream.next();
        }
        // 在多调用一次 next ，跳过后面的 "
        stream.next();
        return { kind: TokenKind.StringLiteral, text: stringLiteral };
    }
    function isSeparator(ch) {
        return (ch == "(" || ch == ")" || ch == "{" || ch == "}" || ch == ";" || ch == ",");
    }
    function isLetter(char) {
        return /[a-zA-Z]/.test(char);
    }
    function isDigit(char) {
        return /[0-9]/.test(char);
    }
    function isUnderline(char) {
        return /_/.test(char);
    }
    function parseIdentifier(ch, stream) {
        // 如果后面的是字符或者数字或者下划线的话 ，那么都 ok
        var identifier = ch;
        stream.next();
        var isLetterOrDigitOrUnderline = function () {
            return isLetter(stream.peer()) ||
                isDigit(stream.peer()) ||
                isUnderline(stream.peer());
        };
        while (isLetterOrDigitOrUnderline() && !stream.eof()) {
            identifier += stream.next();
        }
        // 如果说 identifier 是一个关键字的话，那么需要改变一下类型
        if (identifier === "function") {
            return { kind: TokenKind.Keyword, text: identifier };
        }
        return { kind: TokenKind.Identifier, text: identifier };
    }

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
    /**
     * 解析函数声明
     * 语法规则：
     * functionDecl: "function" Identifier "(" ")"  functionBody;
     */
    function parseFunctionDecl(tokenizer) {
        var startPosition = tokenizer.position();
        var token = tokenizer.next();
        var functionName = "";
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
        var startPoint = tokenizer.position();
        var token = tokenizer.next();
        var stats = [];
        if (token.kind === TokenKind.Separator && token.text === "{") {
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
        var startPoint = tokenizer.position();
        var token = tokenizer.next();
        var parameters = [];
        var functionName = "";
        // 看看第一个 token 是不是 Identifier 类型
        if (token.kind === TokenKind.Identifier) {
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

    var Tokenizer = /** @class */ (function () {
        // Implement
        function Tokenizer(tokens) {
            this._tokens = tokens;
            this._position = 0;
        }
        Tokenizer.prototype.next = function () {
            // 到尾巴的时候，应该返回 tokens 的最后一个值
            if (this._position >= this._tokens.length)
                return this._tokens[this._position - 1];
            return this._tokens[this._position++];
        };
        Tokenizer.prototype.peer = function () {
            return this._tokens[this._position];
        };
        Tokenizer.prototype.position = function () {
            return this._position;
        };
        Tokenizer.prototype.traceBack = function (number) {
            this._position = number;
        };
        return Tokenizer;
    }());
    function createTokenizer(tokens) {
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

    function refResolver(prog) {
        function visitFunctionBody(stmt) {
            var functionDecl = findFunctionDecl(prog, stmt);
            if (functionDecl) {
                stmt.definition = functionDecl;
            }
            else {
                // 看看是不是系统内置的函数
                if (stmt.name === "println") ;
                else {
                    throw new Error("\u51FD\u6570 " + stmt.name + "\u6CA1\u6709\u5B9A\u4E49");
                }
            }
        }
        // 1. 解析 prog 里面的 语句
        // 2. 如果是 functionCall 那么就找它对应的 functionDecl
        //	 如果是系统内置函数的话忽略，不然找不到的话，就报错,
        // 3. 如果是 functionDecl 那么就开箱，找到里面的 functionCall
        //       如果是 functionCall 的话 回到步骤 2
        prog.stmts.forEach(function (stmt) {
            // 是不是 functionCall
            if (stmt.type === "functionCall") {
                visitFunctionBody(stmt);
            }
            else if (stmt.type === "functionDecl") {
                var functionBody = stmt.functionBody;
                functionBody.stats.forEach(function (stmt) {
                    visitFunctionBody(stmt);
                });
            }
        });
    }
    function findFunctionDecl(prog, functionCall) {
        // 如果语句是 functionDecl 并且这个 functionDecl 的 name 是和 functionCall 相等的话
        // 那么说明找到了
        return prog.stmts.find(function (stmt) { return stmt.type === "functionDecl" && stmt.name === functionCall.name; });
    }

    function interpret(prog) {
        // 1. 调用 functionCall
        // 2. 看看这个functionCall 是不是内置函数，如果是的话，那么就执行
        // 3. 如果不是的话，那么看看这个 functionCall 有没有声明也就是 functionDecl
        // 4. 找到这个 functionDecl 看看他的 body ，然后把 body 内的语句给到步骤一
        function visitFunctionCall(stmt) {
            var functionCall = stmt;
            if (functionCall.type === "functionCall") {
                // 看看是不是语言内置的函数
                if (functionCall.name === "println") {
                    // 看看参数
                    console.log.apply(console, functionCall.params);
                }
                else if (functionCall.definition) {
                    var functionDecl = functionCall.definition;
                    functionDecl.functionBody.stats.forEach(function (stat) {
                        visitFunctionCall(stat);
                    });
                }
            }
        }
        prog.stmts.forEach(function (stmt) {
            visitFunctionCall(stmt);
        });
    }

    // 目标是让这段代码执行起来
    // 把生成的 tokens 给到 parseProg 来做语法分析
    var progString = "function sayHello(){\n\tprintln(\"Hello\",\"World!\");\n    } \n\n    sayHello();\n    ";
    var tokens = parseToken(progString);
    var prog = parseProg(createTokenizer(tokens));
    refResolver(prog);
    interpret(prog);
    // 语义分析
    // 把 function call 需要指定他对应的 function body
    // 解析器
    // 执行 function call
    // 递归的处理
    // 只有调用 println 默认执行 console
    // 不然别的调用的话 都需要一层一层的拆

}());
