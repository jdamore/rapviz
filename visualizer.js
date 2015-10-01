function Visualizer(projects) {
  this.projects = projects;
  this.page = new Page();
  this.outputSpan = this.page.outputSpan();
}

Visualizer.prototype = new Visualizer();
Visualizer.prototype.constructor = Visualizer;

Visualizer.prototype.edgeTemplate = '"$name" [shape="$shape", style="$style", color="$color"];';
Visualizer.prototype.verticeTemplate = '"$from" -> "$to" [style="$style", label="$label"];';

Visualizer.prototype.viz = function() {

    this.outputSpan.innerHTML = '';
    _.each(this.projects, this.vizProject.bind(this));
};

Visualizer.prototype.vizProject = function(project) {

    var that = this;
    var digraph = 'digraph G { ';

    digraph += _.reduce(project.components, function(s, comp) {
        return s + that.vizComponent(comp);
    }, '');

    digraph += _.reduce(project.dependencies, function(s, dep) {
        return s + that.vizDependency(dep);
    }, '');

    digraph += ' }';
    console.log(digraph);
    
    this.outputSpan.innerHTML += '<h1>'+project.name+'</h1>';
    this.outputSpan.innerHTML += Viz(digraph);
}


Visualizer.prototype.compStyleMap = {
    none:       { shape: '',    style: '',          color: '' },
    digital:    { shape: '',    style: 'filled',    color: '.1 .1 1.0' },
    backend:    { shape: 'box', style: 'filled',    color: '1.0 .3 .7' },
    external:   { shape: 'box', style: 'filled',    color: '.7 .3 1.0' }
}

Visualizer.prototype.depStyleMap = {
    none:   { style: '' },
    sync:   { style: 'filled' },
    async:  { style: 'dotted' }
}

Visualizer.prototype.vizComponent = function(comp) {

    var compString = String(this.edgeTemplate);
    compString = compString.replace('$name', comp.name);
    compString = compString.replace('$shape', comp.type == null ? this.compStyleMap.none.shape : this.compStyleMap[comp.type].shape);
    compString = compString.replace('$style', comp.type == null ? this.compStyleMap.none.style : this.compStyleMap[comp.type].style);
    compString = compString.replace('$color', comp.type == null ? this.compStyleMap.none.color : this.compStyleMap[comp.type].color);
    return compString
};

Visualizer.prototype.vizDependency = function(dep) {

    var depString = String(this.verticeTemplate);
    depString = depString.replace('$from', dep.from);
    depString = depString.replace('$to', dep.to);
    depString = depString.replace('$style', dep.type == null ? this.depStyleMap.none.style : this.depStyleMap[dep.type].style);
    depString = depString.replace('$label', dep.label == null ? '' : dep.label);
    return depString;
};


