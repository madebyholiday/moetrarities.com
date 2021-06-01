import Accordion from 'components/Accordion'
import Tabs from 'components/Tabs'
import MediaGallery from 'components/MediaGallery'

import {
  addItem,
  fetchItems
} from 'utils/cellar'

class Product {
  beforeEnter ( data ) {
    this.$window = $(window)
    this.$hero = $('.js-product-hero')
    this.accordion = new Accordion($('.js-accordion'))
    this.tabs = new Tabs($('.js-tabs'))
    this.mediaGallery = new MediaGallery($('.js-media-gallery'))

    this.$productMedia = $('.js-product-media')
    this.$add = $('.js-add')
    this.$requestPurchase = $('.js-request-purchase')

    this.onProductMediaClick = this.onProductMediaClick.bind(this)
    this.onProductMediaBeforeChange = this.onProductMediaBeforeChange.bind(this)
    this.onAddClick = this.onAddClick.bind(this)
    this.onRequestPurchaseClick = this.onRequestPurchaseClick.bind(this)
    this.onWindowCellarUpdated = this.onWindowCellarUpdated.bind(this)    

    this.$productMedia.slick({
      rows: 0,
      adaptiveHeight: true,
      arrows: false,
      dots: true
    })

    this.$productMedia.on('beforeChange', this.onProductMediaBeforeChange)    
    this.$productMedia.on('click', this.onProductMediaClick)
    this.$add.on('click', this.onAddClick)
    this.$requestPurchase.on('click', this.onRequestPurchaseClick)
    this.$window.on('cellar_updated', this.onWindowCellarUpdated)
    
    this.fetchCellar()
  } 

  afterLeave ( data ) {
    this.accordion.destroy()
    this.tabs.destroy()
    this.mediaGallery.destroy()
    this.$window.off('cellar_updated', this.onWindowCellarUpdated)
  }

  fetchCellar () {
    fetchItems().then(data => {
      let isAdded = false,
          isRequested = false
      
      $.each(data, (k,v) => {        
        if ( v.product_id == window.productId ) {        
          isAdded = true
          
          if ( v.request_purchase )
            isRequested = true
        }
      })

      this.$hero.toggleClass('is-added', isAdded)
      this.$hero.toggleClass('is-requested', isRequested)
    })
  }

  onProductMediaClick () {
    this.$productMedia.slick('slickNext')
  }

  onProductMediaBeforeChange () {
    this.$productMedia.find('img').each((k,v) => {
      lazySizes.loader.unveil(v)
    })
  }

  onRequestPurchaseClick ( e ) {
    e.preventDefault()

    let $this = $(e.currentTarget),
        productId = $this.data('product-id')

    this.$hero.addClass('is-requested')
    
    addItem(productId, true).then(response => {
      if ( response === true ) {
        this.$window.trigger('cellar_updated')
      }      
    })    
  }

  onAddClick ( e ) {
    e.preventDefault()
    
    let $this = $(e.currentTarget),
        productId = $this.data('product-id')

    this.$hero.addClass('is-added')
    
    addItem(productId).then(response => {
      if ( response === true ) {
        this.$window.trigger('cellar_updated')
      }      
    })    
  }

  onWindowCellarUpdated () {
    this.fetchCellar()
  }
  
  get namespace () {
    return 'product'
  }
}

export default Product
