import Lexer from '../lexer';

describe('Lexer', () => {
  it('should tokenize a simple expression', () => {
    const lexer = new Lexer();
    const input = '10 + 3 * 15 - 21';
    const tokens = lexer.tokenize(input);
    expect(tokens).toEqual([
      { type: 'INTEGER', value: 10 },
      { type: 'PLUS', value: '+' },
      { type: 'INTEGER', value: 3 },
      { type: 'MULTIPLY', value: '*' },
      { type: 'INTEGER', value: 15 },
      { type: 'MINUS', value: '-' },
      { type: 'INTEGER', value: 21 },
      { type: 'EOF', value: 'EOF' },
    ]);
  });

  it('should handle parentheses', () => {
    const lexer = new Lexer();
    const input = '(10 + 3) * 15';
    const tokens = lexer.tokenize(input);
    expect(tokens).toEqual([
      { type: 'LPAREN', value: '(' },
      { type: 'INTEGER', value: 10 },
      { type: 'PLUS', value: '+' },
      { type: 'INTEGER', value: 3 },
      { type: 'RPAREN', value: ')' },
      { type: 'MULTIPLY', value: '*' },
      { type: 'INTEGER', value: 15 },
      { type: 'EOF', value: 'EOF' },
    ]);
  });
});
