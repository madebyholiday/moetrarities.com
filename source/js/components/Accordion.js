import {
  isTablet
} from 'utils/media'

class Accordion {
  constructor ( el ) {
    this.$el = el instanceof jQuery ? el : $(el)
    this.$header = this.$el.find('.js-item-header')

    this.onItemHeaderClick = this.onItemHeaderClick.bind(this)
    
    this.$header.on('click', this.onItemHeaderClick)

    this.$header.first().trigger('click', false)
  }

  destroy () {}

  onItemHeaderClick ( e, scrollTo=true ) {    
    let $this = $(e.currentTarget),
        $item = $this.closest('.js-item')

    $item.toggleClass('is-open')

    if ( $item.hasClass('is-open') ) {
      $item
        .find('.js-item-content')
        .slideDown(500, 'easeInOutCubic', () => {
          if ( isTablet() || !scrollTo ) return
          
          let scrollTop = $item
            .offset().top - $('.js-header')
            .outerHeight()
          $('html,body').animate({
            scrollTop
          }, 500, 'easeInOutCubic')
        })      
      $item
        .siblings('.is-open')
        .find('.js-item-header')
        .trigger('click')      
    } else {
      $item
        .find('.js-item-content')
        .slideUp(500, 'easeInOutCubic')      
    }
  }
}

export default Accordion
