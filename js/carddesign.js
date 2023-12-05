//Let's grab the array of svg text elements
var svg = $("object").contents().children().children("g");
$svgText = $(svg).children("text");

//Updates input value with clicked .svg text element's html
function sendToInput(textEle){
	$("#altertext").val("");
	$("#altertext").attr('placeholder',textEle.target.innerHTML);
	$("#altertext").attr('lockedon','#' + textEle.target.id)
}

//onkeyup, find the corresponding tspan element and change it's html
function setSvgText(tspanId, newText){
	var textEle = $svgText.find(tspanId)[0];
	$textEle = $(textEle);
	$textEle.html(newText);

	console.log($(svg).find("#positioner")[0].width);
}
$('.selection img').on('click', function (e) {
    $(this).siblings().removeClass('active');
    $(this).parent().siblings('img').attr('src', $(this).attr('src'));
    $(this).attr('class', 'active');
});

//Loop through text element in the .svg and add event listener onclick
$svgText.each(function(index){
	var text = $svgText[index];
	$text = $(text);
	$text.on('click',sendToInput);
});

//Sets the html for desired text element from 
$('#altertext').on('keyup', function(e){
	setSvgText($(this).attr('lockedon'), $(this).val());


});
	

