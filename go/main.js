(function () {
  var canvas = document.getElementById('canvas')
  var context = canvas.getContext('2d')
  var w = window.innerWidth
  var h = window.innerHeight

  var initCanvas = function () {
    canvas.setAttribute("width", w)
    canvas.setAttribute("height", h)
  }


  var go = function (context, w, h) {
    var self = this
    self.ctx = context
    self.size = 18
    self.cw = w
    self.ch = h
    var bx = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S']
    var wx = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s']
    var decodeCmd = function (cmd) {
      var wb,x,y
      y = parseInt(cmd.substring(1))
      for (var i=0;i<=self.size;i++) {
        if (bx[i] === cmd[0]) {
          x =i
          y = self.size - y + 1
          wb=true
          break
        }
        if (wx[i] === cmd[0]) {
          x=self.size - i
          y = y - 1
          wb=false
          break
        }
      }
      return {
        x:x,
        y:y,
        wb:wb,
        key: x + ':' + y
      }
    }
    self.history = []
    self.filled = {}

    var draw = function () {
      var length = Math.min(self.cw,self.ch) * 0.8
      var unit = Math.floor(length / self.size)
      length = unit * self.size
      var origin = {
        x:Math.floor(self.cw/2) - Math.floor(length/2),
        y:Math.floor(self.ch/2) - Math.floor(length/2),
      }
      var drawBoard = function () {
        var drawBackground = function () {
          self.ctx.fillStyle = '#fad99e'
          self.ctx.fillRect(origin.x - unit,origin.y - unit,length + 2*unit,length+2*unit)
        }
        var drawLine = function (num) {
          self.ctx.beginPath()
          self.ctx.fillStyle = '#000'
          self.ctx.strokeStyle = '#000'
          var sx = origin.x + num * unit
          var sy = origin.y + num * unit
          self.ctx.moveTo(sx, origin.y)
          self.ctx.lineTo(sx, origin.y+length)
          self.ctx.moveTo(origin.x, sy)
          self.ctx.lineTo(origin.x+length, sy)
          self.ctx.closePath()
          self.ctx.stroke()
          self.ctx.textAlign = 'center'
          self.ctx.fillText(bx[num], sx, origin.y-5)
          self.ctx.fillText(wx[self.size - num], sx, origin.y + length + 15)
          self.ctx.textAlign = 'right'
          self.ctx.fillText(num + 1, origin.x - unit/4, sy + 5)
          self.ctx.textAlign = 'left'
          self.ctx.fillText(self.size - num+1, origin.x + length + unit/4, sy + 5)
        }
        var drawStar = function (x, y) {
          var sx = origin.x + x * unit
          var sy = origin.y + y * unit
          self.ctx.beginPath()
          self.ctx.fillStyle = '#000'
          self.ctx.strokeStyle = '#000'
          self.ctx.arc(sx,sy, unit/10, 0, 2*Math.PI, false)
          self.ctx.closePath()
          self.ctx.fill()
        }
        drawBackground()
        for (var i=0;i<=self.size;i++) {
          drawLine(i)
        }
        drawStar(3,3)
        drawStar(self.size - 3,3)
        drawStar(3,self.size - 3)
        drawStar(self.size - 3,self.size - 3)
        var o = Math.floor(self.size/2)
        drawStar(o,o)
      }
      var drawChess = function (num, wb, x, y) {
        var sx = origin.x + x * unit
        var sy = origin.y + y * unit
        self.ctx.beginPath()
        self.ctx.lineWidth = 1
        self.ctx.strokeStyle = wb ? '#000' : '#fff'
        self.ctx.fillStyle = wb ? '#000' : '#fff'
        self.ctx.arc(sx,sy, unit*3/8, 0, 2*Math.PI, false)
        self.ctx.closePath()
        self.ctx.fill()
        self.ctx.stroke()

        self.ctx.textAlign = 'center'
        self.ctx.fillStyle = !wb ? '#000' : '#fff'

        self.ctx.fillText(num,sx,sy+5)
      }
      drawBoard()
      for (var i=0;i<self.history.length;i++) {
        var op = decodeCmd(self.history[i])
        drawChess(i+1, op.wb,op.x,op.y)
      }
    }

    self.resize = function (w,h) {
      self.cw = w
      self.ch = h
      draw()
    }
    self.start = function () {
      draw()
    }
    self.play = function (cmd) {
      var op = decodeCmd(cmd)
      if (self.filled[op.key]) {
        return false
      }
      self.history.push(cmd)
      self.filled[op.key] = op
      draw()
      return true
    }
  }
  initCanvas()
  var oneGo = new go(context, w, h)
  window.onresize = function () {
    initCanvas()
    oneGo.resize(w, h)
  }
  oneGo.start()
  oneGo.play('R16')
  oneGo.play('d4')
  oneGo.play('P17')
  oneGo.play('c4')
  oneGo.play('Q17')
  oneGo.play('e4')
  oneGo.play('O17')
  oneGo.play('b5')
  oneGo.play('N16')
  oneGo.play('b3')
  oneGo.play('S16')
  oneGo.play('b2')
  window.go = oneGo
})()