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
    this.accordion = new Accordion($('.js-accordion'))
    this.tabs = new Tabs($('.js-tabs'))
    this.mediaGallery = new MediaGallery($('.js-media-gallery'))

    this.$productMedia = $('.js-product-media')
    this.$requestPurchase = $('.js-request-purchase')

    this.onProductMediaClick = this.onProductMediaClick.bind(this)
    this.onProductMediaBeforeChange = this.onProductMediaBeforeChange.bind(this)
    this.onRequestPurchaseClick = this.onRequestPurchaseClick.bind(this)

    this.$productMedia.slick({
      rows: 0,
      adaptiveHeight: true,
      arrows: false,
      dots: true
    })

    this.$productMedia.on('beforeChange', this.onProductMediaBeforeChange)    
    this.$productMedia.on('click', this.onProductMediaClick)
    this.$requestPurchase.on('click', this.onRequestPurchaseClick)
  }

  afterLeave ( data ) {
    this.accordion.destroy()
    this.tabs.destroy()
    this.mediaGallery.destroy()    
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

    addItem(productId).then(response => {
      console.log(response)
      if ( response === true ) {
        this.$window.trigger('cellar_updated')
      }      
    })    
  }
  
  get namespace () {
    return 'product'
  }
}

export default Product
