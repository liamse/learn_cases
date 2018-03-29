### Jest

How to use `facebook jest` to test through webpack.
[Facebook](https://facebook.github.io/jest/docs/en/webpack.html) wrote a documnet about how to use Jest with Webpack.

### Requirement Modules

```json
    "jest": "^22.4.3",
    "babel-jest": "^22.4.3",
    "eslint-plugin-jest": "^21.15.0",
    "ts-jest": "^22.4.2",
```

### Webpack Configuration

```json
"scripts": {
    "test": "jest"
}

```

### eslint configuration

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

### Matchers

When you're writing tests, you often need to check that values meet certain conditions. expect gives you access to a number of "matchers" that let you validate different things.

`expect()` has 31 functions that repeat in four category. `not`, `rejects`, `resolves` and itself. `rejects` and `resolves` added after `jest@20.0.0`. They use to test `Promise.resolve` and `Promise.reject`.For example, concider `expect().toBe()` function, it repeats under `not`, `rejects`, and `resolves` objects as well.
We need to only learn one category.

Do not confuse `expect()` and `expect`. `expect` is an object of functions that we mention them at next section.

These 31 functions can categories in seven categories.

```text
expect()
  |-not [object]
  |-rejects [object]
  |-resolves (object)
  |-itself
      |-Main tests
        |-toBe: [Function: throwingMatcher]
        |-toEqual: [Function: throwingMatcher],
        |-toMatch: [Function: throwingMatcher],
        |-toMatchObject: [Function: throwingMatcher],
      |-To Work With Numbers
        |-toBeCloseTo: [[Function: throwingMatcher]
        |-toBeGreaterThan: [Function: throwingMatcher]
        |-toBeGreaterThanOrEqual: [Function: throwingMatcher]
        |-toBeLessThan: [Function: throwingMatcher],
        |-toBeLessThanOrEqual: [Function: throwingMatcher],
      |-To Test Existing/Defining
        |-toBeDefined: [Function: throwingMatcher]
        |-toBeFalsy: [Function: throwingMatcher]
        |-toBeInstanceOf: [Function: throwingMatcher],
        |-toBeNaN: [Function: throwingMatcher],
        |-toBeNull: [Function: throwingMatcher],
        |-toBeTruthy: [Function: throwingMatcher],
        |-toBeUndefined: [Function: throwingMatcher],
      |-To Work With Objects/Arrays
        |-toContain: [Function: throwingMatcher],
        |-toContainEqual: [Function: throwingMatcher],
        |-toHaveLength: [Function: throwingMatcher],
        |-toHaveProperty: [Function: throwingMatcher],
      |-To Work With Function
        |-lastCalledWith: [Function: throwingMatcher],
        |-toBeCalled: [Function: throwingMatcher],
        |-toBeCalledWith: [Function: throwingMatcher],
        |-toHaveBeenCalled: [Function: throwingMatcher],
        |-toHaveBeenCalledTimes: [Function: throwingMatcher],
        |-toHaveBeenCalledWith: [Function: throwingMatcher],
        |-toHaveBeenLastCalledWith: [Function: throwingMatcher],
      |-To Test Errors
        |-toThrow: [Function: throwingMatcher],
        |-toThrowError: [Function: throwingMatcher],
      |-To Work With Snapshots
        |-toMatchSnapshot: [Function: throwingMatcher],
        |-toThrowErrorMatchingSnapshot: [Function: throwingMatcher] 

```

### `expect` object
if you look at `expect` itself you see these functions:

```js
{
  //  The expect Function that we discused before
  [Function: expect]
  //  To extend extend itself, write new Matchers
  extend: [Function],

  anything: [Function],
  any: [Function],
  //  Work with Objects
  objectContaining: [Function],
  //  Work with Arrays
  arrayContaining: [Function],
  // Work with Strings
  stringContaining: [Function],
  stringMatching: [Function],
  // Work with Snapshots
  addSnapshotSerializer: [Function],
  // Work with Errors
  assertions: [Function],
  hasAssertions: [Function],

  getState: [Function],
  setState: [Function],
  extractExpectedAssertionsErrors: [Function: extractExpectedAssertionsErrors] 
}
```