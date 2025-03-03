

const signOut = async (req, res) => {
    res.status(200).json({
        success: true,
        message: "Sign out successfully",
    });
}

export default signOut;