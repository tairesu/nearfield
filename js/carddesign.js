
	$('.selection img').on('click', function (e) {
	    $(this).siblings().removeClass('active');
	    $(this).parent().siblings('img').attr('src', $(this).attr('src'));
	    $(this).attr('class', 'active');
	});

	var svg = $("object").contents().children().children("g").children("text")[1];
	$svg = $(svg);
	$('#altertext').on('keyup', function(e){
		console.log($(this));
		$svg.children().children().html($(this).val());

	});

