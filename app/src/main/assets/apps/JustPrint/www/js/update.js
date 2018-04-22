(function(){
	if(app){
		app.fileUpdate=function(file_name, data){
					var uri = data.up_src;
					var type = data.update;
					var wgt = (data.up_type == "wgt");
					plus.io.resolveLocalFileSystemURL("_downloads/" + file_name, function(entry) {
						entry.remove();
						if(wgt) {
							wgtfile();
						} else {
							dfile();
						}
					}, function() {
						if(wgt) {
							wgtfile();
						} else {
							dfile();
						}
					});

					function wgtfile() {
						if(type == "must") {
							app.downloadFile(uri, file_name, function() {
								console.log("下载资源包成功");
								plus.runtime.install("_downloads/" + file_name, {}, function() {
									console.log("资源包安装成功，准备重启");
									plus.runtime.restart();
								}, function(e) {
									//app.toast("资源包安装失败");
									app.msgBox("资源包安装失败" + e&&e.message);
									console.log("资源包安装失败，" + e&&e.message);
								});
							}, {
								type: "must"
							});
						} else {
							console.log("准备静默下载：" + file_name);
							plus.downloader.createDownload(uri, {
								method:"POST",
								filename: "_downloads/" + file_name
							}, function(d, status) {
								if(status == 200) {
									console.log("静默下载wgt成功：" + d.filename);
									plus.runtime.install(d.filename, {}, function() {
										console.log("资源包安装成功");
										app.confirm("资源下载完毕，重启后生效。是否现在重启？", function() {
											plus.runtime.restart();
										});
									}, function(e) {
										//app.toast("资源包安装失败");
										app.msgBox("资源包安装失败" + e&&e.message);
										console.log("资源包安装失败" + e&&e.message);
									});
								} else {
									app.toast("下载资源包失败");
									console.log("静默下载wgt失败！");
								}
							}).start();
						}
					}

					function dfile() {
						if(!wgt&&data.up_way=="brower"){//交由浏览器下载更新
							plus.runtime.openURL(uri);
						}
						else{
							app.downloadFile(uri, file_name, function() {
							plus.runtime.install("_downloads/" + file_name);
							if(type == "must") {
								plus.runtime.quit();
							}
						}, {
							type: type
						});
						}
					}
				}
	}
})();
