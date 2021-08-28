"use strict";
exports.__esModule = true;
exports.createTokenizer = exports.Tokenizer = void 0;
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
exports.Tokenizer = Tokenizer;
function createTokenizer(tokens) {
    return new Tokenizer(tokens);
}
exports.createTokenizer = createTokenizer;
