import ScrollMagic from 'ScrollMagic'
import 'debug.addIndicators'
import { cover, contain } from 'intrinsic-scale'
import gsap from 'gsap'

import {
  deleteItem
} from 'utils/cellar'

class Cellar {
  beforeEnter ( data ) {
    this.$window = $(window)
    this.$remove = $('.js-remove')

    this.onRemoveClick = this.onRemoveClick.bind(this)

    this.$remove.on('click', this.onRemoveClick)
  }

  afterLeave ( data ) {

  }

  onRemoveClick ( e ) {
    e.preventDefault()

    let $this = $(e.currentTarget),
        id = $this.data('item-id'),
        $item = $this.closest('.js-item')

    deleteItem(id).then(response => {
      if ( response === true ) {
        this.$window.trigger('cellar_updated')
        $item.remove()
      }      
    })

  }
  
  get namespace () {
    return 'cellar'
  }
}

export default Cellar
