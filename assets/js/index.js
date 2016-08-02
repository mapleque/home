;(function(exports){
	var nav = exports.document.getElementsByClassName('nav')[0];
	var lis = nav.getElementsByTagName('li');
	var body = exports.document.getElementsByClassName('body')[0];
	var conts = body.getElementsByTagName('li');
	for (var i = 0; i < lis.length; i++) {
		lis[i].onmouseenter = function(cur){
			return function(){
				for (var i = 0; i < conts.length; i++) {
					hideCont(i);
				}
				showCont(cur);
			};
		}(i);
		lis[i].onmouseout = function(cur){
			return function(){
				setTimeout(function(){
					hideCont(cur);
				}, 10000);
			};
		}(i);
	}
	exports.document.getElementsByClassName('background')[0].onclick = function(){
		for (var i = 0; i < conts.length; i++) {
			hideCont(i);
		}
	};

	var showCont = function(cur){
		if (conts[cur]) {
			conts[cur].className = 'show';
		}
	};
	var hideCont = function(cur){
		if (conts[cur]) {
			conts[cur].className = '';
		}
	};
}(window));