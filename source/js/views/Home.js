import ScrollMagic from 'ScrollMagic'
import 'debug.addIndicators'
import { cover, contain } from 'intrinsic-scale'
import gsap from 'gsap'

import {
  isTablet
} from 'utils/media'

class Home {
  beforeEnter ( data ) {
    this.$window = $(window)
    this.$animatedScenes = $('.js-animated-scenes')
    this.$scenes = $('.js-animated-scene')
    
    this.initScene = this.initScene.bind(this)
    this.onWindowResize = this.onWindowResize.bind(this)
    this.onWindowResizeend = this.onWindowResizeend.bind(this)
    this.onWindowWillreveal = this.onWindowWillreveal.bind(this)
    
    this.controller = new ScrollMagic.Controller({
      addIndicators: true
    })

    this.$window.on('resize', this.onWindowResize)
    this.$window.on('resizeend', this.onWindowResizeend)
    this.$window.on('willreveal', this.onWindowWillreveal)
  }

  initScenes () {
    this.$scenes.each(this.initScene)       
    this.setCanvasDims()
  }  
  
  initScene ( index, element ) {
    let $element = $(element),
        type = $element.data('type')
    
    switch ( type ) {
      case 'media':
        return this.initMedia(element)
      case 'productIntro':
        return this.initProductIntro(element)
      case 'productDetail':
        return this.initProductDetail(element)
      case 'quote':
        return this.initQuote(element, index)
      case 'text':
        return this.initText(element, index)
    }
  }

  initProductIntro ( element ) {
    let $this = $(element),
        images = isTablet() ?
                 $this.data('images').sort() :
                 $this.data('images-mobile').sort(),
        $text = $this.find('.js-text'),
        $canvas = $this.find('.js-canvas')

    let pxPerImg = 50,
        imgs = [],
        tl

    $.each(images, (k,v) => {
      let img = new Image()
      img.src = v
      imgs.push(img)
    })

    tl = gsap.timeline({ paused: true })
    
    tl.fromTo($canvas, .5, {
      autoAlpha: 0
    }, {
      autoAlpha: 1
    }, 'in')

    tl.fromTo($text, 1, {
      autoAlpha: 0,
      y: 30
    }, {
      autoAlpha: 1,
      y: 0,
      ease: 'power4.in'
    }, 'in')

    tl.fromTo($text, 3, {
      autoAlpha: 1
    }, {
      autoAlpha: 1
    }, 'texton')

    tl.fromTo($text, 1, {
      autoAlpha: 1
    }, {
      autoAlpha: 0,
      y: -30,
      ease: 'power4.in'
    })
    
    tl.fromTo($canvas, 1, {
      autoAlpha: 1
    }, {
      autoAlpha: 0
    }, 'out')

    tl.progress(1)
    
    let scene = new ScrollMagic.Scene({
      triggerHook: 0,
      triggerElement: element,
      duration: (imgs.length * pxPerImg)
    }).on('enter', e => {      
      this.setCanvasDims()      
    }).on('progress', e => {
      let index = Math.floor(e.progress * imgs.length),
          img = imgs[index]

      tl.progress(Math.round(e.progress * 100) / 100)

      if ( img )
        requestAnimationFrame(() => {
          let { width, height, x, y } = isTablet() ? cover(
            $canvas.width(),
            $canvas.height(),
            4,
            3
          ) : cover(
            $canvas.width(),
            $canvas.height(),
            5,
            7
          )

          let context = $canvas[0].getContext('2d')
          context.drawImage(
            img,
            0, 0,
            img.width, img.height,
            x * devicePixelRatio,
            y * devicePixelRatio,
            width * devicePixelRatio,
            height * devicePixelRatio
          )       
        })      
    }).setPin(element).addTo(this.controller)    
  }

  initProductDetail ( element ) {
    let $this = $(element),
        images = isTablet() ?
                 $this.data('images').sort() :
                 $this.data('images-mobile').sort(),
        $text = $this.find('.js-text'),
        $canvas = $this.find('.js-canvas')

    let pxPerImg = 50,
        imgs = [],
        tl

    $.each(images, (k,v) => {
      let img = new Image()
      img.src = v
      imgs.push(img)
    })

    tl = gsap.timeline({ paused: true })
    
    tl.fromTo($canvas, .5, {
      autoAlpha: 0
    }, {
      autoAlpha: 1
    }, 'in')

    tl.fromTo($text, 2, {
      autoAlpha: 0,
      y: 30
    }, {
      autoAlpha: 1,
      delay: 4,
      y: 0
    })

    tl.fromTo($text, 3, {
      autoAlpha: 1
    }, {
      autoAlpha: 1
    }, 'texton')

    tl.fromTo($text, 1, {
      autoAlpha: 1
    }, {
      autoAlpha: 0,
      y: -30
    }, 'out')
    
    tl.fromTo($canvas, 1, {
      autoAlpha: 1
    }, {
      autoAlpha: 0
    }, 'out')

    tl.progress(1)
    
    let scene = new ScrollMagic.Scene({
      triggerHook: 0,
      triggerElement: element,
      duration: (imgs.length * pxPerImg)
    }).on('enter', e => {      
      this.setCanvasDims()      
    }).on('progress', e => {
      let index = Math.floor(e.progress * imgs.length),
          img = imgs[index]

      tl.progress(Math.round(e.progress * 100) / 100)

      if ( img )
        requestAnimationFrame(() => {
          let { width, height, x, y } = isTablet() ? cover(
            $canvas.width(),
            $canvas.height(),
            4,
            3
          ) : cover(
            $canvas.width(),
            $canvas.height(),
            5,
            7
          )

          let context = $canvas[0].getContext('2d')
          context.drawImage(
            img,
            0, 0,
            img.width, img.height,
            x * devicePixelRatio,
            y * devicePixelRatio,
            width * devicePixelRatio,
            height * devicePixelRatio
          )       
        })      
    }).setPin(element).addTo(this.controller)    
  }
  
  initMedia ( element ) {
    let $this = $(element),
        images = isTablet() ?
                 $this.data('images').sort() :
                 $this.data('images-mobile').sort(),
        $canvas = $this.find('.js-canvas')

    let pxPerImg = 25,
        imgs = []

    $.each(images, (k,v) => {
      let img = new Image()
      img.src = v
      imgs.push(img)
    })

    let tl = gsap.timeline({ paused: true })
    
    tl.fromTo($canvas, 1.5, {
      autoAlpha: 0,
      y: 20
    }, {
      autoAlpha: 1,
      y: 0
    }, 'in')      

    let scene = new ScrollMagic.Scene({
      triggerHook: 0,
      triggerElement: element,
      duration: (imgs.length * pxPerImg)
    }).on('enter', e => {            
      this.setCanvasDims()
    }).on('progress', e => {
      let index = Math.floor(e.progress * imgs.length),
          img = imgs[index]

      tl.progress(Math.round(e.progress * 100) / 100)
      
      if ( img )
        requestAnimationFrame(() => {
          let { width, height, x, y } = isTablet() ? cover(
            $canvas.width(),
            $canvas.height(),
            4,
            3
          ) : cover(
            $canvas.width(),
            $canvas.height(),
            5,
            7
          )

          let context = $canvas[0].getContext('2d')
          context.drawImage(
            img,
            0, 0,
            img.width, img.height,
            x * devicePixelRatio,
            y * devicePixelRatio,
            width * devicePixelRatio,
            height * devicePixelRatio
          )       
        })      
    }).setPin(element).addTo(this.controller)    
  }

  initQuote ( element, index ) {
    let $this = $(element),
        $text = $this.find('.js-text')

    let tl = gsap.timeline({ paused: true })
    tl.fromTo($text, 1.5, {
      autoAlpha: 0,
      y: 20
    }, {
      autoAlpha: 1,
      y: 0
    }, 'in')

    if ( index !== this.$scenes.length - 1 ) {
      tl.fromTo($text, 3, {
        autoAlpha: 1
      }, {
        autoAlpha: 1
      }, 'on')
      tl.fromTo($text, 1.5, {
        autoAlpha: 1,
        y: 0
      }, {
        autoAlpha: 0,
        y: -20
      }, 'out')
      
      tl.progress(1)
    }
    
    let scene = new ScrollMagic.Scene({
      triggerHook: 0,
      triggerElement: element,
      duration: 3000
    }).on('enter', e => {
      
    }).on('progress', e => {
      tl.progress(Math.round(e.progress * 100) / 100)                 
    }).setPin(element).addTo(this.controller)        
  }

  initText ( element, index ) {
    let $this = $(element),
        $text = $this.find('.js-text')

    let tl = gsap.timeline({ paused: true })

    if ( index !== 0 )
      tl.fromTo($text, 1.5, {
        autoAlpha: 0,
        y: 20
      }, {
        autoAlpha: 1,
        y: 0
      }, 'in')

    if ( index !== this.$scenes.length - 1 ) {
      tl.fromTo($text, 2, {
        autoAlpha: 1
      }, {
        autoAlpha: 1
      }, 'on')
      tl.fromTo($text, 1.5, {
        autoAlpha: 1,
        y: 0
      }, {
        autoAlpha: 0,
        y: -20
      }, 'out')
      
      tl.progress(1)
    }
    
    let scene = new ScrollMagic.Scene({
      triggerHook: 0,
      triggerElement: element,
      duration: window.innerHeight
    }).on('enter', e => {
      
    }).on('progress', e => {
      tl.progress(Math.round(e.progress * 100) / 100)                 
    }).setPin(element).addTo(this.controller)        
  }

  afterLeave ( data ) {
    this.$window.off('resize', this.onWindowResize)
    this.$window.off('willreveal', this.onWindowWillreveal)
    this.controller.destroy()
  }

  setCanvasDims () {
    this.$animatedScenes.find('.js-canvas').each((k,v) => {
      let $canvas = $(v)
      $canvas[0].width = window.innerWidth * devicePixelRatio
      $canvas[0].height = window.innerHeight * devicePixelRatio
      $canvas.width(window.innerWidth)
      $canvas.height(window.innerHeight)
    })
  }

  onWindowWillreveal () {
    this.initScenes()
  }
  
  onWindowResize () {
    this.setCanvasDims()
  }
  
  onWindowResizeend () {
    if ( isTablet() )
      window.location.reload()
  }
  
  get namespace () {
    return 'home'
  }
}

export default Home
