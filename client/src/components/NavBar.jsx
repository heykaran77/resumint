import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../app/features/authSlice";

const NavBar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    dispatch(logout());
  };

  return (
    <div className="shadow-sm bg-white ">
      <nav className="flex items-center justify-between max-w-7xl text-slate-800 mx-auto px-4 py-3.5 transition-all">
        <Link to="/">
          <img src="/logo.png" alt="Resumint" className="w-auto h-8" />
        </Link>

        <div className="flex items-center gap-6 text-sm">
          <p className="max-sm:hidden">Hi, {user?.name}!</p>
          <button
            className="bg-white hover:bg-slate-50 border border-grey-300 px-6 py-1.5 rounded-full active:scale-95 transition-all"
            onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
