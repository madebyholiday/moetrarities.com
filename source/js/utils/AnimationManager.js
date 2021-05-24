import gsap from 'gsap'
import ScrollMagic from 'scrollmagic'


import {
  isTablet
} from 'utils/media'

class AnimationManager {
  constructor () {
    this.$window = $(window)

    this.controller = new ScrollMagic.Controller()
  }

  destroy () {
    
  }

  staggerFadeUpChildren ( $el, config={}, wait ) {
    if ( wait ) {
      this.$window.on('willreveal', animate)
    } else {
      animate()
    }

    function animate() {
      if ( $el.hasClass('is-stagger-fade-up-children-complete') )
        return
      
      let tl = gsap.timeline({
        onComplete: () => {
          $el.addClass('is-stagger-fade-up-children-complete')
        }
      })
      
      return tl.fromTo($el.find(config.selector || '.js-child'), parseFloat(config.speed) || .8, {
        autoAlpha: 0,
        y: isTablet() ? 60 : 50,
        ...config.from
      }, {
        autoAlpha: 1,
        y: 0,
        ease: 'power4.out',
        stagger: .15,
        ...config.to
      })
    }    
  }  
}

export default AnimationManager
