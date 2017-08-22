(function() {
  document.getElementById('footer').innerHTML = 'mapleque @ ' + new Date().getFullYear()

  var scales = {
    image: {}
  }
  var links = {
    image: '//blog.mapleque.com',
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

  // draw something

  img = new Image()
  img.src = 'icon.jpg'
  img.onload = function () {
    draw()
  }
  var drawImage = function () {
    var imageWidth = img.width
    var imageHeight = img.height
    var canvasWidth = canvas.width
    var canvasHeight = canvas.height
    var posx = canvasWidth/2 - imageWidth/2
    var posy = canvasHeight/2 - imageHeight/2
    context.drawImage(img, posx, posy)
    scales.image = {
      x: posx,
      y: posy,
      w: imageWidth,
      h: imageHeight
    }
  }

  /*
  // linear background
  var drawBackground = function () {
    var w = canvas.width
    var h = canvas.height
    var fillbk = function (linears) {
      var oldOp = context.globalCompositeOperation
      context.globalCompositeOperation='lighter'
      linears.forEach(function (e) {
        var gradient = context.createLinearGradient(e[0], e[1], e[2], e[3])
        e[4].forEach(function (a) {
          gradient.addColorStop(a[0], a[1])
        })
        context.fillStyle = gradient
        context.fillRect(e[5][0],e[5][1],e[5][2],e[5][3])
      })
      context.globalCompositeOperation=oldOp
    }
    var sw = h*w*h/Math.pow(Math.sqrt(w*w+h*h),2)
    var sh = sw * w / h
    var linears = [
      [0,0,sw,sh, [
        [0,'#000'],
        [1,'#fff'],
        [1,'#000']
      ],[0,0,w,h]],
      [w,h,w-sw,h-sh, [
        [0,'#000'],
        [1,'#fff'],
        [1,'#000']
      ],[0,0,w,h]]
    ]
    fillbk(linears)
  }
  */
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
    context.font = 'bold 100px Arial'
    context.fillText('Mapleque', w/2 - 232, h/2+30)
  }

  var drawBlog = function () {
    var w = canvas.width
    var h = canvas.height
    var px = w/2-150
    var py = h*3/4 -50
    scales.blog= {
      x: px,
      y: py,
      w: 84,
      h: 60
    }

    // outline
    context.beginPath()
    context.rect(px,py,84,60)
    context.closePath()
    context.lineWidth = 1
    context.strokeStyle = '#000'
    context.stroke()

    // 2 black key
    context.fillStyle = '#000'
    context.fillRect(px+12,py,12,50)
    context.fillRect(px+36,py,12,50)
    context.fillRect(px+60,py,12,50)

    // 3 white key
    context.moveTo(px+18,py+60)
    context.lineTo(px+18,py+45)
    context.moveTo(px+44,py+60)
    context.lineTo(px+44,py+45)
    context.moveTo(px+66,py+60)
    context.lineTo(px+66,py+45)
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
    var px = w/2+80
    var py = h*3/4-50
    scales.git= {
      x: px,
      y: py,
      w: 84,
      h: 60
    }
    // outline
    context.beginPath()
    context.rect(px,py,84,60)
    context.closePath()
    context.lineWidth = 1
    context.strokeStyle = '#000'
    context.stroke()

    // inline
    context.moveTo(px,py+12)
    context.lineTo(px+84,py+12)
    context.moveTo(px,py+24)
    context.lineTo(px+84,py+24)
    context.moveTo(px,py+36)
    context.lineTo(px+84,py+36)
    context.moveTo(px,py+48)
    context.lineTo(px+84,py+48)
    context.moveTo(px,py+60)
    context.lineTo(px+84,py+60)
    context.moveTo(px+12,py)
    context.lineTo(px+12,py+60)
    context.moveTo(px+24,py)
    context.lineTo(px+24,py+60)
    context.moveTo(px+36,py)
    context.lineTo(px+36,py+60)
    context.moveTo(px+48,py)
    context.lineTo(px+48,py+60)
    context.moveTo(px+60,py)
    context.lineTo(px+60,py+60)
    context.moveTo(px+72,py)
    context.lineTo(px+72,py+60)
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
      context.arc(px+x*12,py+y*12, 6, 0, 2*Math.PI, false)
      context.closePath()
      context.fill()
    }
    var white = function(x,y) {
      context.beginPath()
      context.fillStyle = '#fff'
      context.lineWidth = 1
      context.strokeStyle = '#000'
      context.arc(px+x*12,py+y*12, 6, 0, 2*Math.PI, false)
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
    self.lastTime = new Date()
    self.lastPos = null
    this.resize = function () {
      var w = canvas.width
      var h = canvas.height
      self.w = w
      self.h = h
      self.data = context.getImageData(0,0,w,h)
      self.oral = context.getImageData(0,0,w,h).data
      self.task = []
      self.clear = []
    }
    this.write = function (pos) {
      // weight depends on during
      var weight = 5
      var last = self.lastTime.getTime()
      self.lastTime = new Date()
      var current = self.lastTime.getTime()
      var during = current - last
      if (during  < 300 || self.lastPos !== null) {
        // build path from last pos
        // caculate weight
        var distance = Math.pow(self.lastPos.x - pos.x,2) + Math.pow(self.lastPos.y - pos.y,2)
        weight = Math.floor(5 + (3 - Math.sqrt(distance)))
        weight = weight > 0 ? weight : 1
      }
      self.lastPos = pos

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
    var revers = function (p) {
      if (p===undefined) return
      self.data.data[p]=255-self.oral[p]
      self.data.data[p+1]=255-self.oral[p+1]
      self.data.data[p+2]=255-self.oral[p+2]
      self.data.data[p+3]=255
    }
    var clear = function (p) {
      if (p===undefined) return
      self.data.data[p]=self.oral[p]
      self.data.data[p+1]=self.oral[p+1]
      self.data.data[p+2]=self.oral[p+2]
      self.data.data[p+3]=255
    }
    this.flush = function () {
      for (var i=0;i<130;i++) {
        var c = self.clear.shift()
        clear(c)
        var p = self.task.shift()
        revers(p)
        setTimeout(function(p){
          return function() {
            self.clear.push(p)
          }
        }(p),300)
      }
      context.putImageData(self.data,0,0)
    }
  }
  var pen = new paper()
  var draw = function () {
    drawBackground()
    // drawImage()
    drawLogo()
    drawBlog()
    drawGit()
    pen.resize()
  }
  draw()
  setInterval(pen.flush, 20)

  // event listener
  var currentLink = ''

  canvas.onmousemove = function (t) {
    var pos = {
      x: t.clientX,
      y: t.clientY
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
    pen.write(pos)
  }

  canvas.onmousedown = function () {
    if (currentLink.length > 0) {
      window.location.href = currentLink
    }
  }

  var inscale = function (pos, scale) {
    return pos.x > scale.x && pos.x < scale.x + scale.w && pos.y > scale.y && pos.y < scale.y + scale.h
  }
})()
