import { useEffect, useState } from 'react';
import TextInput from './TextInput.tsx'
import toast from 'react-hot-toast';
import axios from "axios";

const CombineRules = () => {
    const [rule, setRule] = useState<string>("");
    const [submit, setSubmit] = useState<boolean>(false);
    const handleSubmit = async () => {
    if (rule.trim() === "") {
        setSubmit(false);
        toast.error("Rule cannot be empty.");
        return;
    }
    try {
      const ruleArray = rule.split(",").map((item) => item.trim());
      console.log(ruleArray);
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URI + "combine",
        {
          ruleStrings: ruleArray,
        }
      );

      // @ts-ignore
      console.log("backend response:", response?.data?.message);

      if (response.status !== 200 && response.status !== 201) {
        setSubmit(false);
        toast.error("Failed to submit rule.");
        // @ts-ignore
        toast.error(response.data.message || "");
      }
      toast.success("Rule submitted successfully!");
      setSubmit(false);
    } catch (error) {
      console.error("Error submitting rule:", error);
      // @ts-ignore
      toast.error(error.message || "Failed to submit rule.");
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
      <div className="flex items-center justify-center">
        <div className="flex flex-col justify-center items-center gap-6 w-[60vw]">
          <TextInput rule={rule} setRule={setRule} setSubmit={setSubmit} />
          <button className="btn btn-neutral" onClick={() => setSubmit(true)}>
            Combine Rules
          </button>
        </div>
      </div>
    );
}

export default CombineRules