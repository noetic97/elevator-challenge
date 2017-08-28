require('babel-core/register')({
  ignore: /node_modules\/(?!ProjectB)/
});

const assert = require('chai').assert;
const Elevator = require('../elevator').default;
const Person = require('../person').default;

describe('Person', () => {
  let person = new Person('Joe', 7, 15);

  it('A person should have a name, current floor and requested floor', () => {
    assert.equal(person.name, 'Joe')
    assert.equal(person.currentFloor, 7)
    assert.equal(person.dropOffFloor, 15)
  })
})

describe('Elevator', () => {
  let elevator = new Elevator();

  beforeEach(() => {
    elevator.reset();
  });

  it('should have initial properties', () => {
    assert.equal(elevator.currentFloor, 0);
    assert.deepEqual(elevator.requests, []);
    assert.deepEqual(elevator.passengers, []);
    assert.equal(elevator.stops, 0);
    assert.equal(elevator.floorsTraversed, 0);
  });

  it('should reset its properties when reset is called', () => {
    elevator.currentFloor = 10;
    elevator.requests = [2, 5, 7];
    elevator.passengers = ['Joe', 'Sam', 'Leslie'];
    elevator.stops = 2;
    elevator.floorsTraversed = 10;

    elevator.reset()

    assert.equal(elevator.currentFloor, 0);
    assert.deepEqual(elevator.requests, []);
    assert.deepEqual(elevator.passengers, []);
    assert.equal(elevator.stops, 0);
    assert.equal(elevator.floorsTraversed, 0);

  })

  it('should bring a rider to a floor above their current floor', () => {
    let person = new Person('Brittany', 2, 5);
    elevator.goToFloor(person);

    assert.equal(elevator.stops, 2);
    assert.equal(elevator.floorsTraversed, 5);
    assert.equal(elevator.currentFloor, 5);
  });

  it('should bring a rider to a floor below their current floor', () => {
    let person = new Person('Brittany', 8, 3);
    elevator.goToFloor(person);

    assert.equal(elevator.stops, 2);
    assert.equal(elevator.floorsTraversed, 13);
    assert.equal(elevator.currentFloor, 3);
  });

  it('should be able to drop off multiple people in the order that they called the elevator', () => {
    let person1 = new Person('Bob', 3, 9);
    let person2 = new Person('Sue', 6, 2);

    elevator.goToFloor(person1);
    assert.equal(elevator.stops, 2);
    assert.equal(elevator.floorsTraversed, 9);
    assert.equal(elevator.currentFloor, 9);

    elevator.goToFloor(person2);
    assert.equal(elevator.stops, 4);
    assert.equal(elevator.floorsTraversed, 16);
    assert.equal(elevator.currentFloor, 2);
  })

  describe('multiple up and down scenarios with two people', () => {
    it('Person A goes up, Person B goes up', () => {
      let personA = new Person('Bob', 2, 9);
      let personB = new Person('Sue', 3, 5);

      assert.equal(elevator.requests.length, 0)
      assert.equal(elevator.passengers.length, 0)

      elevator.goToFloor(personA);
      assert.equal(elevator.stops, 2);
      assert.equal(elevator.floorsTraversed, 9);
      assert.equal(elevator.currentFloor, 9);
      assert.equal(elevator.requests.length, 1)
      assert.equal(elevator.passengers.length, 1)

      elevator.goToFloor(personB);
      assert.equal(elevator.stops, 4);
      assert.equal(elevator.floorsTraversed, 13);
      assert.equal(elevator.currentFloor, 5);
      assert.equal(elevator.requests.length, 2)
      assert.equal(elevator.passengers.length, 2)
    })

    it('Person A goes up, Person B goes down', () => {
      let personA = new Person('Bob', 2, 9);
      let personB = new Person('Sue', 3, 0);

      assert.equal(elevator.requests.length, 0)
      assert.equal(elevator.passengers.length, 0)

      elevator.goToFloor(personA);
      assert.equal(elevator.stops, 2);
      assert.equal(elevator.floorsTraversed, 9);
      assert.equal(elevator.currentFloor, 9);
      assert.equal(elevator.requests.length, 1)
      assert.equal(elevator.passengers.length, 1)

      elevator.goToFloor(personB);
      assert.equal(elevator.stops, 4);
      assert.equal(elevator.floorsTraversed, 18);
      assert.equal(elevator.currentFloor, 0);
      assert.equal(elevator.requests.length, 2)
      assert.equal(elevator.passengers.length, 2)
    })

    it('Person A goes down, Person B goes up', () => {
      let personA = new Person('Bob', 9, 2);
      let personB = new Person('Sue', 2, 72);

      assert.equal(elevator.requests.length, 0)
      assert.equal(elevator.passengers.length, 0)

      elevator.goToFloor(personA);
      assert.equal(elevator.stops, 2);
      assert.equal(elevator.floorsTraversed, 16);
      assert.equal(elevator.currentFloor, 2);
      assert.equal(elevator.requests.length, 1)
      assert.equal(elevator.passengers.length, 1)

      elevator.goToFloor(personB);
      assert.equal(elevator.stops, 4);
      assert.equal(elevator.floorsTraversed, 86);
      assert.equal(elevator.currentFloor, 72);
      assert.equal(elevator.requests.length, 2)
      assert.equal(elevator.passengers.length, 2)
    })

    it('Person A goes down, Person B goes down', () => {
      let personA = new Person('Bob', 2, 0);
      let personB = new Person('Sue', 12, 0);

      assert.equal(elevator.requests.length, 0)
      assert.equal(elevator.passengers.length, 0)

      elevator.goToFloor(personA);
      assert.equal(elevator.stops, 2);
      assert.equal(elevator.floorsTraversed, 4);
      assert.equal(elevator.currentFloor, 0);
      assert.equal(elevator.requests.length, 1)
      assert.equal(elevator.passengers.length, 1)

      elevator.goToFloor(personB);
      assert.equal(elevator.stops, 4);
      assert.equal(elevator.floorsTraversed, 28);
      assert.equal(elevator.currentFloor, 0);
      assert.equal(elevator.requests.length, 2)
      assert.equal(elevator.passengers.length, 2)
    })
  })
});
