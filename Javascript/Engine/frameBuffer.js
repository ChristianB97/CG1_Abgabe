export function FrameBuffer(gl, isDefault)
{
  if (isDefault===true){
    this.frameBuffer = null;
  }
  else{
    this.frameBuffer = gl.createFramebuffer();
    this.depthBuffer = gl.createRenderbuffer();

    this.frameBufferTextureDefault = gl.createTexture();
    this.otherTexture = gl.createTexture();
    initFrameBuffer.call(this, gl);
  }
  this.setThisAsCurrentFrameBuffer = setThisAsCurrentFrameBuffer.bind(this);
  this.initialHeight = gl.canvas.height;
  this.initialWidth = gl.canvas.width;
  this.gl=gl;
  this.setTextureAspectRatio = setTextureAspectRatio.bind(this);
}

function setTextureAspectRatio(vec2AspectRatio)
{
  var newResolutionHeigt = 1920;
  var newResolutionWidth = 1080;
  if (vec2AspectRatio[0]>vec2AspectRatio[1]){
    var newRatio = vec2AspectRatio[1] / vec2AspectRatio[0];
    newResolutionHeigt = this.initialHeight;
    newResolutionWidth = this.initialHeight * newRatio;
  }
  else if (vec2AspectRatio[1]>vec2AspectRatio[0]){
    var newRatio = vec2AspectRatio[0] / vec2AspectRatio[1];
    newResolutionHeigt = this.initialWidth * newRatio;
    newResolutionWidth = this.initialWidth;

  }
  else
  {
    if(this.initialHeight>this.initialWidth){
      newResolutionHeigt = this.initialHeight;
      newResolutionWidth = this.initialHeight;
    }
    else {
      newResolutionHeigt = this.initialWidth;
      newResolutionWidth = this.initialWidth;
    }
  }
  console.log(newResolutionHeigt);
  console.log(newResolutionWidth);
  initRenderingToTexture.call(this, this.gl, this.frameBufferTextureDefault, 0, newResolutionHeigt, newResolutionWidth);
}

function setThisAsCurrentFrameBuffer(gl)
{
  gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
}

function initFrameBuffer(gl)
{
  initRenderingToTexture.call(this, gl, this.frameBufferTextureDefault, 0, gl.canvas.height, gl.canvas.width);
  gl.drawBuffers([gl.COLOR_ATTACHMENT0, gl.COLOR_ATTACHMENT1]);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  gl.bindTexture(gl.TEXTURE_2D, null);
}

function initRenderingToTexture(gl, texture, colorAttachment, height, width)
{
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);

  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, width, height, 0, gl.RGB, gl.UNSIGNED_BYTE, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0+colorAttachment, gl.TEXTURE_2D, texture, 0);

  gl.bindRenderbuffer(gl.RENDERBUFFER, this.depthBuffer);

  gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);
  gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.depthBuffer);
}
