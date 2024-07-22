"use client"
import { ActionIcon } from "@mantine/core";
import { IconDotsVertical, IconRefresh } from "@tabler/icons-react";
import DataTable, { ColumnProps } from "../../../components/DataTable/DataTable";
import useDateFormat from "../../../hooks/useDateFormat";
import CardSection from "../../../components/CardSection";
export default function Page() {
    const columns: ColumnProps[] = [
        { dataField: 'name', caption: 'NAME' },
        { dataField: 'email', caption: 'EMAIL' },
        {
            dataField: 'created_at', caption: 'CREATED AT', renderCell: (data) => {
                const dateFormat = useDateFormat(data.created_at)
                return <>{dateFormat}</>
            }
        },
        {
            dataField: 'id', caption: 'ACTION', renderCell: (data) => (<ActionIcon variant="outline" aria-label="Settings">
                <IconDotsVertical style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>)
        },
    ];
    return <>
        <CardSection title="User List">
            <DataTable fetchUrl={`${process.env.NEXT_PUBLIC_API_URL}/settings/users`} pageSize={10} key="id" serverSide={true} columns={columns} />
        </CardSection>
    </>
}