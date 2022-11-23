export default function SearchTitle({ title, children }) {
    return (
    <>
        <div className='contentHead'>
            <h2>{title}</h2>
            <div className='fl_searchWrap'>
                <div className='fl_searchMng'>
                    <fieldset>
                        <legend>검색</legend>
                        {children}
                    </fieldset>
                </div>
            </div>
        </div>
    </>
    )
}