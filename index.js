


const vsSource = `
    attribute vec3 aVertexPosition;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;


    varying vec3 v_positionWithOffset; 
    void main() {
        v_positionWithOffset = aVertexPosition;
      gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aVertexPosition,1.0);
    }
  `;

const fsSource = `precision mediump float;
varying vec3 v_positionWithOffset;
    void main() {
        vec3 newVec = clamp(v_positionWithOffset,vec3(0.1,0.0,0.0),vec3(1,1,1));
      gl_FragColor = vec4(newVec, 1.0);
    }
  `;

class Camera{
    constructor() {
        this.position = vec3.fromValues(3,0,-4);
        this.rotation = vec2.fromValues(0,0);
        
    }
}



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
            -1.0,-1.0,-1.0, // triangle 1 : begin
            -1.0,-1.0, 1.0,
            -1.0, 1.0, 1.0, // triangle 1 : end
            1.0, 1.0,-1.0, // triangle 2 : begin
            -1.0,-1.0,-1.0,
            -1.0, 1.0,-1.0, // triangle 2 : end
            1.0,-1.0, 1.0,
            -1.0,-1.0,-1.0,
            1.0,-1.0,-1.0,
            1.0, 1.0,-1.0,
            1.0,-1.0,-1.0,
            -1.0,-1.0,-1.0,
            -1.0,-1.0,-1.0,
            -1.0, 1.0, 1.0,
            -1.0, 1.0,-1.0,
            1.0,-1.0, 1.0,
            -1.0,-1.0, 1.0,
            -1.0,-1.0,-1.0,
            -1.0, 1.0, 1.0,
            -1.0,-1.0, 1.0,
            1.0,-1.0, 1.0,
            1.0, 1.0, 1.0,
            1.0,-1.0,-1.0,
            1.0, 1.0,-1.0,
            1.0,-1.0,-1.0,
            1.0, 1.0, 1.0,
            1.0,-1.0, 1.0,
            1.0, 1.0, 1.0,
            1.0, 1.0,-1.0,
            -1.0, 1.0,-1.0,
            1.0, 1.0, 1.0,
            -1.0, 1.0,-1.0,
            -1.0, 1.0, 1.0,
            1.0, 1.0, 1.0,
            -1.0, 1.0, 1.0,
            1.0,-1.0, 1.0
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




let cam = new Camera();
let a = new Game("quake_op_af",null,function(a) {
    let gl = this.glContext;
    gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
    gl.clearDepth(1.0);                 // Clear everything
    gl.enable(gl.DEPTH_TEST);           // Enable depth testing
    gl.depthFunc(gl.LESS);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //          Deg to Rad pi/180
    const FOV = 45 * Math.PI/180;
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.01;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();

    mat4.perspective(projectionMatrix,FOV,aspect,zNear,zFar);

    const modelViewMatrix = mat4.create();
   // console.log(cam.rotation) 
    mat4.rotateY(modelViewMatrix,modelViewMatrix,cam.rotation[0] * (Math.PI/180));
    mat4.translate(modelViewMatrix,modelViewMatrix,[cam.position[0],0,cam.position[2]]);

    {
        const numComponents = 3;
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
        const vertextCount = 12*3;
        gl.drawArrays(gl.TRIANGLES,offset,36);
    }

});

a.canvas.addEventListener("click",function(e) {
    e.target.requestPointerLock();
})

let speed = 0.01;
document.addEventListener("keydown",function(e) {
    console.log(cam);
    let oldPos = this.position;
    switch(e.key){
        case "w":
            
            vec3.add(cam.position,
                cam.position,
               vec3.fromValues(
                Math.cos(cam.rotation[0] * (Math.PI/180) )* speed,
                0,
                Math.sin(cam.rotation[0] * (Math.PI/180) )* speed));
                console.log(cam.position);
                console.log( (Math.cos(cam.rotation[0] * (Math.PI/180) )* speed) + " " +  Math.sin(cam.rotation[0] * (Math.PI/180) )* speed)
            break;
            case "s":
            
            vec3.add(cam.position,
                cam.position,
               vec3.fromValues(
                Math.cos((cam.rotation[0]+180) * (Math.PI/180))* speed,
                0,
                Math.sin((cam.rotation[0]+180) * (Math.PI/180))* speed));
            console.log(cam.position);
            break;
            case "a":
            
            vec3.add(cam.position,
                cam.position,
               vec3.fromValues(
                Math.cos((cam.rotation[0]+90) * (Math.PI/180) )* speed,
                0,
                Math.sin((cam.rotation[0]+90) * (Math.PI/180) )* speed));
            console.log(cam.position);
            break;
            case "d":
            
            vec3.add(cam.position,
                cam.position,
               vec3.fromValues(
                Math.cos((cam.rotation[0]-90) * (Math.PI/180))* speed,
                0,
                Math.sin((cam.rotation[0]-90) * (Math.PI/180))* speed));
            console.log(cam.position);
            break;

            case "q":
            
            vec2.add(cam.rotation,
                cam.rotation,
               vec2.fromValues(-1,0));
            console.log("Rot: " + cam.rotation);
            break;
            case "e":
            
            vec2.add(cam.rotation,
                cam.rotation,
               vec2.fromValues(1,0));
            console.log("Rot: " + cam.rotation);
            break;
    }
    document.getElementById("position").innerHTML = "Position: " + cam.position[0].toFixed(3) + ", " + cam.position[1].toFixed(3) + ", " + cam.position[2].toFixed(3);
    document.getElementById("rotation").innerHTML = "Rotation: " + cam.rotation[0] + ", " + cam.rotation[1];

});

a.loop();