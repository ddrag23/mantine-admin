"use client"
import { Button, Flex, PasswordInput, Space, Text, TextInput } from "@mantine/core";
import authMobileImage from '../../../../public/assets/images/auth-mobile.jpg'
import Image from "next/image";
import Link from "next/link";
import { useMediaQuery } from "@mantine/hooks";
export default function Page() {
    const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

    return <Flex direction={'column'} gap={2} style={{ width: isSmallDevice ? '100%' : '70%' }}>
        {isSmallDevice && <Flex justify={'center'}>
            <Image src={authMobileImage} alt="mobile image" width={300} height={300} />
        </Flex>}
        <Text size="xl" fw={'bold'}>Login</Text>
        <Text>Create account?</Text>
        <Space h='xl'></Space>
        <Flex direction={'column'} gap={5}>
            <TextInput label="Email" />
            <PasswordInput label="Password" />
            <Link href={'#'} style={{ textDecoration: 'none', textAlign: 'right', color: "var(--mantine-color-blue-5)" }}>Forgot Password</Link>
            <Button style={{ marginTop: 10 }}>Login</Button>
        </Flex>
    </Flex>
}