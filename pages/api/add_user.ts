// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import admin from "@/lib/firebase";
import { ListUsersResult } from "firebase-admin/lib/auth/base-auth";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    message: string;
    type: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    // const user = admin.firestore().doc("users/231646s165").get().then((doc) => {
    //   console.log(doc);

    //   res.status(200).json({ user: JSON.stringify(doc.data()) });

    // })

    const body = JSON.parse(req.body);
    if (body.username && body.password) {
        admin
            .auth()
            .createUser({
                email: body.username + "@counterpoint.com",
                password: body.password,
            })
            .then(() => {
                res.status(200).json({ type: "success", message: "User added successfully" });
            })
            .catch((err) => {
                res.status(200).json({ type: "error", message: "Error happen propably user already exists" });
            });
    }
    // admin.firestore().doc("users/231646165s").update({canAccess:true}).then((result) => {
    //   // doc
    // })
}
