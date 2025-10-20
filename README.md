# @mirum7/fn

A collection of useful utility functions for TypeScript/JavaScript projects.

## Contents

- [combine](#combine)
  - [Basic example](#basic-example)
  - [Object transformation](#object-transformation)
- [debounce](#debounce)
  - [Simple debouncing](#simple-debouncing)
  - [Search debouncing](#search-debouncing)

## Installation

```bash
bun add @mirum7/fn
```

## Usage

### `combine()`

A function for composing functions (pipe). Allows you to combine multiple functions into one, where the result of one function is passed as an argument to the next.

#### Examples

##### Basic example

```typescript
import { combine } from "@mirum7/fn";

const addOne = (x: number) => x + 1;
const multiplyByTwo = (x: number) => x * 2;
const toString = (x: number) => x.toString();

const transform = combine(addOne, multiplyByTwo, toString);

console.log(transform(5)); // "12" ((5 + 1) * 2 = 12)
```

##### Object transformation

```typescript
import { combine } from "@mirum7/fn";

const getUser = (id: string) => ({ id, name: `User ${id}` });
const formatUser = (user: { id: string; name: string }) =>
  `${user.name} (${user.id})`;

const getUserString = combine(getUser, formatUser);

console.log(getUserString("123")); // "User 123 (123)"
```

### `debounce()`

A function for creating a debounced version of a function. Useful for limiting the frequency of function calls (e.g., for search or form validation).

#### Examples

##### Simple debouncing

```typescript
import { debounce } from "@mirum7/fn";

const logMessage = (message: string) => {
  console.log(`Log: ${message}`);
};

const debouncedLog = debounce({
  fn: logMessage,
  wait: 500, // delay in milliseconds
});

// Call the function multiple times in a row
debouncedLog.fn("Hello");
debouncedLog.fn("World");
debouncedLog.fn("!"); // Only this call will execute after 500ms

// You can cancel the delayed call
debouncedLog.clear();
```

##### Search debouncing

```typescript
import { debounce } from "@mirum7/fn";

const searchUsers = (query: string) => {
  // API call to search for users
  console.log(`Searching for: ${query}`);
};

const { fn, clear } = debounce({
  fn: searchUsers,
  wait: 300,
});

// In a React component
const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  fn(event.target.value);
};

useEffect(() => {
  return () => {
    clear();
  };
}, []);
```

#### Options

- `fn` - function to debounce
- `wait` - delay in milliseconds (default: 1000)

#### Returns

- `fn` - debounced version of the function
- `clear` - function to cancel the delayed call
