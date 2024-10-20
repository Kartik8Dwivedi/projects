import CombineRules from "./CombineRules/CombineRules";
import CreateRule from "./CreateRule";
import RuleEvaluationForm from "./RuleEvaluation/RuleEvaluation";
import RuleManager from "./RulesManager";

const HeroSection = () => {
  return (
    <div className="w-[80%] min-h-[80%]">
      <div role="tablist" className="tabs tabs-lifted text-lg">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Create Rule"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <CreateRule />
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Combine Rules"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <CombineRules />
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Test Rules"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <RuleEvaluationForm />
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Manage Rules"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <RuleManager/>
        </div>
      </div>
    </div>
  );
}

export default HeroSection