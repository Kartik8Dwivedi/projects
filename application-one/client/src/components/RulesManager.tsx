//@ts-nocheck

import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const RuleManager = () => {
  const [rules, setRules] = useState([]);
  const [editingRuleId, setEditingRuleId] = useState<number | null>(null);
  const [updatedRules, setUpdatedRules] = useState<Record<number, string>>({});

  const fetchRules = async () => {
    try {
      const response = await axios.get("http://localhost:3030/api/v1/rules");
      setRules(response.data.data);
      console.log(rules);
    } catch (error) {
      console.error("Error fetching rules:", error);
    }
  };

  const deleteRule = async (id: number) => {
    try {
      let response = await axios.delete(`http://localhost:3030/api/v1/rules/${id}`); 
      console.log(response);
      toast.success("Rule deleted successfully!");
      fetchRules();
    } catch (error) {
        toast.error("Failed to delete rule.Try again later.");
      console.error("Error deleting rule:", error);
    }
  };

  const updateRule = async (id: number) => {
    try {
      await axios.put(`http://localhost:3030/api/v1/rules/${id}`, {
        ruleString: updatedRules[id],
      }); 
      setEditingRuleId(null); 
      fetchRules(); 
    } catch (error) {
      console.error("Error updating rule:", error);
    }
  };

  const handleEditChange = (e, id: number) => {
    setUpdatedRules({
      ...updatedRules,
      [id]: e.target.value, 
    });
  };

  const handleSubmit = (e, id: number) => {
    if (e.key === "Enter" || e.type === "click") {
      updateRule(id); 
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Rule Manager</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Rule</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((rule) => (
              <tr key={rule._id}>
                <td>
                  {editingRuleId === rule._id ? (
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-xs"
                      value={updatedRules[rule._id] || rule.ruleString} 
                      onChange={(e) => handleEditChange(e, rule._id)}
                      onKeyPress={(e) => handleSubmit(e, rule._id)}
                    />
                  ) : (
                    rule.ruleString
                  )}
                </td>
                <td>
                  {editingRuleId === rule._id ? (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => updateRule(rule._id)} 
                    >
                      Submit
                    </button>
                  ) : (
                    <>
                      <button
                        className="btn btn-error btn-sm mr-2"
                        onClick={() => deleteRule(rule._id)} 
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-info btn-sm"
                        onClick={() => {
                          setEditingRuleId(rule._id);
                          setUpdatedRules({
                            ...updatedRules,
                            [rule._id]: rule.ruleString,
                          }); 
                        }}
                      >
                        Update
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RuleManager;
