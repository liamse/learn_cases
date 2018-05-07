# React-Testing-Library

## Start a react app with TypeScript

```bash
npm install -g create-react-app

create-react-app my-app --scripts-version=react-scripts-ts
cd my-app/
npm start
```

### Install react-testing-library

```bash
npm install --save-dev react-testing-library
```

### First Test (01.test.ts)

Create `__test__` folder under `src` folder and create `01.test.tsx` file into it. Copy following code to it. I find it from [@kentcdodds](https://github.com/kentcdodds/react-testing-library-course) `react-testing-library-course` repository.

```js
import React from 'react'
import { render } from 'react-testing-library'

function Greet({ greeting, subject }) {
    return (
        <div>
            {greeting} {subject}
        </div>
    )
}

test('greet renders a greeting', () => {
    const { container } = render(<Greet greeting="Hello" subject="World" />)
    expect(container.firstChild.innerHTML).toBe('Hello World')
})
```

**Error:** It raise following error.
node version: 6.11.0

```bash
TypeError: Object.entries is not a function
```

This is nodes error. It does not supper `Object.entries`. [To know more about Object.entries](https://developer.mozilla.org/tr/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)

**Solve:** upgrade nodejs to 8.11.1 LTS (for me download and install is work very well)

**Error 2:** `TypeError: Cannot read property 'createElement' of undefined`.
This error means TypeScript can not import React from 'react'. If you use VSCode like me, you see red line under `React` at import line and it write something near this: `[ts] Module /node_modules/@types/react/index"' has no default export`.

**Solve:** As in [this issue](https://github.com/Microsoft/TypeScript-React-Starter/issues/8) recommended add `"allowSyntheticDefaultImports": true` to `tsconfig.json` as `compilerOptions`.

### Second Test (02.test.ts)

Create `02.test.ts` with following content.

```js
import 'jest-dom/extend-expect'
import React from 'react'
import { render } from 'react-testing-library'

function Greet({ greeting, subject }) {
    return (
        <div>
            <strong>
                {greeting} {subject}
            </strong>
        </div>
    )
}

test('greet renders a greeting', () => {
    const { getByText } = render(<Greet greeting="Hello" subject="World" />)
    expect(getByText('Hello World')).toBeInTheDOM()
})
```

**Error:** `[ts] Property 'toBeInTheDOM' does not exist on type 'Matchers<void>'.`

At first line `import 'jest-dom/extend-expect'` extends [matchers](https://facebook.github.io/jest/docs/en/using-matchers.html) of jest. Jest uses "matchers" to let you test values in different ways.

**Solve:** When you use custom Jest Matchers with Typescript, you can extend `jest.Matchers` interface provided by `@types/jest` package by creating `jest.d.ts` file somewhere in your project with following content.

```js
declare namespace jest {
    interface Matchers<R> {
        toHaveAttribute: (attr: string, value?: string) => R
        toHaveTextContent: (htmlElement: string) => R
        toHaveClass: (className: string) => R
        toBeInTheDOM: () => R
    }
}
```
