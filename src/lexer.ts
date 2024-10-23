export const TokenTypes = {
  PLUS: 'PLUS',
  MINUS: 'MINUS',
  MULTIPLY: 'MULTIPLY',
  DIVIDE: 'DIVIDE',
  INTEGER: 'INTEGER',
  EOF: 'EOF',
  LPAREN: 'LPAREN',
  RPAREN: 'RPAREN',
};

export default class Lexer {
  private stream: string = '';
  private cursor: number = 0;
  private at() {
    return this.stream[this.cursor];
  }
  tokenize(input = ''): any[] {
    this.stream = input;
    this.cursor = 0;
    const tokens = [];
    while (this.cursor < this.stream.length) {
      switch (this.at()) {
        case ' ':
        case '\n':
        case '\t':
          break;
        case '+':
          tokens.push({ type: TokenTypes.PLUS, value: '+' });
          break;
        case '-':
          tokens.push({ type: TokenTypes.MINUS, value: '-' });
          break;
        case '*':
          tokens.push({ type: TokenTypes.MULTIPLY, value: '*' });
          break;
        case '/':
          tokens.push({ type: TokenTypes.DIVIDE, value: '/' });
          break;
        case '(':
          tokens.push({ type: TokenTypes.LPAREN, value: '(' });
          break;
        case ')':
          tokens.push({ type: TokenTypes.RPAREN, value: ')' });
          break;
        default:
          // check for numeric value
          if (isNumeric(this.at())) {
            let number = '';
            while (isNumeric(this.at())) {
              number += this.at();
              this.cursor++;
            }
            tokens.push({
              type: TokenTypes.INTEGER,
              value: parseInt(number, 10),
            });
            this.cursor--;
            break;
          } else {
            throw new Error(`Invalid character: ${this.at()}`);
          }
      }
      this.cursor++;
    }
    tokens.push({ type: TokenTypes.EOF, value: 'EOF' });
    return tokens;
  }
}

function isNumeric(char: string): boolean {
  return char >= '0' && char <= '9';
}
