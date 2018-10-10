import {vec3} from "gl-matrix";
import PhysicsBody from "./PhysicsBody";

//@Todo Have gravity be calculated from time delta
let gravity = (9.8)/30; //This is NOT CORRECT

export default class Physics {
    constructor() {
        this.bodies = [];
    }

    run =() =>{
        for(let i = 0; i < this.bodies.length; i++) {

            for(let k = 0; k < this.bodies.length; k++) {
                //If v and k are not the same object AND the distance between i and k is less than 10 units
                if(this.bodies[k].id!=this.bodies[i].id && PhysicsBody.distanceFrom(this.bodies[k],this.bodies[i]) < 10) {
                    if(this.bodies[i].collidesWith(this.bodies[k])) {
                        this.bodies[i].velocity = vec3.create();
                        console.log(this.bodies[i].bounds);
                        console.log(this.bodies[k].bounds);
                        console.log("Collision Detected!");
                    } else {
                        this.bodies[i].velocity = vec3.fromValues(this.bodies[i].velocity[0],
                                                                this.bodies[i].velocity[0][1] + 9.8*(1/30),0);
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