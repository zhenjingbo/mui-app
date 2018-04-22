if(window.plus) {
	onPlusReady();
} else {
	document.addEventListener('plusready', onPlusReady, false);
}

function onPlusReady() {
	//后台唤醒事件
	document.addEventListener("resume", function() {
		if(localStorage["acc"]&&pro.acc) {
			var acc = pro.acc;
			if(acc.pid) {
				proj.cac.authToken(acc.pid, function() {
					resumeRun({
						auth: "suc"
					});
				}, function(rlt) {
					resumeRun({
						auth: "fail",
						msg: rlt.msg
					});
				}, null, function() {
					resumeRun({
						auth: "err",
						msg: "连接异常"
					});
				});
			}
		} else {
			resumeRun({
				auth: "no"
			});
		}
	}, false);
	function resumeRun(para) {
		if(para.msg){
			app.toast(para.msg);
		}
	    app.getIOSThirdFile(para);
		
	}
}