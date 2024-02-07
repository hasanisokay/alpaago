import { useContext, useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [showDropdown, setShowDropdown] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
    const [visible, setVisible] = useState(true);
    const dropdownRef = useRef(null);

    const handleOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    };

    const toggleDropdown = () => {
        setShowDropdown(prevState => !prevState);
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 200);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos]);

    return (
        <nav className={`flex items-center justify-between transition-all duration-500 transform md:px-[100px] px-2 fixed w-full z-50 ${visible ? 'translate-y-0 bg-white' : '-translate-y-full'}`}>
            <NavLink to={"/"}>
                <img className='h-[70px]' src={"https://alpaago.com/wp-content/uploads/2023/07/WhatsApp-Image-2023-06-30-at-5.46.34-PM.png"} alt="logo" />
            </NavLink>
            <div className='flex gap-4 justify-center items-center'>
                <NavLink className={({ isActive }) => (isActive ? 'active' : 'default')} to={"/"}>Home</NavLink>
                <NavLink className={({ isActive }) => (isActive ? 'active' : 'default')} to={"/users"}>Users</NavLink>
                {user ? (
                    <div>
                        <div ref={dropdownRef} onClick={toggleDropdown} className='cursor-pointer'>
                            {user.photoURL && <img src={user.photoURL} className='w-[50px] h-[50px] rounded-full' />}
                        </div>
                    </div>
                ) : (
                    <NavLink className={({ isActive }) => (isActive ? 'active' : 'default')} to={"/login"}>Login</NavLink>
                )}
            </div>
            {showDropdown && user && (
                <div className='duration-800 absolute right-4 top-[70px] z-30 bg-zinc-800 rounded-lg p-2 text-white'>
                    <ul className='flex flex-col gap-3 items-center justify-center'>
                        <li className='hover:bg-[#76777b] px-1 py-1 duration-500 rounded w-full'><Link to={"/profile"}>{user.displayName}</Link></li>
                        <li className='hover:bg-[#76777b] px-1 py-1 duration-500 rounded w-full'><Link onClick={logOut}>Logout</Link></li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
