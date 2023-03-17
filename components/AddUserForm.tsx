import React from "react";
import { Form, Input, Button, message } from "antd";
import { useRouter } from "next/router";
export default function AddUserForm() {
    const router = useRouter();
    const onFinish = async (values: any) => {
        const res = await fetch("/api/add_user", { body: JSON.stringify(values), method: "POST" });
        if (res.status !== 200) message.error("Error Happen");
        const data = await res.json();
        if (data.type === "success") message.success(data.message);
        if (data.type === "error") message.error(data.message);
        router.replace(router.asPath);
    };
    return (
        <>
            <Form
                name="basic"
                style={{ padding: "1rem" }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
                layout="inline"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: "Please input your username!" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: "Please input your password!" }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button className="h-auto" type="primary" htmlType="submit">
                        Add user
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}
