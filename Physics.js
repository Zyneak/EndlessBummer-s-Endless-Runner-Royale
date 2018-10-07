import {vec3} from "gl-matrix";

export default class Physics {
    constructor() {
        this.bodies = {};
    }

    addBody =(body) => {
        this.bodies.push(body);
    }
}