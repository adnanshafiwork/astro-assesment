const cache = new Map();

export function setCache(key, data) {
 
  cache.set(key, data);
}

export function getCache(key) {
  return cache.get(key);
}

export function invalidateCache(key) {
  if (key) {
    cache.delete(key);
  } else {
    cache.clear();
  }
}
