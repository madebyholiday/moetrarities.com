import ScrollMagic from 'ScrollMagic'
import 'debug.addIndicators'
import { cover, contain } from 'intrinsic-scale'
import gsap from 'gsap'

class Home {
  beforeEnter ( data ) {
    this.$window = $(window)
    this.$animatedScenes = $('.js-animated-scenes')
    this.$scenes = $('.js-animated-scene')
    
    this.initScene = this.initScene.bind(this)
    this.onWindowResize = this.onWindowResize.bind(this)
    
    this.controller = new ScrollMagic.Controller

    this.setCanvasDims()

    this.$window.on('resize', this.onWindowResize)
    this.$scenes.each(this.initScene)
  }

  initScene (index, element) {
    let $this = $(element),
        images = $this.data('images').sort(),
        $canvas = $this.find('.js-canvas'),
        $text = $this.find('.js-text')

    let imgs = []
    
    $.each(images, (k,v) => {
      let img = new Image()
      img.src = v
      imgs.push(img)
    })

    let pxPerImg = 35,
        pxEndPause = $this.data('pause-duration')   
    
    let scene = new ScrollMagic.Scene({
      triggerHook: 0,
      triggerElement: element,
      duration: imgs.length * pxPerImg
    }).on('enter', e => {
      
    }).on('progress', e => {      
      let canvasO

      if ( e.progress <= .15 ) {
        canvasO = (.15 + (e.progress - .15)) / .15
      }

      if ( e.progress > .9 ) {
        canvasO = (1 - e.progress) / .1
      }

      gsap.set($canvas, {
        autoAlpha: canvasO
      })
      
      if ( $text.length ) {
        let textO,
            textY

        if ( e.progress <= .5 ) {
          textO = (.5 + (e.progress - .5)) / .5
          textY = 50 - (textO * 50)
        }        
        
        if ( e.progress > .9 ) {
          textO = (1 - e.progress) / .1
          textY = (textO * 50) - 50
        }

        gsap.set($text, {
          autoAlpha: textO,
          y: textY
        })
      }

      // percentage to shorten the sequence by, so we can pause
      // for pxEndPause number of px at the end of the sequence
      let perc = 1 - Math.floor(pxEndPause / pxPerImg) / (imgs.length - 1)
      
      let index = Math.floor((e.progress / perc) * (imgs.length - 1)),
          img = imgs[index]
      
      if ( img )
        requestAnimationFrame(() => {        
          let { width, height, x, y } = cover(
            $canvas.width(),
            $canvas.height(),
            1920,
            1080
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
    }).on('leave', e => {
      
    }).setPin(element).addTo(this.controller)
  }

  afterLeave ( data ) {

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
  
  onWindowResize () {
    this.setCanvasDims()
  }
  
  get namespace () {
    return 'home'
  }
}

export default Home
