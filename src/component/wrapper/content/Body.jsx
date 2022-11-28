export default function Body({ children }) {
    return (
        <div className='tBody'>
            <table>
                <tbody>
                    {children}
                </tbody>
            </table>
        </div>
    )
}