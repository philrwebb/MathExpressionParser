import { TokenTypes } from './lexer';

export default class Parser {
  private tokens: any[] = [];
  private cursor: number = 0;

  private at() {
    return this.tokens[this.cursor];
  }

  private peak(n = 1) {
    return this.tokens[this.cursor + n];
  }

  private eatToken(tokenType: string) {
    if (this.at().type === tokenType) {
      this.cursor++;
    } else {
      throw new Error(
        `Unexpected token: ${this.at().type} expected: ${tokenType}`,
      );
    }
  }
  constructor(tokens: any[]) {
    this.tokens = tokens;
  }

  parse() {
    return this.parse_expression();
  }

  // parse addition and subtraction
  private parse_expression() {
    let leftHandSide: Expression = this.parse_term();
    while (
      this.at().type === TokenTypes.PLUS ||
      this.at().type === TokenTypes.MINUS
    ) {
      const operator = this.at().value;
      const ttype = this.at().type;
      this.eatToken(ttype);
      let rhs: Expression = this.parse_term();
      leftHandSide = {
        type: 'BinaryOperator',
        operator: operator,
        leftHandSide: leftHandSide,
        rightHandSide: rhs,
      };
    }
    return leftHandSide;
  }

  // mulitplication and division
  private parse_term() {
    let leftHandSide: Expression = this.parse_factor();
    while (
      this.at().type === TokenTypes.MULTIPLY ||
      this.at().type === TokenTypes.DIVIDE
    ) {
      const operator = this.at().value;
      const ttype = this.at().type;
      this.eatToken(ttype);
      let rhs: Expression = this.parse_factor();
      leftHandSide = {
        type: 'BinaryOperator',
        operator: operator,
        leftHandSide: leftHandSide,
        rightHandSide: rhs,
      };
    }
    return leftHandSide;
  }

  // Higher precedence
  private parse_factor(): Expression {
    if (this.at().type === TokenTypes.INTEGER) {
      let literal: NumericLiteral = {
        type: 'NumericLiteral',
        value: this.at().value,
      };
      this.eatToken(TokenTypes.INTEGER);
      return literal;
    } else if (this.at().type === TokenTypes.LPAREN) {
      this.eatToken(TokenTypes.LPAREN);
      let expr = this.parse_expression();
      this.eatToken(TokenTypes.RPAREN);
      return expr;
    } else {
      throw new Error(`Unexpected token type ${this.at().type}`);
    }
  }
}

type Expression = NumericLiteral | BinaryOperator;

interface NumericLiteral {
  type: 'NumericLiteral';
  value: number;
}

interface BinaryOperator {
  type: 'BinaryOperator';
  operator: string;
  leftHandSide: Expression;
  rightHandSide: Expression;
}
