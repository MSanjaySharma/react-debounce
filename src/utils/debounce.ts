type CallbackFunc<T extends unknown[], U> = (...args: T) => U;
type DebouncedFunction<T extends unknown[]> = (...args: T) => void;

export function debounce<T extends unknown[], U>(
  cb: CallbackFunc<T, U>,
  delay: number
): DebouncedFunction<T> {
  let timerId: ReturnType<typeof setTimeout>;

  return function (this: unknown, ...args: T): void {
    clearInterval(timerId);

    timerId = setTimeout(() => {
      cb.apply(this, args);
    }, delay);
  };
}

type AsyncCallback<T extends unknown[], U> = (...args: T) => Promise<U>;
type DebouncedAsyncFunction<T extends unknown[], U> = (
  ...args: T
) => Promise<U>;

export function asyncDebounce<T extends unknown[], U>(
  cb: AsyncCallback<T, U>,
  delay: number
): DebouncedAsyncFunction<T, U> {
  let timerId: ReturnType<typeof setTimeout>;

  return function (this: unknown, ...args: T): Promise<U> {
    clearInterval(timerId);

    return new Promise((resolve, reject) => {
      timerId = setTimeout(() => {
        cb(...args)
          .then(resolve)
          .catch(reject);
      }, delay);
    });
  };
}
