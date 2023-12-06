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
	var textEle = $svgText.find(tspanId)[0], 
	positioner = $(svg).find("#positioner")[0];
	$(textEle).html(newText);

	textEleWidth = textEle.textLength.baseVal.value;

	newXPos = ((parseFloat($(positioner).attr('width')) - textEleWidth) / 2) + parseFloat($(positioner).attr('x'));
	$(textEle).attr('x', newXPos);
	 //Uncomment to Debug element shift
	console.log(textEle);
	console.log( $("object").contents().children()[0].width.baseVal.value);
	console.log("Rect width: " + $(positioner).attr('width'));
	console.log("Rect x: " + $(positioner).attr('x'));
	console.log("Text width: " + textEleWidth);
	console.log("Text x: " + $(textEle).attr('x'));
	console.log("New Text x: " + newXPos);
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
	

