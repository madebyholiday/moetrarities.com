class Login {
  beforeEnter ( data ) {
    this.$formToggle = $('.js-toggle-form')
    this.$form = $('.js-form')
    this.$navItem = $('.js-nav-item')

    this.onFormToggleClick = this.onFormToggleClick.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)

    this.$formToggle.on('click', this.onFormToggleClick)
    this.$form.on('submit', this.onFormSubmit)
    
  }

  afterLeave ( data ) {

  }

  onFormToggleClick ( e ) {
    let $this = $(e.currentTarget),
        form = $this.data('form');

    $(`.js-form[id="${form}"]`)
      .addClass('is-active')
      .siblings().removeClass('is-active')

    this.$navItem
      .filter(`[data-form="${form}"]`)
      .addClass('is-active').siblings()
      .removeClass('is-active')
  }

  onFormSubmit ( e ) {
    let $form = $(e.currentTarget),
        data = $form.serialize()

    $form.addClass('is-loading')
    $form.find('.js-errors').empty()
    $form.find('.js-message').empty()
    
    $.ajax({
      url: '/',
      contentType: 'application/x-www-form-urlencoded',
      dataType: 'json',
      type:'POST',
      data: data,
      success: data => {        
        if ( data.success ) {
          if ( data.returnUrl ) {
            window.location = data.returnUrl
          } else {
            $form.find('input:not([type="hidden"])').val('')
            $form.removeClass('is-loading')
          }
          
          if ( $form.attr('id') === 'forgot-password' ) {
            $form.find('.js-message').html('Password reset sent.')
          }

          if ( $form.attr('id') === 'inquire' ) {
            $form.find('.js-message').html('Thank you for your inquiry. <br />A private client manager will be in touch.')
          }
        } else {
          if ( data.error ) {
            $form.find('.js-errors').html(data.error)
          } else if ( data.errors ) {
            $form.find('.js-errors').html(
              Object.values(data.errors).join('<br />')
            )
          }
        }     
      }
    })
    
    e.preventDefault()
  }
  
  get namespace () {
    return 'login'
  }
}

export default Login
