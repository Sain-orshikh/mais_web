import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (adminId, res) => {
    const token = jwt.sign({adminId}, process.env.JWT_SECRET, {
        expiresIn: '15d'
    })

    res.cookie("jwt", token, {
        maxAge: 15*24*60*60*1000, //ms
        httpOnly: true, // prevents attack from script
        sameSite: "none", // Allow cross-domain cookies
        secure: true, // Required for sameSite: none
    })
}
