(function() {
  document.getElementById('footer').innerHTML = 'mapleque @ ' + new Date().getFullYear()
  // document.getElementById('header').innerHTML = '枫枝雀自鸣'

  var scales = {}
  var links = {
    git: '//github.com/mapleque',
    blog: '//blog.mapleque.com',
  }

  var canvas = document.getElementById('canvas')
  canvas.setAttribute("width", window.innerWidth)
  canvas.setAttribute("height", window.innerHeight)
  window.onresize = function () {
    canvas.setAttribute("width", window.innerWidth)
    canvas.setAttribute("height", window.innerHeight)
    draw()
  }

  var context = canvas.getContext('2d')

  // binary background
  var drawBackground = function () {
    var w = canvas.width
    var h = canvas.height
    context.fillStyle = '#000'
    context.fillRect(0,0,w,h/2)
    context.fillStyle = '#fff'
    context.fillRect(0,h/2,w,h/2)
  }

  var drawLogo = function () {
    var w = canvas.width
    var h = canvas.height
    var gradient = context.createLinearGradient(0, 0, 0, h)
    gradient.addColorStop(0, '#fff')
    gradient.addColorStop(0.5, '#fff')
    gradient.addColorStop(0.5, '#000')
    gradient.addColorStop(1, '#000')
    context.fillStyle = gradient
    context.font = 'bold ' + w/8 + 'px Arial'
    context.fillText('Mapleque', w/2 - w/4 - w/32, h/2+w/32)
  }

  var drawBlog = function () {
    var w = canvas.width
    var h = canvas.height
    var px = w/2-w/6
    var py = h*3/4 - w/16
    var sw = w/12
    var sh = sw*5/7
    scales.blog= {
      x: px,
      y: py,
      w: sw,
      h: sh
    }

    // outline
    context.beginPath()
    context.rect(px,py,sw,sh)
    context.closePath()
    context.lineWidth = 1
    context.strokeStyle = '#000'
    context.stroke()

    // 2 black key
    context.fillStyle = '#000'
    context.fillRect(px+sw/7,py,sw/7,3*sh/4)
    context.fillRect(px+3*sw/7,py,sw/7,3*sh/4)
    context.fillRect(px+5*sw/7,py,sw/7,3*sh/4)

    // 3 white key
    context.moveTo(px+3*sw/7/2,py+3*sh/4)
    context.lineTo(px+3*sw/7/2,py+sh)
    context.moveTo(px+7*sw/7/2,py+3*sh/4)
    context.lineTo(px+7*sw/7/2,py+sh)
    context.moveTo(px+11*sw/7/2,py+3*sh/4)
    context.lineTo(px+11*sw/7/2,py+sh)
    context.stroke()
    /*
    context.fillStyle = '#000'
    context.font = 'bold 40px Arial'
    context.fillText('Blog', px, py)
    */
  }
  var drawGit = function () {
    var w = canvas.width
    var h = canvas.height
    var px = w/2+w/12
    var py = h*3/4-w/16
    var sw = w/12
    var sh = sw*5/7
    scales.git= {
      x: px,
      y: py,
      w: sw,
      h: sh
    }
    // outline
    context.beginPath()
    context.rect(px,py,sw,sh)
    context.closePath()
    context.lineWidth = 1
    context.strokeStyle = '#000'
    context.stroke()

    // inline
    context.moveTo(px,py+sh/5)
    context.lineTo(px+sw,py+sh/5)
    context.moveTo(px,py+2*sh/5)
    context.lineTo(px+sw,py+2*sh/5)
    context.moveTo(px,py+3*sh/5)
    context.lineTo(px+sw,py+3*sh/5)
    context.moveTo(px,py+4*sh/5)
    context.lineTo(px+sw,py+4*sh/5)
    context.moveTo(px,py+sh)
    context.lineTo(px+sw,py+sh)
    context.moveTo(px+sw/7,py)
    context.lineTo(px+sw/7,py+sh)
    context.moveTo(px+2*sw/7,py)
    context.lineTo(px+2*sw/7,py+sh)
    context.moveTo(px+3*sw/7,py)
    context.lineTo(px+3*sw/7,py+sh)
    context.moveTo(px+4*sw/7,py)
    context.lineTo(px+4*sw/7,py+sh)
    context.moveTo(px+5*sw/7,py)
    context.lineTo(px+5*sw/7,py+sh)
    context.moveTo(px+6*sw/7,py)
    context.lineTo(px+6*sw/7,py+sh)
    context.stroke()

    // pos stone
    var xm = { M:0, N:1,O:2,P:3,Q:4,R:5,S:6,T:7 }
    var ym = { 19:0,18:1,17:2,16:3,15:4,14:5 }
    var p = function (bw, p) {
      var x = xm[p[0]]
      var y = ym[p[1]+p[2]]
      bw ? black(x,y) : white(x,y)
    }
    var black = function(x,y) {
      context.beginPath()
      context.fillStyle = '#000'
      context.arc(px+x*sw/7,py+y*sw/7, sw/14, 0, 2*Math.PI, false)
      context.closePath()
      context.fill()
    }
    var white = function(x,y) {
      context.beginPath()
      context.fillStyle = '#fff'
      context.lineWidth = 1
      context.strokeStyle = '#000'
      context.arc(px+x*sw/7,py+y*sw/7, sw/14, 0, 2*Math.PI, false)
      context.closePath()
      context.stroke()
      context.fill()
    }

    // play
    var b = true, w = false
    p(b,'R16')
    p(w,'P16')
    p(b,'P17')
    p(w,'Q16')
    p(b,'Q17')
    p(w,'O16')
    p(b,'O17')
    p(w,'R15')
    p(b,'N16')
    p(w,'R17')
    p(b,'S16')
    p(w,'R18')

    /*
    context.fillStyle = '#000'
    context.font = 'bold 40px Arial'
    context.fillText('Git', px, py)
    */
  }

  var paper = function () {
    var self = this
    
    this.resize = function () {
      var w = canvas.width
      var h = canvas.height
      self.w = w
      self.h = h
      self.data = context.getImageData(0,0,w,h)
      self.oral = context.getImageData(0,0,w,h).data
      self.task = []
      self.clears = []
    }
    self.writing = false
    this.start = function (pos) {
      self.writing = true
      self.lastTime = new Date()
      self.lastPos = pos
      self.lastWeight = 10
    }
    this.end = function () {
      self.writing = false
      self.lastPos = null
      self.lastTime = null
      self.lastWeight = 10
    }
    this.write = function (pos) {
      if (!self.writing) {
        return
      }
      var writePix = function (weight, pos) {
        // weight = 1
        for (var i=-weight; i<weight; i++) {
          for (var j=-weight; j<weight; j++) {
            if (i*i + j*j < Math.pow(weight,2)) {
              var cx = pos.x+i
              var cy = pos.y+j
              cx = cx < 0 ? 0 : cx
              cx = cx > self.w ? self.w : cx
              var p = (cy*self.w+cx)*4
              self.task.push(p)
            }
          }
        }
      }

      // weight depends on during
      var now = new Date()
      var weight = 10
      var speed = 1000
      var last = self.lastTime.getTime()
      var current = now.getTime()
      var during = current - last
      if (during  < 300 || self.lastPos !== null) {
        // caculate weight
        var distance = Math.pow(self.lastPos.x - pos.x,2) + Math.pow(self.lastPos.y - pos.y,2)
        var curSpeed = 1000 * Math.sqrt(distance)/during
        // weight = Math.floor(weight + (weight/2 - Math.sqrt(distance)))
        weight = weight * (speed - curSpeed)/speed
        if (weight > this.lastWeight) {
          weight = this.lastWeight + 1
        } else if (weight < this.lastWeight) {
          weight = this.lastWeight - 1
        }
        weight = weight > 1 ? weight : 2
        // build path from last pos
        var minx = self.lastPos.x
        var maxx = pos.x
        var stepx = 1
        if (maxx < minx) {
          stepx = -1
        }
        var miny = self.lastPos.y
        var maxy = pos.y
        var stepy = 1
        if (maxy < miny) {
          stepy = -1
        }
        if (maxy === miny) {
          var y = miny
          for (var x=minx;x!=maxx;x+=stepx) {
            var tmpweight = Math.round(self.lastWeight + (weight - self.lastWeight) * (x-minx)/(maxx-minx))
            writePix(tmpweight, {x:x,y:y})
          }
        } else if (maxx === minx) {
          var x = minx
          for (var y=miny;y-maxy!=0;y+=stepy) {
            var tmpweight = Math.round(self.lastWeight + (weight - self.lastWeight) * (y-miny)/(maxy-miny))
            writePix(tmpweight, {x:x,y:y})
          }
        } else {
          if (Math.abs((maxx-minx)) >= Math.abs(maxy-miny)) {
            var delta = (maxx-minx)/(maxy-miny)
            for (var x=minx;x!=maxx;x+=stepx) {
              var mind = Math.abs(delta)
              var tmppos = {x:x,y:miny}
              for (var y=miny;y-maxy!=0;y+=stepy) {
                var tmpd = Math.abs(delta-(x-minx)/(y-miny))
                if (mind > tmpd) {
                  mind = tmpd
                  tmppos.y = y
                }
              }
              var tmpweight = Math.round(self.lastWeight + (weight - self.lastWeight) * (x-minx)/(maxx-minx))
              writePix(tmpweight, tmppos)
            }
          } else {
            var delta = (maxy-miny)/(maxx-minx)
            for (var y=miny;y!=maxy;y+=stepy) {
              var mind = Math.abs(delta)
              var tmppos = {x:minx,y:y}
              for (var x=minx;x!=maxx;x+=stepx) {
                var tmpd = Math.abs(delta-(y-miny)/(x-minx))
                if (mind > tmpd) {
                  mind = tmpd
                  tmppos.x = x
                }
              }
              var tmpweight = Math.round(self.lastWeight + (weight - self.lastWeight) * (y-miny)/(maxy-miny))
              writePix(tmpweight, tmppos)
            }
          }
        }
      }
      self.lastTime = now
      self.lastPos = pos
      self.lastWeight = weight
    }
    var revers = function (p) {
      if (p===undefined) return
      self.data.data[p]=255-self.oral[p]
      self.data.data[p+1]=255-self.oral[p+1]
      self.data.data[p+2]=255-self.oral[p+2]
      self.data.data[p+3]=255
      self.clears.push(p)
    }
    var clear = function (p) {
      if (p===undefined) return
      self.data.data[p]=self.oral[p]
      self.data.data[p+1]=self.oral[p+1]
      self.data.data[p+2]=self.oral[p+2]
      self.data.data[p+3]=255
    }
    this.flush = function () {
      var exist = {}
      for (var i=0;i<2000;i++) {
        var p = self.task.shift()
        // must sigle p never revers
        if (!exist[p]) {
          revers(p)
          exist[p] = true
        }
      }
      context.putImageData(self.data,0,0)
    }
    this.reset = function () {
      if (self.writing) {
        return
      }
      if (self.clears.length === 0) {
        return
      }
      while (self.clears.length > 0) {
        var c = self.clears.shift()
        clear(c)
      }
    }
  }
  var pen = new paper()
  var draw = function () {
    drawBackground()
    drawLogo()
    drawBlog()
    drawGit()
    pen.resize()
  }
  draw()
  setInterval(pen.flush, 20)

  // event listener
  var currentLink = ''
  var onmove = function (t) {
    if (t.type === 'touchmove') {
      t = t.targetTouches[0]
    }
    var pos = {
      x: Math.round(t.clientX),
      y: Math.round(t.clientY)
    }
    var pointer = function (href) {
      document.body.style.cursor = 'pointer'
      currentLink = href
    }
    var normal = function () {
      document.body.style.cursor = ''
      currentLink = ''
    }
    var isP = false
    for (var key in scales) {
      if (scales.hasOwnProperty(key) && inscale(pos, scales[key])) {
        pointer(links[key])
        isP = true
        break
      }
    }
    if (!isP) {
      normal()
    }
    if (inscale(pos, {x:0,y:0,h:10,w:10})) {
      pen.reset()
    }
    pen.write(pos)
  }

  var lastTouch = new Date()
  var ondown = function (t) {
    if (t.type === 'touchstart') {
      var now = new Date()
      if (now.getTime() - lastTouch.getTime() < 200) {
        pen.reset()
      }
      t = t.targetTouches[0]
      lastTouch = now
    }
    var pos = {
      x: Math.round(t.clientX),
      y: Math.round(t.clientY)
    }
    if (currentLink.length > 0) {
      window.location.href = currentLink
    }
    pen.start(pos)
  }

  var onup = function () {
    pen.end()
  }

  canvas.addEventListener('mousemove', onmove, false)
  canvas.addEventListener('touchmove', onmove, false)
  canvas.addEventListener('mouseup', onup, false)
  canvas.addEventListener('touchend', onup, false)
  canvas.addEventListener('mousedown', ondown, false)
  canvas.addEventListener('touchstart', ondown, false)
  var inscale = function (pos, scale) {
    return pos.x > scale.x && pos.x < scale.x + scale.w && pos.y > scale.y && pos.y < scale.y + scale.h
  }

  document.body.ontouchmove=function(e){
    e.preventDefault()
  }
})()
