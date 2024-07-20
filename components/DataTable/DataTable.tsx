"use client"
import { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import { Table, Checkbox, Loader, Pagination, Flex, Space, Group, ActionIcon, CloseButton, Input } from '@mantine/core';
import { useDebouncedCallback, useDebouncedState, } from '@mantine/hooks';
import { IconRefresh, IconSearch } from '@tabler/icons-react';
import { useDebounce } from '@uidotdev/usehooks';

type DataTableProps = {
    fetchUrl?: string
    dataSource?: any[]
    columns: ColumnProps[]
    pageSize: number
    key: string
    serverSide?: boolean
    checkbox?: boolean,
    toolbarChildren?: ReactNode
}

export type ColumnProps = {
    dataField: string
    caption: string
    renderCell?: (data: any) => React.ReactNode
}

function LoadingTable({ length }: { length: number }) {
    return <Table.Tr>
        <Table.Td colSpan={length} style={{ textAlign: 'center' }}><Loader size={30} /></Table.Td>
    </Table.Tr>
}

function EmptyData({ length }: { length: number }) {
    return <Table.Tr>
        <Table.Td colSpan={length} style={{ textAlign: 'center' }}>Data Not Found</Table.Td>
    </Table.Tr>
}

function urlCondition(url: string) {
    let condition = '?'
    if (url.includes('?')) {
        condition = '&'
    }
    return condition
}

export default function DataTable(props: DataTableProps): JSX.Element {
    const { fetchUrl, dataSource = [], columns, pageSize, serverSide = false } = props
    const [data, setData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [selectedRows, setSelectedRows] = useState<number[]>([])
    const [search, setSearch] = useState<string>('')
    const searchDebounce = useDebounce(search, 500)
    const fetchData = async () => {
        setLoading(true);
        try {
            const fetching = await fetch(`${fetchUrl}${urlCondition(fetchUrl!)}page=${currentPage}&limit=${pageSize}${search ? `&search=${searchDebounce}` : ''}`);
            const response = await fetching.json()
            setData(response.data.data);
            setTotalCount(response.data.total);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }
    function handleRefresh() {
        setLoading(true)
        setSearch('')
        setCurrentPage(1)
        console.log(search)
        setLoading(false)
    }
    useEffect(() => {
        if (serverSide && fetchUrl) {
            // fetchData();
            fetchData();
        } else {
            setData(dataSource.slice((currentPage - 1) * pageSize, currentPage * pageSize));
            setTotalCount(dataSource.length);
            setLoading(false);
        }
    }, [fetchUrl, currentPage, pageSize, serverSide, searchDebounce]);
    return (
        <>
            <Group justify='space-between'>
                <Input leftSection={<IconSearch />} placeholder="Search " onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} rightSectionPointerEvents="all" value={search} rightSection={
                    <CloseButton
                        aria-label="Clear input"
                        onClick={() => setSearch('')}
                        style={{ display: search ? undefined : 'none' }}
                    />
                } />
                <Group gap={'xs'}>
                    {props.toolbarChildren && props.toolbarChildren}
                    <ActionIcon variant="outline" aria-label="Settings" onClick={handleRefresh}>
                        <IconRefresh style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Group>
            <Space h={'sm'} />
            <Table.ScrollContainer minWidth={500} type="native">
                <Table withTableBorder withColumnBorders highlightOnHover >
                    <Table.Thead>
                        <Table.Tr>
                            {props.checkbox && <Table.Th></Table.Th>}
                            {columns.map((column, index) => (
                                <Table.Th key={index}>{column.caption}</Table.Th>
                            ))}
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {loading && <LoadingTable length={columns.length} />}
                        {!loading && data.length == 0 && <EmptyData length={columns.length} />}
                        {!loading && data.length > 0 && data.map((item, rowIndex) => (
                            <Table.Tr key={rowIndex}>
                                {columns.map((column, colIndex) => (
                                    <Table.Td key={colIndex}>
                                        {column.renderCell ? column.renderCell(item) : item[column.dataField]}
                                    </Table.Td>
                                ))}
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>
            <Space h={'sm'} />
            <Flex justify={'end'}>
                <Pagination total={Math.ceil(totalCount / pageSize)} value={currentPage} onChange={setCurrentPage} />
            </Flex>
        </>
    );
}