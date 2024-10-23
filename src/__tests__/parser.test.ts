import Lexer from '../lexer';
import Parser from '../parser';

describe('Parser', () => {
  it('should parse a simple addition expression', () => {
    const lexer = new Lexer();
    const input = '10 + 5';
    const tokens = lexer.tokenize(input);
    const parser = new Parser(tokens);
    const ast = parser.parse();
    expect(ast).toEqual({
      type: 'BinaryOperator',
      operator: '+',
      leftHandSide: { type: 'NumericLiteral', value: 10 },
      rightHandSide: { type: 'NumericLiteral', value: 5 },
    });
  });

  it('should respect operator precedence', () => {
    const lexer = new Lexer();
    const input = '10 + 3 * 15 - 21';
    const tokens = lexer.tokenize(input);
    const parser = new Parser(tokens);
    const ast = parser.parse();
    expect(ast).toEqual({
      type: 'BinaryOperator',
      operator: '-',
      leftHandSide: {
        type: 'BinaryOperator',
        operator: '+',
        leftHandSide: { type: 'NumericLiteral', value: 10 },
        rightHandSide: {
          type: 'BinaryOperator',
          operator: '*',
          leftHandSide: { type: 'NumericLiteral', value: 3 },
          rightHandSide: { type: 'NumericLiteral', value: 15 },
        },
      },
      rightHandSide: { type: 'NumericLiteral', value: 21 },
    });
  });

  it('should handle parentheses correctly', () => {
    const lexer = new Lexer();
    const input = '(10 + 3) * 15';
    const tokens = lexer.tokenize(input);
    const parser = new Parser(tokens);
    const ast = parser.parse();
    expect(ast).toEqual({
      type: 'BinaryOperator',
      operator: '*',
      leftHandSide: {
        type: 'BinaryOperator',
        operator: '+',
        leftHandSide: { type: 'NumericLiteral', value: 10 },
        rightHandSide: { type: 'NumericLiteral', value: 3 },
      },
      rightHandSide: { type: 'NumericLiteral', value: 15 },
    });
  });
});
