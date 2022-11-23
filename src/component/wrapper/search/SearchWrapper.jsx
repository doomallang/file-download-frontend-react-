import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default function SearchWrapper() {
    return (
        <div className='fl_searchList'>
            <ul>
                <li>
                    <select id='searchTextOption'>
                        <option value='name'>이름</option>
                        <option value='memberId'>아이디</option>
                    </select>
                    <input id='searchText' type='text' placeholder='검색' className='width150' />
                    <span id='searchBtn' className='typeButton'>
                        <FontAwesomeIcon icon={faSearch} />
                    </span>
                    <input type='checkbox' id='memberStatus_CREATE' name='memberStatus' value='CREATE' checked />
                    <label for='memberStatus_CREATE' className='c-search-label'>재직</label>
                    <input type='checkbox' id='memberStatus_DELETE' name='memberStatus' value='DELETE' />
                    <label for='memberStatus_DELETE' className='c-search-label'>휴직</label>
                    <input type='checkbox' id='memberStatus_ERASE' name='memberStatus' value='ERASE' />
                    <label for='memberStatus_ERASE' className='c-search-label'>퇴사</label>
                </li>
            </ul>
        </div>
    )
}