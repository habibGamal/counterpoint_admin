import admin, { ServiceAccount } from "firebase-admin";
import serviceAccount from "../private_key.json";

try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as ServiceAccount),
    });
    console.log("Initialized.");
} catch (error) {
    /*
     * We skip the "already exists" message which is
     * not an actual error when we're hot-reloading.
     */
    console.error("Firebase admin initialization error", error);
}

export default admin;
