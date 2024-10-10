import { Observer } from './Observer';

export class Observable {
  private observers: Observer[] = [];

  subscribe(observer: Observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(data: any) {
    this.observers.forEach((observer) => observer.update(data));
  }
}
