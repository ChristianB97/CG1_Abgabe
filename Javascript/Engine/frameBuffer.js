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

}

function setThisAsCurrentFrameBuffer(gl)
{
  gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
}

function initFrameBuffer(gl)
{
  initRenderingToTexture.call(this, gl, this.frameBufferTextureDefault, 0);
  gl.drawBuffers([gl.COLOR_ATTACHMENT0, gl.COLOR_ATTACHMENT1]);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  gl.bindTexture(gl.TEXTURE_2D, null);
}

function initRenderingToTexture(gl, texture, colorAttachment)
{
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);

  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.canvas.width, gl.canvas.height, 0, gl.RGB, gl.UNSIGNED_BYTE, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0+colorAttachment, gl.TEXTURE_2D, texture, 0);

  gl.bindRenderbuffer(gl.RENDERBUFFER, this.depthBuffer);

  gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, gl.canvas.width, gl.canvas.height);
  gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.depthBuffer);
}
