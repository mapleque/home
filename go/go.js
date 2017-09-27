(function(){
  var go = function (context, w, h) {
    var self = this
    self.ctx = context
    self.size = 18
    self.cw = w
    self.ch = h
    self.currentWB = true

    var bx = ['A','B','C','D','E','F','G','H','J','K','L','M','N','O','P','Q','R','S','T']
    var wx = ['a','b','c','d','e','f','g','h','j','k','l','m','n','o','p','q','r','s','t']
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
    self.currentCmd = function (px, py) {
      var xi = Math.round((px - self.origin.x)/self.unit)
      var yi = Math.round((py - self.origin.y)/self.unit)
      if (xi >= 0 && yi >= 0 && xi < 19 && yi < 19) {
        return (self.currentWB ? bx[xi] : wx[self.size - xi]) + (self.currentWB ? (self.size - yi + 1) : (yi + 1))
      }
      return 'unknow'
    }
    self.history = []
    self.filled = {}
    self.try = null

    var draw = function () {
      var length = Math.min(self.cw,self.ch) * 0.8
      var unit = self.unit = Math.floor(length / self.size)
      self.length = length = unit * self.size
      var origin = self.origin = {
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
          if (x < 0) {
            x += self.size
          }
          if (y < 0) {
            y+= self.size
          }
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
        drawStar(-3,3)
        drawStar(3, -3)
        drawStar(-3,-3)
        var o = Math.floor(self.size/2)
        drawStar(o,o)
        drawStar(3,o)
        drawStar(o,3)
        drawStar(-3,o)
        drawStar(o,-3)
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
      var drawTry = function (wb, x, y) {
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
      }
      drawBoard()
      for (var i=0;i<self.history.length;i++) {
        var op = decodeCmd(self.history[i])
        drawChess(i+1, op.wb,op.x,op.y)
      }
      if (self.try !== null) {
        var op = decodeCmd(self.try)
        drawTry(op.wb,op.x,op.y)
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
      self.try = null
      draw()
      self.currentWB = !self.currentWB
      return true
    }
    self.exec = function (cmd) {
      self.try = null
      switch (cmd) {
        case 'unknow':
          break
        default : 
          var op = decodeCmd(cmd)
          if (!self.filled[op.key]) {
            self.try = cmd
          }
          break
      }
      draw()
    }
  }
  window.go = go
})()