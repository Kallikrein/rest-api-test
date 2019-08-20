export interface Persist<T> {
  get(): T;
  set(data: T): void;
}

export const persist = <T>(key: string): Persist<T> => ({
  get() {
    // try catch ?
    const serialized = window.localStorage.getItem(key);
    if (serialized === null) {
      return [];
    }
    return JSON.parse(serialized);
  },
  set(stocks) {
    return window.localStorage.setItem(key, JSON.stringify(stocks));
  }
});
