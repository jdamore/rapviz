function Page() {
}

Page.editor = CodeMirror.fromTextArea(document.getElementById('editor_textarea'), {
    lineNumbers: true,
    lineWrapping: true
});

Page.prototype = new Page();
Page.prototype.constructor = Page;

Page.prototype.inputUrl = function() {
	return document.getElementById('get_input').value;
};

Page.prototype.inputFile = function() {
	return document.getElementById('file_input');
};

Page.prototype.getInputText = function() {
	return Page.editor.getValue();
};

Page.prototype.setInputText = function(text) {
	Page.editor.setValue(text);
};

Page.prototype.drawButton = function() {
	return document.getElementById('draw_button');
};

Page.prototype.saveButton = function() {
	return document.getElementById('save_button');
};

Page.prototype.outputSpan = function() {
	return document.getElementById('output_span');
};

Page.prototype.error = function(message) {
	document.getElementById('error').innerHTML = message;
};
