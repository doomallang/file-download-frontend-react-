export default function Head({ children }) {
    return (
        <div className='tHead'>
            <table>
                <thead>
                    <tr>
                        {children}
                    </tr>
                </thead>
            </table>
        </div>
    )
}