import { useTranslation } from 'react-i18next'

export default function Page({ count, setPageSize }) {
    const { t } = useTranslation()

    function handlePageChange(e) {
        setPageSize(e.target.value)
    }

    return (
        <div className='listPagWrap'>
            <div className='totalWrap'>
                <span>{t('COLUMN.NAME.SEARCH_RESULT')} : </span>
                <strong>{count}</strong>
                &nbsp;
                <select id='listPagingArea_pageSizeChangeSelect' onChange={handlePageChange}>
                    <option value='20'>20</option>
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
                                    <span aria-hidden='true'>«</span>
                                </a>
                            </li>
                            <li>
                                <a href='#' data-page-disable>
                                    <span aria-hidden='true'>‹</span>
                                </a>
                            </li>
                            <li>
                                <a href='#' data-page-disable>
                                    <span aria-hidden='true'>1</span>
                                </a>
                            </li>
                            <li>
                                <a href='#' data-page-disable>
                                    <span aria-hidden='true'>›</span>
                                </a>
                            </li>
                            <li>
                                <a href='#' data-page-disable>
                                    <span aria-hidden='true'>»</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}