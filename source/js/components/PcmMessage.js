class PcmMessage {
  constructor () {
    this.$toggle = $('.js-pcm-message-toggle')
    this.$el = $('.js-pcm-message')
    this.$form = $('.js-pcm-message-form')

    this.onToggleClick = this.onToggleClick.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
       
    this.$toggle.on('click', this.onToggleClick)
    this.$form.on('submit', this.onFormSubmit)
  }

  destroy () {

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
          $form.find('.js-message').html('Message Sent.')
          $form.find('input:not([type="hidden"]):not([disabled])').val('')
          $form.find('textarea').val('')

          setTimeout(() => {
            $form.find('.js-message').empty()
            this.$el.removeClass('is-open')
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

  onToggleClick () {
    this.$el.toggleClass('is-open')
  }
}

export default PcmMessage
