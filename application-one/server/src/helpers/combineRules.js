import { ASTNode } from "./ast.node.js";

/**
 * Combines multiple rule ASTs into a single AST by minimizing redundancy.
 * Uses most frequent operator heuristic or combines using 'AND' if heuristic not clear.
 *
 * @param {Array<String>} ruleStrings - Array of rule strings to be combined.
 * @returns {ASTNode} - The root of the combined AST.
 */
export const combineRulesHelper = (ruleStrings) => {
  // Parse each rule string into its AST
  const astArray = ruleStrings.map((ruleString) => parseRuleToAST(ruleString));

  // Combine all the parsed ASTs into a single AST
  const combinedAST = combineAST(astArray);

  return combinedAST;
};

/**
 * Parses a rule string and converts it into an Abstract Syntax Tree (AST).
 * This function should be customized based on your rule string format.
 *
 * @param {String} ruleString - The rule string to be parsed.
 * @returns {ASTNode} - The root node of the parsed AST.
 */
const parseRuleToAST = (ruleString) => {
  const tokens = tokenize(ruleString);
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
      const rightNode = parseTerm();
      const newNode = new ASTNode("operator", operator);
      newNode.left = node;
      newNode.right = rightNode;
      node = newNode;
    }
    return node;
  }

  function parseTerm() {
    if (tokens[index] === "(") {
      index++;
      const node = parseExpression();
      index++;
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
    condition = condition.replace(/=/g, "==");

    return new ASTNode("operand", condition);
  }

  return parseExpression();
};

/**
 * Combines an array of ASTs into a single AST using the most frequent operator heuristic.
 * If no heuristic is determined, it defaults to combining the ASTs using 'AND'.
 *
 * @param {Array<ASTNode>} astArray - Array of ASTs to combine.
 * @returns {ASTNode} - The root of the combined AST.
 */
const combineAST = (astArray) => {
  if (astArray.length === 0) {
    throw new Error("No ASTs provided to combine.");
  }

  // Start with the first AST
  let combinedAST = astArray[0];

  // Combine each AST intelligently, minimizing redundancy
  for (let i = 1; i < astArray.length; i++) {
    const currentAST = astArray[i];

    // Create a new node with the most frequent operator
    const mostFrequentOperator = getMostFrequentOperator(
      combinedAST,
      currentAST
    );
    const newRootNode = new ASTNode("operator", mostFrequentOperator);

    newRootNode.left = combinedAST;
    newRootNode.right = currentAST;

    combinedAST = newRootNode;
  }

  return combinedAST;
};

/**
 * Determines the most frequent operator ('AND' or 'OR') between two ASTs.
 *
 * @param {ASTNode} ast1 - First AST to compare.
 * @param {ASTNode} ast2 - Second AST to compare.
 * @returns {String} - The most frequent operator ('AND' or 'OR').
 */
const getMostFrequentOperator = (ast1, ast2) => {
  const operators = { AND: 0, OR: 0 };

  // Recursively count operators in both ASTs
  const countOperators = (node) => {
    if (!node) return;
    if (node.type === "operator") {
      operators[node.value]++;
    }
    countOperators(node.left);
    countOperators(node.right);
  };

  countOperators(ast1);
  countOperators(ast2);

  // Return the most frequent operator, default to 'AND' if no clear choice
  return operators.AND >= operators.OR ? "AND" : "OR";
};
