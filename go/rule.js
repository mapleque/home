(function(){
  // @param arr [[op,...],...]
  var cluster = function(arr) {
    var distance = function (a, b) {
      var dis = Math.sqrt(Math.pow(a.x-b.x,2)+Math.pow(a.y-b.y,2))
      return dis
    }
    var isnabour = function (a, b) {
      for (var i=0;i<a.length;i++) {
        for (var j=0;j<b.length;j++) {
          if (distance(a[i],b[j]) === 1 && a[i].wb === b[j].wb) {
            return true
          }
        }
      }
    }
    var combine = function (arr) {
      var groups = []
      var more = false
      arr.forEach(function(e) {
        var flag = false
        for (var i=0;i<groups.length;i++) {
          if (isnabour(groups[i], e)) {
            flag = true
            more = true
            e.forEach(function(op){
              groups[i].push(op)
            })
          }
        }
        if (!flag) {
          groups.push(e)
        }
      })
      return more ? combine(groups) : groups
    }
    return combine(arr)
  }

  var goRule = function () {
    var self = this
    self.history = []
    self.filled = {}
    for (var x=-1;x<=19;x++) {
      for (var y=-1;y<=19;y++) {
        self.filled[x+':'+y] = (x === -1 || x === 19 || y === -1 || y === 19)? true:null
      }
    }
    var seq = {}
    var breath = function () {
      var chesses = []
      for (var key in self.filled) {
        if (self.filled.hasOwnProperty(key) && self.filled[key] !== null && self.filled[key] !== true) {
          chesses.push([self.filled[key]])
        }
      }
      var groups = cluster(chesses)
      var dies = []
      groups.forEach(function(e) {
        var o = 0
        for (var i=0;i<e.length;i++) {
          if (self.filled[e[i].up] === null
            ||self.filled[e[i].down] === null
            ||self.filled[e[i].left] === null
            ||self.filled[e[i].right] === null) {
            o++
          }
        }
        if (o === 0) {
          dies.push(e)
        }
      })
      if (dies.length < 1) {
        return dies
      }
      if (dies.length === 1) {
        return dies[0]
      }
      var dieSeq = -1
      var realDie = []
      dies.forEach(function(die) {
        var curDieSeq = 0
        die.forEach(function(op){
          if (self.filled[op.up].wb != op.wb &&
            seq[op.up] > curDieSeq &&
            seq[op.key] !== self.history.length) {
            curDieSeq = seq[op.up]
          }
          if (self.filled[op.down].wb != op.wb &&
            seq[op.up] > curDieSeq &&
            seq[op.key] !== self.history.length) {
            curDieSeq = seq[op.down]
          }
          if (self.filled[op.left].wb != op.wb &&
            seq[op.up] > curDieSeq &&
            seq[op.key] !== self.history.length) {
            curDieSeq = seq[op.left]
          }
          if (self.filled[op.right].wb != op.wb &&
            seq[op.up] > curDieSeq &&
            seq[op.key] !== self.history.length) {
            curDieSeq = seq[op.right]
          }
        })
        if (curDieSeq > dieSeq) {
          realDie = die
          dieSeq = curDieSeq
        }
      })
      return realDie
    }
    var processFill = function (op) {
      // 先看是否是空白，如果不是空白，直接返回
      if (self.filled[op.key]) {
        return false
      }
      self.filled[op.key] = op
      
      for (var dies = breath();dies.length > 0; dies = breath()) {
        for (var i=0;i<dies.length;i++) {
          if (dies[i].key === op.key) {
            self.filled[op.key] = null
            return false
          }
        }
        dies.forEach(function(op) {
          self.filled[op.key] = null
        })
      }
      return true
    }
    self.subscribe = function (onchange) {
      self.onchange = onchange
    }
    self.play = function (op) {
      seq[op.key] = self.history.length
      if (!processFill(op)) {
        console.error('process error', op)
        return false
      }
      self.history.push(op)

      typeof self.onchange === 'function' && self.onchange(self.history, self.filled)
      return true
    }
  }
  window.goRule = goRule
})()