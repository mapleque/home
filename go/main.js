(function () {
  var canvas = document.getElementById('canvas')
  var context = canvas.getContext('2d')
  var w,h
  var resizeCanvas = function () {
    w = window.innerWidth
    h = window.innerHeight
    canvas.setAttribute("width", w)
    canvas.setAttribute("height", h)
  }
  resizeCanvas()
  
  var gd = new goDraw(context, w, h)
  var gr = new goRule()
  window.onresize = function () {
    resizeCanvas()
    gd.resize(w, h)
  }
  gd.start(gr)
  
  var onmove = function (t) {
    if (t.type === 'touchmove') {
      t = t.targetTouches[0]
    }
    var pos = {
      x: Math.round(t.clientX),
      y: Math.round(t.clientY)
    }
    var cmd = gd.currentCmd(pos.x, pos.y)
    gd.exec(cmd)
  }
  var onup = function (t) {
    if (t.type === 'touchend') {
      t = t.changedTouches[0]
    }
    var pos = {
      x: Math.round(t.clientX),
      y: Math.round(t.clientY)
    }
    var cmd = gd.currentCmd(pos.x, pos.y)
    gd.play(cmd)
  }
  canvas.addEventListener('mousemove', onmove, false)
  canvas.addEventListener('touchmove', onmove, false)
  canvas.addEventListener('mouseup', onup, false)
  canvas.addEventListener('touchend', onup, false)

  // for debug
  window.gd = gd
  window.gr = gr
})()