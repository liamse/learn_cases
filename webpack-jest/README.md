# Jest

How to use `facebook jest` to test through webpack.
[Facebook](https://facebook.github.io/jest/docs/en/webpack.html) wrote a documnet about how to use Jest with Webpack.

 Jest uses Jasmine underneath. If you know Jasmine, already know a lot about Jest.

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

After creating environment to use Jest we need to learn it.

## How to use Jest

## Global Methods

Global Methods can be categories in six groups. Most used is `Commons` group. `Only` and `Skip` groups only use in large tests that you want to skip one of them or only run one of them. `After` and `Befor` groups are run after or befor all or each test suits. `Require` group is like `require()` function that determine the module is mock or actual. Between these six categories we need to learn `Common` group only.

I used to read perfessionals code and copy of them. When I read others test files, one thing that confuse me at first time is aliases. For example, `it()` is alias for `test()`.

A simple note about `x` and `f` before function names is, if `x` or `f` come before `describe()`, `test()`, it means `skip` or `only` respectively. These letters can come before aliases as well and do same job. For examle, `xit()` equal to `test.skip()`.

Only alias that we don't cover is `fit()` that equal to `test.only()`.

- Afters
  - `afterAll(fn, timeout)`
  - `afterEach(fn, timeout)`
- Befor
  - `beforeAll(fn, timeout)`
  - `beforeEach(fn, timeout)`
- Common
  - `describe(name, fn)`
  - `test(name, fn, timeout)`
    - alias: `it(name, fn, timeout)`
- Only
  - `describe.only(name, fn)`
    - alias: `fdescribe(name, fn)`
  - `test.only(name, fn, timeout)`
    - aliases: `it.only(name, fn, timeout)` or `fit(name, fn, timeout)`
- Skip
  - `describe.skip(name, fn)`
    - alias: `xdescribe(name, fn)`
  - `test.skip(name, fn)`
    - aliases: `it.skip(name, fn)` or `xit(name, fn)` or `xtest(name, fn)`
- Require
  - `require.requireActual(moduleName)`
  - `require.requireMock(moduleName)`

### describe(name, fn)

describe(name, fn) creates a block that groups together several related tests in one "test suite".

**This isn't required** - you can just write the test blocks directly at the top level. But this can be handy if you prefer your tests to be organized into groups.

### test(name, fn, timeout)

All you need in a test file is the test method which runs a test.For example, let's say there's a function `inchesOfRain()` that should be zero. Your whole test could be:

```js
test('did not rain', () => {
  expect(inchesOfRain()).toBe(0);
});
```

## Matchers

[Boris](https://medium.com/@boriscoder/the-hidden-power-of-jest-matchers-f3d86d8101b0) wrote a good article about how to use mathcers.

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

### asymmetricMatch

`asymmetricMatch` is a special keyword. If an object has it and it refer to a function, the result of its call will be used instead of an acutal deep-equality check.

```js
const fooOrBar = {
  asymmetricMatch: actual => actual === 'foo' || actual === 'bar'
};
expect('foo').toEqual(fooOrBar); // passes
expect('bar').toEqual(fooOrBar); // passes
expect('baz').toEqual(fooOrBar); // fails, not either 'foo' or 'bar'
expect(fooOrBar).toEqual('foo'); // fails, works only at right side
```

Jest (actually, Jasmine) gives us a set of predefined `asymmetric matches`, for example, expect.any(\<type>) that returns true for any value with specified type.

#### expect.anything()

```js
describe('expect.anything()', () => {
    const User = {
        id: 'U-021-20180312' // if it is null or undefined then test fails.
    }
    test('User should not has a null or undefined ID', () => {
        expect(User).toEqual({
            id: expect.anything()
        })
    })
})
```

#### expect.any(constractor)

```js
describe('expect.any(constractor)', () => {
    const User = {
        id: 'U-021-20180312' // if it is not string then test fails
    }
    test('User should has a string ID', () => {
        expect(User).toEqual({
            id: expect.any(String)
        })
    })
})
```

### Partial match for complex objects or arrays

When you have a big object and only want to test some keys of it, `expect.objectContaining(object)` and `expect.arrayContaining(array)` can be helpful. 

```js
describe('expect.objectContaining(object)', () => {
    const User = {
        id: 'U-021-20180312',
        name: 'Esmaeil',
        profile: {},
        sessionId: 'S-9834-201802941',
    }
    test('User should contain object with id and name', () => {
        expect(User).toEqual(expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String)
        }))
    })
})

describe('expect.objectContaining(object)', () => {
    const Fruits = [
        {name: 'Apple', color: 'red'},
        {name: 'Orange', color: 'orenge'}
    ]
    test('Fruits should contain red apple', () => {
        expect(Fruits).toEqual(expect.arrayContaining(
          [{
            name: 'Apple',
            color: 'red'
          }]
        ))
    })
})
```

**Note:** You must provide an array to arrayContaining.

# Mock

## Mock Return Value


```js
const myMock = jest.fn();
console.log(myMock());
// > undefined

// Make the mock return `10` for the first call,
// and `x` for the second call
// and `true` for the rest of calls
myMock
  .mockReturnValueOnce(10)
  .mockReturnValueOnce('x')
  .mockReturnValue(true);

console.log(myMock(), myMock(), myMock(), myMock());
// > 10, 'x', true, true
```

