$(document).ready(function(){
			var win_height = $(window).height();
			$(".menu").click(function(){
				$("nav").addClass("show_menu");
				$("nav").stop(true,true).animate({"width":"100%","height":win_height, "opacity":1, "left":0, "top":0},600);
				$("nav ul").stop(true,true).delay(500).animate({"opacity":1});
				$(this).stop(true,true).fadeOut();
				$(".close").stop(true,true).fadeIn();
			});

			$(".close").click(function(){
				$(".menu").stop(true,true).fadeIn();
				$("nav").stop(true,true).animate({"width":"0","height":0, "opacity":0, "left":"50%", "top":"50%"},600);
				$("nav ul").stop(true,true).delay(500).animate({"opacity":0});
				$(this).stop(true,true).fadeOut();
				$("nav").removeClass("show_menu");
			});

			var waitForFinalEvent = (function () {
			  var timers = {};
			  return function (callback, ms, uniqueId) {
			    if (!uniqueId) {
			      uniqueId = "Don't call this twice without a uniqueId";
			    }
			    if (timers[uniqueId]) {
			      clearTimeout (timers[uniqueId]);
			    }
			    timers[uniqueId] = setTimeout(callback, ms);
			  };
			})();

			
			$(".inner_section").height(win_height);
			$(window).scroll(function(){
				var win_height = $(window).height();
			var half_win_height = Math.round(win_height/2);
				var scroll_amt = $(window).scrollTop();

				$(".right_div").css("bottom", -scroll_amt);

				clearTimeout( $.data( this, "scrollCheck" ) );
    			$.data( this, "scrollCheck", setTimeout(function() {
    				var remainder_val = scroll_amt%win_height;

			    
					if(remainder_val != 0){
						var scroll_to_count =  Math.round(scroll_amt/win_height);
						var scroll_to = scroll_to_count*win_height;
						$('html, body').animate({
					        scrollTop: scroll_to
					    }, 500);
					    return false;
					    $(".right_div").css("bottom", -scroll_to);
					}
    			}, 800) );

			});

			$(".navigation a").click(function(){

				var selected_sec = $(this).attr("data-scroll");
				var scroll_top_pos = $(".left_div ." + selected_sec).offset().top;

				$('body,html').stop(true,true).animate({
					scrollTop: scroll_top_pos
				}, 500, function(){

					if($("nav").hasClass("show_menu")){
						$(".close").delay(5000).trigger("click");
					}

				});
				$(".navigation a").removeClass("active");
				$(this).addClass("active");
				
				return false;
				$(".right_div").stop(true,true).css("bottom", -scroll_top_pos);


			});

			$(window).resize(function(){
				waitForFinalEvent(function(){
					var win_width = $(window).width();
					var win_ht_new = $(window).height();
			      	if(win_ht_new != win_height) {
			      		$(".inner_section").height(win_ht_new);
			      		var selected_sec_new = $(".navigation a.active").attr("data-scroll");
						var scroll_top_pos_new = $(".left_div ." + selected_sec_new).offset().top;	
					
						$('body,html').animate({
							scrollTop: scroll_top_pos_new
						}, 500);
						return false;
						$(".right_div").css("bottom", -scroll_top_pos_new);
			      	}

			      	if(win_width<=740){
			      		$(".menu").removeClass("mobile_view");
			      		$("nav").removeClass("desktop_menu");
			      	}
			      	else{
			      		$(".menu").addClass("mobile_view");	
			      		$("nav").addClass("desktop_menu");
			      	}
			    }, 500, "some unique string");
				
			});


		});