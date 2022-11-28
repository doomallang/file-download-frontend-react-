
export default function SearchWrapper({ children }) {
    return (
        <div className='fl_searchList'>
            <ul>
                <li>
                    {children}
                </li>
            </ul>
        </div>
    )
}