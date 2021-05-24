import Modernizr from 'modernizr'

Modernizr.addTest('videoplaysinline', () => {
  return ('ontouchstart' in window) ? ('playsInline' in document.createElement('video')) : true
})

Modernizr.addTest('touchy', () => {
  return 'ontouchstart' in window
})

Modernizr.addTest('mix-blend-mode', function(){
  return Modernizr.testProp('mixBlendMode')
})

export default Modernizr
