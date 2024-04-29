export const codeSnippets = {
	'twoSum': `var twoSum = function (nums, target) {
  let map = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (map.has(target-nums[i])) {
      return [map.get(target-nums[i]), i];
    } else {
      map.set(nums[i], i);
    }
  }
}`,
	'useFetch':
		`import { useState, useCallback } from 'react';

function useUndo(initialValue, limit = 10) {
\tconst [currentValue, setCurrentValue] = useState(initialValue);
\tconst [past, setPast] = useState([]);
\tconst [future, setFuture] = useState([]);
\t
\tconst set = useCallback((value) => {
\t\tsetPast((past) => [currentValue, ...past.slice(0, limit - 1)]);
\t\tsetFuture([]);
\t\tsetCurrentValue(value);
\t}, [currentValue, limit]);
\t
\tconst undo = useCallback(() => {
\t\tif (past.length === 0) return;
\t\t
\t\tconst previous = past[0];
\t\tconst newPast = past.slice(1);
\t\t
\t\tsetFuture((future) => [currentValue, ...future]);
\t\tsetCurrentValue(previous);
\t\tsetPast(newPast);
\t}, [currentValue, past]);
\t
\tconst redo = useCallback(() => {
\t\tif (future.length === 0) return;
\t\t
\t\tconst next = future[0];
\t\tconst newFuture = future.slice(1);
\t\tsetPast((past) => [currentValue, ...past.slice(0, limit - 1)]);
\t\tsetCurrentValue(next);
\t\tsetFuture(newFuture);
\t}, [currentValue, future]);
\t
\tconst canUndo = past.length > 0;
\tconst canRedo = future.length > 0;
\t
\treturn { set, undo, redo, currentValue, canUndo, canRedo };
}
export default useUndo;
`,
	'useLocalStorage':
	`import { useState, useEffect, useCallback } from 'react';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Ошибка чтения из localStorage:', error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Ошибка при записи в localStorage:', error);
    }
  }, [key]);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === key && event.newValue) {
        setStoredValue(JSON.parse(event.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue];
}

export default useLocalStorage;`,
	'useUndo': `import { useState, useCallback } from 'react';

function useUndo(initialValue, limit = 10) {
\tconst [currentValue, setCurrentValue] = useState(initialValue);
\tconst [past, setPast] = useState([]);
\tconst [future, setFuture] = useState([]);
\t
\tconst set = useCallback((value) => {
\t\tsetPast((past) => [currentValue, ...past.slice(0, limit - 1)]);
\t\tsetFuture([]);
\t\tsetCurrentValue(value);
\t}, [currentValue, limit]);
\t
\tconst undo = useCallback(() => {
\t\tif (past.length === 0) return;
\t\t
\t\tconst previous = past[0];
\t\tconst newPast = past.slice(1);
\t\t
\t\tsetFuture((future) => [currentValue, ...future]);
\t\tsetCurrentValue(previous);
\t\tsetPast(newPast);
\t}, [currentValue, past]);
\t
\tconst redo = useCallback(() => {
\t\tif (future.length === 0) return;
\t\t
\t\tconst next = future[0];
\t\tconst newFuture = future.slice(1);

    setPast((past) => [currentValue, ...past.slice(0, limit - 1)]);
\t\tsetCurrentValue(next);
\t\tsetFuture(newFuture);
\t}, [currentValue, future]);
\t
\tconst canUndo = past.length > 0;
\tconst canRedo = future.length > 0;
\t
\treturn { set, undo, redo, currentValue, canUndo, canRedo };
}

export default useUndo;

	`,
	'JS methods': `String Methods
length slice substring substr replace replaceAll toUpperCase toLowerCase
concat trim trimStart trimEnd padStart padEnd charAt charCodeAt split

String Search
indexOf lastIndexOf search match matchAll includes startsWith endsWith

Array Methods
length toString  pop push  shift  unshift  join
delete  concat  flat  splice  slice

Object Methods
create assign defineProperty defineProperties getOwnPropertyDescriptor
getOwnPropertyDescriptors getPrototypeOf setPrototypeOf keys values entries
hasOwnProperty is getOwnPropertyNames getOwnPropertySymbols
preventExtensions isExtensible seal isSealed freeze isFrozen`
};
