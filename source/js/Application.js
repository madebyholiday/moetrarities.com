import 'application.scss'

import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'custom-event-polyfill'
import 'dom4'

import 'slick-carousel'
import 'jquery.easing'
import 'objectFitPolyfill'

import 'ext/lazysizes'
import 'ext/modernizr'

import Promise from 'bluebird'
import barba from '@barba/core'

import AnimationManager from 'utils/AnimationManager'

import Header from 'components/Header'
import Footer from 'components/Footer'
import PageLoader from 'components/PageLoader'

import Fade from 'transitions/Fade'

import Home from 'views/Home'

class Application {
  constructor () {
    this.$window = $(window)
    this.$body = $('body')

    this.onBeforeEnter = this.onBeforeEnter.bind(this)
    this.onLeave = this.onLeave.bind(this)
    this.onAfterLeave = this.onAfterLeave.bind(this)
    
    this.onWindowResize = this.onWindowResize.bind(this)
    this.onWindowResizeend = this.onWindowResizeend.bind(this)
    this.onWindowScroll = this.onWindowScroll.bind(this)
    this.onWindowScrollend = this.onWindowScrollend.bind(this)
    this.onWindowLoad = this.onWindowLoad.bind(this)
    this.onWindowWillreveal = this.onWindowWillreveal.bind(this)
    this.onWindowNavigate = this.onWindowNavigate.bind(this)
    this.onBodyLazyloaded = this.onBodyLazyloaded.bind(this)
    
    $(this.onReady.bind(this));

    this.$window
        .on('resize', this.onWindowResize)
        .on('resizeend', this.onWindowResizeend)
        .on('scroll', this.onWindowScroll)
        .on('scrollend', this.onWindowScrollend)
        .on('load', this.onWindowLoad)
        .on('willreveal', this.onWindowWillreveal)
        .on('navigate', this.onWindowNavigate)
  }

  onReady () {
    this.$body = $('body')
    this.$body.on('lazyloaded', this.onBodyLazyloaded)

    this.pageLoader = new PageLoader
    
    barba.hooks.beforeEnter(this.onBeforeEnter)
    barba.hooks.leave(this.onLeave)   
    barba.hooks.afterLeave(this.onAfterLeave)
    
    barba.init({
      timeout: 10000,
      debug: process.env.NODE_ENV !== 'production',
      prevent: ({ el }) => {
        let $el = $(el)
        
        return (
          $el.hasClass('no-pjax') ||
          $el.parent().hasClass('no-pjax')
        )               
      },
      views: [
        new Home
      ],
      transitions: [
        new Fade
      ]
    })    
  }

  init () {
    this.$header = $('.js-header')
    this.$footer = $('.js-footer')    
        
    this.$body.attr('class', $('[itemprop="body-class"]').attr('content'))
    
    this.animationManager = new AnimationManager
    this.header = new Header
    this.footer = new Footer
            
    this.setScrollRestoration('manual')
    this.playInlineVideos()
    objectFitPolyfill()
  }

  destroy () {
    this.animationManager.destroy()
    this.header.destroy()
    this.footer.destroy()
    this.pageModules.destroy()
    this.modalGallery.destroy()
    
    window.App.scroll.destroy()
  }

  setScrollRestoration ( type ) {
    if ( 'scrollRestoration' in history )
      history.scrollRestoration = type
  }

  playInlineVideos () {
    $('.js-inline-video').each((k,v) => {
      let $this = $(v),
          video = $this.find('video')[0]

      try {
        video.play()
      } catch ( e ) {
        console.log(e.message)
      }

      if ( video.readyState == 4  ) {
        this.onInlineVideoCanPlay(video)
      } else {
        $(video).on('canplay', e => this.onInlineVideoCanPlay(e.target))
      }      
    })    
  }

  onInlineVideoCanPlay ( video ) {
    $(video).closest('.js-video').addClass('is-playing-video')
  }  

  onBeforeEnter () {
    this.init()    
  }  

  onLeave ( data ) {
    window.App.hasNavigated = true
    
    setTimeout(() => {
      this.$body.addClass(`is-navigating-ns-${data.next.namespace}`)
    })

    this.$body.addClass('is-navigating')
    this.$window.trigger('navigating')
  }

  onAfterLeave ( data ) {
    this.destroy()
    $(data.current.container).remove()
  }

  onBodyLazyloaded ( e ) {
    objectFitPolyfill(e.target)
  }

  onWindowResize () {
    if ( this.$body )
      this.$body.addClass('is-resizing')
    
    clearTimeout(this.resizeTO)    
    this.resizeTO = setTimeout(() => {
      this.$body.removeClass('is-resizing')
      this.$window.trigger('resizeend')
    }, 300)    
  }

  onWindowResizeend () {}

  onWindowScroll () {
    this.$body.addClass('is-scrolling')    
    this.$body.toggleClass('is-scrolled', this.isScrolled)
    this.$body.toggleClass('is-scrolling-up', this.isScrollingUp)
    this.$body.toggleClass('is-scrolling-down', this.isScrollingDown)

    this.lastScrollTop = this.$window.scrollTop()
    
    this.windowSTO = setTimeout(() => {
      this.$window.trigger('scrollend')
    }, 200)
  }

  onWindowScrollend () {
    this.$body.removeClass('is-scrolling')

    if ( this.$window.scrollTop() <= 0 ) {
      this.$body.removeClass('is-scrolled')
      this.$body.removeClass('is-scrolling-up')
      this.$body.removeClass('is-scrolling-down')      
    }
  }

  onWindowLoad () {
    $('html').addClass('is-loaded')
  }

  onWindowWillreveal () {
    this.$body.addClass('is-revealed')

    if ( !this.$body.hasClass('page-home') ) 
      window.App.scroll.start()
  }

  onWindowNavigate ( e, url ) {
    barba.go(url) 
  }

  get isScrolled () {
    return this.$window.scrollTop() > 0
  }

  get isScrollingUp () {
    return this.$window.scrollTop() < this.lastScrollTop && this.$window.scrollTop() > 0
  }

  get isScrollingDown () {
    return this.$window.scrollTop() > this.lastScrollTop && this.$window.scrollTop() > 0
  } 
}

new Application
