import gsap from 'gsap'
import Preload from 'preload-it'
import Promise from 'bluebird'
import map from 'lodash/map'
import flattenDeep from 'lodash/flattenDeep'

import {
  isTablet
} from 'utils/media'

let preloader = Preload()

class PageLoader {
  constructor () {
    this.$el = $('.js-page-loader')
    this.$window = $(window)
    this.$body = $('body')
    this.$current = $('.js-current')

    this.urls = []    

    this.onPreloadProgress = this.onPreloadProgress.bind(this)
    this.onPreloadComplete = this.onPreloadComplete.bind(this)        

    preloader.onprogress = this.onPreloadProgress

    this.preload().then(() => {
      this.$current.width(`100%`)
      
      this.tl = gsap.timeline({
        onUpdate: () => {
          if ( this.tl.progress() >= .2 && !this.triggeredWillReveal ) {
            this.$window.trigger('willreveal')
            this.triggeredWillReveal = true
          }
        },
        onComplete: () => {
          this.$el.remove()
        }
      })
      this.tl.to(this.$el.find('.js-content'), 2, {
        autoAlpha: 0,
        delay: .5,
        ease: 'power4.out'
      })

      this.tl.to(this.$el, 2, {
        autoAlpha: 0,
        ease: 'power4.out'
      }, '-=.5')
    })    
  }

  preload () {
    return new Promise(resolve => {
      if ( isTablet() ) {
        this.urls = flattenDeep(
          map($('[data-preload]'), el => $(el).data('preload'))
        )
      } else {
        this.urls = flattenDeep(
          map($('[data-preload-mobile]'), el => $(el).data('preload-mobile'))
        )
      }      
      
      if ( this.urls.length ) {
        preloader
          .fetch(this.urls)
          .then(this.onPreloadComplete)
          .then(resolve)
      } else {
        resolve()
      }           
    })                    
  }

  onPreloadProgress ( e ) {
    this.$current.width(`${e.progress}%`)
  }

  onPreloadComplete ( items ) {
    this.$current.width(`100%`)
    
    return Promise.resolve(items)
  }

  destroy () {

  }
}

export default PageLoader
