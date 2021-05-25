import gsap from 'gsap'

import {
  isDesktop
} from 'utils/media'

class Header {
  constructor () {
    this.$el = $('.js-header')
    this.$window = $(window)
    this.$body = $('body')
    this.$mobileMenu = this.$el.find('.js-mobile-menu');
    this.$menuToggle = this.$el.find('.js-menu-toggle')

    this.onMobileMenuItemHasLinkListsClick = this.onMobileMenuItemHasLinkListsClick.bind(this)
    this.onMenuToggleClick = this.onMenuToggleClick.bind(this)
    this.onWindowResize = this.onWindowResize.bind(this)

    this.$menuToggle.on('click', this.onMenuToggleClick)
    this.$window.on('resize', this.onWindowResize)
    
    this.$mobileMenu
        .find('.js-has-link-lists > a')
        .on('click', this.onMobileMenuItemHasLinkListsClick)
    
  }

  destroy () {
    
  }

  openMobileMenu () {
    this.$body.addClass('is-menu-open')
    
    if ( this.mobileTl )
      this.mobileTl.kill()
    
    this.mobileTl = gsap.timeline()
    
    this.mobileTl.to(this.$mobileMenu, 1, {
      height: '100%',
      ease: 'power4.inOut'
    })
  }

  closeMobileMenu () {
    this.$body.removeClass('is-menu-open')
    
    if ( this.mobileTl )
      this.mobileTl.kill()

    this.mobileTl = gsap.timeline()
    
    this.mobileTl.to(this.$mobileMenu, .7, {      
      height: 0,
      ease: 'power4.inOut'
    })    
  }

  onMenuToggleClick () {
    if ( this.$body.hasClass('is-menu-open') ) {
      this.closeMobileMenu()
    } else {
      this.openMobileMenu()      
    }
  }

  onMobileMenuItemHasLinkListsClick ( e ) {
    e.preventDefault()

    let $this = $(e.currentTarget),
        $li = $this.closest('li'),
        $linkLists = $li.find('.js-link-lists')

    $li.toggleClass('is-open')

    if ( $li.hasClass('is-open') ) {
      $linkLists.slideDown(400, 'easeInOutCubic')
    } else {
      $linkLists.slideUp(400, 'easeInOutCubic')
    }
  }

  onWindowResize () {
    if ( isDesktop() && this.$body.hasClass('is-menu-open') )
      this.closeMobileMenu()
  }
}

export default Header
