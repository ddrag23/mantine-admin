import { ActionIcon, Menu, rem } from "@mantine/core";
import { IconDotsVertical, IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { memo, ReactNode } from "react"

type ActionButtonProps = {
    children?: ReactNode,
    data: any
    onEdit?: (id: number) => void
    onDetail?: (data: any) => {}
    onDelete?: (id: number) => {}
}
function ActionButton({ children, onEdit, onDelete, onDetail, data }: ActionButtonProps) {
    return (
        <Menu shadow="md" width={200}>
            <Menu.Target>
                <ActionIcon variant="outline" aria-label="Settings">
                    <IconDotsVertical style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>Menu</Menu.Label>
                {children}
                <Menu.Item leftSection={<IconEdit style={{ width: rem(14), height: rem(14) }} />} onClick={(e) => onEdit ? onEdit(data.id) : {}}>
                    Edit
                </Menu.Item>
                <Menu.Item leftSection={<IconEye style={{ width: rem(14), height: rem(14) }} />} onClick={(e) => onDetail ? onDetail(data) : {}}>
                    Detail
                </Menu.Item>
                <Menu.Item leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />} onClick={(e) => onDelete ? onDelete(data.id) : {}}>
                    Delete
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}
export default memo(ActionButton)