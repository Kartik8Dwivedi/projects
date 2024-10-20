
export function validateAttributes(req, res, next) {
  const { attributes } = req.body;

  if (!attributes || typeof attributes !== "object") {
    return res
      .status(400)
      .json({ status: "failure", message: "Invalid attributes" });
  }

  if(attributes.age){
    attributes.age = parseInt(attributes.age);
  }

  if (attributes.age && typeof attributes.age !== "number") {
    return res
      .status(400)
      .json({ status: "failure", message: "Age must be a number" });
  }

  if(attributes.salary){
    attributes.salary = parseFloat(attributes.salary);
  }

  if (attributes.salary && typeof attributes.salary !== "number") {
    return res
      .status(400)
      .json({ status: "failure", message: "Salary must be a number" });
  }

  if(attributes.experience){
    attributes.experience = parseInt(attributes.experience);
  }

  if (attributes.experience && typeof attributes.experience !== "number") {
    return res
      .status(400)
      .json({ status: "failure", message: "Experience must be a number" });
  }

  if (attributes.department && typeof attributes.department !== "string") {
    return res
      .status(400)
      .json({ status: "failure", message: "Department must be a string" });
  }

  next();
}


export function validateRules(req, res, next) {
  const { ruleIds } = req.body;

  if (!ruleIds || !Array.isArray(ruleIds) || ruleIds.length === 0) {
    return res
      .status(400)
      .json({ status: "failure", message: "Invalid or empty ruleIds array" });
  }


  const objectIdRegex = /^[a-fA-F0-9]{24}$/;
  for (let id of ruleIds) {
    if (!objectIdRegex.test(id)) {
      return res
        .status(400)
        .json({ status: "failure", message: `Invalid rule ID: ${id}` });
    }
  }

  next();
}
