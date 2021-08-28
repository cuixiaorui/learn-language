import { Prog, FunctionDecl, FunctionCall } from "./parseProg";

export function refResolver(prog: Prog) {
  function handleFunctionCall(stmt) {
    const functionDecl = findFunctionDecl(prog, stmt);
    if (functionDecl) {
      stmt.definition = functionDecl;
    } else {
      // 看看是不是系统内置的函数
      if (stmt.name === "println") {
        // 内置函数 不用管
      } else {
        throw new Error(`函数 ${(stmt as FunctionCall).name}没有定义`);
      }
    }
  }

  // 1. 解析 prog 里面的 语句
  // 2. 如果是 functionCall 那么就找它对应的 functionDecl
  //	 如果是系统内置函数的话忽略，不然找不到的话，就报错,
  // 3. 如果是 functionDecl 那么就开箱，找到里面的 functionCall
  //       如果是 functionCall 的话 回到步骤 2
  prog.stmts.forEach((stmt) => {
    // 是不是 functionCall
    if (stmt.type === "functionCall") {
      handleFunctionCall(stmt);
    } else if (stmt.type === "functionDecl") {
      const functionBody = (stmt as FunctionDecl).functionBody;
      functionBody.stats.forEach((stmt) => {
        handleFunctionCall(stmt);
      });
    }
  });
}

function findFunctionDecl(prog, functionCall): FunctionDecl | void {
  // 如果语句是 functionDecl 并且这个 functionDecl 的 name 是和 functionCall 相等的话
  // 那么说明找到了
  return prog.stmts.find(
    (stmt) => stmt.type === "functionDecl" && stmt.name === functionCall.name
  );
}
