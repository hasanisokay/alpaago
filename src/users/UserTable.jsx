import { useContext, useEffect, useState } from 'react';
import { ref, get, query, orderByChild, set } from 'firebase/database';
import { AuthContext } from '../providers/AuthProvider';
import formatDate from '../utils/formatDate.mjs';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const { db } = useContext(AuthContext);
const [ loadingUser, setLoadingUser] = useState(false)
    useEffect(() => {
        setLoadingUser(true);
        const usersRef = ref(db, 'users');
        get(usersRef).then((snapshot) => {
            const usersList = [];
            snapshot.forEach((childSnapshot) => {
                usersList.push({id: childSnapshot.key, ...childSnapshot.val() });
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
        toast.success(`${newStatus ==="none" ? "Status deleted": `Status updated to ${newStatus}` }`)
        }).catch((error) => {
            console.error("Error updating user status:", error);
        });
        
    };
if(loadingUser) return <Loader />
    return (
        <div id='table-wrapper'>
            <h2 className="text-2xl font-semibold mb-4 text-center">Users</h2>
            <div id='table-scroll'>
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
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-100">
                                <td className="table-td-classes">{user.name}</td>
                                <td className="table-td-classes">{formatDate(new Date(user.addedDate))}</td>
                                <td className="table-td-classes ">
                                    <span className={`${user.status === "active" ? "bg-green-500" : "bg-gray-500"} text-white px-2 pb-1 rounded-md`}>{user.status}</span>
                                </td>
                                <td className="table-td-classes ">
                                    <button className={`btn ${user.status === "active" ? "btn-gray" : "btn-green"} mr-2`} onClick={() => updateUserStatus(user.id, user.status === "active" ? "inactive" : "active")}>{user.status === 'active' ? 'Change to Inactive' : 'Change to Active'}</button>
                                    {user?.status !== "none" && <button className="btn btn-red" onClick={() => updateUserStatus(user.id, "none")}>Delete</button>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
    
};

export default UserTable;
