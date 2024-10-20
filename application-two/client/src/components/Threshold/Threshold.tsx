import Notify from "./Notify/Notify";
import Search from "./Search/Search";

const Threshold = () => {
  return (
    <div className="overflow-hidden">
      <div role="tablist" className="tabs tabs-bordered mt-10">
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab ml-20 md:ml-60 lg:ml-[26rem] text-lg font-semibold"
          aria-label="Search"
        />
        <div role="tabpanel" className="tab-content p-10">
          <Search />
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab mr-16 md:mr-48 lg:mr-[21rem] text-lg font-semibold"
          aria-label="Notify"
          defaultChecked
        />
        <div role="tabpanel" className="tab-content p-10">
          <Notify />
        </div>
      </div>
    </div>
  );
};

export default Threshold;
