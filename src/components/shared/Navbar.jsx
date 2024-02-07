import { useContext, useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const handleOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    };
    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);


    return (
        <div className="rounded-md flex items-center justify-between">
            <NavLink to={"/"}>
                <img className='h-[70px]' src={"https://alpaago.com/wp-content/uploads/2023/07/WhatsApp-Image-2023-06-30-at-5.46.34-PM.png"} alt="logo" />
            </NavLink>
            <div className='flex gap-2 justify-center items-center'>
                <NavLink className={({ isActive }) => (isActive ? 'active' : 'default')} to={"/"}>Home</NavLink>
                <NavLink className={({ isActive }) => (isActive ? 'active' : 'default')} to={"/users"}>Users</NavLink>
                {user ? (<div className="dropdown dropdown-end">
                    <div  ref={dropdownRef} onClick={() => setShowDropdown(!showDropdown)} className='cursor-pointer'>
                        <img src={user?.photoURL} className='w-[50px] h-[50px] rounded-full' />
                    </div>
                </div>) : <NavLink className={({ isActive }) => (isActive ? 'active' : 'default')} to={"/login"}>Login</NavLink>}
            </div>
                {
                    showDropdown && user && <div className='duration-800 absolute right-4 top-[70px] z-30 bg-zinc-800 rounded-lg p-2 text-white'>
                        <ul className='flex flex-col gap-3 items-center justify-center'>
                            <li className='hover:bg-[#76777b] px-1 py-1 duration-500 rounded w-full'><Link to={"/profile"}>{user?.displayName}</Link></li>
                            <li className='hover:bg-[#76777b] px-1 py-1  duration-500 rounded w-full'><Link onClick={() => logOut()}>Logout</Link></li>
                        </ul>
                    </div>
                }
        </div>
    );
};

export default Navbar;