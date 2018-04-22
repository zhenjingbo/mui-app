(function() {
	var init = {};
	init.convertImg = function(img) {
		//		var fmt = img.dataset.format;
		//		var suf = getFmtIcon(fmt);
		img.classList.add("mui-hidden");
		img.parentNode.innerHTML = "<span class='iconfont green icon-img'></span>";
	}

	function getFmtIcon(fmt) {
		var suf = "suolvetu"
		if(fmt == "pdf") {
			suf = "pdf";
		} else if(fmt == "txt") {
			suf = "txt";
		} else if(fmt == "xls" || fmt == "xlsx") {
			suf = "excel";
		} else if(fmt == "doc" || fmt == "docx") {
			suf = "word";
		} else if(fmt == "ppt" || fmt == "pptx") {
			suf = "ppt";
		} else if(fmt == "jpg" || fmt == "jpeg" || fmt == "png" || fmt == "gif") {
			suf = "img";
		}
		return suf;
	}
	window.init = init;
	window.onload = function() {
		var body=document.getElementsByTagName("body")[0];
		if(mui.os.ios){
			body.classList.add("is_ios");
		}
		if(!body.classList.contains("no_immersed")){
			var immersed = 0;
			var ms = (/Html5Plus\/\d+\.\d\s*\(Immersed\/(\d+\.?\d*)\)/gi).exec(navigator.userAgent);
			if(ms && ms.length >= 2) { // 当前环境为沉浸式状态栏模式
				immersed = Math.ceil(ms[1]); // 获取状态栏的高度
			}
			if(immersed > 0) {
				var h = document.getElementsByTagName("header");
				(h.length > 0) && (h[0].style.paddingTop = immersed + 'px');

				body.style.paddingTop = immersed + 'px';

				var ts = document.getElementsByClassName('u-fixed');
				for(var i = 0; i < ts.length; i++) {
					var t = ts[i];
					t.style.top = parseInt(t.style.top) + immersed + 'px';
				}
			}
			init.immersed = immersed;
		}
	};

	function plusReady() {
		// 设置系统状态栏样式为浅色文字
		//plus.navigator.setStatusBarStyle("UIStatusBarStyleBlackOpaque");
	}
	if(window.plus) {
		plusReady();
	} else {
		document.addEventListener("plusready", plusReady, false);
	}
})();