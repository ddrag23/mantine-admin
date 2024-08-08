"use client"
import { Button, Flex, PasswordInput, rem, Space, Text, TextInput } from "@mantine/core";
import authMobileImage from '../../../../public/assets/images/auth-mobile.jpg'
import Image from "next/image";
import Link from "next/link";
import { useMediaQuery } from "@mantine/hooks";
import { CSSProperties, useState } from "react";
import { useForm } from "@mantine/form";
import Joi from 'joi';
import { joiResolver } from 'mantine-form-joi-resolver';
import { notifications } from '@mantine/notifications';
import httpClient, { ResponseData } from "../../../lib/http-client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
export default function Page() {
    const router = useRouter()
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { email: '', password: '' },
        validate: joiResolver(Joi.object({
            email: Joi.string().email({ tlds: { allow: false } }).required(),
            password: Joi.string().min(2).max(20).required()
        }))
    })
    const [loading, setLoading] = useState<boolean>(false)
    const handleSubmit = async (values: typeof form.values) => {
        setLoading(true)
        try {
            const response = await httpClient.post<ResponseData>('/auth/login', values)
            Cookies.set('token', response.data.token, { expires: 365 })
            Cookies.set('user', JSON.stringify(response.data.user), { expires: 365 })
            Cookies.set('permissions', JSON.stringify(response.data.permissions), { expires: 365 })
            notifications.show({ title: "Success", message: response.message, color: 'green' })
            router.push('/')
        } catch (error) {
            let message = "something when wrong";
            if ((error as any).data) {
                message = (error as any).data.message
            }
            notifications.show({ title: "Error!", message, color: 'red' })
        } finally {
            setLoading(false)
        }
    };
    const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
    const hrefStyle: CSSProperties = { textDecoration: 'none', textAlign: 'right', color: "var(--mantine-color-blue-5)" };
    return <Flex direction={'column'} gap={2} style={{ width: isSmallDevice ? '100%' : '70%' }}>
        {isSmallDevice && <Flex justify={'center'}>
            <Image src={authMobileImage} alt="mobile image" width={300} height={300} />
        </Flex>}
        <Text size="xl" fw={'bold'}>Login</Text>
        <Text>Create account? {<Link href={'#'} style={hrefStyle}>Register</Link>}</Text>
        <Space h='xl'></Space>
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Flex direction={'column'} gap={5}>
                <TextInput label="Email" key={form.key('email')}
                    {...form.getInputProps('email')} />
                <PasswordInput label="Password" key={form.key('password')}
                    {...form.getInputProps('password')} />
                <Link href={'#'} style={{ ...hrefStyle, fontSize: 12 }}>Forgot Password</Link>
                <Button style={{ marginTop: 10 }} type="submit" loading={loading}>Login</Button>
            </Flex>
        </form>
    </Flex>
}