(function() {
  document.getElementById('footer').innerHTML = 'mapleque @ ' + new Date().getFullYear()

  var scales = {
    image: {}
  }
  var links = {
    image: '//blog.mapleque.com'
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

  var draw = function () {
    drawBackground()
    drawImage()
  }

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
    if (inscale(pos, scales.image)) {
      pointer(links.image)
    } else {
      normal()
    }
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
