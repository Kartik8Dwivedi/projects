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
          className="tab ml-28 md:ml-80 lg:ml-[21rem] text-xl font-bold"
          aria-label="Search"
          defaultChecked
        />
        <div role="tabpanel" className="tab-content p-10">
          <Search />
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab mr-16 md:mr-48 lg:mr-[21rem] text-xl font-bold"
          aria-label="Notify"
        />
        <div role="tabpanel" className="tab-content p-10">
          <Notify />
        </div>
      </div>
    </div>
  );
};

export default Threshold;
