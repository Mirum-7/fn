# @mirum7/fn

A collection of useful utility functions for TypeScript/JavaScript projects.

## Contents

- [combine](#combine)
  - [Basic example](#basic-example)
  - [Object transformation](#object-transformation)
- [debounce](#debounce)
- [equals](#equals)

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

A function for creating a debounced version of a function. Useful for limiting the frequency of function calls (e.g., for search or form validation). Returns a Promise that resolves when the debounced function completes.

#### Examples

```typescript
import { debounce } from "@mirum7/fn";

const logMessage = (message: string) => {
  console.log(`Processing: ${message}`);
};

const { fn, clear } = debounce({
  fn: logMessage,
  wait: 300,
});

// Multiple calls
fn("First"); // canceled
fn("Second"); // canceled
fn("Third"); // => "Third"

// Cancel call
fn("first"); // canceled
clear();

// Multiple calls with await
await fn("First"); // => "First"
await fn("Second"); // => "Second"
await fn("Third"); // => "Third"

// Cancel call with await
await fn("first"); // => "first"
clear(); // doesn't cancel because already awaited
```

#### Options

- `fn` - function to debounce (can be sync or async)
- `wait` - delay in milliseconds (default: 1000)

#### Returns

- `fn` - debounced version of the function that returns a Promise
- `clear` - function to cancel the delayed call

### `equals()`

A function for deep equality comparison of multiple values. Supports primitive types, objects, and nested structures.

#### Examples

```typescript
import { equals } from "@mirum7/fn";

// Primitives
console.log(equals(1, 1, 1)); // true
console.log(equals("hello", "hello")); // true
console.log(equals(1, 2)); // false

// Objects
const obj1 = { name: "John", age: 30 };
const obj2 = { name: "John", age: 30 };
console.log(equals(obj1, obj2)); // true

// Arrays
console.log(equals([1, 2, 3], [1, 2, 3])); // true

// Edge cases
console.log(equals()); // true (no arguments)
console.log(equals(42)); // true (single argument)
console.log(equals(1, "1")); // false (different types)
```

#### Parameters

- `...elements` - any number of values to compare

#### Returns

- `boolean` - true if all values are deeply equal, false otherwise
