"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenTypes = void 0;
exports.TokenTypes = {
    PLUS: 'PLUS',
    MINUS: 'MINUS',
    MULTIPLY: 'MULTIPLY',
    DIVIDE: 'DIVIDE',
    INTEGER: 'INTEGER',
    EOF: 'EOF',
    LPAREN: 'LPAREN',
    RPAREN: 'RPAREN',
};
var Lexer = /** @class */ (function () {
    function Lexer() {
        this.stream = '';
        this.cursor = 0;
    }
    Lexer.prototype.at = function () {
        return this.stream[this.cursor];
    };
    Lexer.prototype.tokenize = function (input) {
        if (input === void 0) { input = ''; }
        this.stream = input;
        this.cursor = 0;
        var tokens = [];
        while (this.cursor < this.stream.length) {
            switch (this.at()) {
                case ' ':
                case '\n':
                case '\t':
                    break;
                case '+':
                    tokens.push({ type: exports.TokenTypes.PLUS, value: '+' });
                    break;
                case '-':
                    tokens.push({ type: exports.TokenTypes.MINUS, value: '-' });
                    break;
                case '*':
                    tokens.push({ type: exports.TokenTypes.MULTIPLY, value: '*' });
                    break;
                case '/':
                    tokens.push({ type: exports.TokenTypes.DIVIDE, value: '/' });
                    break;
                case '(':
                    tokens.push({ type: exports.TokenTypes.LPAREN, value: '(' });
                    break;
                case ')':
                    tokens.push({ type: exports.TokenTypes.RPAREN, value: ')' });
                    break;
                default:
                    // check for numeric value
                    if (isNumeric(this.at())) {
                        var number = '';
                        while (isNumeric(this.at())) {
                            number += this.at();
                            this.cursor++;
                        }
                        tokens.push({
                            type: exports.TokenTypes.INTEGER,
                            value: parseInt(number, 10),
                        });
                        this.cursor--;
                        break;
                    }
                    else {
                        throw new Error("Invalid character: ".concat(this.at()));
                    }
            }
            this.cursor++;
        }
        tokens.push({ type: exports.TokenTypes.EOF, value: 'EOF' });
        return tokens;
    };
    return Lexer;
}());
exports.default = Lexer;
function isNumeric(char) {
    return char >= '0' && char <= '9';
}
