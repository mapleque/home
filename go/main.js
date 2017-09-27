(function () {
  var canvas = document.getElementById('canvas')
  var context = canvas.getContext('2d')
  var w = window.innerWidth
  var h = window.innerHeight

  var resizeCanvas = function () {
    w = window.innerWidth
    h = window.innerHeight
    canvas.setAttribute("width", w)
    canvas.setAttribute("height", h)
  }

  resizeCanvas()
  var oneGo = new go(context, w, h)
  window.onresize = function () {
    resizeCanvas()
    oneGo.resize(w, h)
  }
  oneGo.start()
  
  var onmove = function (t) {
    if (t.type === 'touchmove') {
      t = t.targetTouches[0]
    }
    var pos = {
      x: Math.round(t.clientX),
      y: Math.round(t.clientY)
    }
    var cmd = oneGo.currentCmd(pos.x, pos.y)
    oneGo.exec(cmd)
  }
  var onup = function (t) {
    if (t.type === 'touchend') {
      t = t.changedTouches[0]
    }
    var pos = {
      x: Math.round(t.clientX),
      y: Math.round(t.clientY)
    }
    var cmd = oneGo.currentCmd(pos.x, pos.y)
    oneGo.play(cmd)
  }
  canvas.addEventListener('mousemove', onmove, false)
  canvas.addEventListener('touchmove', onmove, false)
  canvas.addEventListener('mouseup', onup, false)
  canvas.addEventListener('touchend', onup, false)

  // for debug
  window.oneGo = oneGo
})()