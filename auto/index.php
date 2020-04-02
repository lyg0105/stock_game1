<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<link rel="stylesheet" type="text/css" href="auto_complete.css">
<script src="jquery1.9.1.js"></script>
<script src="auto_complete_js.js"></script>
<title>Page Title</title>
<script>
$(function(){
    var opt_arr={
        'input_obj':$("#my_input"),
        'data':[
            {'value':1,'text':'1이다'},
            {'value':2,'text':'2이다'},
            {'value':"안녕",'text':'안녕이다'},
            {'value':"헬로",'text':'헬로이다'}
        ],
        'on_select':function(select_obj){

        }
    };
    new LygAutoComplete(opt_arr);
});
</script>
</head>
<body>
<a href="/">홈</a>
<h3>자동완성</h3>
<div><input type="text" id="my_input" /></div>
</body>
</html>
