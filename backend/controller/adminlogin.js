




exports.renderAdminLogin = (req,res)=>{
    return res.status(200).json({message:"Admin login page rendered"})
}

exports.adminLogin = ((req, res) => {
    const { username, password } = req.body

    const definedUsername = "admin"
    const definedPassword = "admin123"

    if (username === definedUsername && password === definedPassword) {
        return res.status(200).json({ message: "Admin login successful" });
    } else {
        return res.status(401).json({ message: "Invalid admin credentials" });
    } 
})

