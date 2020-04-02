/*
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
            {'value':2,'text':'2이다'}
        ],
        'on_select':function(select_obj){

        }
    };
    new LygAutoComplete(opt_arr);
});
</script>
</head>
<body>
<h3>자동완성</h3>
<div><input type="text" id="my_input" /></div>
</body>
</html>

var opt_arr={
    'input_obj':$("#my_input"),
    'data':[
        {'value':1,'text':'1이다'},
        {'value':2,'text':'2이다'}
    ],
    'on_select':function(select_obj){

    }
};
var opt_arr={
    'input_obj':$("#my_input"),
    'type':'post',
    'dataType':'url',// url/data
    'url':'<?=ROOT_DIR?>content/auto_complete/ver1/action/get_data.php',
    'ajax_data':{},
    'ajax_key':'load_name',
    'ajax_callback_custom':function(data){
        ...조작
        return data;
    },
    'on_select':function(select_obj){

    },
    'on_finish':function(select_obj){

    },
    'on_esc':function(select_obj){

    }
};
[
  {value:'1',text:'1','col_val_arr':{}}
]
*/
var LygAutoComplete=function(opt_obj){
    this.input_obj=null;
    this.type='post';
    this.dataType='data';
    this.url='';
    this.data=[];

    this.ajax_key='';
    this.ajax_data={};
    this.wrap_obj=null;
    this.max_row=30;
    this.max_height=200;
    this.auto_row_height=18;

    this.ajax_callback_custom=null;
    this.on_select=null;
    this.on_finish=null;
    this.on_esc=null;
    this.pre_value='';

    this.setEvent=function(){
        var this_obj=this;
        $(this.input_obj).click(function(e){
            this_obj.onClick_input_obj(e);
        });
        $(this.input_obj).keyup(function(e){
            this_obj.onKeyup_input_obj(e);
        });
        $(this.input_obj).keydown(function(e){
            this_obj.onKeydown_input_obj(e);
        });
        $(this.input_obj).focusout(function(e){
            this_obj.onFocusOut_input_obj(e);
        });
    };

    this.onClick_input_obj=function(e){
        this.set_wrap_obj();
    };

    this.onKeyup_input_obj=function(e){
        var this_obj=this;
        var keyCode=e.keyCode;
        var is_val=true;
        if(65<=keyCode&&keyCode<=90){//알파벳
        }else if(97<=keyCode&&keyCode<=122){//알파벳
        }else if(48<=keyCode&&keyCode<=57){//숫자
        }else if(96<=keyCode&&keyCode<=11){//숫자패드
        }else if(186<=keyCode&&keyCode<=192){//-=;',./
        }else if(219<=keyCode&&keyCode<=221){//[]\
        }else if(8==keyCode||keyCode==32){//지우기,스페이스
        }else{
            is_val=false;
        }
        if(is_val){
            this.set_data();
        }
    };
    this.onKeydown_input_obj=function(e){
        var this_obj=this;
        switch(e.keyCode){
            case 13:
                this.finish();
                break;
            case 27: //esc
                $(this.input_obj).val(this.pre_value);
                if(this.on_esc!=undefined){
                    this.on_esc(this);
                }
                this.finish();
                break;
            case 38://위
                this.set_up_down('up');
                break;
            case 40://아래
                if($(".lyg_auto_complete_wrap").length==0){
                    this.set_wrap_obj();
                }else{
                    this.set_up_down('down');
                }
                break;
            default:
                break;
        }
    };
    this.onFocusOut_input_obj=function(e){
        setTimeout(function(){$(".lyg_auto_complete_wrap").remove();},50);
    };

    this.set_wrap_obj=function(){
        $(".lyg_auto_complete_wrap").remove();

        var append_div=
            "<div class='lyg_auto_complete_wrap' >"+

            "</div>";
        $(this.input_obj).after(append_div);
        this.wrap_obj=$(".lyg_auto_complete_wrap").eq(0);
        $(this.wrap_obj).css("display","none");
        $(this.wrap_obj).css("max-height",this.max_height+"px");
        var input_w=$(this.input_obj).css("width").split("px")[0];
        $(this.wrap_obj).css("width",input_w+"px");

        this.set_data();
    };
    this.set_data=function(){
        if($(".lyg_auto_complete_wrap").length==0){
            this.set_wrap_obj();
            return false;
        }
        $(".lyg_auto_row").remove();
        if(this.dataType=="data"){
            this.set_wrap_obj_data();
        }else if(this.dataType=="url"){
            this.get_data_by_url();
        }
        return true;
    };
    this.get_data_by_url=function(){
        var this_obj=this;
        var tmp_key=this.ajax_key;
        var ajax_data=this.ajax_data;
        ajax_data[tmp_key]=$(this.input_obj).val();
        $.ajax({
            type:this.type,
            url:this.url,
            dataType:'json',
            data:ajax_data,
            error:function(data){
                alert("자동완성중 에러"+tmp_key);
            },
            success:function(data){
                if(data['result']=='true'){
                    if(this_obj.ajax_callback_custom!=null){
                        this_obj.data=this_obj.ajax_callback_custom(data,this_obj);
                    }else{
                        this_obj.data=data['data'];
                    }
                    this_obj.set_wrap_obj_data();
                }else{
                    console.log(data['msg']);
                }
            }
        });
    };
    this.set_wrap_obj_data=function(){
        var this_obj=this;
        var orig_len=this.data.length;
        this.pre_value=$(this.input_obj).val();
        //기본값 세팅 value,text
        for(var i=0;i<orig_len;i++){
            if(this.data[i].value==undefined){this.data[i].value=this.data[i][this.ajax_key];}
            if(this.data[i].text==undefined){this.data[i].text=this.data[i][this.ajax_key];}
        }
        var auto_data=this.data;
        if(this.dataType=="data"){
            var filter_txt=$(this.input_obj).val();
            if(filter_txt!=""){
                //필터링
                auto_data=[];
                for(var i=0;i<orig_len;i++){
                    this.data[i].value=this.data[i].value+"";
                    if(this.data[i].value.indexOf(filter_txt)!=-1){
                        auto_data.push(this.data[i]);
                    }
                }
            }
        }
        var data_len=auto_data.length;
        if(data_len>this.max_row){
            data_len=this.max_row;
        }
        if(data_len>0){
            $(this.wrap_obj).css("display","");
        }
        for(var i=0;i<data_len;i++){
            var append_row=
                "<div class='lyg_auto_row' >"+
                    "<span class='lyg_auto_text' >"+auto_data[i].text+"</span>"+
                    "<input type='hidden' class='lyg_auto_row_num' value='"+i+"' />"+
                    "<input type='hidden' class='lyg_auto_value' value='"+auto_data[i].value+"' />"+
                "</div>";
            $(this.wrap_obj).append(append_row);

            var last_auto_row=null;
            $(".lyg_auto_row_num").each(function(idx,ele){
                if($(ele).val()==i){
                    last_auto_row=$(ele);
                }
            });
            if(last_auto_row!=null){
                $(last_auto_row).css("height",this.auto_row_height+"px");
                if(auto_data[i].col_val_arr!=undefined){
                    for(var key in auto_data[i].col_val_arr){
                        var tmp_value=auto_data[i].col_val_arr[key];
                        var append_etc_input="<input type='hidden' class='lyg_auto_row_etc' key='"+key+"' value='"+tmp_value+"' />";
                        $(last_auto_row).append(append_etc_input);
                    }
                }
                $(".lyg_auto_row").eq(i).mouseenter(function(e){
                    var idx=$(this).find(".lyg_auto_row_num").val();
                    idx=parseInt(idx);
                    this_obj.set_active_auto_row(idx);
                });
                $(".lyg_auto_row").click(function(e){
                    this_obj.finish();
                });
            }
        }
    };

    this.set_up_down=function(direction_str){
        var tot_row=$(".lyg_auto_row").length;
        var select_num=-1;
        $(".lyg_auto_row").each(function(i,e){
            if($(e).hasClass("lyg_auto_active")){
                select_num=i;
            }
        });

        //lyg_auto_active
        if(direction_str=='up'){
            select_num--;
        }else if(direction_str=='down'){
            select_num++;
        }

        if(select_num<0){
            select_num=0;
        }else if(select_num>=tot_row){
            select_num=tot_row-1;
        }
        this.set_active_auto_row(select_num);
    };
    this.set_scroll=function(select_num){
        var scroll_top=$(".lyg_auto_complete_wrap").eq(0).scrollTop();
        var select_scroll=this.auto_row_height*select_num;
        var min_down_scroll=select_scroll-this.max_height+this.auto_row_height;
        var min_up_scroll=select_scroll-scroll_top;
        if(scroll_top<min_down_scroll){
            $(".lyg_auto_complete_wrap").eq(0).scrollTop(min_down_scroll);
        }else if(min_up_scroll<0){
            $(".lyg_auto_complete_wrap").eq(0).scrollTop(scroll_top-this.auto_row_height);
        }
    };

    this.set_active_auto_row=function(select_num){
        if($(".lyg_auto_active").length>0){
            $(".lyg_auto_active").removeClass("lyg_auto_active");
        }
        $(".lyg_auto_row").eq(select_num).addClass("lyg_auto_active");

        this.set_scroll(select_num);
        this.select_active_data();
    };

    this.select_active_data=function(){
        var value_str=$(".lyg_auto_active").find(".lyg_auto_value").val();
        $(this.input_obj).val(value_str);
        if(this.on_select!=null){
            var select_obj=$(".lyg_auto_active");
            this.on_select(select_obj);
        }
    };

    this.finish=function(){
        $(".lyg_auto_complete_wrap").remove();
        if(this.on_finish!=null){
            this.on_finish(this);
        }
    };

    this.init=function(opt_obj){
        if(opt_obj['input_obj']!=undefined){this.input_obj=opt_obj['input_obj'];}
        if(opt_obj['type']!=undefined){this.type=opt_obj['type'];}
        if(opt_obj['dataType']!=undefined){this.dataType=opt_obj['dataType'];}
        if(opt_obj['url']!=undefined){this.url=opt_obj['url'];}
        if(opt_obj['data']!=undefined){this.data=opt_obj['data'];}
        if(opt_obj['ajax_key']!=undefined){this.ajax_key=opt_obj['ajax_key'];}
        if(opt_obj['ajax_data']!=undefined){this.ajax_data=opt_obj['ajax_data'];}
        if(opt_obj['ajax_callback_custom']!=undefined){this.ajax_callback_custom=opt_obj['ajax_callback_custom'];}
        if(opt_obj['on_select']!=undefined){this.on_select=opt_obj['on_select'];}
        if(opt_obj['on_finish']!=undefined){this.on_finish=opt_obj['on_finish'];}
        if(opt_obj['on_esc']!=undefined){this.on_esc=opt_obj['on_esc'];}

        if(opt_obj['max_row']!=undefined){this.max_row=opt_obj['max_row'];}

        this.setEvent();
    };

    this.init(opt_obj);
};
