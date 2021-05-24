import gsap from 'gsap'

class Fade {
  constructor () {
    this.$el = $('.js-page-transition')
    this.$window = $(window)
  }
  
  leave ( data ) {
    this.$el = $('.js-page-transition')
    
    return gsap.to(this.$el, .5, {
      autoAlpha: 1,
      ease: 'power4.out',
    })
  }

  enter () {
    this.$el = $('.js-page-transition')
    
    gsap.set(this.$el, {
      autoAlpha: 1
    })

    let a = gsap.to(this.$el, 2.5, {
      autoAlpha: 0,
      ease: 'power4.out',
      onUpdate: (e) => {
        if ( a.progress() >= .3 && !this.triggeredWillReveal ) {
          this.$window.trigger('willreveal')
          this.triggeredWillReveal = true
        }
      },
      onComplete: () => {
        this.triggeredWillReveal = false
      }
    })    
  }
}

export default Fade
