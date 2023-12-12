inputs = ['name','email','cell'];
cards = [];
class Card{
	constructor(name,email,cell) {
		this.inputValues = [name,email,cell];
		this.card;
		this.textEle = [];
		this.createSVG();
	}
	//Creates and then displays the SVG element
	createSVG(){
		this.card = document.createElement("object");
		this.card.data = "cards/cozzicards.svg";
		this.card.type = 'image/svg+xml';
		this.card.addEventListener('load',() => {
			this.setText(this.card);
		});
		this.display();
	}
	//Sets the text in SVG element to initiating variables
	setText(svgObj){
		var tspanEles = svgObj.contentDocument.querySelectorAll("text tspan>tspan");

		tspanEles.forEach((ele,i) => {
			ele.innerHTML = this.inputValues[i];

			//centers the updated text if grandparent's id has rel in it 
			if ($(ele).parent().parent().attr('id').indexOf("rel") >-1) {
				var rect = svgObj.contentDocument.querySelector("rect#positioner");
				var eleWidth = ele.textLength.baseVal.value;
				var newXPos = ((parseFloat($(rect).attr('width')) - eleWidth) / 2) + parseFloat($(rect).attr('x'));
				$(ele).attr('x',newXPos);
			}
		});
	}
	display(){					
		$("#svg-grid").append(this.card);
	}
}
$("#populate").on('click',function(){
	//Loop a number of times
	for(i=0; i<$("#number").val(); i++){ 
		newDiv = document.createElement("div");
		$(newDiv).attr('design', $("#card-design").val());

		//creates a fixed number of input tags
		for(x=0;x < inputs.length; x++){
			newObj1 = document.createElement("input");
			newObj1.name = [inputs[x]];
			newObj1.placeholder = [inputs[x]]
			newDiv.appendChild(newObj1);
		}
		$("#svg-grid").append(newDiv);
	}
});
$("#finalize").on('click',function(){
	cards = []; 
	$("#svg-grid div").each(function(e){
		var card = new Card($(this).find("input[name=name]")[0].value,$(this).find("input[name=email]")[0].value,$(this).find("input[name=cell]")[0].value);
		cards.push(card)
	});
});