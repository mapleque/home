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
        redrawImage()
    }

    var context = canvas.getContext('2d')

    img = new Image()
    img.src = 'icon.jpg'
    img.onload = function () {
        redrawImage()
    }
    var redrawImage = function () {
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
