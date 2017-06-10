define(['jquery','util','template'],function($,util,template){
	//设置导航选中
	util.setMenu('/teacher/list');
	// 提交表单
	$('#addTeacherBtn').click(function(){
		$.ajax({
			type : 'post',
			url : '/api/teacher/add',
			data : $('#addTeacherForm').serialize(),
			dataType : 'json',
			success : function(data){
				console.log(data);
			}
		});
	});
	// 获取参数中的tc_id
	var tcId = util.qs('tc_id',location.search);
	if(tcId){
		// 编辑讲师
		// 根据id查询数据
		$.ajax({
			type : 'get',
			url : '/api/teacher/edit',
			data : {tc_id : tcId},
			dataType : 'json',
			success : function(data){
				$('#navFlag').html('讲师编辑');
				data.result.operateFlag = '编 辑';
				var html = template('teacherFormTpl',data.result);
				$('#teacherFormInfo').html(html);
			}
		});
	}else {
		//添加讲师
		$('#navFlag').html('讲师添加');
		var html = template('teacherFormTpl',{operateFlag : '添 加'});
		$('#teacherFormInfo').html(html);
	}
	
});