$(document).ready(function(e){
	$(document).on("click","#submit",function(e){
		var config ={
			
		};
		config.alias=$("#inputName").val();
		config.p=1000;
		config.red=$("#paraRed").val();
		config.green=$("#paraGreen").val();
		config.blue=$("#paraBlue").val();
		if(allPrpos()===true&&$("#inputName").val()!=''){toSettings(config)}
		 else if ($("#inputName").val()=='') {
		 		infoSettings("填入别名",'myModal');
			$("#inputName").focus()
			$('#myModal').modal('show');
		 };
				
	})
});
// 输入框变色警告

$(document).ready(function(e){
	var reg = new RegExp("^[0-9]*$"); 
	$(document).on("input","#paraBlue,#paraRed,#paraGreen",function(e){
		if(!checkPara(e.target.value)){
			e.target.style.color ="red";
			tableCheck();
		}
		else {e.target.style.color ="black";
			tableCheck();

	}
		

				
	})
});
//table 数据更新
function tableCheck(){
		if($('#tb_para tr+ > td')[0]!==undefined){
						$('#tb_para tr+ > td')[0].innerHTML=$("#paraRed").val();
						$('#tb_para tr+ > td')[1].innerHTML=$("#paraGreen").val();
						$('#tb_para tr+ > td')[2].innerHTML=$("#paraBlue").val();
				}
}
//修改参数
$(document).ready(function(e){
	var reg = new RegExp("^[0-9]*$"); 
	$(document).on("click","#modifyPara",function(e){
	if($('.para').hasClass('hide')){
		$('.para').removeClass('hide');
		$('#modifyPara').html('保存参数');
	}
	else {
		$('.para').addClass('hide');
		$('#modifyPara').html('修改参数');
	}
		

				
	})
});
// 取色器
   $(document).ready(function() {
      
   $("#mycolor").colorpicker({color:'#31859b', defaultPalette:'web'});
   // $("#mycolor").colorpicker("showPalette");
  $("#mycolor").colorpicker({
    strings: "主题颜色,标准颜色,web颜色,主题颜色,返回调色板,历史记录, 没有历史记录."
});

 $("#mycolor").on("change.color", function(event, color){
    var colorValue = $("#mycolor").colorpicker("val");
    var rgbArr = colorValue.colorRgb();
    $("#paraRed").val(rgbArr[0]);
	$("#paraGreen").val(rgbArr[1]);
	$("#paraBlue").val(rgbArr[2]);
	allPrpos();

});

  
    });
// 亮度调节按钮

$(document).ready(function(e){
	$(document).on("click","#bright",function(e){
	$("#paraRed").val(Number($("#paraRed").val())+Number($("#paraRed").val()));
	$("#paraGreen").val(Number($("#paraGreen").val())+Number($("#paraGreen").val()));
	$("#paraBlue").val(Number($("#paraBlue").val())+Number($("#paraBlue").val()));
     
		allPrpos();
	});
});

$(document).ready(function(e){
	$(document).on("click","#dark",function(e){
	$("#paraRed").val((Number($("#paraRed").val())/2).toFixed(0));
	$("#paraGreen").val((Number($("#paraGreen").val())/2).toFixed(0));
	$("#paraBlue").val((Number($("#paraBlue").val())/2).toFixed(0));
	   
		allPrpos();
	});
});

// 参数验证并弹出模态框
function allPrpos(){
	var reg = new RegExp("^[0-9]*$"); 
	var obj ={
			
		};
		//obj.alias=$("#inputName").val();
		obj.p=1000;
		obj.red=$("#paraRed").val();
		obj.green=$("#paraGreen").val();
		obj.blue=$("#paraBlue").val();
		//table check
	tableCheck();

		
	
	for(var p in obj){
		console.log(obj[p]);
		if (obj[p]=="") {
			
			$('#myModal').modal('show');
			return false;
		}
	};

	if (!checkPara(obj.red)) {
		infoSettings("红色参数错误(0-22222)",'myModal');
	$("#paraRed").css('color','red');
			$('#myModal').modal('show');
			return false;}
	else {	$("#paraRed").css('color','black');};
	if (!checkPara(obj.green)) {
			infoSettings("绿色参数错误(0-22222)",'myModal');
			$("#paraGreen").css('color','red');
			$('#myModal').modal('show');
			return false;}
else {$("#paraGreen").css('color','black');};
	if (!checkPara(obj.blue)) {
			infoSettings("蓝色参数错误(0-22222)",'myModal');
			$("#paraBlue").css('color','red');
			$('#myModal').modal('show');
			return false;}
	else {$("#paraBlue").css('color','black');}

			
	return true;

};

//检查参数范围

function checkPara(val){
	var reg = new RegExp("^[0-9]*$"); 
	if (val<0||val>22222||!reg.test(val)) {
		
			return false;}
   else return true;

}

// 请求服务器

function toSettings(config){
	
	var url = 'http://rest.yunba.io:8080?method=publish_to_alias&appkey=56556dd4f085fc471efe0688&seckey=sec-uTYMY37JTlH5hEmsvmgO8FkZYwkkPA45VAuDifUeQIsh4enS&alias='+config.alias+'&msg={"p":'+config.p+',"r":'+config.red+',"g":'+config.green+',"b":'+config.blue+'}';
var urlproxy = 'getbm?method=publish_to_alias&appkey=56556dd4f085fc471efe0688&seckey=sec-uTYMY37JTlH5hEmsvmgO8FkZYwkkPA45VAuDifUeQIsh4enS&alias='+config.alias+'&msg={"p":'+config.p+',"r":'+config.red+',"g":'+config.green+',"b":'+config.blue+'}';
//window.location.href ＝ url;

$.ajax({
  type: "GET",
  url:urlproxy,
  // jsonp:"callback",
  // dataType:"jsonp",
  // data:{format:"json"},
  success: function(res){
  	
  	if(res.status=="0"){
  		infoSettings("请求成功,消息id："+res.messageId,'infoModal');
  		$('#infoModal').modal('show');
  	}
  	else if(res.status=="1"){
  		infoSettings(res.error,'infoModal');
  		$('#infoModal').modal('show');
  	}
  	else if(res.status=="2"){
  		infoSettings(res.error,'infoModal');
  		$('#infoModal').modal('show');
  	}

  	else  if(res.status=="3"){
  		infoSettings("没有应用",'infoModal');
  		$('#infoModal').modal('show');
  	}

  	else  if(res.status=="4"){
  		infoSettings(res.error,'infoModal');
  		$('#infoModal').modal('show');
  	}

  	else  if(res.status=="5"){
  		infoSettings(res.error,'infoModal');
  		$('#infoModal').modal('show');
  	}

  	console.log("success");

  },
  error:function(err){
  	window.open(url);
  		console.log("err："+err);
  }

});
// 	$.getJSON(url, function(result){
//    //response data are now in the result variable
//    alert(result);
// });

};


// 模态框信息设置
function infoSettings(info,modal){
	$('#'+modal+' .modal-body p').text(info);

}


//-------------------------------------------------  
  
/*16进制颜色转为RGB格式*/  
String.prototype.colorRgb = function(){ 
	var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/; 
    var sColor = this.toLowerCase();  
    if(sColor && reg.test(sColor)){  
        if(sColor.length === 4){  
            var sColorNew = "#";  
            for(var i=1; i<4; i+=1){  
                sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));     
            }  
            sColor = sColorNew;  
        }  
        //处理六位的颜色值  
        var sColorChange = [];  
        for(var i=1; i<7; i+=2){  
            sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));    
        }  
        var res ="RGB(" + sColorChange.join(",") + ")";  
        return sColorChange;
    }else{  
        return sColor;    
    }  
};  
