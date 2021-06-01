class Account {
  beforeEnter ( data ) {
    this.$window = $(window)

    this.onFormSubmit = this.onFormSubmit.bind(this)
    
    this.$form = $('.js-form')
    this.$form.on('submit', this.onFormSubmit)
  }

  afterLeave ( data ) {

  }

  onFormSubmit ( e ) {
    e.preventDefault()

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
        $form.removeClass('is-loading')

        if ( data.success ) {
          if ( $form.attr('id') === 'update-account' ) {
            $form.find('.js-message').html('Account Updated.')
          } else if ( $form.attr('id') === 'reset-password' ) {
            $form.find('.js-message').html('Password Updated.')
            $form.find('input:not([type="hidden"]):not([disabled])').val('')
          }                    
          
          setTimeout(() => {
            $form.find('.js-message').empty()
          }, 3000)
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
  }
  
  get namespace () {
    return 'account'
  }
}

export default Account
