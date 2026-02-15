/**
 * A utility class for managing fetch controllers and avoiding concurrent requests.
 * @class
 */
class FetchControllers {
  /** Collection of fetch controllers, indexed by key. */
  controllers: Record<string, AbortController>;

  /** Creates an instance of FetchControllers. */
  constructor() {
    this.controllers = {};
  }

  /**
   * Adds a fetch controller to the collection.
   * If a controller with the same key exists, it will be aborted and replaced.
   * @param {string} key - The key of the controller.
   * @param {AbortController} controller - The fetch controller to add.
   */
  addController(key: string, controller: AbortController) {
    if (this.controllers[key]) {
      this.controllers[key].abort();
      delete this.controllers[key];
    }
    this.controllers[key] = controller;
  }

  /**
   * Removes a fetch controller from the collection.
   * @param {string} key - The key of the controller to remove.
   */
  removeController(key: string) {
    if (this.controllers[key]) {
      delete this.controllers[key];
    }
  }
}

const fetchControllers = new FetchControllers();

/** Makes a fetch request with a specified timeout. */
export async function controlledFetch(
  /** The URL to make the fetch request to. */
  url: string,
  /** The options for the fetch request. */
  options: RequestInit & { timeout?: number } = {},
) {
  const { timeout = 100000 } = options;
  const path = new URL(url).pathname;

  const concurrentController = new AbortController();
  const abortSignal = AbortSignal.any([
    concurrentController.signal,
    AbortSignal.timeout(timeout),
  ]);

  fetchControllers.addController(path, concurrentController);
  const response = await fetch(url, {
    ...options,
    signal: abortSignal,
  });
  fetchControllers.removeController(path);

  return response;
}
