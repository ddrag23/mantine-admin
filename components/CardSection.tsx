import { Card, Group, Text } from "@mantine/core"
import { ReactNode } from "react"

type CardSectionProps = {
    children: ReactNode,
    title?: string,
    withHeading?: boolean,
    toolbar?: boolean,
    toolbarChildren?: ReactNode
}

function CardHeader({ title, toolbar, toolbarChildren }: Omit<CardSectionProps, "children" | "withHeading">) {
    return <Group style={{ margin: '10px 0 10px 0' }} justify={toolbar ? 'space-between' : 'flex-start'}>
        <Text fw={500}>{title!}</Text>
        {toolbarChildren}
    </Group>
}

export default function CardSection({ children, withHeading = true, title, toolbarChildren, toolbar }: CardSectionProps) {
    return <Card shadow="sm" withBorder>
        <Card.Section inheritPadding style={{ borderBottom: '1px solid #DEE2E6' }}>
            {withHeading && <CardHeader title={title} toolbar={toolbar} toolbarChildren={toolbarChildren} />}
        </Card.Section>
        {children}
    </Card>
}