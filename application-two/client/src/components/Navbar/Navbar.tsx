import ThemeMode from "./ThemeMode";

const NavBar = () => {

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }
  return (
    <div className="h-[30%] w-[80%] mt-5">
      <div className="navbar bg-base-100 shadow-2xl rounded-xl bg-secondary/35">
        <div className="flex-1">
          <a href="/" className="btn btn-ghost text-xl">
            RuleEngine
          </a>
        </div>
        <div className="flex-none gap-3">
          <button className="btn btn-accent/20 " onClick={handleLogout}>Logout</button>
          <button className="btn btn-square rounded-full">
            <ThemeMode />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
