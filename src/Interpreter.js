"use strict";
exports.__esModule = true;
exports.interpret = void 0;
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
exports.interpret = interpret;
