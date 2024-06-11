
export function addMethod(itemData, data , localName, setMethod ) {
    const newCategories = [...data, itemData];
    setMethod(newCategories);
    localStorage.setItem(localName, JSON.stringify(newCategories));
}

export function editMethod(updateItem, data , localName, setMethod ) {
    const updatedCategories = data.map(cat => cat.id === updateItem.id ? updateItem : cat);
    setMethod(updatedCategories);
    localStorage.setItem(localName, JSON.stringify(updatedCategories));
}

export function deleteMethod(itemId, data , localName, setMethod ) {
    const remainingCategories = data.filter(cat => cat.id !== itemId);
    setMethod(remainingCategories);
    localStorage.setItem(localName, JSON.stringify(remainingCategories));
}