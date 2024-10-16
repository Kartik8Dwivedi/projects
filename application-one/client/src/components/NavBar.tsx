import ThemeMode from "./ThemeMode";

const NavBar = () => {
  return (
    <div className="h-[30%] w-[80%] ">
      <div className="navbar bg-base-100 shadow-2xl rounded-xl">
        <div className="flex-1">
            <a href="/" className="btn btn-ghost text-xl">RuleEngine</a>
        </div>
        <div className="flex-none">
          <button className="btn btn-square btn-ghost rounded-full">
            <ThemeMode />
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavBar