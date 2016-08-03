;(function(exports){
	var header = exports.document.getElementsByClassName('header')[0];
	var nav = exports.document.getElementsByClassName('nav')[0];
	var lis = nav.getElementsByTagName('li');
	var body = exports.document.getElementsByClassName('body')[0];
	var conts = body.getElementsByTagName('li');
	for (var i = 0; i < lis.length; i++) {
		lis[i].onclick = function(cur){
			return function(){
				for (var i = 0; i < conts.length; i++) {
					hideCont(i);
				}
				showCont(cur);
			};
		}(i);
	}
	exports.document.getElementsByClassName('background')[0].onclick = function(){
		for (var i = 0; i < conts.length; i++) {
			hideCont(i);
		}
	};

	var showCont = function(cur){
		header.className += ' active';
		body.className += ' active';
		if (conts[cur]) {
			conts[cur].className = 'show';
		}
	};
	var hideCont = function(cur){
		header.className = header.className.replace(' active', '');
		body.className = body.className.replace(' active', '');
		if (conts[cur]) {
			conts[cur].className = '';
		}
	};
}(window));