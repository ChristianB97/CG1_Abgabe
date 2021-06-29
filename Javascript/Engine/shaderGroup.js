export function ShaderGroup(vertexShaderName, fragmentShaderName)
{
  this.fragmentShaderName = fragmentShaderName;
  this.vertexShaderName = vertexShaderName;
  this.areSameShadersUsed = areSameShadersUsed.bind(this);

  this.renderers = [];
  this.unfinishedRenderers = [];
  this.addRenderer = addRenderer.bind(this);

  this.program = null;
  this.isProgramReady = function(){ return this.program != null; }

  this.getMeshRenderers = function() { return this.meshRenderers; };
}

function addRenderer(renderer)
{
  if (renderer.isDataLoaded()){
    this.renderers.push(renderer);
  }
  else{
    renderer.onDataLoaded.addEventListener(addRenderer.bind(this));
  }
}

function areSameShadersUsed(vertexShaderName, fragmentShaderName)
{
  var isVertexShaderTheSame = this.vertexShaderName == vertexShaderName;
  var isFragmentShaderTheSame = this.fragmentShaderName == fragmentShaderName;
  return isVertexShaderTheSame&&isFragmentShaderTheSame;
}
