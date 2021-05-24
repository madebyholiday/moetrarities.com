import gsap from 'gsap'

class PageLoader {
  constructor () {
    this.$el = $('.js-page-loader')
    this.$window = $(window)
    this.$body = $('body')
    
    this.tl = gsap.timeline({
      onUpdate: () => {
        if ( this.tl.progress() >= .75 && !this.triggeredWillReveal ) {
          this.$window.trigger('willreveal')
          this.triggeredWillReveal = true
        }
      },
      onComplete: () => {
        this.$el.remove()
      }
    })

    if ( process.env.NODE_ENV === 'production' ) {
      
    }
    
    this.tl.to(this.$el, 3, {
      autoAlpha: 0,
      ease: 'power4.out'
    })
  }

  destroy () {

  }
}

export default PageLoader
