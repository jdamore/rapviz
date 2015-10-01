function Bindable(){

}

Bindable.prototype.bind = function(fnName) {
  var that = this, fn = this[fnName];
  this[fnName] = function(){ fn.apply(that, arguments); };
};


function isYaml(input) {
    try {
        YAML.parse(input);
    } 
    catch (e) {
        return false;
    }
    return true;
};

function isJson(input) {
    try {
        eval(input);
    } 
    catch (e) {
        return false;
    }
    return true;
};
