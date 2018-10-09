import {vec3} from "gl-matrix";

/*Can only deal with box physics*/

export default class PhysicsBody {
    constructor(size = vec3.create(),position = vec3.create()) {
        this.size = vec3.clone(size);
        this.position = vec3.clone(position);
        this.velocity = vec3.create();
        this.id = Math.floor(Math.random() * Math.floor(99999999));
        this.bounds = this.calculateBounds();
        this.name = "Object";
    }

    calculateBounds =() => {
        this.bounds = {
            x: {min: this.position[0]-this.size[0], max: this.position[0]+this.size[0]},
            y: {min: this.position[1]-this.size[1], max: this.position[1]+this.size[1]},
            z: {min: this.position[2]-this.size[2], max: this.position[2]+this.size[2]}};
    }

    //Debug method
    info =() => {
        console.log("Info for " + this.name
            + ": Position: " + vec3.str(this.position)
            + ": Position: " + vec3.str(this.position))
    }


    collidesWith =(obj) => {
        this.calculateBounds();
        obj.calculateBounds();
        let V1 = this.velocity;
        console.log(V1);
        let V2 = vec3.fromValues(-3,-6,0);
        //Resultant
        let R1 = vec3.create();
        vec3.add(R1,V1,V2);
        //if(this.calculateBounds().x.min)
        return true;

    }

    static distanceFrom =(obj1,obj2) => {
        //Distance formula sqrt(((p2x-p1x)^2 + (p2y-p1y)^2 + (p2z-p1z)^2)
        return Math.sqrt((obj2.position[0]-obj1.position[0])^2 +
            (obj2.position[1]-obj1.position[1])^2 +
            (obj2.position[2]-obj1.position[2])^2)
    }
}