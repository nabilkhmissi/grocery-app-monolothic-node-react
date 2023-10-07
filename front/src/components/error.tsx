export default function Error({ message }: { message: string | null }) {
    return (
        <div className="error-component">{message}</div>
    )
}