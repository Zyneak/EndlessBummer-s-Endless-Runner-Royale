import {vec3} from "gl-matrix";
import PhysicsBody from "./PhysicsBody";

//@Todo Have gravity be calculated from time delta
let gravity = (9.8)/30; //This is NOT CORRECT

export default class Physics {
    constructor() {
        this.bodies = [];
        this.lastTime;
        this.firstRun = true;
        this.timeDelta;
    }

    run =() =>{
        if(this.firstRun == true) {
            this.timeDelta = 1 / 60;
            this.firstRun = false;
        } else {
            this.timeDelta = ((new Date().getTime()-this.lastTime)) * 0.001;
            this.lastTime = new Date().getTime();
        }
        for(let i = 0; i < this.bodies.length; i++) {
            this.bodies[i].needsUpdate = true;
        }


        console.log(new Date().getTime());
        for(let i = 0; i < this.bodies.length; i++) { //Objects are treated in terms of Object 1
            if (this.bodies[i].movable == false) continue; //If object is inmovable, don't run physics simulation
            let obj1 = this.bodies[i];
            for(let k = 0; k < this.bodies.length; k++) {
                let obj2 = this.bodies[k];
                //@TODO Implement checking to see if objects are to far to collide
                //If v and k are not the same object
                if(obj1.id!=obj2.id) {
                    if(obj1.collidesWith(obj2)) { //A collision has occurred between Object 1 and Object 2
                        //Momentum = Mass * Velocity
                        if(obj2.movable == false) {
                           // console).log("P = " + obj1.mass *
                        }

                        //console.log("Collision Detected between " + obj1.name + " and " + obj2.name);
                    } else {

                    }
                } else {

                }
            }
            //Apply velocity change to position
            let changeInPosition = vec3.create();
            //vec3.multiply(changeInPosition,)
            this.bodies[i].velocity = vec3.fromValues(this.bodies[i].velocity[0],
                this.bodies[i].velocity[0][1] + 9.8*(1/30),0);
        }
    }

    addBody =(body) => {
        this.bodies.push(body);
    }
}