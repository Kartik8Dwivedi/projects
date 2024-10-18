import { useEffect, useState } from "react";
import TextInput from "./TextInput";
import toast from "react-hot-toast";
import axios from "axios";

const CreateRule = () => {
  const [rule, setRule] = useState<string>("");
  const [submit, setSubmit] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (rule.trim() === "") {
      setSubmit(false);
      toast.error("Rule cannot be empty.");
      return;
    }

    try {
      const response = await axios.post("https://zeotap-project-one.vercel.app/api/v1/rules", {ruleString:rule});

      if (response.status !== 200 && response.status !== 201) {
        setSubmit(false);
        toast.error("Failed to submit rule.", );
        throw new Error("Network response was not ok");
      }
      const data = response.data;
      console.log("Backend response:", data);
      toast.success("Rule submitted successfully!");
      setSubmit(false);

    } catch (error) {
      console.error("Error submitting rule:", error);
      toast.error("Failed to submit rule.");
    } finally {
      setRule("");
      setSubmit(false);
    }
  };

  useEffect(() => {
    if (submit) {
      handleSubmit();
    }
  }, [submit]);

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-6 w-[60vw]">
        <TextInput rule={rule} setRule={setRule} setSubmit={setSubmit} />
        <button className="btn btn-warning" onClick={() => setSubmit(true)}>
          Create Rule
        </button>
      </div>
    </div>
  );
};

export default CreateRule;
