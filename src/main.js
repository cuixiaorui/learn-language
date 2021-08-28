"use strict";
// 目标是让这段代码执行起来
// //一个函数的声明，这个函数很简单，只打印"Hello World!"
// function sayHello(){
//     println("Hello World!");
// }
// //调用刚才声明的函数
// sayHello();
// */
exports.__esModule = true;
// 分为3个部分
// 1. 先做词法分析
// 2. 在做语法分析
// 目标是得到 AST
// 给定 token 然后组合成 AST
// 3. 语义分析
// 4. 运行
var parseProg_1 = require("./parseProg");
var Tokenizer_1 = require("./Tokenizer");
var token_1 = require("./token");
var refResolver_1 = require("./refResolver");
var Interpreter_1 = require("./Interpreter");
// 把生成的 tokens 给到 parseProg 来做语法分析
var prog = (0, parseProg_1.parseProg)((0, Tokenizer_1.createTokenizer)(token_1.tokenArray));
(0, refResolver_1.refResolver)(prog);
(0, Interpreter_1.interpret)(prog);
// 语义分析
// 把 function call 需要指定他对应的 function body
// 解析器
// 执行 function call
// 递归的处理
// 只有调用 println 默认执行 console
// 不然别的调用的话 都需要一层一层的拆
