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

export const requestPurchase = ( productId ) => {
  return Promise.resolve(
    $.ajax({
      url: '/actions/moet/cellar/request-purchase',
      type: 'POST',
      data: { productId }
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
