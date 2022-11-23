
export default function ContentWrapper({ headList, tBodyList, page, width }) {
    return (
        <>
            <div id='__layoutMainItemContents' className='fl_info'>
                
            </div>
            <div id='layoutMainList' className='tList'>
                <div className='tHead'>
                    <table>
                        <thead>
                            <tr>
                                {headList && headList.map((head, index) =>
                                    <th width={width[index]} className='textLeftIm'>{head}</th>
                                )}
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className='tBodyBox'>
                    <div className='tBody'>
                        <table>
                            <tbody>
                                { tBodyList && tBodyList.map((tbody, index) => 
                                    <tr>
                                        <td width={width[index]} className='textLeftIm'>{tbody.groupId}</td>
                                        <td width={width[index]} className='textLeftIm'>{tbody.accountId}</td>
                                        <td width={width[index]} className='textLeftIm'>{tbody.name}</td>
                                        <td width={width[index]} className='textLeftIm'></td>
                                        <td width={width[index]} className='textLeftIm'></td>
                                        <td width={width[index]} className='textLeftIm'></td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className='listPagWrap'>
                        <div className='totalWrap'>
                            <span>검색결과 : </span>
                            <strong>1,485</strong>
                            &nbsp;
                            <select id='listPagingArea_pageSizeChangeSelect'>
                                <option value='20' selected>20</option>
                                <option value='50'>50</option>
                                <option value='100'>100</option>
                                <option value='200'>200</option>
                            </select>
                        </div>
                        <div className='paging'>
                            <div id='listPagingArea' className='row'>
                                <div className='align-center'>
                                    <ul className='pagination c-pagination-md'>
                                        <li>
                                            <a href='#' data-page-disable>
                                                <span aria-hidden='true'>&lt;&lt;</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href='#' data-page-disable>
                                                <span aria-hidden='true'>1</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href='#' data-page-disable>
                                                <span aria-hidden='true'>&gt;&gt;</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}