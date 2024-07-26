"use client"
import { ActionIcon } from "@mantine/core";
import { IconDotsVertical, IconRefresh } from "@tabler/icons-react";
import DataTable, { ColumnProps } from "../../../components/DataTable/DataTable";
import CardSection from "../../../components/CardSection";
import FormatDate from "../../../components/FormatDate";
import ActionButton from "../../../components/ActionButton";

export default function Page() {
    function edit(id: number) {
        console.log(id)
    }
    const columns: ColumnProps[] = [
        { dataField: 'name', caption: 'NAME' },
        { dataField: 'email', caption: 'EMAIL' },
        {
            dataField: 'created_at', caption: 'CREATED AT', renderCell: (data) => {
                return <FormatDate date={data.created_at} />
            }
        },
        {
            dataField: 'id', caption: 'ACTION', style: { textAlign: 'center' }, renderCell: (data) => (<ActionButton data={data} onEdit={edit}></ActionButton>)
        },
    ];
    return <>
        <CardSection title="User List">
            <DataTable fetchUrl={`/settings/users`} pageSize={10} key="id" serverSide={true} columns={columns} />
        </CardSection>
    </>
}