import {vec3} from "gl-matrix";
import PhysicsBody from "./PhysicsBody";

export default class Physics {
    constructor() {
        this.bodies = [];
    }

    run =() =>{
        for(let i = 0; i < this.bodies.length-1; i++) {

            for(let k = 0; k < this.bodies.length-1; k++) {
                //If v and k are not the same object AND the distance between i and k is less than 10 units
                if(this.bodies[k].id!=this.bodies[i].id && PhysicsBody.distanceFrom(this.bodies[k],this.bodies[i]) < 10) {
                    if(this.bodies[k].collidesWith(this.bodies[k])) {
                        console.log("Hi")
                    }
                } else {
                }
            }
        }
    }

    addBody =(body) => {
        this.bodies.push(body);
    }
}