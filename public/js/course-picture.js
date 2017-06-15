define(['jquery','template','util','uploadify','jcrop','form'],function($,template,util){
	util.setMenu('/course/add');
	// 获取课程id
	var csId = util.qs('cs_id',location.search);
	// 查询课程封面信息
	$.ajax({
		type : 'get',
		url : '/api/course/picture',
		data : {cs_id : csId},
		dataType : 'json',
		success : function(data){
			var html = template('pictureTpl',data.result);
			$('#pictureInfo').html(html);
			// 编辑时裁切图片
			var preview = $('.preview img');
			var nowCrop = null;

			// 裁切图片功能
			function cropImage(){
				// 销毁之前的裁切实例对象
				nowCrop && nowCrop.destroy();
				// 初始化裁切实例对象
				preview.Jcrop({
					aspecRatio : 2
				},function(){
					nowCrop = this;
					// 缩略图
					this.initComponent('Thumbnailer',{
						width : 240,
						height : 120,
						thumb : '.thumb'
					});

					// 计算选取参数
					var width = this.ui.stage.width,
						height = this.ui.stage.height;
					var x = 0;
						y = (height - width/2)/2;
						w = width;
						h = width/2;
					this.newSelection();
					this.setSelect([x,y,w,h]);
					// 获取裁切尺寸
					preview.parent().on('cropend',function(e,s,c){
						$('[name="x"]').val(c.x);
						$('[name="y"]').val(c.y);
						$('[name="w"]').val(c.w);
						$('[name="h"]').val(c.h);
					});
					// 设置缩略图位置
					$('.jcrop-thumb').css({
						top : 0,
						left : 0
					});
				});
			}
			
			// 给裁切按钮绑定事件
			$('#cropImg').click(function(){
				var flag = $(this).attr('data-flag');
				if(flag == '1'){
					$(this).attr('data-flag','2');
					$(this).text('保存图片');
					// 实现裁切功能
					cropImage();
				}else {
					// 提交裁切坐标信息
					$('#cropInfoForm').ajaxSubmit({
						type : 'post',
						url : '/api/course/update/picture',
						data : {cs_id : csId},
						success : function(data){
							if(data.code == 200){
								location.href = '/course/lesson?cs_id=' + data.result.cs_id;
							}
						}
					});
				}
			});
			// 上传封面操作
			$('#upfile').uploadify({
				buttonText : '上传图片',
				buttonClass : 'btn btn-success btn-sm',
				width : 100,
				height : 'auto',
				itemTemplate : '<span></span>',
				formData : {cs_id : csId},
				fileObjName : 'cv_cover_original',
				swf : '/public/assets/uploadify/uploadify.swf',
				uploader : '/api/uploader/cover',
				onUploadSuccess : function(file,data) {
					data = JSON.parse(data);
					var preview = $('.preview img');
					preview.attr('src',data.result.path);
					cropImage();
				}
			});
		}
	});	
});