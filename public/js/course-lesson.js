define(['jquery','template','util'],function($,template,util){
	util.setMenu('/course/add');

	// 获取课程id
	var csId = util.qs('cs_id',location.search);
	// 根据课程id查询课时信息
	$.ajax({
		type : 'get',
		url : '/api/course/lesson',
		data : {cs_id : csId},
		dataType : 'json',
		success : function(data){
			var html = template('lessonTpl',data.result);
			$('#lessonInfo').html(html);
		}
	});
});