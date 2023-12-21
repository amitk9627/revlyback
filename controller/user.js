const Users = require('../model/user.js');

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(500).json({
            status: "fail",
            message: "Please enter name, email, password"
        })
    }
    const alreadyUser = await Users.findOne({ email: email });
    if (alreadyUser) {
        return res.status(404).json({
            status: "false",
            message: "User already exists",
        });
    }
    try {
        const userDetials = {
            name: name,
            email: email,
        }
        const salt = await bcrypt.genSalt(10);  //salt
        const passwordHash = await bcrypt.hash(password, salt); //new Password
        userDetials.password = passwordHash;
        const newUser = new Users(userDetials);
        const result = await newUser.save();
        res.json({
            status: true,
            message: "User registered successfully",
            result: result
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            message: "User not register"
        })
    }


}
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(404).json({
            status: false,
            message: "Please enter your email and password"
        });
    }
    try {
        const user = await Users.findOne({ email: email });
        if (!user) {
            return res.status(401).json({
                success: "fail",
                message: "email not found",
            });
        }
        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            return res.json({
                success: false,
                message: "User not login",
                ispermit: isPassword,
            })
        }
        const currentTime = Math.floor(new Date() / 1000);
        const expriryTime = currentTime + 3600;
        const payload = {
            email: user.email,
            _id: user._id,
            exp: expriryTime,
        }
        const token = jwt.sign(payload, secretKey);
        await Users.findByIdAndUpdate(user._id, { token: token })
        res.json({
            status: true,
            message: "User login successful",
            token: token

        })
    } catch (err) {
        res.status(500).json({
            status: false,
            message: "User not login"
        })
    }

}
const logoutUser = async (req, res) => {
    const token = req.headers.authorization;
    const decodedToken = jwt.decode(token);
    await Users.findByIdAndUpdate(decodedToken._id, { token: "" });
    res.json({
        status: true,
        message: "User Logout Successfully"
    })
}

module.exports = { registerUser, loginUser, logoutUser };