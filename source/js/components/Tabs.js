class Tabs {
  constructor ( el ) {
    this.$el = el instanceof jQuery ? el : $(el)
    this.$items = this.$el.find('.js-items')
    this.$item = this.$el.find('.js-nav-item')

    this.onInit = this.onInit.bind(this)
    this.onBeforeChange = this.onBeforeChange.bind(this)
    this.onItemClick = this.onItemClick.bind(this)

    this.$item.on('click', this.onItemClick)

    this.$items.on('init', this.onInit)
    this.$items.on('beforeChange', this.onBeforeChange)
    
    this.$items.slick({
      rowS: 0,
      arrows: false,
      adaptiveHeight: true,
      cssEase: 'cubic-bezier(.075,.82,.165,1)'      
    })
  }

  destroy () {
    
  }

  onInit ( e, slick, current ) {
    this.$item.eq(slick.currentSlide).addClass('is-active')
  }

  onBeforeChange ( e, slick, current, next ) {
    this.$item.eq(next)
        .addClass('is-active')
        .siblings().removeClass('is-active')
  }

  onItemClick ( e ) {
    let $this = $(e.currentTarget),
        index = $this.index()

    this.$items.slick('slickGoTo', index)
  }
}

export default Tabs
