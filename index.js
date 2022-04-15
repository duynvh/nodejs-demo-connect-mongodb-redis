"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_1 = require("inversify");
let TYPES = {
    Warrior: Symbol('Warrior'),
    Weapon: Symbol('Weapon'),
    ThrowableWeapon: Symbol('ThrowableWeapon'),
};
let Katana = class Katana {
    hit() {
        return 'Cut';
    }
};
Katana = __decorate([
    (0, inversify_1.injectable)()
], Katana);
let Shuriken = class Shuriken {
    throw() {
        return 'Hit';
    }
};
Shuriken = __decorate([
    (0, inversify_1.injectable)()
], Shuriken);
let Ninja = class Ninja {
    constructor(katana, shuriken) {
        this._katana = katana;
        this._shuriken = shuriken;
    }
    fight() {
        return this._katana.hit();
    }
    sneak() {
        return this._shuriken.throw();
    }
};
Ninja = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(TYPES.Weapon)),
    __param(1, (0, inversify_1.inject)(TYPES.ThrowableWeapon)),
    __metadata("design:paramtypes", [Object, Object])
], Ninja);
let myContainer = new inversify_1.Container();
myContainer.bind(TYPES.Warrior).to(Ninja);
myContainer.bind(TYPES.Weapon).to(Katana);
myContainer.bind(TYPES.ThrowableWeapon).to(Shuriken);
let ninja = myContainer.get(TYPES.Warrior);
console.log(ninja.fight());
console.log(ninja.sneak());
