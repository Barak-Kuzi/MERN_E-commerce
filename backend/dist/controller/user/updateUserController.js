import userModel from "../../models/userModel.js";
async function updateUserController(req, res) {
    try {
        const sessionUser = req.user?.id;
        if (!sessionUser) {
            return res.json({
                message: "User not found",
                error: true,
                success: false
            });
        }
        const { role, name, firstName, lastName, email, phone, birthDate, gender, profileImage } = req.body;
        let fullName = "";
        if (firstName && lastName)
            fullName = `${firstName} ${lastName}`;
        else
            fullName = name;
        const payload = {
            ...(name && { name: fullName }),
            ...((firstName && lastName) && { name: fullName }),
            ...(role && { role: role }),
            ...(email && { email }),
            ...(phone && { phone }),
            ...(birthDate && { birthDate }),
            ...(gender && { gender }),
            ...(profileImage && ({ profileImage }))
        };
        const updatedUser = await userModel.findByIdAndUpdate(sessionUser, payload, { new: true });
        res.status(200).json({
            message: "User updated successfully",
            data: updatedUser,
            success: true,
            error: false
        });
    }
    catch (error) {
        res.json({
            message: error.message || "Something went wrong",
            error: true,
            success: false
        });
    }
}
export default updateUserController;
