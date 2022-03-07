// Pet Shelter
// Write the classes and methods that will be necessary to make the code run
// as desired.

class Pet {
  constructor(species, name) {
    this.species = species;
    this.name = name;
  }

  getName() {
    return this.name;
  }

  getSpecies() {
    return this.species;
  }
}

class Owner {
  constructor(name) {
    this.name = name;
    this.totalAdoptions = 0;
    this.animalsAdopted = [];
  }

  numberOfPets() {
    return this.totalAdoptions;
  }

  addPet(species, name) {
    this.animalsAdopted.push([species, name]);
    this.totalAdoptions += 1;
  }
}

class Shelter {
  static ALL_OWNERS = [];

  adopt(owner, pet) {
    owner.addPet(pet.species, pet.name);
    if (!Shelter.ALL_OWNERS.includes(owner)) {
      Shelter.ALL_OWNERS.push(owner);
    }
  }

  printAdoptions() {
    Shelter.ALL_OWNERS.forEach((obj) => {
      console.log(`${obj.name} has adopted the following pets:`);
      obj.animalsAdopted.forEach((arr) => {
        console.log(`a ${arr[0]} named ${arr[1]}`);
      });
      console.log('');
    });
  }
}

let butterscotch = new Pet('cat', 'Butterscotch');
let pudding = new Pet('cat', 'Pudding');
let darwin = new Pet('bearded dragon', 'Darwin');
let kennedy = new Pet('dog', 'Kennedy');
let sweetie = new Pet('parakeet', 'Sweetie Pie');
let molly = new Pet('dog', 'Molly');
let chester = new Pet('fish', 'Chester');

let phanson = new Owner('P Hanson');
let bholmes = new Owner('B Holmes');

let shelter = new Shelter();
shelter.adopt(phanson, butterscotch);
shelter.adopt(phanson, pudding);
shelter.adopt(phanson, darwin);
shelter.adopt(bholmes, kennedy);
shelter.adopt(bholmes, sweetie);
shelter.adopt(bholmes, molly);
shelter.adopt(bholmes, chester);
shelter.printAdoptions();
console.log(`${phanson.name} has ${phanson.numberOfPets()} adopted pets.`);
console.log(`${bholmes.name} has ${bholmes.numberOfPets()} adopted pets.`);

// P Hanson has adopted the following pets:
// a cat named Butterscotch
// a cat named Pudding
// a bearded dragon named Darwin

// B Holmes has adopted the following pets:
// a dog named Molly
// a parakeet named Sweetie Pie
// a dog named Kennedy
// a fish named Chester

// P Hanson has 3 adopted pets.
// B Holmes has 4 adopted pets.
