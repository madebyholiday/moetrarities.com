import gsap from 'gsap'
import Promise from 'bluebird'

class Wipe {
  constructor () {
    this.$el = $('.js-page-transition')
    this.$container = $('.js-main')
    this.$window = $(window)
  }
  
  leave ( data ) {
    this.$el = $('.js-page-transition')
    
    let tl = gsap.timeline()

    gsap.set(this.$el, {
      bottom: 0,
      top: 'auto',
      autoAlpha: 1,
      height: 0
    })

    tl.to(this.$el, 1, {
      height: '100%',
      ease: 'power4.inOut'
    }, 'start')

    tl.to(this.$container, 1, {
      y: -80,
      ease: 'power4.inOut'
    }, 'start')
    
    return tl
  }

  enter () {
    this.$el = $('.js-page-transition')
    this.$container = $('.js-main')
    
    let tl = gsap.timeline({
      onUpdate: () => {
        if ( tl.progress() >= .5 && !this.triggeredWillReveal ) {
          this.$window.trigger('willreveal')
          this.triggeredWillReveal = true
        }
      },
      onComplete: () => {
        this.triggeredWillReveal = false
        this.$container.removeAttr('style')
        this.$window.trigger('didreveal')
      }
    })
    
    gsap.set(this.$el, {
      top: 0,
      bottom: 'auto'      
    })

    gsap.set(this.$container, {
      y: 80
    })
    
    tl.to(this.$el, 1, {
      height: 0,
      ease: 'power4.inOut'      
    }, 'end')

    tl.to(this.$container, 1, {
      y: 0,
      ease: 'power4.inOut'      
    }, 'end')
  }
}

export default Wipe
