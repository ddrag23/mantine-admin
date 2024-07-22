import useDateFormat from "../hooks/useDateFormat"

export default function FormatDate({ date, format = "dd/MM/yyyy H:i:s" }: { date: Date, format?: string }) {
    const dateFormat = useDateFormat(date, format)

    return <>{dateFormat}</>
}