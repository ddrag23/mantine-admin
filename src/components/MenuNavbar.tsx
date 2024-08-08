import { Menu, rem, Avatar } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import {
    IconSettings,
    IconMessageCircle,
    IconLogout,
} from '@tabler/icons-react';
import httpClient, { ResponseData } from '../lib/http-client';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function ProfileNavbar() {
    const router = useRouter()
    async function signOut() {
        try {
            const response = await httpClient.post<ResponseData>('/auth/logout', {});
            ['token', 'user', 'permissions'].forEach(item => {
                Cookies.remove(item)
            });
            notifications.show({ title: "Success", message: response.message, color: 'green' })
            router.push('/login')
        } catch (error) {
            let message = "something when wrong";
            if ((error as any).data) {
                message = (error as any).data.message
            }
            notifications.show({ title: "Error!", message, color: 'red' })

        }
    }
    return (
        <Menu shadow="md" width={200}>
            <Menu.Target>
                <Avatar color="cyan" radius="xl" style={{ cursor: 'pointer' }}>MK</Avatar>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>Application</Menu.Label>
                <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                    Settings
                </Menu.Item>
                <Menu.Item leftSection={<IconMessageCircle style={{ width: rem(14), height: rem(14) }} />}>
                    Profile
                </Menu.Item>

                <Menu.Divider />

                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item
                    color="red"
                    onClick={signOut}
                    leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
                >
                    Sign Out
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}