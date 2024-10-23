"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lexer_1 = require("./lexer");
var Parser = /** @class */ (function () {
    function Parser(tokens) {
        this.tokens = [];
        this.cursor = 0;
        this.tokens = tokens;
    }
    Parser.prototype.at = function () {
        return this.tokens[this.cursor];
    };
    Parser.prototype.peak = function (n) {
        if (n === void 0) { n = 1; }
        return this.tokens[this.cursor + n];
    };
    Parser.prototype.eatToken = function (tokenType) {
        if (this.at().type === tokenType) {
            this.cursor++;
        }
        else {
            throw new Error("Unexpected token: ".concat(this.at().type, " expected: ").concat(tokenType));
        }
    };
    Parser.prototype.parse = function () {
        return this.parse_expression();
    };
    // parse addition and subtraction
    Parser.prototype.parse_expression = function () {
        var leftHandSide = this.parse_term();
        while (this.at().type === lexer_1.TokenTypes.PLUS ||
            this.at().type === lexer_1.TokenTypes.MINUS) {
            var operator = this.at().value;
            var ttype = this.at().type;
            this.eatToken(ttype);
            var rhs = this.parse_term();
            leftHandSide = {
                type: 'BinaryOperator',
                operator: operator,
                leftHandSide: leftHandSide,
                rightHandSide: rhs,
            };
        }
        return leftHandSide;
    };
    // mulitplication and division
    Parser.prototype.parse_term = function () {
        var leftHandSide = this.parse_factor();
        while (this.at().type === lexer_1.TokenTypes.MULTIPLY ||
            this.at().type === lexer_1.TokenTypes.DIVIDE) {
            var operator = this.at().value;
            var ttype = this.at().type;
            this.eatToken(ttype);
            var rhs = this.parse_factor();
            leftHandSide = {
                type: 'BinaryOperator',
                operator: operator,
                leftHandSide: leftHandSide,
                rightHandSide: rhs,
            };
        }
        return leftHandSide;
    };
    // Higher precedence
    Parser.prototype.parse_factor = function () {
        if (this.at().type === lexer_1.TokenTypes.INTEGER) {
            var literal = {
                type: 'NumericLiteral',
                value: this.at().value,
            };
            this.eatToken(lexer_1.TokenTypes.INTEGER);
            return literal;
        }
        else if (this.at().type === lexer_1.TokenTypes.LPAREN) {
            this.eatToken(lexer_1.TokenTypes.LPAREN);
            var expr = this.parse_expression();
            this.eatToken(lexer_1.TokenTypes.RPAREN);
            return expr;
        }
        else {
            throw new Error("Unexpected token type ".concat(this.at().type));
        }
    };
    return Parser;
}());
exports.default = Parser;
