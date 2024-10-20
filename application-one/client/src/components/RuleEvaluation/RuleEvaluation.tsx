//@ts-nocheck
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

interface Rule {
  _id: string;
  ruleName: string;
}

const EvaluateRule: React.FC = () => {
  const [attributes, setAttributes] = useState({
    age: "",
    department: "",
    salary: "",
    experience: "",
  });
  const [rules, setRules] = useState<Rule[]>([]);
  const [selectedRuleIds, setSelectedRuleIds] = useState<string[]>([]);
  const [evaluationResult, setEvaluationResult] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URI+"/rules")
      .then((res) => {
        console.log(res.data.data)
        setRules(res.data.data);
      })
      .catch((err) => {
        toast.error("Failed to load rules");
      });
  }, []);

  const handleAttributeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAttributes({ ...attributes, [e.target.name]: e.target.value });
  };

  const handleRuleSelect = (ruleId: string) => {
    setSelectedRuleIds((prev) =>
      prev.includes(ruleId)
        ? prev.filter((id) => id !== ruleId)
        : [...prev, ruleId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axios
      .post(import.meta.env.VITE_BACKEND_URI+"/evaluate", { attributes, ruleIds: selectedRuleIds })
      .then((res) => {
        console.log(res.data)
        setEvaluationResult(res.data.result);
        toast.success(
          `Evaluation result: ${res.data.result ? "True" : "False"}`
        );
      })
      .catch((err) => {
        console.log(err);
        console.log(err.data);
        toast.error("Failed to evaluate rules");
      });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Evaluate Rule</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="age" className="block">
              Age:
            </label>
            <input
              type="text"
              id="age"
              name="age"
              value={attributes.age}
              onChange={handleAttributeChange}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label htmlFor="department" className="block">
              Department:
            </label>
            <input
              type="text"
              id="department"
              name="department"
              value={attributes.department}
              onChange={handleAttributeChange}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label htmlFor="salary" className="block">
              Salary:
            </label>
            <input
              type="text"
              id="salary"
              name="salary"
              value={attributes.salary}
              onChange={handleAttributeChange}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label htmlFor="experience" className="block">
              Experience:
            </label>
            <input
              type="text"
              name="experience"
              value={attributes.experience}
              onChange={handleAttributeChange}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div>
        <label htmlFor="ruleSelect" className="block">Select Rules:</label>
            {rules?.map((rule) => (
                <div key={rule._id} className="form-control">
                    <label className="cursor-pointer label">
                        <input
                            type="checkbox"
                            className="checkbox"
                            value={rule._id}
                            onChange={() => handleRuleSelect(rule._id)}
                        />
                        <span className="label-text">{rule.ruleString}</span>
                    </label>
                </div>
            ))}
        </div>

        <button type="submit" className="btn btn-primary">
          Evaluate
        </button>
      </form>

      {evaluationResult !== null && (
        <div className="mt-6">
          <h2 className="text-xl font-bold">Evaluation Result:</h2>
          <p className={evaluationResult ? "text-green-600" : "text-red-600"}>
            {evaluationResult ? "True" : "False"}
          </p>
        </div>
      )}
    </div>
  );
};

export default EvaluateRule;
