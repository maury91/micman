type Subscriber = () => void;

export class PubSub<T> {
  private subscribers: Subscriber[] = [];

  constructor(private value: T) {
  }

  public subscribe = (cb: Subscriber): () => void => {
    this.subscribers.push(cb);
    return () => {
      const index = this.subscribers.indexOf(cb);
      if (index !== -1) {
        this.subscribers.splice(index, 1);
      }
    }
  }

  public setValue = (newValue: T) => {
    this.value = newValue;
    this.subscribers.forEach(subscriber => subscriber());
  }

  public getValue = (): T => {
    return this.value;
  }
}