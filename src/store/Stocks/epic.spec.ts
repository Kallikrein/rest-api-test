import { TestScheduler } from "rxjs/testing";
import { Stocks } from "./typings";
import { stocksEpic } from "./epic";
import { fetchStocksStatus, addStocks } from "./actions";
import { Subject } from "rxjs";
import { Persist } from "localStoragePersistance";

const assert = (actual: unknown, expected: unknown) =>
  void expect(actual).toEqual(expected);

describe("Stocks API marble testing", () => {
  it("should read from persistence", () => {
    // given
    const scheduler = new TestScheduler(assert);
    const ajaxGet$ = scheduler.createColdObservable<Stocks>("---------");
    const fakeStorage: Stocks = Symbol("STOCKS") as any;
    const spy$ = new Subject();
    const fakePersist: Persist<Stocks> = {
      get: jest.fn(() => {
        spy$.complete();
        return fakeStorage;
      }),
      set: jest.fn()
    };
    // when
    ajaxGet$.pipe(stocksEpic(fakePersist, 50, scheduler));
    // then
    expect(fakePersist.get).toHaveBeenCalled();
    scheduler.expectObservable(spy$).toBe("|");
    scheduler.flush();
  });
  it("should timeout", () => {
    // given
    const scheduler = new TestScheduler(assert);
    const ajaxGet$ = scheduler.createColdObservable<Stocks>("-----");
    const fakeStorage: Stocks = Symbol("STOCKS") as any;
    const fakePersist: Persist<Stocks> = {
      get: jest.fn(() => fakeStorage),
      set: jest.fn()
    };
    // when
    const actual$ = ajaxGet$.pipe(stocksEpic(fakePersist, 50, scheduler));
    // then
    scheduler.expectObservable(actual$).toBe("(ab)-(c|)", {
      a: addStocks(fakeStorage, "localstorage"),
      b: fetchStocksStatus("START"),
      c: fetchStocksStatus("TIMEOUT")
    });
    scheduler.flush();
  });
  it("should emit action on success", () => {
    // given
    const scheduler = new TestScheduler(assert);
    const fakeResponse: Stocks = Symbol("STOCKS") as any;

    const ajaxGet$ = scheduler.createColdObservable<Stocks>("--------(r|)", {
      r: fakeResponse
    });
    const fakeStorage: Stocks = Symbol("STOCKS") as any;
    const fakePersist: Persist<Stocks> = {
      get: jest.fn(() => fakeStorage),
      set: jest.fn()
    };
    // when
    const actual$ = ajaxGet$.pipe(stocksEpic(fakePersist, 1000, scheduler));
    // then
    scheduler.expectObservable(actual$).toBe("(ab)----(cd|)", {
      a: addStocks(fakeStorage, "localstorage"),
      b: fetchStocksStatus("START"),
      c: addStocks(fakeResponse, "api"),
      d: fetchStocksStatus("DONE")
    });
    scheduler.flush();
  });
  it.only("should persist stock on success", () => {
    // given
    const scheduler = new TestScheduler(assert);
    const fakeResponse: Stocks = Symbol("STOCKS") as any;

    const ajaxGet$ = scheduler.createColdObservable<Stocks>("--------(r|)", {
      r: fakeResponse
    });
    const fakeStorage: Stocks = Symbol("STOCKS") as any;
    const spy$ = new Subject();

    const fakePersist: Persist<Stocks> = {
      get: jest.fn(() => fakeStorage),
      set: jest.fn(stocks => spy$.next(stocks))
    };
    // when
    ajaxGet$.pipe(stocksEpic(fakePersist, 1000, scheduler)).subscribe();
    // then
    scheduler.expectObservable(spy$).toBe("--------s)", {
      s: fakeResponse
    });
    scheduler.flush();
  });
});
