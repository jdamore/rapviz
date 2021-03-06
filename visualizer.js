function Visualizer(projects) {
  this.page = new Page();
}

function onlyUniqueAndNonNull(value, index, self) { 
    return value !=null && self.indexOf(value) === index;
}

Visualizer.prototype = new Visualizer();
Visualizer.prototype.constructor = Visualizer;

Visualizer.prototype.edgeTemplate = '"$name" [shape="$shape", style="$style", color="$color"];';
Visualizer.prototype.verticeTemplate = '"$from" -> "$to" [dir="$dir", style="$style", label="$label", color="$color"];';

Visualizer.prototype.viz = function(projects) {

    this.page.outputSpan().innerHTML = '';
    _.each(projects, this.vizProject.bind(this));
};

Visualizer.prototype.gviz = function(digraph) {

    this.page.outputSpan().innerHTML = '';
    this.vizDigraph(digraph);
};

Visualizer.prototype.vizDigraph = function(digraph) {

    var that = this;
    console.log(digraph);
    this.page.outputSpan().innerHTML += Viz(digraph);
}

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
    
    this.page.outputSpan().innerHTML += '<h1>'+project.name+'</h1>';
    this.page.outputSpan().innerHTML += Viz(digraph);
}

Visualizer.prototype.vizComponent = function(comp) {

    var compString = String(this.edgeTemplate);
    compString = compString.replace('$name', comp.name);
    compString = compString.replace('$shape', comp.shape == null ? '' : comp.shape);
    compString = compString.replace('$style', comp.style == null ? '' : comp.style);
    compString = compString.replace('$color', comp.color == null ? '' : comp.color);
    return compString
};

Visualizer.prototype.vizDependency = function(dep) {

    var depString = String(this.verticeTemplate);
    depString = depString.replace('$from', dep.from);
    depString = depString.replace('$to', dep.to);
    depString = depString.replace('$dir', dep.dir == null ? '' : dep.dir);
    depString = depString.replace('$style', dep.style == null ? '' : dep.style);
    depString = depString.replace('$label', dep.label == null ? '' : dep.label);
    depString = depString.replace('$color', dep.color == null ? '' : dep.color);
    return depString;
};


