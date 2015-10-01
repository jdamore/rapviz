function Getter() {
	this.page = new Page();
    this.drawer = new Drawer();
}

Getter.prototype = new Getter();
Getter.prototype.constructor = Getter;

Getter.prototype.get = function()  {
	var inputUrl = this.page.inputUrl();
	httpGetAsync(inputUrl, function(responseText) {
		try {
			this.page.setInputText(responseText);
        	this.drawer.draw();
        }
    	catch(e) {
        	this.page.error(e.message);
    	}
	}.bind(this));
}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}