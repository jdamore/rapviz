function Drawer() {
    this.page = new Page();
}

Drawer.prototype = new Drawer();
Drawer.prototype.constructor = Drawer;

Drawer.prototype.draw = function()  {
    this.page.error('');
    var inputText = this.page.getInputText();
    console.log('Will draw ' + inputText);
    try {
        if(isYaml(inputText)) {
            new Visualizer(YAML.parse(inputText)).viz();
        }
        else if(isJson(inputText)) {
            new Visualizer(eval(inputText)).viz();
        }
        else {
            this.page.error('Unrecognised input format. Can only read YAML or JSON.');
        }
    }
    catch(e) {
        this.page.error(e.message);
    }
};