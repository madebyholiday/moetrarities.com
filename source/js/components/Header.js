import gsap from 'gsap'

import {
  isDesktop
} from 'utils/media'

import {
  fetchItems
} from 'utils/cellar'

class Header {
  constructor () {
    this.$el = $('.js-header')

    if ( !this.$el.length )
      return
    
    this.$window = $(window)
    this.$document = $(document)
    this.$body = $('body')
    this.$mobileMenu = this.$el.find('.js-mobile-menu');
    this.$menuToggle = this.$el.find('.js-menu-toggle')
    this.$cellarCount = $('.js-cellar-count')

    this.onMobileMenuItemHasLinkListsClick = this.onMobileMenuItemHasLinkListsClick.bind(this)
    this.onMenuToggleClick = this.onMenuToggleClick.bind(this)
    this.onNavPrimaryItemClick = this.onNavPrimaryItemClick.bind(this)
    this.onMouseleave = this.onMouseleave.bind(this)
    this.onDocumentClick = this.onDocumentClick.bind(this)
    this.onWindowResize = this.onWindowResize.bind(this)
    this.onWindowCellarUpdated = this.onWindowCellarUpdated.bind(this)

    this.$menuToggle.on('click', this.onMenuToggleClick)
    this.$document.on('click', this.onDocumentClick)
    this.$window.on('resize', this.onWindowResize);
    this.$window.on('cellar_updated', this.onWindowCellarUpdated)
    
    this.$mobileMenu
        .find('.js-has-link-lists > a')
        .on('click', this.onMobileMenuItemHasLinkListsClick)
    
    this.$el.on('mouseleave', this.onMouseleave)
    this.$el.find('.js-nav-primary-item > a').on('click', this.onNavPrimaryItemClick)

    this.fetchCellar()
  }

  destroy () {
    this.$document.off('click', this.onDocumentClick)
    this.$window.off('resize', this.onWindowResize);
    this.$window.off('cellar_updated', this.onWindowCellarUpdated)
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

  openDropdown ( id ) {
    if ( this.activeDropdownId )
      this.closeDropdown(this.activeDropdownId)

    this.$el.find(`.js-nav-primary-item[data-id="${id}"]`).addClass('is-open')
    
    if ( this.activeDropdownId === id )
      return
    
    this.activeDropdownId = id
    
    let $dropdown = $(`.js-nav-dropdown[data-id="${id}"]`)

    if ( this.dropdownTl )
      this.dropdownTl.kill()
    
    this.dropdownTl = gsap.timeline()
    
    this.dropdownTl.fromTo($dropdown, .3, {
      y: 0,
      autoAlpha: 1
    }, {
      y: '100%',
      ease: 'power4.out'
    })
  }
  
  closeDropdown ( id ) {
    let $dropdown = $(`.js-nav-dropdown[data-id="${id}"]`)

    this.$el.find(`.js-nav-primary-item[data-id="${id}"]`).removeClass('is-open')
    
    if ( this.dropdownTl )
      this.dropdownTl.kill()
    
    this.dropdownTl = gsap.timeline({
      onComplete: () => {
        this.activeDropdownId = null
      }
    })
    
    this.dropdownTl.to($dropdown, 0, {
      autoAlpha: 0,
      ease: 'power4.inOut'
    })
  }

  fetchCellar () {
    fetchItems().then(data => {
      this.$cellarCount.html(data.length)
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

  onMouseleave ( e ) {
    if ( this.activeDropdownId )
      this.closeDropdown(this.activeDropdownId)
  }

  onNavPrimaryItemClick ( e ) {
    e.preventDefault()

    let $this = $(e.currentTarget),
        $li = $this.closest('li'),
        id = $li.data('id')

    this.openDropdown(id)
  }

  onWindowResize () {
    if ( isDesktop() && this.$body.hasClass('is-menu-open') )
      this.closeMobileMenu()
  }

  onWindowCellarUpdated () {
    this.fetchCellar()
  }

  onDocumentClick ( e ) {
    let $this = $(e.target)

    if ( !$this.closest('.js-header').length &&
         this.activeDropdownId )
      this.closeDropdown(this.activeDropdownId)    
  }
}

export default Header
