window.pegjsmain = {

    containerBorder : 5,
    containerMargin : 20,
    parser : null,
	
	initialize : function() {
        // Set output div height
        var outputDiv = document.getElementById('output');
        // Set main display height
        var mainContainerDiv = document.getElementById('main');
        var mainContentDiv = document.getElementById('maincontent');
        var headerDiv = document.getElementById('headercontainer');
        mainContainerDiv.style.height = (outputDiv.clientHeight - headerDiv.clientHeight) + "px";
        mainContentDiv.style.height = (outputDiv.clientHeight - headerDiv.clientHeight) + "px";
        // Set container width
        var definitionContainer = document.getElementById('definitionContainer');
        var resultContainer = document.getElementById('resultContainer');
        
        definitionContainer.style.width = ((mainContentDiv.clientWidth / 2) - 2*this.containerBorder)+ "px";
        definitionContainer.style.height = (outputDiv.clientHeight - headerDiv.clientHeight - 2*this.containerMargin) + "px";
        resultContainer.style.width = ((mainContentDiv.clientWidth / 2) - 2*this.containerBorder)+ "px";
        resultContainer.style.height = (outputDiv.clientHeight - headerDiv.clientHeight - 2*this.containerMargin) + "px";
        
        // Load grammar file and build the parser
        var req = new XMLHttpRequest();
        req.open("GET", 'grammar/myGrammar.pegjs', true);
        req.onload = function(e) {
            var grammarInput =  req.responseText;
            if ((grammarInput != null) && (PEG != null)) {
                window.pegjsmain.parser = PEG.buildParser(grammarInput);
            }
        };
        req.send();
	},
    
    parseDefinition : function(event) {
        var elm = (event.srcElement != null) ? event.srcElement : event.target;
        var content = elm.value;
        if ((content != null)) {
            if (content === "") {
                this.displayResult("", true);
            }
            else {
                try {
                    var output = this.parser.parse(content);
                    this.displayResult(output, true);
                }
                catch(error) {
                    this.displayResult(error, false);
                }
            }
        }
    },
    
    displayResult : function(output, success) {
        var errorDisplay = document.getElementById('errorDisplay');
        var resultDisplay = document.getElementById('resultDisplay');
        if ((resultDisplay != null) && (errorDisplay != null)) {
            if (success) {
                errorDisplay.innerHTML = "&nbsp;";
                errorDisplay.classList.add("hidden");
                resultDisplay.innerHTML = output;
                resultDisplay.classList.remove("hidden");
            }
            else {
                resultDisplay.innerHTML = "&nbsp;";
                resultDisplay.classList.add("hidden");
                errorDisplay.innerHTML = "ERROR: line " + output.line + ", column " + output.column + " : " + output.message;
                errorDisplay.classList.remove("hidden");
            }
        }
    }
	
};