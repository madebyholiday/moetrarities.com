class MediaGallery {
  constructor ( el ) {
    this.$el = el instanceof jQuery ? el : $(el)
    this.$items = this.$el.find('.js-items')
    
    this.$items.slick({
      rows: 0,
      speed: 600,
      dots: true,
      appendArrows: '.js-arrows',
      appendDots: '.js-dots',
      prevArrow: `
        <button class="slick-prev">
          <span class="icon-chevron-thin-left"></span>
        </button>
      `,
      nextArrow: `
        <button class="slick-next">
          <span class="icon-chevron-thin-right"></span>
        </button>
      `,
      mobileFirst: true,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            speed: 1000,
            draggable: false,
            cssEase: 'cubic-bezier(.77,.03,.27,.99)'
          }
        }
      ]
    })
  }

  destroy () {

  }
}

export default MediaGallery
