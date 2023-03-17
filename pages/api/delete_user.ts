// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import admin from "@/lib/firebase";
import { ListUsersResult } from "firebase-admin/lib/auth/base-auth";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    message: string;
    type: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const body = JSON.parse(req.body);
    if (body.uid) {
        admin
            .auth()
            .deleteUser(body.uid)
            .then(() => {
                res.status(200).json({ type: "success", message: "User deleted successfully" });
            })
            .catch((err) => {
                res.status(200).json({ type: "error", message: "Error happen" });
            });
    }
    // admin.firestore().doc("users/231646165s").update({canAccess:true}).then((result) => {
    //   // doc
    // })
}
