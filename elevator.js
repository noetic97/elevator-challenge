export default class Elevator {
  constructor() {
    this.currentFloor = 0;
    this.requests = [];
    this.passengers = [];
    this.stops = 0
    this.floorsTraversed = 0
  }

  reset() {
    this.currentFloor = 0;
    this.requests = [];
    this.passengers = [];
    this.stops = 0;
    this.floorsTraversed = 0
  }

  goToFloor(person) {
    this.requests.push(person);

    while (person.currentFloor > this.currentFloor) {
      this.currentFloor++;
      this.floorsTraversed++;
    }
    this.stops++;
    this.passengers.push(person.name);

    while (person.dropOffFloor > this.currentFloor) {
      this.currentFloor++;
      this.floorsTraversed++;
    }

    while (person.dropOffFloor < this.currentFloor) {
      this.currentFloor--;
      this.floorsTraversed++;
    }
    this.stops++;
  }
}
