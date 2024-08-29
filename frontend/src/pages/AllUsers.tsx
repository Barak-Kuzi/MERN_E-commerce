import React, {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import moment from 'moment';
import {MdModeEdit} from "react-icons/md";

import SummaryApi from "../common";
import {CustomResponse} from "../utils/CustomResponse";
import ChangeUserRole from "../components/ChangeUserRole";
import {User} from "../models";

export default function AllUsers(): React.JSX.Element {

    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [openUpdateRole, setOpenUpdateRole] = useState<boolean>(false);
    const [updateUserDetails, setUpdateUserDetails] = useState<User>({
        email: "",
        name: "",
        role: "",
        _id: "",
    });

    const fetchAllUsers = async () => {
        const response: Response = await fetch(SummaryApi.allUsers.url, {
            method: SummaryApi.allUsers.method,
            credentials: 'include'
        });

        const resData: CustomResponse = await response.json();

        if (resData.success) {
            setAllUsers(resData.data)
        }

        if (resData.error) {
            toast.error(resData.message)
        }

    }

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const handleEditUserDetails = (user: User, display: boolean) => {
        setUpdateUserDetails(user);
        setOpenUpdateRole(display);
    }

    const handleCloseUpdateRole = () => {
        setOpenUpdateRole(false);
    }

    return (
        <div className="users_table">
            <table>
                <thead>
                <tr>
                    <th>Sr.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Created Date</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {
                    allUsers.map((user, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user?.name}</td>
                                <td>{user?.email}</td>
                                <td>{user?.role}</td>
                                <td>{moment(user?.createdAt).format('LL')}</td>
                                <td>
                                    <button className="users_table_button"
                                            onClick={() => handleEditUserDetails(user, true)}
                                    >
                                        <MdModeEdit/>
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            {
                openUpdateRole && (
                    <ChangeUserRole
                        _id={updateUserDetails._id}
                        name={updateUserDetails.name}
                        email={updateUserDetails.email}
                        role={updateUserDetails.role!}
                        onClose={handleCloseUpdateRole}
                        onCallBack={fetchAllUsers}
                    />
                )
            }
        </div>
    )
}