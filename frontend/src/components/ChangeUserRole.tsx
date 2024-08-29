import React, {useState} from "react";
import {toast} from "react-toastify";
import {IoMdClose} from "react-icons/io";

import SummaryApi from "../common";
import ROLE from "../common/role";
import {CustomResponse} from "../utils/CustomResponse";

interface ChangeUserRoleProps {
    _id: string;
    name: string;
    email: string;
    role: string;
    onClose: () => void;
    onCallBack: () => void;
}

export default function ChangeUserRole({_id, name, email, role, onClose, onCallBack}: ChangeUserRoleProps): React.JSX.Element {
    const [userRole, setUserRole] = useState<string>(role);

    const handleOnChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setUserRole(e.target.value);
    }

    const updateUserRole = async () => {
        const response: CustomResponse = await fetch(SummaryApi.updateUser.url, {
            method: SummaryApi.updateUser.method,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: _id,
                role: userRole
            })
        });

        const resData: CustomResponse = await response.json();

        if (resData.success) {
            toast(resData.message);
            onClose();
            onCallBack();
        }
    }

    return (
        <div className="change_user_role_container">
            <div className="change_user_role_content">
                <div className="change_user_role_title">
                    <h1>Change User Role</h1>
                    <button className="close_button" onClick={onClose}><IoMdClose/></button>
                </div>

                <div className="change_user_role_details">
                    <p className="change_user_role_details_title">Name:</p>
                    <p>{name}</p>
                </div>
                <div className="change_user_role_details">
                    <p className="change_user_role_details_title">Email:</p>
                    <p>{email}</p>
                </div>

                <div className="change_user_role_select_container">
                    <p className="change_user_role_details_title">Role:</p>
                    <select className='border px-4 py-1' value={userRole} onChange={handleOnChangeSelect}>
                        {
                            Object.values(ROLE).map(el => {
                                return (
                                    <option value={el} key={el}>{el}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <button className="change_role_button" onClick={updateUserRole}>Change Role</button>
            </div>
        </div>
    )
}