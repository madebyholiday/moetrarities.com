import {
  requestPurchase,
  deleteItem,
  fetchItems
} from 'utils/cellar'

class Cellar {
  beforeEnter ( data ) {
    this.$window = $(window)
    this.$requestPurchase = $('.js-request-purchase')
    this.$items = $('.js-cellar-items')
    this.$remove = $('.js-remove')

    this.onWindowCellarUpdated = this.onWindowCellarUpdated.bind(this)
    this.onRequestPurchaseClick = this.onRequestPurchaseClick.bind(this)
    this.onRemoveClick = this.onRemoveClick.bind(this)

    this.$requestPurchase.on('click', this.onRequestPurchaseClick)
    this.$remove.on('click', this.onRemoveClick)
    this.$window.on('cellar_updated', this.onWindowCellarUpdated)
  }

  afterLeave ( data ) {
    this.$window.off('cellar_updated', this.onWindowCellarUpdated)
  }

  fetchCellar () {
    fetchItems().then(data => {
      if ( data.length === 0 )
        this.$items.addClass('is-empty')        
    })
  }

  onRequestPurchaseClick ( e ) {
    e.preventDefault()

    let $this = $(e.currentTarget),
        $item = $this.closest('.js-item'),
        productId = $this.data('product-id')

    $item.addClass('is-loading')
    
    requestPurchase(productId).then(response => {
      if ( response === true ) {        
        this.$window.trigger('cellar_updated')
        $item.addClass('is-requested')
        $item.removeClass('is-loading')
      }     
    })    
  }

  onRemoveClick ( e ) {
    e.preventDefault()

    let $this = $(e.currentTarget),
        id = $this.data('item-id'),
        $item = $this.closest('.js-item')

    $item.addClass('is-loading')
    
    deleteItem(id).then(response => {
      if ( response === true ) {
        this.$window.trigger('cellar_updated')
        $item.remove()
      }      
    })
  }

  onWindowCellarUpdated () {
    this.fetchCellar()
  }
  
  get namespace () {
    return 'cellar'
  }
}

export default Cellar
