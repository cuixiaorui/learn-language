// 管理所有的 token
// 方便获取 token
// 3个行为
// - 获取下一个 token
// - 获取当前的位置
// - 回溯
// 	就是重新设置一下 position （位置）

export class Tokenizer {
  private _tokens: Array<any>;
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
}
