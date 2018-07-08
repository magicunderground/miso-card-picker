export interface Cache<TKey, TValue> {

    /**
     * Checks if the cache has something stored
     * @param key
     * The key to check if there's an cache entry
     */
    has: (key: TKey) => Promise<boolean>

    /**
     * Gets the value stored at the key
     * @param key
     * The key who's value to get
     */
    get: (key: TKey) => Promise<TValue | undefined>

    /**
     * Stores an item in the cache
     * @param key
     * The key to store under
     * @param value
     * The value to store in the cache
     */
    put: (key: TKey, value: TValue) => Promise<TValue>
}
