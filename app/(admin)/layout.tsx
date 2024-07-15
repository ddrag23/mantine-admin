"use client"
import { AppShell, Burger, Flex, Group, NavLink, Skeleton, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantinex/mantine-logo';
import menuConstant from '../../constants/menu.constant';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import '../../styles/app-layout.css'
import ProfileNavbar from '../../components/MenuNavbar';
export default function AdminLayout({ children }: { children: any }) {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
    const pathname = usePathname()
    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
            }}
            padding="md"
        >
            <AppShell.Header>
                <div style={{ display: 'flex', justifyContent: 'space-between', height: '100%' }}>
                    <Group h="100%" px="md">
                        <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
                        <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
                        <MantineLogo size={30} />
                    </Group>
                    <Group h="100%" px="md">
                        <ProfileNavbar />
                    </Group>
                </div>
            </AppShell.Header>
            <AppShell.Navbar p="md">
                <NavLink label="MENU" disabled id='nav-menu' />
                {menuConstant.map((item, key) => (<NavLink
                    key={key}
                    component={Link}
                    href={item.link}
                    leftSection={item.icon}
                    label={item.name}
                    active={pathname == item.link}
                />))}
            </AppShell.Navbar>
            <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
    );
}