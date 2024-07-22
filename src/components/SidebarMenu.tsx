import { NavLink } from "@mantine/core"
import menuConstant from "../constants/menu.constant"
import Link from "next/link"
import { usePathname } from 'next/navigation';

function NavItem({ item, pathname }: { item: any, pathname: string }) {
    if (item.child) {
        return (
            <NavLink label={item.name} leftSection={item.icon}>
                {item.child.map((child: any, childIndex: number) => (
                    <NavLink
                        key={childIndex}
                        label={child.name}
                        href={child.link}
                        active={pathname === child.link}
                        component={Link}
                    />
                ))}
            </NavLink>
        );
    } else {
        return (
            <NavLink
                component={Link}
                href={item.link}
                leftSection={item.icon}
                label={item.name}
                active={pathname === item.link}
            />
        );
    }
}

export default function SidebarMenu() {
    const pathname = usePathname()
    return (<>
        <NavLink label="MENU" disabled id='nav-menu' />
        {
            menuConstant.map((item, key) => (<NavItem key={key} item={item} pathname={pathname} />))
        }</>)
}