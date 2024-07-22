import { Button, Flex, PasswordInput, Space, Text, TextInput } from "@mantine/core";

export default function Page() {
    return <Flex direction={'column'} gap={2} style={{ width: '70%' }}>
        <Text size="xl" fw={'bold'}>Login</Text>
        <Text>Create account?</Text>
        <Space h='xl'></Space>
        <Flex direction={'column'} gap={5}>
            <TextInput label="Email" />
            <PasswordInput label="Password" />
            <Button style={{ marginTop: 10 }}>Login</Button>
        </Flex>
    </Flex>
}