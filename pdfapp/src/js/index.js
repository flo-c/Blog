window.main = {
    
    titleSize : 20,
    mmTitleSize : 7.6, // can be changed to fit the need
    textSize : 12,
    mmTextSize : 4.5,
    pageTopMargin : 20,
    
    previewPdf : function() {
        var title = $("#titleinput")[0].value;
        var text = $("#textinput")[0].value;
        var preview = $("#preview")[0];
        if ((title != null) && (text != null) && (preview != null)) {
            // create and feed pdf
            var doc = new jsPDF('p', 'mm', 'letter');
            var titleLines = doc.setFont('Courier','Bold').setFontSize(this.titleSize).splitTextToSize(title, 160);
            doc.text(50, this.pageTopMargin, titleLines);
            var textLines = doc.setFont('Courier','').setFontSize(this.textSize).splitTextToSize(text, 190)
            doc.text(20, this.pageTopMargin + (titleLines.length * this.mmTitleSize), textLines);
            var pdfOutput = doc.output('datauristring');
            // clean preview and add pdf
            preview.src = pdfOutput;
        }
    }
    
};