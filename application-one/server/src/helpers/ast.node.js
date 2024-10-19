export class ASTNode {
  constructor(type, value = null) {
    this.type = type; 
    this.value = value; 
    this.left = null; 
    this.right = null; 
  }

  toJSON() {
    return {
      type: this.type,
      value: this.value,
      left: this.left ? this.left.toJSON() : null,
      right: this.right ? this.right.toJSON() : null,
    };
  }
}

// Tokenize and parse rule string into AST
export function parseRuleToAST(rule) {
  if(!rule){
    return new Error("rule cannot be empty");
  }
  const tokens = tokenize(rule);
  let index = 0;

  function tokenize(rule) {
    return rule.match(/AND|OR|\(|\)|[^\s()]+/g);
  }

  function parseExpression() {
    let node = parseTerm();
    while (
      index < tokens.length &&
      (tokens[index] === "AND" || tokens[index] === "OR")
    ) {
      const operator = tokens[index++];
      const newNode = new ASTNode("operator", operator);
      newNode.left = node;
      newNode.right = parseTerm(); // Ensure that parseTerm captures the right expression correctly
      node = newNode;
    }
    return node;
  }

function parseTerm() {
  if (tokens[index] === "(") {
    index++; // Skip '('
    const node = parseExpression();
    index++; // Skip ')'
    return node;
  } else {
    return parseFactor();
  }
}

function parseFactor() {
  let condition = "";

  while (
    index < tokens.length &&
    tokens[index] !== "AND" &&
    tokens[index] !== "OR" &&
    tokens[index] !== ")"
  ) {
    condition += tokens[index++] + " ";
  }

  condition = condition.trim();
  condition = condition.replace(/=/g, "=="); // Convert '=' to '=='

  if (!condition) {
    throw new Error("Invalid condition");
  }

  return new ASTNode("operand", condition);
}

  return parseExpression();
}


export function combineRules(ruleStrings) {
  const asts = ruleStrings.map(parseRuleToAST);

  function findCommonSubtrees(ast1, ast2) {
    if (!ast1 || !ast2) return null;

    if (ast1.type === 'operand' && ast2.type === 'operand' && ast1.value === ast2.value) {
      return ast1; // Return the common operand node
    }

    if (ast1.type === ast2.type && (ast1.type === 'operator')) { 
      const leftCommon = findCommonSubtrees(ast1.left, ast2.left);
      const rightCommon = findCommonSubtrees(ast1.right, ast2.right);

      if (leftCommon || rightCommon) {
        const commonNode = new ASTNode(ast1.type);
        commonNode.left = leftCommon || ast1.left;
        commonNode.right = rightCommon || ast1.right;
        return commonNode;
      }
    }

    return null;
  }

  function combineTwoASTs(ast1, ast2) {
    const commonSubtree = findCommonSubtrees(ast1, ast2);
    if (commonSubtree) {
      return commonSubtree; // If there's a common subtree, return it
    }

    // If no common subtree, combine the two with an AND operator
    const combinedAST = new ASTNode('operator', 'AND');
    combinedAST.left = ast1;
    combinedAST.right = ast2;
    return combinedAST;
  }

  let combinedAST = asts[0]; // Start with the first AST
  for (let i = 1; i < asts.length; i++) {
    combinedAST = combineTwoASTs(combinedAST, asts[i]); // Combine with next AST
  }

  return combinedAST;
}

export function evaluateAST(ast, attributes) {
  // Base case: if it's a condition node (operand)
  if (ast.type === 'operand') {
    const condition = ast.value;
    // The condition is in the form of "attribute == value"
    const [attribute, operator, value] = condition.split(/\s+/); // Split by space

    if (operator === '==') {
      return attributes[attribute] === value;
    } else if (operator === '!=') {
      return attributes[attribute] !== value;
    }
    // Add more comparison operators if necessary
  }

  // Recursive case: if it's an operator node
  if (ast.type === 'operator') {
    if (ast.value === 'AND') {
      return evaluateAST(ast.left, attributes) && evaluateAST(ast.right, attributes);
    } else if (ast.value === 'OR') {
      return evaluateAST(ast.left, attributes) || evaluateAST(ast.right, attributes);
    }
  }

  return false; // Default case if evaluation fails
}
