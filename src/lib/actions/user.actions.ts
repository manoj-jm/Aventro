'use server'

import db from "../../../db/prisma";

export const createUserAction = async (data: FormData) => {
    try {
        const response = await db.user.create({
            data: {
                name: data.get("name") as string,
                email: data.get("email") as string,
                password: data.get("password") as string
            }
        })

        return response;
    } catch (error) {
        console.error("Error signing up:", error);
    }
}