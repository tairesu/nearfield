inputs = ['name','email','cell'];
cards = [];
class Card{
	constructor(name,email,cell) {
		this.inputValues = {'name':name, 'email':email,'cell':cell};
		this.card;
		this.textEle = [];
		this.createSVG();
	}
	//Creates and then displays the SVG element
	createSVG(){
		this.card = document.createElement("object");
		this.card.data = "cards/cozzicards.svg";
		this.card.width = "688.697px";
		this.card.type = 'image/svg+xml';
		this.card.addEventListener('load',() => {
			this.setText(this.card);
		});
		this.display();
	}
	//Sets the text in SVG element to initiating variables
	setText(svgObj){
		var tspanEles = svgObj.contentDocument.querySelectorAll("text tspan");
		tspanEles.forEach((ele,i) => {
			ele.innerHTML = this.inputValues[ele.parentElement.id];

			//centers the updated text if grandparent's id has rel in it 
			if ($(ele).parent().attr('inkscape:label').indexOf("rel") >-1) {
				var rect = svgObj.contentDocument.querySelector("rect#positioner");
				var eleWidth = ele.textLength.baseVal.value;

				var newXPos = ((parseFloat($(rect).attr('width')) - eleWidth) / 2) + parseFloat($(rect).attr('width'));
				
				$(ele).attr('x',newXPos);
			}
			
		});
	}
	display(){		
		$("#svg-grid").append(this.card);
	}
}

$("#populate").on('click',function(){
	console.log($("#svg-grid"));
	//Loop a number of times
	for(i=0; i<$("#number").val(); i++){ 
		newDiv = document.createElement("div");
		$(newDiv).attr('design', $("#card-design").val());

		//creates a fixed number of input tags in newDiv
		for(x=0;x < inputs.length; x++){
			newObj1 = document.createElement("input");
			newObj1.name = [inputs[x]];
			newObj1.placeholder = [inputs[x]]
			newDiv.appendChild(newObj1);
		}
		//Take newdiv and send it to the front of the list
		$("#svg-grid").prepend(newDiv);
	}
});
//Creates the cards if they dont exists
$("#finalize").on('click',function(){
	cards = []; 
	
	if ($("#svg-grid object").length > 0)
		$("#svg-grid object").remove();
	
	$("#svg-grid div[design]").each(function(e){

		var card = new Card($(this).find("input[name=name]")[0].value,$(this).find("input[name=email]")[0].value,$(this).find("input[name=cell]")[0].value);
		cards.push(card)
	});
	
});