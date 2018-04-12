# Jest

How to use `facebook jest` to test through webpack.
[Facebook](https://facebook.github.io/jest/docs/en/webpack.html) wrote a documnet about how to use Jest with Webpack.

## Requirement Modules

```json
    "jest": "^22.4.3",
    "babel-jest": "^22.4.3",
    "eslint-plugin-jest": "^21.15.0",
    "ts-jest": "^22.4.2",
```

## Webpack Configuration

```json
"scripts": {
    "test": "jest"
}

```

## eslint configuration

```json
  "eslintConfig": {
    "root": true,
    "plugins": [
      "jest"
    ],
    "env": {
      "browser": true,
      "node": true,
      "jest/globals": true
    },
    "extends": [
      "xo-react/space",
      "xo-space/esnext"
    ],
    "rules": {
      "indent": [
        "error",
        4
      ],
      "semi": [
        "error",
        "never"
      ]
    },
    "parser": "babel-eslint"
  }
 ```

## Matchers

When you're writing tests, you often need to check that values meet certain conditions. expect gives you access to a number of "matchers" that let you validate different things.

`expect()` has 31 functions that repeat in four category. `not`, `rejects`, `resolves` and itself. `rejects` and `resolves` added after `jest@20.0.0`. They use to test `Promise.resolve` and `Promise.reject`. For example, concider `expect().toBe()` function, it repeats under `not`, `rejects`, and `resolves` objects as well.
We need to only learn one category.

Do not confuse `expect()` and `expect`. `expect` is an object of functions that we mention them at next section.

These 31 functions can categories in eight categories.

- Work with being (Common Matchers)
- Work with numbers (Numbers)
- Work With Strings (Strings)
- Work with existing/defining (Truthiness)
- Work with objects/arrays (Arrays)
- Work with functions
- Work with throw errors (Exceptions)
- Work with Snapshots

```text
expect()
  |-not [object]
  |-rejects [object]
  |-resolves (object)
  |-itself
      |-Work with being
        |-toBe: [Function: throwingMatcher]
        |-toEqual: [Function: throwingMatcher],
        |-toMatchObject: [Function: throwingMatcher],
      |-Work With Strings
        |-toMatch: [Function: throwingMatcher],
      |-Work With Numbers
        |-toBeCloseTo: [[Function: throwingMatcher]
        |-toBeGreaterThan: [Function: throwingMatcher]
        |-toBeGreaterThanOrEqual: [Function: throwingMatcher]
        |-toBeLessThan: [Function: throwingMatcher],
        |-toBeLessThanOrEqual: [Function: throwingMatcher],
      |-Work With Existing/Defining
        |-toBeDefined: [Function: throwingMatcher]
        |-toBeFalsy: [Function: throwingMatcher]
        |-toBeInstanceOf: [Function: throwingMatcher],
        |-toBeNaN: [Function: throwingMatcher],
        |-toBeNull: [Function: throwingMatcher],
        |-toBeTruthy: [Function: throwingMatcher],
        |-toBeUndefined: [Function: throwingMatcher],
      |-Work With Objects/Arrays
        |-toContain: [Function: throwingMatcher],
        |-toContainEqual: [Function: throwingMatcher],
        |-toHaveLength: [Function: throwingMatcher],
        |-toHaveProperty: [Function: throwingMatcher],
      |-Work With Functions
        |-lastCalledWith: [Function: throwingMatcher],
        |-toBeCalled: [Function: throwingMatcher],
        |-toBeCalledWith: [Function: throwingMatcher],
        |-toHaveBeenCalled: [Function: throwingMatcher],
        |-toHaveBeenCalledTimes: [Function: throwingMatcher],
        |-toHaveBeenCalledWith: [Function: throwingMatcher],
        |-toHaveBeenLastCalledWith: [Function: throwingMatcher],
      |-Work With Throw Errors
        |-toThrow: [Function: throwingMatcher],
        |-toThrowError: [Function: throwingMatcher],
      |-Work With Snapshots
        |-toMatchSnapshot: [Function: throwingMatcher],
        |-toThrowErrorMatchingSnapshot: [Function: throwingMatcher] 

```

## `expect` as object (not expect() function)

If you look at `expect` itself you see these functions:

```js
{
  [Function: expect]
  //  The expect Function that we discused before
  extend: [Function],
  //  To extend extend itself, write new Matchers
  anything: [Function],
  // expect.anything() matches anything but null or undefined.
  any: [Function],
  // This is like jasmine.any(String). When you whant to check the value of something is string but don't care about what it exactly was, like when you want to check ID of object. You know it must be string but it is randome and unique string.
  objectContaining: [Function],
  // expect.objectContaining(object) matches any received object that recursively matches the expected properties. That is, the expected object is a subset of the received object.
  arrayContaining: [Function],
  // expect.arrayContaining(array) matches a received array which contains all of the elements in the expected array. That is, the expected array is a subset of the received array.
  stringContaining: [Function],
  // expect.stringContaining(string) matches any received string that contains the exact expected string.
  stringMatching: [Function],
  // expect.stringMatching(regexp) matches any received string that matches the expected regexp.
  addSnapshotSerializer: [Function],
  assertions: [Function],
  // verifies that a certain number of assertions are called during a test. This is often useful when testing asynchronous code, in order to make sure that assertions in a callback actually got called.
  hasAssertions: [Function],
  // verifies that at least one assertion is called during a test. This is often useful when testing asynchronous code, in order to make sure that assertions in a callback actually got called.
  getState: [Function],
  setState: [Function],
  extractExpectedAssertionsErrors: [Function: extractExpectedAssertionsErrors]
}
```

### expect.anything()

```js
describe('expect.anything()', () => {
    const User = {
        id: 'U-021-20180312' // if it is null or undefined test fails.
    }
    test('User should not has a null or undefined ID', () => {
        expect(User).toEqual({
            id: expect.anything()
        })
    })
})
```

### expect.any(constractor)

```js
describe('expect.any(constractor)', () => {
    const User = {
        id: 'U-021-20180312' // if it is not string test fails
    }
    test('User should has a string ID', () => {
        expect(User).toEqual({
            id: expect.any(String)
        })
    })
})
```

## Testing Asynchronous Code