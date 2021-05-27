import Accordion from 'components/Accordion'
import Tabs from 'components/Tabs'
import MediaGallery from 'components/MediaGallery'

class Product {
  beforeEnter ( data ) {
    this.accordion = new Accordion($('.js-accordion'))
    this.tabs = new Tabs($('.js-tabs'))
    this.mediaGallery = new MediaGallery($('.js-media-gallery'))
  }

  afterLeave ( data ) {
    this.accordion.destroy()
    this.tabs.destroy()
    this.mediaGallery.destroy()
  }
  
  get namespace () {
    return 'product'
  }
}

export default Product
