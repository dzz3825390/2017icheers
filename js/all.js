
//檢查圖面載入完成
function checkComplete() {
        setTimeout(function () {
            var complete = true;
            $('img').each(function () {
                if (!this.complete) {
                    complete = false;
                    return false;
                }
            });
            if (complete) {
                var PageHeight = $('body').outerHeight();
                $('.SideMenu_layout').css('height',PageHeight);
            } else {
                checkComplete();
            }
        }, 50);
}  

$(document).ready(function(){

	//瀏覽器內容寬度
	var intBrowserW = 0;

	//瀏覽器內容高度
	var intBrowserH = 0;

	//#region 取得瀏覽器內容寬度/高度
		if (document.documentElement && document.documentElement.clientWidth != 0 && document.documentElement.clientHeight != 0) {
		    intBrowserW = document.documentElement.clientWidth;
		    intBrowserH = document.documentElement.clientHeight;
		} else {
		    intBrowserW = document.body.clientWidth;
		    intBrowserH = document.body.clientHeight;
		}

	$(window).on('resize',function(){
		setTimeout(function(){
			intBrowserH = window.innerHeight;
		},500);
	});
	//content最小高度設定

	if (intBrowserW < 768) {
		$('.content_layout').css('min-height',intBrowserH - 56);
	} else if (intBrowserW < 1366) {
		$('.content_layout').css('min-height',intBrowserH - 76);
	} else {
		$('.content_layout').css('min-height',intBrowserH - 90);
	}




	//計算酒款scroll欄的寬度
	$('.content_bottle_scrollX').each(function(){
		var BottleNumber = $(this).children().length;
		var SingleBottleWidth = $(this).children().eq(0).outerWidth(true);
		var BottleScrollWidth = SingleBottleWidth*BottleNumber;
		$(this).css('width',BottleScrollWidth);
	});

	//icheers info置中設定 高度設定
	var iCheersInfoWidth = $('.iCheers_info').width();
	var iCheersInfoPositionX = (intBrowserW - iCheersInfoWidth) / 2;  
	$('.iCheers_info').css('left',iCheersInfoPositionX);   
	var iCheersInfoHeight = $('.iCheers_info').height();
	$('.iCheers_info_layout').css('height',iCheersInfoHeight);

	//footer選項置中
	var FooterOptionWidth = $('.footer_option_row').width();
	var FooterOptionPositionX = (intBrowserW - FooterOptionWidth)/2;
	$('.footer_option_row').css('margin-left',FooterOptionPositionX);


	//捲動時header動作
	HeaderShow();

	//SideMenu高度
	$('.SideMenu_Detail').each(function(){
		var SideMenuHeight = $(this).height();
		if (SideMenuHeight < intBrowserH) {
			$(this).css('height',intBrowserH);
		} else{
			$(this).css('height',SideMenuHeight);
		}
	});
	
	
	//SideMenu 初始位置
	var SideMenuWidth = $('.SideMenu_layout').width();
	$('.SideMenu_layout').each(function(){
		$(this).css('left',"-" + SideMenuWidth + "px");
	});

	//黑底初始
	$('#black_BG').css('display','none');

	var SideMenuL1 = $('#SideMenuDetailL1');
	var SideMenuL2 = $('#SideMenuDetailL2');
	var SideMenuL3 = $('#SideMenuDetailL3');

	//第2、3層menu位置初始
	SideMenuL2.css('left',SideMenuWidth + "px");
	SideMenuL3.css('left',SideMenuWidth + "px");

	//當前位置初始
	var BrowserScrollHeight = 0;
	//SideMenu打開
	$('.menuBTN').click(function(){
		//檢查SideMenu_BackBTN是否有初始值，若沒有則給初次打開值
		var isFirstOpen = $('.SideMenu_BackBTN').attr('Layer');
		if (isFirstOpen == undefined) {
			$('.SideMenu_BackBTN').attr('Layer','1');
			//2、3層先隱藏
			SideMenuL2.css('display','none');
			SideMenuL3.css('display','none');
		}

		//紀錄當前瀏覽位置
		var NewBrowserScrollHeight = $(document).scrollTop();

		//回top 0
		$(document).scrollTop(0);
		$('#black_BG').css('top','0');
		//黑底出現
		$('#black_BG').fadeIn(100);
		//Side Menu移入
		$('.SideMenu_layout').animate({
			'left':'0'
		},200);
		//SideMenu 回top0
		$('.SideMenu_layout').scrollTop(0);

		//開啟SideMenu scroll、高度設訂
		$('.SideMenu_layout').css({
			'height':intBrowserH,
			'overflow':'auto'
		});

		//body高度
		$('body').css({
			'overflow':'hidden',
			'height':intBrowserH
		});

		//黑底高度
		$('#black_BG').css({
			'height':intBrowserH,
			'overflow':'hidden'
		});

		//偵測touch位置，若是在SideMenu之外則取消預設scroll事件
		$('body').on('touchmove.preventScroll',function(e){
				var isMenu = e.target.className;
		    	if (isMenu !== 'SideMenu_Detail_list' && isMenu !== 'SideMenu_Detail_Title') {
		    		e.preventDefault();
		    	}
	    });

		//將目前瀏覽位置傳給全域變數做紀錄
	    BrowserScrollHeight = NewBrowserScrollHeight;
	});

	//SideMenu關閉 點黑底
	$('#black_BG').on('touchstart',function(e){
		var isBlackBG = e.target.className;
		if (isBlackBG == 'black_BG') {
			$('.SideMenu_layout').animate({
				'left':"-" + SideMenuWidth + "px"
			},100);
			$('#black_BG').fadeOut(200);
			$('body').off('touchmove.preventScroll');
			$('body').css({
				'overflow':'auto',
				'height':'100%'
			});
			$(document).scrollTop(BrowserScrollHeight);
		}	
	});
	//SideMenu Close click the close btn
	$('.SideMenuCloseBtn').click(function(){
		$('.SideMenu_layout').animate({
			'left':"-" + SideMenuWidth + "px"
		},100);
		$('#black_BG').fadeOut(200);
		$('body').off('touchmove.preventScroll');
		$('body').css({
			'overflow':'auto',
			'height':'100%'
		});
		$(document).scrollTop(BrowserScrollHeight);

	});

	//SideMenu關閉 點back按鈕
	/*
	$('.SideMenu_BackBTN').click(function(){
		//檢查this在第幾層
		var MenuLevel = parseInt($(this).attr('layer'));

		switch (MenuLevel) {

			//第1層
			case 1:

			$('.SideMenu_layout').animate({
				'left':"-" + SideMenuWidth + "px"
			},100);
			$('#black_BG').fadeOut(200);
			$('body').off('touchmove.preventScroll');
			$('body').css({
				'overflow':'auto',
				'height':'100%'
			});
			$(document).scrollTop(BrowserScrollHeight);


			break;

			case 2:

			//先解除停止預設scroll設定
			$('.SideMenu_layout').off('touchmove.preventMenuScroll');

			//第2層滑出
			$('.SideMenu_layout').scrollTop(0);
			SideMenuL1.css('display','block');
			SideMenuL2.animate({
				'left':SideMenuWidth + "px"
			},100,function(){
				SideMenuL2.css('display','none');
			});
			
			//back按鈕層數-1
			$('.SideMenu_BackBTN').attr('layer','1');

			break;

			case 3:

			//先解除停止預設scroll設定
			$('.SideMenu_layout').off('touchmove.preventMenuScroll');

			//第3層滑出
			$('.SideMenu_layout').scrollTop(0);
			SideMenuL2.css('display','block');
			SideMenuL3.animate({
				'left':SideMenuWidth + "px"
			},100,function(){
				SideMenuL3.css('display','none');
			});

			//back按鈕層數-1
			$('.SideMenu_BackBTN').attr('layer','2');

			break;

		}

		
	});*/

	//Menu前後層
	/*
	$('.SideMenu_Detail_list').click(function(){
		//檢查this在第幾層
		var MenuLevel = $(this).parent().attr('id');
		var intMenuLevel = 0;
		for (i = 0; i < MenuLevel.length; i++){
			var isNumber = parseInt(MenuLevel.charAt(i));
			if (isNumber != NaN) {
				intMenuLevel = isNumber;
			}
		}
		
		switch(intMenuLevel){

			//第一層
			case 1:
			//先解除停止預設scroll設定
			$('.SideMenu_layout').off('touchmove.preventMenuScroll');
			//第2層進入
			$('.SideMenu_layout').scrollTop(0);
			SideMenuL2.css('display','block');
			SideMenuL2.animate({
				'left':'0'
			},100);

			var MenuHeight = SideMenuL2.height();

			SideMenuL1.css('display','none');
			SideMenuL3.css('display','none');

			//back按鈕層數+1
			$('.SideMenu_BackBTN').attr('layer','2');

			break;

			case 2:

			//先解除停止預設scroll設定
			$('.SideMenu_layout').off('touchmove.preventMenuScroll');

			//第3層進入
			SideMenuL3.css('display','block');
			$('.SideMenu_layout').scrollTop(0);
			SideMenuL3.animate({
				'left':'0'
			},100);

			var MenuHeight = SideMenuL3.height();

			SideMenuL1.css('display','none');
			SideMenuL2.css('display','none');

			//back按鈕層數+1
			$('.SideMenu_BackBTN').attr('layer','3');

			break;

			case 3:
			//去詳目頁

			break;

		}
	});
	*/

	//SideMenu open next layer
	$('.SideMenu_Detail_list').click(function(){
		var hasNextLayer = $(this).next().hasClass('SideMenu_Detail_list_Layer');
		var isNextLayerOpen = $(this).hasClass('SideMenu_Detail_list_layeropen');
		if (hasNextLayer && !isNextLayerOpen) {
			$(this).addClass('SideMenu_Detail_list_layeropen');
			$(this).next().slideDown('fast');
		} else if (hasNextLayer && isNextLayerOpen) {
			$(this).removeClass('SideMenu_Detail_list_layeropen');
			$(this).next().slideUp('fast');
		}
	});

	//SideMenu 展開更多
	$('.SideMenu_Detail_list_more').click(function(){
		$('.SideMenu_Detail_extend').css('display','none');
		$('.SideMenu_Detail_list_more').css('display','block');
		$(this).css('display','none');
		$(this).next().slideDown(200);
	});

	//SideMenu 收合展開
	$('.SideMenu_Detail_CloseExtend').click(function(){
		$(this).parent().slideUp(200);
		$(this).parent().prev().css('display','block');
	});


	//dropdown展開/收合
	$('.dropdown').click(function(){
		//check open
		var isShow = $(this).hasClass('dropdown_show');

		if (isShow) {

		} else {
			$(this).addClass('dropdown_show');
			$(this).find('.dropdown_extend').css('display','block');
			$(window).on('touchstart.checkclick',function(e){
				var isOption = e.target.className;
				$('.dropdown').removeClass('dropdown_show');
				$('.dropdown_extend').css('display','none');
				if (isOption == 'dropdown_option') {
					var OptionText = e.target.innerHTML;
					$(e.target).parent().parent().find('.dropdown_text span').text(OptionText);
				} else {
					//$('.dropdown').removeClass('dropdown_show');
					//$('.dropdown_extend').css('display','none');
				}

				$(window).off('touchstart.checkclick');
			});
		}

	});

	
	
	
	//radiobox active切換 
	/*$('.PopWindow_RadioBox').click(function(){
		var GroupName = $(this).attr('name');
		var GroupSelect = $('.RadioBox' + '[name=' + GroupName + ']');
		GroupSelect.removeClass('PopWindow_RadioBox_active');
		$(this).addClass('PopWindow_RadioBox_active');
	});*/

	//新手上路、品質宣言等視窗高度設定
	if (intBrowserW < 768) {
		var AboutContainMinHeight = intBrowserH - 90;
		$('.About_Contain').css('min-height',AboutContainMinHeight);
	} else if (intBrowserW < 1366) {
		var AboutContainMinHeight = intBrowserH - 140;
		$('.About_Contain').css('min-height',AboutContainMinHeight);
	} else {
		var AboutContainMinHeight = intBrowserH - 160;
		$('.About_Contain').css('min-height',AboutContainMinHeight);
	}

	
	//當前高度初始化
	var BodyScrollTopY = 0;

	//關於icheers視窗
	$('.iCheers_info_option').click(function(){
		BodyScrollTopY = $(window).scrollTop();
		var AboutID = '#AboutWindow_' + $(this).attr('id');
		AboutPopWindow(AboutID,intBrowserH,intBrowserW);
	});


	$('.About_BG .CloseBTN').click(function(){
		var CloseWindowID = '#' + $(this).parent().parent().attr('id');
		AboutWindowClose(CloseWindowID,intBrowserH,intBrowserW,BodyScrollTopY);
	});

	//購物車視窗們
	//使用紅利視窗
	$('#UseBouns').click(function(){
		BodyScrollTopY = $(window).scrollTop();
		PopWindow('#UseBounsWindow',intBrowserH,intBrowserW);
	});

	//使用coupon視窗
	$('#UseCoupon').click(function(){
		BodyScrollTopY = $(window).scrollTop();
		PopWindow('#UseCouponWindow',intBrowserH,intBrowserW);
	});

	//運費說明
	$('#FreightInfo').click(function(){
		BodyScrollTopY = $(window).scrollTop();
		PopWindow('#FreightInfoWindow',intBrowserH,intBrowserW);
	});

	//分批出貨確認
	//20180628 fix checkseparate flow
	$('#NotSeparate').click(function(){
		$('#SeparateCheckSetion').hide();
		$('#YearCheckSetion').slideDown('fast',function(){
			var YearCheckWidth = $('.cart_YearCheck_layout').width();
		    var YearCheckPositionX = (intBrowserW - YearCheckWidth)/2;
		    $('.cart_YearCheck_layout').css('margin-left',YearCheckPositionX);
		    $('#YearCheckSetion').animate({
		    	'opacity':1
		    },'slow');
		});
	});

	$('#YearCheckBtn').click(function(){
		BodyScrollTopY = $(window).scrollTop();
		PopWindow('#MailWindow1',intBrowserH,intBrowserW);
	});

	/*$('#ConfirmBtn01').click(function(){
		BodyScrollTopY = $(window).scrollTop();
		PopWindow('#MailWindow1',intBrowserH,intBrowserW);	
	});*/

	$('#PaymentCheck').click(function(){
		BodyScrollTopY = $(window).scrollTop();
		PopWindow('#MailWindow2',intBrowserH,intBrowserW);	
	});

	$('#BackToPaymentCheck').click(function(){
		BodyScrollTopY = $(window).scrollTop();
		$('#MailWindow2 .CloseBTN').click();
		PopWindow('#MailWindow1',intBrowserH,intBrowserW);	
	});

	//會員登入
	$('.SideMenu_SignInBTN').click(function(){
		BodyScrollTopY = $(window).scrollTop();
		PopWindow('#SignInWindow',intBrowserH,intBrowserW);
		$('body').off('touchmove.preventScroll');	
	});

	//wine tag
	$('.detail_bottleImg_winetag').click(function(){
		BodyScrollTopY = $(window).scrollTop();
		PopWindow('#WineTagWindow',intBrowserH,intBrowserW);	
	});

	//PopWindow關閉
	$('#black_BG02 .CloseBTN').click(function(){
		//隱藏黑底
		$('#black_BG02').css('display','none');
		//隱藏視窗
		$('.PopWindow_layout').css('display','none');
		//回復body高度、overflow設定
		$('body').css({
		    'height':'auto'
		});
		//回復假body高度、overflow設定
		$('.wapper').css({
			'height':'auto',
			'overflow-y':'scroll',
			'position':'relative'
		});
		//回復之前瀏覽位置
		$(window).scrollTop(BodyScrollTopY);
		//window重新綁定HeaderShow事件
		$(window).on('touchstart.HeaderShow',HeaderShow())
	});

	//20180626 add search input auto complete show/close
	$('.SideMenu_SearchInput input').on('keyup',function(){
		var isEmpty = $(this).val();
		if (isEmpty == ''){
			$('.SideMenu_AutoComplete').removeClass('SideMenu_AutoComplete_show');
		} else{
			$('.SideMenu_AutoComplete').addClass('SideMenu_AutoComplete_show');
		}	
	})

	//close auto complete when click/touch result
	$('.OneResult').click(function(){
		$('.SideMenu_AutoComplete').removeClass('SideMenu_AutoComplete_show');
	});

	//close auto complete when blur input
	$('.SideMenu_SearchInput input').on('blur',function(){
		$('.SideMenu_AutoComplete').removeClass('SideMenu_AutoComplete_show');
	});

	//quality jump to no storage solution
	$('.NoStorageInHouse').click(function(){
		//find About_Contain_Quality scroll height
		var ScrollPosition = $('.About_Contain_Quality')[0].scrollHeight ;
		$('.About_Contain_Quality').animate({
			scrollTop: ScrollPosition
		},500);
	});

});

function Radiobox (self) {
	var GroupName = $(self).attr('name');
	var GroupSelect = $('.RadioBox' + '[name=' + GroupName + ']');
	GroupSelect.removeClass('RadioBox_active');
	$(self).addClass('RadioBox_active');
}

function PopWindowRadiobox (self) {
	var GroupName = $(self).attr('name');
	var GroupSelect = $('.PopWindow_RadioBox' + '[name=' + GroupName + ']');
	GroupSelect.removeClass('PopWindow_RadioBox_active');
	$(self).addClass('PopWindow_RadioBox_active');
}


function DisableScroll(){
	//瀏覽器內容寬度
	var intBrowserW = 0;

	//瀏覽器內容高度
	var intBrowserH = 0;

	//#region 取得瀏覽器內容寬度/高度
	if (document.documentElement && document.documentElement.clientWidth != 0 && document.documentElement.clientHeight != 0) {
		intBrowserW = document.documentElement.clientWidth;
		intBrowserH = document.documentElement.clientHeight;
	} else {
		intBrowserW = document.body.clientWidth;
		intBrowserH = document.body.clientHeight;
	}

	//將body設成視窗大小
	$('body').css({
		'height':intBrowserH,
		'overflow':'hidden'
	});
	//移除body scroll事件、停止header出現
	$('body').on('touchstart.preventScroll',function(e){
		e.preventDefault();
		$(window).off('touchstart.HeaderShow');
	});
}

function EnableScroll(){
	$('body').css({
		'height':'100%',
		'overflow':'scroll'
	});
	$('body').off('touchstart.preventScroll');
	$(window).on('touchstart.HeaderShow',HeaderShow());
}

function HeaderShow(){
	//瀏覽器內容寬度
	var intBrowserW = 0;

	//瀏覽器內容高度
	var intBrowserH = 0;

	//#region 取得瀏覽器內容寬度/高度
	if (document.documentElement && document.documentElement.clientWidth != 0 && document.documentElement.clientHeight != 0) {
		intBrowserW = document.documentElement.clientWidth;
		intBrowserH = document.documentElement.clientHeight;
	} else {
		intBrowserW = document.body.clientWidth;
		intBrowserH = document.body.clientHeight;
	}

	$(window).on('touchstart.HeaderShow', function(e) {

		//先判斷當前位置，如果已經在TOP高度則TOP回歸原位
		var ScrollTop = $(document).scrollTop();
		//phone
		if (intBrowserW < 768) {
			if (ScrollTop > 60){
				var swipe = e.originalEvent.touches;
		    	var start = swipe[0].clientY;
		    	//手指移動時
		    	$(this).on('touchmove', function(e) {
		    		var contact = e.originalEvent.touches;
			        var end = contact[0].clientY;
			        var distance = end-start;
			        //頁面向下捲動的話
			        if (distance < -30){
			        	
			        	var isTopShow = $('.header').position().top;
			        	//top no show
			        	if (isTopShow == -56){
			        		//不動作
			        	} 
			        	//top show的話將top收起
			        	else if (isTopShow == 0){
			        		
			        		$('.header').css({
			        			'top':'-56px',
			        			'position':'fixed',
								'z-index':'99'
			        		});
			        	}
			        	else {
			        		$('.header').css({
			        			'top':'-56px',
			        			'position':'fixed',
								'z-index':'99'
			        		});
			        	}
			        }
			        //頁面向上捲動的話
			        else if (distance > 30){
			        	var isTopShow = $('.header').position().top;
			        	var HeaderPositionType = $('.header').css('position');
			        	if (HeaderPositionType == 'relative'){
			        		$('.header').css({
			        			'top':'-56px',
			        			'position':'fixed',
								'z-index':'99'
			        		});
			        		$('.header').animate({
			        			'top':'0',
			        		},300);	
			        		return;
			        	};
			        	//top no show
			        	if (isTopShow == 0){
			        		//不動作
			        	}
			        	//top show
			        	else if (isTopShow == -56){
			        		$('.header').css({
			        			'top':'-56px',
			        			'position':'fixed',
								'z-index':'99'
			        		});
			        		$('.header').animate({
			        			'top':'0'
			        		},300);	
			        	}
			        }
		    	});
		    	$(this).one('touchend', function() {
			        $(this).off('touchmove touchend');
			    });

			} else {
				$('.header').css({
					'position':'relative',
					'top':'0'
				});
			}
		} 
		//pad
		else if (intBrowserW < 1366){
			if (ScrollTop > 80){
				var swipe = e.originalEvent.touches;
		    	var start = swipe[0].clientY;
		    	//手指移動時
		    	$(this).on('touchmove', function(e) {
		    		var contact = e.originalEvent.touches;
			        var end = contact[0].clientY;
			        var distance = end-start;
			        //頁面向下捲動的話
			        if (distance < -30){
			        	
			        	var isTopShow = $('.header').position().top;
			        	//top no show
			        	if (isTopShow == -76){
			        		//不動作
			        	} 
			        	//top show的話將top收起
			        	else if (isTopShow == 0){
			        		
			        		$('.header').css({
			        			'top':'-76px',
			        			'position':'fixed',
								'z-index':'99'
			        		});
			        	}
			        	else {
			        		$('.header').css({
			        			'top':'-76px',
			        			'position':'fixed',
								'z-index':'99'
			        		});
			        	}
			        }
			        //頁面向上捲動的話
			        else if (distance > 30){
			        	var isTopShow = $('.header').position().top;
			        	var HeaderPositionType = $('.header').css('position');
			        	if (HeaderPositionType == 'relative'){
			        		$('.header').css({
			        			'top':'-76px',
			        			'position':'fixed',
								'z-index':'99'
			        		});
			        		$('.header').animate({
			        			'top':'0',
			        		},300);	
			        		return;
			        	};
			        	//top no show
			        	if (isTopShow == 0){
			        		//不動作
			        	}
			        	//top show
			        	else if (isTopShow == -76){
			        		$('.header').css({
			        			'top':'-76px',
			        			'position':'fixed',
								'z-index':'99'
			        		});
			        		$('.header').animate({
			        			'top':'0'
			        		},300);	
			        	}
			        }
		    	});
		    	$(this).one('touchend', function() {
			        $(this).off('touchmove touchend');
			    });

			} else {
				$('.header').css({
					'position':'relative',
					'top':'0'
				});
			}
		}
		//large pad
		else {
			if (ScrollTop > 100){
				var swipe = e.originalEvent.touches;
		    	var start = swipe[0].clientY;
		    	//手指移動時
		    	$(this).on('touchmove', function(e) {
		    		var contact = e.originalEvent.touches;
			        var end = contact[0].clientY;
			        var distance = end-start;
			        //頁面向下捲動的話
			        if (distance < -30){
			        	
			        	var isTopShow = $('.header').position().top;
			        	//top no show
			        	if (isTopShow == -90){
			        		//不動作
			        	} 
			        	//top show的話將top收起
			        	else if (isTopShow == 0){
			        		
			        		$('.header').css({
			        			'top':'-90px',
			        			'position':'fixed',
								'z-index':'99'
			        		});
			        	}
			        	else {
			        		$('.header').css({
			        			'top':'-90px',
			        			'position':'fixed',
								'z-index':'99'
			        		});
			        	}
			        }
			        //頁面向上捲動的話
			        else if (distance > 30){
			        	var isTopShow = $('.header').position().top;
			        	var HeaderPositionType = $('.header').css('position');
			        	if (HeaderPositionType == 'relative'){
			        		$('.header').css({
			        			'top':'-90px',
			        			'position':'fixed',
								'z-index':'99'
			        		});
			        		$('.header').animate({
			        			'top':'0',
			        		},300);	
			        		return;
			        	};
			        	//top no show
			        	if (isTopShow == 0){
			        		//不動作
			        	}
			        	//top show
			        	else if (isTopShow == -90){
			        		$('.header').css({
			        			'top':'-90px',
			        			'position':'fixed',
								'z-index':'99'
			        		});
			        		$('.header').animate({
			        			'top':'0'
			        		},300);	
			        	}
			        }
		    	});
		    	$(this).one('touchend', function() {
			        $(this).off('touchmove touchend');
			    });

			} else {
				$('.header').css({
					'position':'relative',
					'top':'0'
				});
			}
		}
		 
	});
}

//關於icheers視窗
function AboutPopWindow(name,intBrowserH,intBrowserW){
	var ShowWindow = $(name);
	//高度初始
	var ShowWindowHeight = 0;
	var ShowWindowContainHeight = 0; 

	//將body設為與螢幕等高
	$('body').css({
		'height':intBrowserH,
	});

	//取代body作為overflow hidden屬性設置的框
	$('.wapper').css({
		'height':intBrowserH,
		'overflow-y':'hidden'
	});

	//重新取browser高度
	setTimeout(function(){
		intBrowserH = window.innerHeight;
		//重指高度
		$('.wapper').css({
			'height':intBrowserH
		});
		$('body').css({
			'height':intBrowserH,
		});

		//將框置於top 0
		$('.wapper').css({
			'position':'absolute',
			'top':0,
			'width':'100%'
		});

		//移除HeaderShow事件
		$(window).off('touchstart.HeaderShow');

		//不同裝置的高度
		if (intBrowserW < 768) {
			ShowWindowHeight = intBrowserH - 40;
			ShowWindowContainHeight = ShowWindowHeight - 50;
		} else if (intBrowserW < 1366) {
			ShowWindowHeight = intBrowserH - 80;
			ShowWindowContainHeight = ShowWindowHeight - 60;
		} else {
			ShowWindowHeight = intBrowserH - 100;
			ShowWindowContainHeight = ShowWindowHeight - 60;	
		}

		//高度及contain高度設置
		ShowWindow.css('height',ShowWindowHeight);
		ShowWindow.find('.About_Contain').css('height',ShowWindowContainHeight);


		//將視窗送至目前高度+一個視窗高度的位置(Slide Up前準備)
		ShowWindow.css({
			'display':'block',
			'top':ShowWindowHeight
		});

		//新手上路 Icon說明置中
		var NewbieIconsWidth = $('.About_Newbie_CartIcons').width();
		var NewbieBorderWidth = $('.About_Newbie').width();
		var NewbieIconsPositionX = (NewbieBorderWidth - NewbieIconsWidth) /2;
		$('.About_Newbie_CartIcons').css('margin-left',NewbieIconsPositionX);
		//新手上路 我的清單說明置中
		var NewbieMyListWidth = $('.About_Newbie_mylist').width();
		var NewbieMyListPositionX = (NewbieBorderWidth - NewbieMyListWidth)/2;
		$('.About_Newbie_mylist').css('margin-left',NewbieMyListPositionX);
		ShowWindow.css('top','0');
	},200);
	

	



	
}

function AboutWindowClose(name,intBrowserH,intBrowserW,BodyScrollTopY){
	var CloseWindow = $(name);
	//高度初始
	var CloseWindowHeight = 0;
	var CloseWindowContainHeight = 0; 
	//不同裝置的高度
	if (intBrowserW < 768) {
		CloseWindowHeight = intBrowserH - 40;
		CloseWindowContainHeight = CloseWindowHeight - 50;
	} else if (intBrowserW < 1366) {
		CloseWindowHeight = intBrowserH - 80;
		CloseWindowContainHeight = CloseWindowHeight - 60;
	} else {
		CloseWindowHeight = intBrowserH - 100;
		CloseWindowContainHeight = CloseWindowHeight - 60;	
	}

	
	CloseWindow.css({
		'display':'none',
		'top':CloseWindowHeight
	});
	//回復body高度、overflow設定
	$('body').css({
		'height':'auto'
	});
	//回復假body高度、overflow設定
	$('.wapper').css({
		'height':'auto',
		'overflow-y':'scroll',
		'position':'relative'
	});

	//回復之前瀏覽位置
	$(window).scrollTop(BodyScrollTopY);
	//綁定HeaderShow事件
	$(window).on('touchstart.HeaderShow',HeaderShow());
}

function PopWindow(name,intBrowserH,intBrowserW) {
	var PopWindow = $(name);
	//高度初始
	var PopWindowHeight = 0;
	var PopWindowContainHeight = 0; 
	
	//將body設為與螢幕等高
	$('body').css({
		'height':intBrowserH,
	});

	//取代body作為overflow hidden屬性設置的框
	$('.wapper').css({
		'height':intBrowserH,
		'overflow-y':'hidden'
	});

	//重新取browser高度
	setTimeout(function(){
		intBrowserH = window.innerHeight;
		//重指高度
		$('.wapper').css({
			'height':intBrowserH
		});
		$('body').css({
			'height':intBrowserH,
		});

		//移除HeaderShow事件
		$(window).off('touchstart.HeaderShow');

		//將框置於top 0
		$('.wapper').css({
			'position':'absolute',
			'top':0,
			'width':'100%'
		});

		//黑底
		$('#black_BG02').css({
			'width':intBrowserW,
			'height':intBrowserH,
			'display':'block',
			'top':0,
			'overflow':'hidden'
		})

		//不同裝置的高度
		if (intBrowserW < 768) {
			PopWindowHeight = intBrowserH - 40;
			PopWindowContainHeight = PopWindowHeight - 50;
		} else if (intBrowserW < 1366) {
			PopWindowHeight = intBrowserH - 80;
			PopWindowContainHeight = PopWindowHeight - 60;
		} else {
			PopWindowHeight = intBrowserH - 100;
			PopWindowContainHeight = PopWindowHeight - 60;	
		}


		//PopWindow寬高初始值
		if (intBrowserW < 768){
			PopWindow.css({
				'width':'100%',
				'height':PopWindowHeight
			});
			PopWindow.find('.PopWindow_content').css({
				'height':PopWindowContainHeight,
				'overflow-y':'scroll'
			});
		} else if (intBrowserW < 1366) {
			//先給初始寬高
			PopWindow.css({
				'width':'70%',
				'min-height':'120px',
				'max-height':intBrowserH*0.6
			});
			//先給初始高
			PopWindow.find('.PopWindow_content').css({
				'max-height':intBrowserH*0.6 - 50,
				'overflow-y':'scroll',
				'box-sizing':'border-box'
			});
		} else {
			PopWindow.css({
				'width':'50%',
				'min-height':'120px',
				'max-height':intBrowserH*0.6
			});
			//先給初始高
			PopWindow.find('.PopWindow_content').css({
				'max-height':intBrowserH*0.6 - 50,
				'overflow-y':'scroll',
				'box-sizing':'border-box'
			});
		}

		PopWindow.css('display','block');
		if (intBrowserW < 768) {
			PopWindow.css({
				'top':'0',
				'left':'0'
			});
		} else {
			PopWindow.css({
					'top':'50%',
					'left':'50%'
			});
		}

		//show之後第二次置中
		PopWindow.find('.PopWindow_content').show(300,function(){
			if (intBrowserW < 768) {
				var PopWindowWidth = PopWindow.width();
				var PopWindowHeight = PopWindow.height() + 40;
				var PopWindowPositionX = (intBrowserW - PopWindowWidth) / 2;
				var PopWindowPositionY = (intBrowserH - PopWindowHeight) / 2;

			} else if (intBrowserW < 1366) {
				var PopWindowWidth = PopWindow.width();
				var PopWindowHeight = PopWindow.height();
				var PopWindowPositionX = (intBrowserW - PopWindowWidth) / 2;
				var PopWindowPositionY = (intBrowserH - PopWindowHeight - 80) / 2;
			} else {
				var PopWindowWidth = PopWindow.width();
				var PopWindowHeight = PopWindow.height();
				var PopWindowPositionX = (intBrowserW - PopWindowWidth) / 2;
				var PopWindowPositionY = (intBrowserH - PopWindowHeight - 100) / 2;
			}
			
			
			PopWindow.css({
				'top':PopWindowPositionY,
				'left':PopWindowPositionX
			});
		});	
	},200)
	

	

}