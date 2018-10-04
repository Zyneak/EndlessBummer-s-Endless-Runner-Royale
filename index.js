

class Camera{
  constructor(a) {
      console.log(a);
  }
};


const vsSource = `
    attribute vec4 aVertexPosition;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    }
  `;

const fsSource = `
    void main() {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
  `;

class Game{
    constructor(canvas,setupCallback = this.setupCallback,draw) {
        this.canvas = document.querySelector("#" + canvas);

        this.glContext = this.canvas.getContext("webgl");


        if (this.glContext === null) { //Safe guard
            alert("Unable to initialize WebGL. Your browser or machine may not support it.");
            return;
        }
        this.program = this.initShaderProgram(this.glContext,vsSource,fsSource);

        let gl = this.glContext;

        this.positionBuffer = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER,this.positionBuffer);
        const positions = [
            -1.0,  1.0,
            1.0,  1.0,
            -1.0, -1.0,
            1.0, -1.0,
        ];
        gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(positions),gl.STATIC_DRAW);


        this.draw = draw;
        //this.draw.call(this);
    }

    initShaderProgram(gl,vsSource,fsSource) {
        const vertexShader = this.loadShader(gl,gl.VERTEX_SHADER,vsSource);
        const fragmentShader = this.loadShader(gl,gl.FRAGMENT_SHADER,fsSource);

        const shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram,vertexShader);
        gl.attachShader(shaderProgram,fragmentShader);
        gl.linkProgram(shaderProgram);



        if(!gl.getProgramParameter(shaderProgram,gl.LINK_STATUS)) {
            alert("UNABLE TO INITALIZE SHADER PROGRAM: " + gl.getProgramInfoLog(shaderProgram));
            return null; //
        }

        this.vertexPosition = gl.getAttribLocation(shaderProgram, 'aVertexPosition')
        this.projectionMatrix = gl.getUniformLocation(shaderProgram, 'uProjectionMatrix')
            this.modelViewMatrix = gl.getUniformLocation(shaderProgram, 'uModelViewMatrix')

        return shaderProgram;
    }

    loadShader(gl,shaderType,source){
        const shaderID = gl.createShader(shaderType);

        gl.shaderSource(shaderID,source);

        gl.compileShader(shaderID);

        if(!gl.getShaderParameter(shaderID,gl.COMPILE_STATUS)) {
            alert("UNABLE TO COMPILE SHADER: " + gl.getShaderInfoLog(shaderID));
            //gl.deleteShader();
            return null; //
        }

        return shaderID;
    }



    loop() {
        let a = this;
        window.setInterval(function() {
            a.draw();
        },1000 / 144);
        let l = 0;
        let FPS = 60;
    }

    setupCallback() {
    }
};



let a = new Game("quake_op_af",null,function(a) {
    let gl = this.glContext;
    gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
    gl.clearDepth(1.0);                 // Clear everything
    gl.enable(gl.DEPTH_TEST);           // Enable depth testing
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //          Deg to Rad pi/180
    const FOV = 45 * Math.PI/180;
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.01;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();

    mat4.perspective(projectionMatrix,FOV,aspect,zNear,zFar);

    const modelViewMatrix = mat4.create();

    mat4.translate(modelViewMatrix,modelViewMatrix,[-0,0,-6.0]);

    {
        const numComponents = 2;
        const type = gl.FLOAT;
        const normalize = false;
        const stride = 0;

        const offset = 0;
        gl.bindBuffer(gl.ARRAY_BUFFER,this.positionBuffer);
        gl.vertexAttribPointer(this.vertexPosition,numComponents,type,normalize,stride,offset);
        gl.enableVertexAttribArray(this.vertexPosition);
    }

    gl.useProgram(this.program);

        gl.uniformMatrix4fv(this.projectionMatrix,false,projectionMatrix);
        gl.uniformMatrix4fv(this.modelViewMatrix,false,modelViewMatrix);

    {
        const offset  =0;
        const vertextCount = 4;
        gl.drawArrays(gl.TRIANGLE_STRIP,offset,vertextCount);
    }

});

a.loop();