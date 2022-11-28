// checkbox
export function handleSingleCheck(checked, key, checkedItem, setCheckedItem) {
    if(checked) {
        setCheckedItem(prev => [...prev, key])
    } else {
        setCheckedItem(checkedItem.filter((el) => el !== key))
    }
}

export function handleAllCheck(checked, key, list, setCheckedItem) {
    if(checked) {
        const keyArray = []
        list.forEach((el) => keyArray.push(el[key]))
        setCheckedItem(keyArray)
    } else {
        setCheckedItem([])
    }
}

export function itemClick(item, selectedItem, setSelectedItem) {
    if(item === selectedItem) {
        setSelectedItem('')
    } else {
        setSelectedItem(item)
    }
}