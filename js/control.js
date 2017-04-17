$(function(){
	//个人标签hover
	$(".name").hover(function(){
		$(this).css("background","rgb(8,95,180)");
		$(".name ul").show();
		$(".name ul li").hover(function(){
			$(this).css("background","rgb(2,103,204)");
		},function(){
			$(this).css("background","rgb(9,95,179)");
		});
	},function(){
		$(this).css("background","transparent");
		$(".name ul").hide();
	});
	
		var m = 0;
		var arr = new Array();//创建数组，储存每个文章是否打开这一信息
		for(var i = 0 ; i < 100 ; i++)
				arr[i] = 0;
		
	//article-content:hover
	//突破点
		$(".left-article .article-content").hover(function(){
			var p = $(this).find('em').html();//通过隐藏的em来确定是第几段文本被点击！！！！index()失效
				$("#content-bottom-" + p).children(".hid").show();
		},function(){
			var p = $(this).find('em').html();//通过隐藏的em来确定是第几段文本被点击！！！！index()失效
			
			if(arr[p] == 0)
				$("#content-bottom-" + p).children(".hid").hide();
		});
	
	$(".article-content").click(function(){
		//左部变化
		
		
		var p = $(this).find('em').html();//通过隐藏的em来确定是第几段文本被点击！！！！index()失效
		
		if(arr[p] == 0){
		$("#article-author-" + p).append("<h6>31人赞</h6>");
		$("#cik-" + p).css("height","48px")
		$("#agree-" + p).addClass("fa fa-caret-up").css({"display":"block","line-height":"20px","font-size":"20px"});
		numberchange(m,p);
		$("#article-content-" + p).find('img').css({"width":"100%","height":"250px"});
		$("#article-content-" + p).find('p').css("max-width","100%");
		$("#content-bottom-" + p).children(".mark-nohelp").css("display","inline-block");
		$("#content-bottom-" + p).children(".hid").show();
		$("#content-bottom-" + p).children(".whenhid").hide();
		$("#content-bottom-" + p).children(".whenopen").show();
		$("#article-content-" + p).find('a').eq(0).hide();
		$("#content-bottom-" + p).children(".fix-button").fadeIn();
				
				//滚轮监听
				$(window).scroll(function(e){
					var distant = $(this).scrollTop();
					if(distant >= 47 + p * 150){
						$("#content-bottom-" + p).children(".fix-button").fadeOut();
					}
					if(distant < 47 + p * 150){
						$("#content-bottom-" + p).children(".fix-button").fadeIn();
					}
				});
			arr[p]++;
		}
	});	
	
	//click收起
	$(".fix-button").click(function(){
		var p = $(this).find('em').html();//通过隐藏的em来确定是第几段文本被点击！！！！index()失效
		restore(p);
		setTimeout(function(){
			arr[p] = 0;
		},200);
	});
	$(".res").click(function(){
		var p = $(this).find('em').html();//通过隐藏的em来确定是第几段文本被点击！！！！index()失效
		restore(p);
		setTimeout(function(){//防止点击收起时又触发了上面的函数
			arr[p] = 0;
		},200);
	});
	
	
	$(".back-to-Top span").click(function(){
				//返回顶部
		
			var uper = null;
			var osTop = $(window).scrollTop();
			
			uper = setInterval(function(){
				var isspeed = Math.floor(-osTop / 6);//一直为负，但是负得越来越小，最后一定等于0，Math.floor取的是最接近并小于这个数的整数
			 osTop += isspeed;
			 $(window).scrollTop(osTop);//设置滚轮位置
			 if(osTop <= 0)//如果没有返回顶部，这个定时器会一直跑下去
				clearInterval(uper);
			},10);
		
	});
	
	
	$(".chat").hover(function(){
		$(this).find('span').removeClass('fa-comments-o').addClass('fa-comments');
	},function(){
		$(this).find('span').removeClass('fa-comments').addClass('fa-comments-o');	
	});
	
	//topF();
	backtoTop();

});

//还原函数
function restore(p){
	$("#article-author-" + p).find("h6").remove();
	$("#agree-" + p).hide();
	$("#cik-" + p).css("height","24px");
	$("#article-content-" + p).find('img').css({"width":"200px","height":"112px"});
	$("#article-content-" + p).find('p').css("max-width","62.79%");
	$("#content-bottom-" + p).children(".mark-nohelp").css("display","none");
	$("#content-bottom-" + p).children(".hid").hide();
	$("#content-bottom-" + p).children(".whenhid").show();
	$("#content-bottom-" + p).children(".whenopen").hide();
	$("#article-content-" + p).find('a').eq(0).show();
	$("#content-bottom-" + p).children(".fix-button").hide();	
	$(window).unbind('scroll');//移除滚轮监听
							   //topF();
	backtoTop();
}

//点赞数
function numberchange(m,p){
		$("#cik-" + p).click(function(){
					var x = $("#num-" + p).html();
				    x = parseInt(x);
				    if(m == 0){
						x += 1;
						m++;
					}else{
						x -= 1;
						m--;
					}
					$("#num-" + p).text(x);
					$("#article-author-" + p).find("h6").text(x +"人赞");
			});
}
/*
function topF(){
			//吸顶层
	$(window).scroll(function(){
		var d = $(this).scrollTop();
		if(d > 60){
			$(".header").css({"position":"fixed",});
		}
		if(d == 0){
			$(".header").css("position","relative");
		}
	});
}
*/

//回到顶部
function backtoTop(){
	$(window).scroll(function(){
		var d = $(this).scrollTop();
		if(d > 380){
			$(".back-to-Top span").fadeIn().css("display","inline-block");
			$(".back-to-Top span").hover(function(){
				$(".back-to-Top .Tip").fadeIn().css("display","block");
			},function(){
				$(".back-to-Top .Tip").hide();
			});
		}else{
			$(".back-to-Top span").hide();
			$(".back-to-Top .Tip").hide();
		}
	});
}

