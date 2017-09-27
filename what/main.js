(function(){
  var canvas = document.getElementById('body')
  var context = canvas.getContext('2d')

  var cw = window.innerWidth
  var ch = window.innerHeight
  canvas.setAttribute("width", cw)
  canvas.setAttribute("height", ch)

  window.onresize = function () {
    cw = window.innerWidth
    ch = window.innerHeight
    canvas.setAttribute("width", cw)
    canvas.setAttribute("height", ch)
    draw()
  }

  var bg = new Image()
  var bgw, bgh
  var draw = function () {
    context.drawImage(bg, 0, 0, bgw, bgh, 0, 0, cw, ch)
  }

  bg.onload = function () {
    bgw = bg.width
    bgh = bg.height
    draw()
  }

  bg.src = "./img/background.jpg"
})()