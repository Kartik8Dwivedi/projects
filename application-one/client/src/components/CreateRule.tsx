import { useEffect, useState } from "react";
import TextInput from "./TextInput";
import toast from "react-hot-toast";

const CreateRule = () => {
  const [rule, setRule] = useState<string>("");
  const [submit, setSubmit] = useState<boolean>(false);
  let data;

  const handleSubmit = async () => {
    if (rule.trim() === "") {
      setSubmit(false);
      toast.error("Rule cannot be empty.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3030/api/v1/rules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (!response.ok) {
        setSubmit(false);
        toast.error("Failed to submit rule.");
        throw new Error("Network response was not ok");
      }

      data = await response.json();
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
    <>
      <div className="flex flex-col justify-center items-center gap-6">
        <TextInput rule={rule} setRule={setRule} setSubmit={setSubmit} />
        <button className="btn btn-warning" onClick={() => setSubmit(true)}>
          Submit
        </button>
        {data && `<p>${data}</p>`}
      </div>
    </>
  );
};

export default CreateRule;
