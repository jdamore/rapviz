function Loader() {
    this.page = new Page();
    this.drawer = new Drawer();
}

Loader.prototype = new Loader();
Loader.prototype.constructor = Loader;

Loader.prototype.onchange = function(val) {
    this.page.inputFileName().value = val;
}

Loader.prototype.load = function()  {
    this.page.error('');
    if (window.File && window.FileReader && window.FileList && window.Blob) {
       this.page.inputFile().addEventListener('change', this.loadFileCallback.bind(this), false);
    } 
    else {
        this.page.error('The File APIs are not fully supported in this browser');
    }
};

Loader.prototype.loadFileCallback = function(evt) {
    var f = evt.target.files[0]; 
    if (f) {
        this.loadFile(f);  
    } 
    else { 
        this.page.error('Failed to load file');
    }
}

Loader.prototype.loadFile = function(f) 
{
    var r = new FileReader();
    var that = this;
    try {
        r.onload = function(e) { 
            var content = e.target.result;
            that.page.setInputText(content);
            that.drawer.draw();
        }
        r.readAsText(f);
    }
    catch(e) {
        this.page(e.message);
    }
}
