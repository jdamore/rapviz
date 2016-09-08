function Drawer() {
    this.page = new Page();
    this.visualizer = new Visualizer();
}

Drawer.prototype = new Drawer();
Drawer.prototype.constructor = Drawer;

Drawer.prototype.draw = function()  {
    this.page.error('');
    var inputText = this.page.getInputText();
    console.log('Will draw ' + inputText);
    try {
        if(isYaml(inputText)) {
            this.visualizer.viz(YAML.parse(inputText));
        }
        else if(isJson(inputText)) {
            this.visualizer.viz(eval(inputText));
        }
        else {
            this.page.error('Unrecognised input format. Can only read YAML or JSON.');
        }
    }
    catch(e) {
        this.page.error(e.message);
    }
};