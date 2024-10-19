export const parseRule = (ruleString) => {
  // Tokenize the rule string into individual parts (operands and operators)
  const tokens = tokenizeRule(ruleString);

  // Build the AST from the tokens
  return buildAST(tokens);
};

/**
 * Tokenizes the rule string into an array of tokens.
 * @param {String} ruleString - The rule string to tokenize.
 * @returns {Array} - An array of tokens (operators and operands).
 */
const tokenizeRule = (ruleString) => {
  // Regex to match operators AND/OR and operands (e.g., 'age > 30', 'department == "Sales"')
  const operatorRegex = /\b(AND|OR)\b/;
  const tokens = ruleString.split(operatorRegex).map((token) => token.trim());

  return tokens;
};

/**
 * Builds an AST from an array of tokens.
 * @param {Array} tokens - The tokenized rule string (operators and operands).
 * @returns {Object} - The root node of the generated AST.
 */
const buildAST = (tokens) => {
  // Base case: if there's only one token, it's an operand
  if (tokens.length === 1) {
    return {
      type: "operand",
      value: tokens[0],
      left: null,
      right: null,
    };
  }

  // Find the main operator (AND/OR) with the lowest precedence
  const operatorIndex = tokens.findIndex(
    (token) => token === "AND" || token === "OR"
  );

  if (operatorIndex === -1) {
    // No operator found (return as operand)
    return {
      type: "operand",
      value: tokens.join(" "), // Join the operand parts
      left: null,
      right: null,
    };
  }

  // Recursively build the left and right subtrees
  const leftTokens = tokens.slice(0, operatorIndex);
  const rightTokens = tokens.slice(operatorIndex + 1);

  return {
    type: "operator",
    value: tokens[operatorIndex], // AND or OR
    left: buildAST(leftTokens),
    right: buildAST(rightTokens),
  };
};
