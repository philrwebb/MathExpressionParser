This project is based on tylerlaceby's 'Writing a Basic Math Expression Parser in JavaScript - Live Coding' Youtube from around 2 years ago.    

With assistance from CoPilot have:

1. Changed code to typescript.
2. Added testing via Jest

To get to your local machine:

1. Navigate to where you want the project;
2. git clone https://github.com/philrwebb/MathExpressionParser.git
3. cd MathExpressionParser
4. npm install

There are scripts in the package.json to:

1. test (npm test)
2. build (npm run build)
3. run (npm start)

The start includes a build and test is with coverage and verbose - which gives output somewhat like this:

   PASS  __tests__/lexer.test.ts
   
    Lexer
    
      ✓ should tokenize a simple expression (1 ms)
      
      ✓ should handle parentheses
  
   PASS  __tests__/parser.test.ts
   
    Parser
    
      ✓ should parse a simple addition expression (1 ms)
      
      ✓ should respect operator precedence
      
      ✓ should handle parentheses correctly
      
  

  File       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
  -----------|---------|----------|---------|---------|-------------------
  All files  |   90.32 |       75 |   92.85 |    92.3 |                   
   lexer.js  |    90.9 |    81.25 |     100 |   93.02 | 43-44,67          
   parser.js |   89.79 |    66.66 |   88.88 |   91.66 | 14-15,22,81       
 
  Test Suites: 2 passed, 2 total
  Tests:       5 passed, 5 total
  Snapshots:   0 total
  Time:        0.794 s, estimated 1 s
