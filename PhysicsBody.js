import {vec3} from "gl-matrix";

/*Can only deal with box physics*/

export default class PhysicsBody {
    constructor(size = vec3.create(),position = vec3.create()) {
        this.size = vec3.clone(size);
        this.position = vec3.clone(position);
        this.velocity = vec3.create();
        this.id = Math.floor(Math.random() * Math.floor(99999999));
        this.bounds = {
            x: [this.position[0]-this.size[0],this.position[0]+this.size[0]],
            y: [this.position[1]-this.size[1],this.position[1]+this.size[1]],
            z: [this.position[2]-this.size[2],this.position[2]+this.size[2]]};

    }

    calculateBounds =() => {
        this.bounds = {
            x: [this.position[0]-this.size[0],this.position[0]+this.size[0]],
            y: [this.position[1]-this.size[1],this.position[1]+this.size[1]],
            z: [this.position[2]-this.size[2],this.position[2]+this.size[2]]};
    }


    collidesWith =(obj) => {
        this.calculateBounds();
        obj.calculateBounds();
        if()

    }

    static distanceFrom =(obj1,obj2) => {
        //Distance formula sqrt(((p2x-p1x)^2 + (p2y-p1y)^2 + (p2z-p1z)^2)
        console.log(obj2);
        return Math.sqrt((obj2.position[0]-obj1.position[0])^2 +
            (obj2.position[1]-obj1.position[1])^2 +
            (obj2.position[2]-obj1.position[2])^2)
    }
}