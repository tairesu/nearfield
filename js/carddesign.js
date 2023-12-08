//Let's grab the array of svg text elements
var svg = $("object").contents().children().children("g");
$svgText = $(svg).children("text");

//Updates input value with clicked .svg text element's html
function updateInput(textEle){
	//Clear the current Value
	$("#altertext").val("");

	//Set the placeholder
	$("#altertext").attr('placeholder',textEle.target.innerHTML);

	//Set the lockedOn attribute to the ID of selected text ele
	$("#altertext").attr('lockedon','#' + textEle.target.id)
}

//onkeyup, find the corresponding tspan element and change it's html
function updateSvgText(tspanId, newText){
	var tspanEle = $svgText.find(tspanId)[0],
	positioner = $(svg).find("#positioner")[0];
	
	//Update text for text element w/ id=tspanID
	$(tspanEle).html(newText);

	//Centers the inner tspan if the parent tag has 'rel' in id
	if($(tspanEle).parent().parent().attr('id').indexOf('rel') > -1){
		tspanEleWidth = tspanEle.textLength.baseVal.value;
		newXPos = ((parseFloat($(positioner).attr('width')) - tspanEleWidth) / 2) + parseFloat($(positioner).attr('x'));
		$(tspanEle).attr('x', newXPos);
	}
	

	/*//Uncomment to Debug element shift
	console.log(tspanEle);
	console.log( $("object").contents().children()[0].width.baseVal.value);
	console.log("Rect width: " + $(positioner).attr('width'));
	console.log("Rect x: " + $(positioner).attr('x'));
	console.log("Text width: " + tspanEleWidth);
	console.log("Text x: " + $(tspanEle).attr('x'));
	console.log("New Text x: " + newXPos);*/
}


//Loop through text elements in the .svg and add event listener onclick
$svgText.each(function(index){
	var text = $svgText[index];
	$text = $(text);
	$text.on('click',updateInput);
});

//Update the selected svg text element with input's text 
$('#altertext').on('keyup', function(e){
	updateSvgText($(this).attr('lockedon'), $(this).val());
});
	

