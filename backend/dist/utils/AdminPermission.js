import userModel from "../models/userModel.js";
const adminPermission = async (userId) => {
    const user = await userModel.findById(userId);
    return user?.role === "ADMIN";
};
export default adminPermission;
