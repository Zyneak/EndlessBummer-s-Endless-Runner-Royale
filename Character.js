import {vec3} from "gl-matrix";
import {PhysicsBody} from "PhysicsBody";

export default class Character {

    constructor() {

        this.size = vec3.fromValues(1,2,1)
        this.PhysicsBody = new PhysicsBody(this.size);
    }
}