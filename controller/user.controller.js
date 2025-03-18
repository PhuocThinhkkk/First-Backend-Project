import User from '../models/user.model.js';


const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');

    if (!users) {
        const err = new Error('No user in database');
        err.status = 404;
        throw err;
    }

    res.status(200).json({
        success: true,
        data: users
    });
    } catch (error) {
    return res.status(500).json({
        success: false,
        message: error.message
    });
  }
}

const getUserById = async (req, res) => { 
    try {

        const isUserValid = req.params.id == req.user.id;
        if(!isUserValid) return res.status(404).json({ message: "You are not the owner of this id"})
        const user = await User.findById(req.params.id).select('-password');

        if (!user) {
            const err = new Error('No user with that id in database');
            err.status = 404;
            throw err;
        }    

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            success: false, 
            message: error.message
        });
    }
}

export {
  getAllUsers,
  getUserById
}