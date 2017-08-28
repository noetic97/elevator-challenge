export default class Elevator {
  constructor() {
    this.floor = 0;
    this.requests = [];
    this.passengers = [];
  }
}

export default class Person {
  constructor(name) {
    this.name = name;
    this.currentFloor = 0;
    this.dropOffFloor = 0;
  }
}
