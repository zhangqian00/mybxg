define(['jquery','template'],function($,template){
	$.ajax({
		type : 'get',
		url : '/api/teacher',
		dataType : 'json',
		success : function(data){
			//解析数据并渲染页面
			var html = template('teacherInfoTpl',{list:data.result});
			$('#teacherInfo').html(html);
		}
	});
});