import * as glm from "gl-matrix";

export default class Camera {
    constructor() {
        this.position = glm.vec3.fromValues(3,2,-4);
        this.rotation = glm.vec2.fromValues(0,0);
        this.firstRun = true;
    }
}