import {vec3} from "gl-matrix";

/*Can only deal with box physics*/

export default class PhysicsBody {
    constructor(size = vec3.create(),position = vec3.create()) {
        this.size = vec3.clone(size);
        this.position = vec3.clone(position);
        this.velocity = vec3.create();
        this.id = Math.floor(Math.random() * Math.floor(99999999));
    }

    static distanceFrom =(obj1,obj2) => {
        //Distance formula sqrt(((p2x-p1x)^2 + (p2y-p1y)^2 + (p2z-p1z)^2)
        console.log(obj2);
        return Math.sqrt((obj2.position[0]-obj1.position[0])^2 +
            (obj2.position[1]-obj1.position[1])^2 +
            (obj2.position[2]-obj1.position[2])^2)
    }
}