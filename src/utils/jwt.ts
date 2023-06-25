import jwt from "jsonwebtoken";
import { AuthResponse } from "types";

export async function generateJwtToken(data: AuthResponse) {
    return jwt.sign(
        {
            _id: data._id, // We are gonna use this in the middleware 'isAuth'
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION },
    );
}

export const tokenVerifier = (authToken: string): AuthResponse => {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);

    return decoded as AuthResponse;
};
