import { Inter } from "next/font/google";
import admin from "@/lib/firebase";
import AddUserForm from "@/components/AddUserForm";
import { Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });
export async function getServerSideProps() {
    const { users } = await admin.auth().listUsers();
    // const docsRef = await admin.firestore().collection('users').get();
    // const usersData:any[] = [];
    // docsRef.forEach(async (doc) => {
    //   usersData.push({ ...doc.data(), _id: doc.id });
    // });

    // const usersNotHaveData = users.filter((user) => {
    //   return !usersData.find((data) => data._id === user.uid);
    // });
    // admin.auth().createUser({
    //     email: "user2@counterpoint.com",
    //     password: "secretPassword",
    // });

    // admin.auth().deleteUsers(users.map((user) => user.uid));

    return { props: { data: JSON.stringify(users) } };
}

function Home({ data, debug }: { data: any; debug: any }) {
    const router = useRouter();
    const columns: ColumnsType<any> = [
        {
            title: "Username",
            dataIndex: "email",
            key: "name",
            render: (text: string) => <a>{text.replace("@counterpoint.com", "")}</a>,
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Button
                    onClick={async () => {
                        await fetch("/api/delete_user", { body: JSON.stringify({ uid: record.uid }), method: "POST" });
                        router.replace(router.asPath);
                    }}
                >
                    Delete
                </Button>
            ),
        },
    ];
    console.log(data);
    return (
        <div style={{ padding: "0 2rem" }}>
            <AddUserForm />
            <Table columns={columns} dataSource={JSON.parse(data)} pagination={false} />
        </div>
    );
}
export default Home;
