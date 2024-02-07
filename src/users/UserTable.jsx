import { useContext, useEffect, useState } from 'react';
import { ref, get, query, orderByChild, set } from 'firebase/database';
import { AuthContext } from '../providers/AuthProvider';
import DotIcon from '../components/svg/DotIcon';
import formatDate from '../utils/formatDate.mjs';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const { db } = useContext(AuthContext);

    useEffect(() => {
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
    }, [db]);
    const updateUserStatus = (userId, newStatus) => {
        const userRef = ref(db, `users/${userId}/status`);
        set(userRef, newStatus).then(() => {
            setUsers(users.map(user => user.id === userId ? { ...user, status: newStatus } : user));
        }).catch((error) => {
            console.error("Error updating user status:", error);
        });
        
    };

    return (
        <div>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Added Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user) => (
                        <tr key={user?.id}>
                            <td>{user.name}</td>
                            <td>{formatDate(new Date(user.addedDate))}</td>
                            <td className='flex items-center justify-center'>{<DotIcon fill={user.status ==="active" ? "#27c93f" :"#7d7d7d"} width={"40px"} height={"40px"}/> }{user.status}</td>
                            <td>
                                <button className={`mr-1 btn btn-sm ${user?.status ==="active" ? "btn-gray" :"btn-green"} `} onClick={() => updateUserStatus(user?.id, user?.status ==="active" ? "inactive" :"active")} >
                                    {user?.status === 'active' ? 'Change to Inactive' : 'Change to Active'}
                                </button>
                                <button className='btn btn-red btn-sm' onClick={() => updateUserStatus(user?.id, "none")}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
