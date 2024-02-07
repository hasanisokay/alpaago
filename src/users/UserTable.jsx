import { useContext, useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { ref, get, query, orderByChild, set } from 'firebase/database';
import { AuthContext } from '../providers/AuthProvider';
import formatDate from '../utils/formatDate.mjs';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const { db, user } = useContext(AuthContext);
    const [loadingUser, setLoadingUser] = useState(false)
    useEffect(() => {
        setLoadingUser(true);
        const usersRef = ref(db, 'users');
        get(usersRef).then((snapshot) => {
            const usersList = [];
            snapshot.forEach((childSnapshot) => {
                usersList.push({ id: childSnapshot.key, ...childSnapshot.val() });
            });
            setUsers(usersList);
        }).catch((error) => {
            console.error("Error fetching users:", error);
        });
        setLoadingUser(false)
    }, [db]);
    const updateUserStatus = (userId, newStatus) => {
        const userRef = ref(db, `users/${userId}/status`);
        set(userRef, newStatus).then(() => {
            setUsers(users.map(user => user.id === userId ? { ...user, status: newStatus } : user));
            toast.success(`${newStatus === "none" ? "Status deleted" : `Status updated to ${newStatus}`}`)
        }).catch((error) => {
            console.error("Error updating user status:", error);
        });

    };
    if (loadingUser) return <Loader />
    return (
        <div className='pt-[70px]'>
            <div id='table-wrapper'>
                <h2 className="text-2xl font-semibold mb-4 text-center">Users</h2>
                {users?.length > 0 ? <div id='table-scroll'>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="table-col-classes">Name</th>
                                <th scope="col" className="table-col-classes">Added Date</th>
                                <th scope="col" className="table-col-classes">Status</th>
                                <th scope="col" className="table-col-classes">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((u) => (
                                <tr key={u.id} className="hover:bg-gray-100">
                                    <td className="table-td-classes">{u.name}</td>
                                    <td className="table-td-classes">{formatDate(new Date(u.addedDate))}</td>
                                    <td className="table-td-classes ">
                                        <span className={`${u.status === "active" ? "bg-green-500" : "bg-gray-500"} text-white px-2 pb-1 rounded-md`}>{u.status}</span>
                                    </td>
                                    <td className="table-td-classes ">
                                        {
                                            user?.uid === u?.id &&
                                            <>
                                                <button className={`btn ${u.status === "active" ? "btn-gray" : "btn-green"} mr-2`} onClick={() => updateUserStatus(u.id, u.status === "active" ? "inactive" : "active")}>{u.status === 'active' ? 'Change to Inactive' : 'Change to Active'}</button>
                                                {u?.status !== "none" && <button className="btn btn-red" onClick={() => updateUserStatus(u.id, "none")}>Delete</button>}
                                            </>


                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div> : <p className='text-center font-semibold'>No user data available. <Link className='text-blue-500' to={"/login"}>Login</Link>  to see</p>}
            </div>
        </div>
    );

};

export default UserTable;
