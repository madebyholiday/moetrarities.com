import Accordion from 'components/Accordion'
import Tabs from 'components/Tabs'
import MediaGallery from 'components/MediaGallery'

class Product {
  beforeEnter ( data ) {
    this.accordion = new Accordion($('.js-accordion'))
    this.tabs = new Tabs($('.js-tabs'))
    this.mediaGallery = new MediaGallery($('.js-media-gallery'))

    this.$productMedia = $('.js-product-media')

    this.onProductMediaClick = this.onProductMediaClick.bind(this)
    this.onProductMediaBeforeChange = this.onProductMediaBeforeChange.bind(this)

    this.$productMedia.slick({
      rows: 0,
      adaptiveHeight: true,
      arrows: false,
      dots: true
    })

    this.$productMedia.on('beforeChange', this.onProductMediaBeforeChange)
    this.$productMedia.on('click', this.onProductMediaClick)
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
  
  get namespace () {
    return 'product'
  }
}

export default Product
