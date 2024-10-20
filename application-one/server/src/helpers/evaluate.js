export const combineRulesEvaluate = (asts) => {
  if (asts.length === 0) return null;

  // If there is only one AST, return it directly
  if (asts.length === 1) return asts[0];

  let combinedAST = asts[0];

  for (let i = 1; i < asts.length; i++) {
    combinedAST = {
      type: "operator",
      value: "AND", // Combine rules using AND for now
      left: combinedAST,
      right: asts[i],
    };
  }

  return combinedAST;
};


export function evaluateASTTree(node, data) {
    if (!node) return false;

    if (node.type === "operand") {
      const { key, comparison, value } = node.value;
      switch (comparison) {
        case ">":
          return data[key] > value;
        case "<":
          return data[key] < value;
        case "=":
          return data[key] === value;
        default:
          return false;
      }
    }

    const leftEval = evaluateASTTree(node.left, data);
    const rightEval = evaluateASTTree(node.right, data);

    if (node.type === "AND") return leftEval && rightEval;
    if (node.type === "OR") return leftEval || rightEval;
    return false;
}


// Function to evaluate a condition based on attributes
const evalCondition = (condition, attributes) => {
  // Safely evaluate the condition by injecting attributes
  const keys = Object.keys(attributes);
  const values = Object.values(attributes);

  // Create a new function with the condition and safely pass the attributes in
  const fn = new Function(...keys, `return ${condition};`);

  return fn(...values);
};
