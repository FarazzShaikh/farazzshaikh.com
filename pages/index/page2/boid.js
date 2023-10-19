import * as THREE from "https://cdn.skypack.dev/three";

export class Boid3D extends THREE.Mesh {
  constructor(geometry = new THREE.ConeGeometry(1, 3, 5), material = new THREE.MeshNormalMaterial()) {
    super(geometry, material); // create the actual mesh

    this.acceleration = new THREE.Vector3(0);
    this.velocity = new THREE.Vector3(0);
  }

  update = (actors, boidsSettings) => {
    this.boidBehavior(actors, boidsSettings);
    this.applyForce(boidsSettings.maxSpeed);
    this.rotateMesh();
    this.updatePos();
    this.acceleration.set(0, 0, 0); // reset forces
  };

  rotateMesh = () => {
    this.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), this.velocity.clone().normalize());
  };

  applyForce = (maxSpeed) => {
    this.velocity.add(this.acceleration).clampLength(0, maxSpeed);
  };

  updatePos = () => {
    this.position.add(this.velocity);
  };

  boidBehavior = (actors, boidsSettings) => {
    const [allignment, seperation, cohesion] = this.calcForces(actors, boidsSettings);

    /* apply weights */
    seperation.multiplyScalar(boidsSettings.seperationWeight);
    allignment.multiplyScalar(boidsSettings.allignmentWeight);
    cohesion.multiplyScalar(boidsSettings.cohesionWeight);

    /* update total force */
    this.acceleration.add(seperation);
    this.acceleration.add(allignment);
    this.acceleration.add(cohesion);

    /* apply extra force that returns boids to center eventually */
    if (this.position.length() > boidsSettings.homeDist) {
      const homeForce = this.steerTo(boidsSettings.home, boidsSettings.maxSpeed, boidsSettings.maxForce).multiplyScalar(boidsSettings.homeWeight);

      /* console.log(homeForce)
            debugger */
      this.acceleration.sub(homeForce);
    }
  };

  steerTo = (target, maxSpeed, maxForce) => {
    const targetVec = new THREE.Vector3().subVectors(target, this.position);

    targetVec.setLength(maxSpeed);

    const steer = new THREE.Vector3().subVectors(this.velocity, targetVec);
    steer.clampLength(0, maxForce);
    return steer;
  };

  /* merge of of the 3 functions  to improve performance */
  calcForces = (otherActors, settings) => {
    const seperationSum = new THREE.Vector3(0, 0, 0);
    const allignmentSum = new THREE.Vector3(0, 0, 0);
    const cohesionSum = new THREE.Vector3(0, 0, 0);

    let seperationCount = 0;
    let allignmentCount = 0;
    let cohesionCount = 0;

    const actorsLen = otherActors.length;

    for (let i = 0; i < actorsLen; i++) {
      /* get distance of current boid the the boid at pos i */
      const actorDist = this.position.distanceTo(otherActors[i].position);
      if (actorDist > 0) {
        /* sum up all velocity of all neighbors in a given distance  */
        if (actorDist < settings.allignDist) {
          allignmentSum.add(otherActors[i].velocity);
          allignmentCount++;
        }
        /* sum up all POSITIONS of all neighbors in a given distance */
        if (actorDist < settings.cohesionDist) {
          cohesionSum.add(otherActors[i].position);
          cohesionCount++;
        }
        /* sum up vetors pointing away from too close neighbors */
        if (actorDist < settings.seperationDist) {
          const vecDir = new THREE.Vector3().subVectors(this.position, otherActors[i].position);
          vecDir.normalize();
          vecDir.divideScalar(actorDist);
          seperationSum.add(vecDir);
          seperationCount++;
        }
      }
    }

    /* calc allignment force */
    if (allignmentCount > 0) {
      allignmentSum.divideScalar(allignmentCount);
      allignmentSum.setLength(settings.maxSpeed);
      allignmentSum.sub(this.velocity);
      allignmentSum.clampLength(0, settings.maxForce);
    } else allignmentSum.set(0, 0, 0);

    /* calc cohesion force */
    if (cohesionCount > 0) {
      cohesionSum.divideScalar(cohesionCount);
      cohesionSum.copy(this.steerTo(cohesionSum, settings.maxSpeed, settings.maxForce));
    }

    /* calc seperation force */
    if (seperationCount > 0) {
      seperationSum.divideScalar(seperationCount);
    }
    if (seperationSum.length() > 0) {
      seperationSum.setLength(settings.maxSpeed);
      seperationSum.sub(this.velocity);
      seperationSum.clampLength(0, settings.maxForce);
    }
    return [allignmentSum, cohesionSum, seperationSum];
  };
}

/* 
same like above just on vector2 you could of course extend that
 or do checks inside of update but I prefer some performance over space
*/

export class Boid2D extends THREE.Mesh {
  constructor(geometry = new THREE.ConeGeometry(1, 3, 5), material = new THREE.MeshNormalMaterial()) {
    super(geometry, material); // create the actual mesh

    this.acceleration = new THREE.Vector2(0);
    this.velocity = new THREE.Vector2(0);
  }

  update = (actors, boidsSettings) => {
    this.boidBehavior(actors, boidsSettings);
    this.applyForce(boidsSettings.maxSpeed);
    this.rotateMesh();
    this.updatePos();
    this.acceleration.set(0, 0, 0); // reset forces
  };

  /* rotateMesh = () => {
        this.quaternion.setFromUnitVectors(new THREE.Vector2(0, 1, 0), this.velocity.clone().normalize());
    } */

  rotateMesh = () => {
    this.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(this.velocity.x, this.velocity.y, 0).normalize());
  };

  applyForce = (maxSpeed) => {
    this.velocity.add(this.acceleration).clampLength(0, maxSpeed);
  };

  updatePos = () => {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  };

  boidBehavior = (actors, boidsSettings) => {
    const [allignment, seperation, cohesion] = this.calcForces(actors, boidsSettings);
    /* apply weights */
    seperation.multiplyScalar(boidsSettings.seperationWeight);
    allignment.multiplyScalar(boidsSettings.allignmentWeight);
    cohesion.multiplyScalar(boidsSettings.cohesionWeight);
    /* update total force */
    this.acceleration.add(seperation);
    this.acceleration.add(allignment);
    this.acceleration.add(cohesion);

    /* apply extra force that returns boids to center eventually */
    if (this.position.length() > boidsSettings.homeDist) {
      const homeForce = this.steerTo(boidsSettings.home, boidsSettings.maxSpeed, boidsSettings.maxForce).multiplyScalar(boidsSettings.homeWeight);

      /* console.log(homeForce)
            debugger */
      this.acceleration.sub(homeForce);
    }
  };

  steerTo = (target, maxSpeed, maxForce) => {
    const targetVec = new THREE.Vector2().subVectors(target, this.position);

    targetVec.setLength(maxSpeed);

    const steer = new THREE.Vector2().subVectors(this.velocity, targetVec);
    steer.clampLength(0, maxForce);
    //debugger

    return steer;
  };

  /* merge of of the 3 functions  to improve performance */
  calcForces = (otherActors, settings) => {
    const seperationSum = new THREE.Vector2(0, 0, 0);
    const allignmentSum = new THREE.Vector2(0, 0, 0);
    const cohesionSum = new THREE.Vector2(0, 0, 0);

    let seperationCount = 0;
    let allignmentCount = 0;
    let cohesionCount = 0;

    const actorsLen = otherActors.length;

    for (let i = 0; i < actorsLen; i++) {
      /* get distance of current boid the the boid at pos i */
      const actorDist = this.position.distanceTo(otherActors[i].position);
      if (actorDist > 0) {
        /* sum up all velocity of all neighbors in a given distance  */
        if (actorDist < settings.allignDist) {
          allignmentSum.add(otherActors[i].velocity);
          allignmentCount++;
        }
        /* sum up all POSITIONS of all neighbors in a given distance */
        if (actorDist < settings.cohesionDist) {
          cohesionSum.add(otherActors[i].position);
          cohesionCount++;
        }
        /* sum up vetors pointing away from too close neighbors */
        if (actorDist < settings.seperationDist) {
          const vecDir = new THREE.Vector2().subVectors(this.position, otherActors[i].position);
          vecDir.normalize();
          vecDir.divideScalar(actorDist);
          seperationSum.add(vecDir);
          seperationCount++;
        }
      }
    }

    /* calc allignment force */
    if (allignmentCount > 0) {
      allignmentSum.divideScalar(allignmentCount);
      allignmentSum.setLength(settings.maxSpeed);
      allignmentSum.sub(this.velocity);
      allignmentSum.clampLength(0, settings.maxForce);
    } else allignmentSum.set(0, 0, 0);

    /* calc cohesion force */
    if (cohesionCount > 0) {
      cohesionSum.divideScalar(cohesionCount);
      cohesionSum.copy(this.steerTo(cohesionSum, settings.maxSpeed, settings.maxForce));
    }

    /* calc seperation force */
    if (seperationCount > 0) {
      seperationSum.divideScalar(seperationCount);
    }
    if (seperationSum.length() > 0) {
      seperationSum.setLength(settings.maxSpeed);
      seperationSum.sub(this.velocity);
      seperationSum.clampLength(0, settings.maxForce);
    }
    return [allignmentSum, cohesionSum, seperationSum];
  };
}
