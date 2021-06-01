import Promise from 'bluebird'

export const fetchItems = () => {
  return Promise.resolve($.get('/actions/moet/cellar'))
}

export const addItem = ( productId, requestPurchase=false ) => {
  return Promise.resolve(
    $.ajax({
      url: '/actions/moet/cellar/add',
      type: 'POST',
      data: { productId, requestPurchase }
    })
  )
}

export const deleteItem = ( itemId ) => {
  return Promise.resolve(
    $.ajax({
      url: '/actions/moet/cellar/delete',
      type: 'POST',
      data: { itemId }      
    })
  )
}
