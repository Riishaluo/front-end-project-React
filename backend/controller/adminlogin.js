




exports.renderAdminLogin = (req, res) => {
    return res.status(200).json({ message: "Admin login page rendered" })
}

exports.adminLogin = (req, res) => {
    const { email, password } = req.body

    const definedEmail = "admin@gmail.com"
    const definedPassword = "admin123"

    if (email === definedEmail && password === definedPassword) {
        return res.status(200).json({ message: "Admin login successful" })
    } else {
        return res.status(401).json({ message: "Invalid credentials" })
    }
};


