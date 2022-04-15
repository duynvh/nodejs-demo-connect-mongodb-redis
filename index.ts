import 'reflect-metadata';

import { interfaces, injectable, inject, Container } from 'inversify';

interface Warrior {
  fight(): string;
  sneak(): string;
}

interface Weapon {
  hit(): string;
}

interface ThrowableWeapon {
  throw(): string;
}

let TYPES = {
  Warrior: Symbol('Warrior'),
  Weapon: Symbol('Weapon'),
  ThrowableWeapon: Symbol('ThrowableWeapon'),
};

@injectable()
class Katana implements Weapon {
  public hit(): string {
    return 'Cut';
  }
}

@injectable()
class Shuriken implements ThrowableWeapon {
  public throw(): string {
    return 'Hit';
  }
}

@injectable()
class Ninja implements Warrior {
  private _katana: Weapon;
  private _shuriken: ThrowableWeapon;

  public constructor(
    @inject(TYPES.Weapon) katana: Weapon,
    @inject(TYPES.ThrowableWeapon) shuriken: ThrowableWeapon
  ) {
    this._katana = katana;
    this._shuriken = shuriken;
  }

  public fight(): string {
    return this._katana.hit();
  }

  public sneak(): string {
    return this._shuriken.throw();
  }
}

let myContainer = new Container();
myContainer.bind<Warrior>(TYPES.Warrior).to(Ninja);
myContainer.bind<Weapon>(TYPES.Weapon).to(Katana);
myContainer.bind<ThrowableWeapon>(TYPES.ThrowableWeapon).to(Shuriken);

let ninja = myContainer.get<Warrior>(TYPES.Warrior);

console.log(ninja.fight());
console.log(ninja.sneak());
