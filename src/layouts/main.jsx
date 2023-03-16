import { NavLink, Route, BrowserRouter, Router, Outlet, useNavigate } from "react-router-dom";
import { logout, selectUser } from "../app/stores/auth";
import { useDispatch, useSelector } from "react-redux";

function Layout() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <div>

            {
                // (user != null) &&
                // <div className="flex items-center justify-between mb-4">
                //     <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>

                //     <div className="flex items-center space-x-2">
                //         <span className="text-gray-700">{user.email}</span>
                //     </div>
                //     {/* logout */}
                //     <form onSubmit={
                //         (event) => {
                //             event.preventDefault();
                //             dispatch(logout());

                //             navigate("/");
                //         }
                //     }>
                //         <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Logout</button>
                //     </form>
                // </div>
            }

            {/* <div className="flex mt-4 justify-around max-w-2xl mx-auto">
                {
                    (localStorage.getItem('token') != null) ?
                        <NavLink to="/feed">feed</NavLink>
                        :
                        <NavLink to="/">Login</NavLink>
                }
                <NavLink to="/Search">Search</NavLink>

            </div> */}
            <div className=" max-w-xl mx-auto">
                <div className="m-4 pb-20">
                    <Outlet />
                </div>

                <div
                    className="bg-white z-30 rounded-t-xl px-2 py-2 font-medium
        shadow-[0px_0px_4px_2px_rgba(0,0,0,0.15)] text-base fixed bottom-0 w-full max-w-xl mx-auto">
                    <div className="grid grid-cols-3 text-center items-center">
                        <NavLink to="/search"
                            className={({ isActive }) =>
                                isActive ? "py-1 text-neutral-700 bg-neutral-200 rounded-xl" : "py-1 text-neutral-400"
                            }
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mx-auto">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>

                            <p className="font-medium text-sm mt-1">Search</p>
                        </NavLink>
                        <NavLink to="/feed"

                            className={({ isActive }) =>
                                isActive ? "py-1 text-neutral-700 bg-neutral-200 rounded-xl" : "py-1 text-neutral-400"
                            }

                            href="https://emrooz.ir/c-tajrobi"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mx-auto">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>


                            <p className="font-medium text-sm mt-1">Feed</p>
                        </NavLink>
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? "py-1 text-neutral-700 bg-neutral-200 rounded-xl" : "py-1 text-neutral-400"
                            }
                            to="/">
                            <div className="relative w-fit mx-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                    stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                            </div>
                            <p className="font-medium text-sm mt-1">
                                {
                                    user != null ? "Profile" : "Login"
                                }
                            </p>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Layout;