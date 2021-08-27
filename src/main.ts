// 目标是让这段代码执行起来
// //一个函数的声明，这个函数很简单，只打印"Hello World!"
// function sayHello(){
//     println("Hello World!");
// }
// //调用刚才声明的函数
// sayHello();
// */

// 分为3个部分
// 1. 先做词法分析
// 2. 在做语法分析
// 目标是得到 AST
// 给定 token 然后组合成 AST
// 3. 语义分析
// 4. 运行

import { parseProg } from "./parseProg";
import { createTokenizer } from "./Tokenizer";
import { tokenArray } from "./token";
import { refResolver } from "./refResolver";

// 把生成的 tokens 给到 parseProg 来做语法分析
const prog = parseProg(createTokenizer(tokenArray));
refResolver(prog);

// 语义分析
// 把 function call 需要指定他对应的 function body

// 解析器
// 执行 function call
// 递归的处理
// 只有调用 println 默认执行 console
// 不然别的调用的话 都需要一层一层的拆
