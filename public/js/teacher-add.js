define(['jquery','util','template','validate','form','datepicker','language'],function($,util,template){
	//设置导航选中
	util.setMenu('/teacher/list');
	// 获取参数中的tc_id
	var tcId = util.qs('tc_id',location.search);

	// 提交表单处理
	function submitForm(url){
		$('#addTeacherForm').validate({
			sendForm : false,
			// eachInvalidField : function(){
			// 	console.log(1);
			// },
			// eachValidField : function(){
			// 	console.log(2);
			// },
			valid : function(){
				// 提交表单
				$(this).ajaxSubmit({
					type : 'post',
					url : url,
					success : function(data){
						location.href = '/teacher/list';
					}
				});
			},
			description : {
				tcName : {
					required : '不能为空',
					valid : '正确',
				},
				tcPass : {
					required : '不能为空',
					pattern : '请输入6位数字',
					valid : '正确',
				},
				tcJoinDate : {
					required : '不能为空',
					valid : '正确'
				}
			}
		});
		// $('#addTeacherBtn').click(function(){

		// 	// $.ajax({
		// 	// 	type : 'post',
		// 	// 	url : url,
		// 	// 	data : $('#addTeacherForm').serialize(),
		// 	// 	dataType : 'json',
		// 	// 	success : function(data){
		// 	// 		if(data.code == 200) {
		// 	// 			location.href = '/teacher/list';
		// 	// 		}
		// 	// 	}
		// 	// });
		// });
	}
	
	
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
				// 编辑提交
				submitForm('/api/teacher/update');									
			}
		});
	}else {
		//添加讲师
		$('#navFlag').html('讲师添加');
		var html = template('teacherFormTpl',{operateFlag:'添 加',tc_gender:0});
		$('#teacherFormInfo').html(html);
		// 添加提交
		submitForm('/api/teacher/add');
	}	
});