function Saver() {
}

Saver.prototype = new Saver();
Saver.prototype.constructor = Saver;

Saver.prototype.save = function()  {
	var page = new Page();
    var inputText = page.getInputText();
    console.log('Will save ' + inputText);
    
    var textFileAsBlob = new Blob([inputText], {type:'text/plain'});
    var fileNameToSaveAs = "myNewFile.txt";
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "My Hidden Link";
    window.URL = window.URL || window.webkitURL;
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
}

function destroyClickedElement(event)
{
    document.body.removeChild(event.target);
}
