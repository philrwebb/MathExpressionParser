import Lexer from './lexer';
import Parser from './parser';
import * as util from 'util';

const lexer = new Lexer();

const input = '10 + 4 * 15';
// const linput = lexer.tokenize(input);
// console.log(util.inspect(linput, false, null, true));
const parser = new Parser(lexer.tokenize(input));
console.log(util.inspect(parser.parse(), false, null, true));
