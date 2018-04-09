# React

## Data Types

There are two types of data that control a componenet:

- `props`
  - `props` are set by the parent and they are fixed throughout the lifetime of a component
- `state`
  - For data that is going to change, we have to use `state`

## setState()
`setState` enqueues changes to the component state and tells React that this component and __its children__ need to be re-rendered with the updated state.

Think of `setState` as a __request__ rather thatn an immediate command to update component.

`setState` function can receive two argumant; `updater` and `callback`. Socond one is optional. `updater` itself can be an object or a function.

```js
setSate(updater[,callback])
```

## Simple useage of setState

### updater as function

The following code create a number and button to increment it. With each click on button `setState` get the `prevState` and `props` and update `state` key values. `props` are set by the parent component - in this example is `<App steps={4} />`. `steps` in this example pass through `props`.

```js
import React from 'react'
import {render} from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            counter: 1
        }
        // bind this to handlers
        this.handleIncrease = this.handleIncrease.bind(this)
    }
    handleIncrease() {
        console.log('THIS', this)
        this.setState((prevState, props) => ({
            counter: prevState.counter + props.steps
        }))
    }
    render() {
        return (
          <div>
            <p>{this.state.counter}</p>
            <button onClick={this.handleIncrease}>
                Increase
            </button>
          </div>
        )
    }
}
render(<App steps={4}/>, document.getElementById('root'))

```

### updater as an object

Same example only with object method:

```js
import React from 'react'
import {render} from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            counter: 1
        }
        // bind this to handlers
        this.handleIncrease = this.handleIncrease.bind(this)
    }
    handleIncrease() {
        console.log('THIS', this)
        this.setState({
            counter: this.state.counter + this.props.step
        })
    }
    render() {
        return (
          <div>
            <p>{this.state.counter}</p>
            <button onClick={this.handleIncrease}>
                Increase
            </button>
          </div>
        )
    }
}
render(<App steps={4}/>, document.getElementById('root'))

```

#### Error 1

```bash
'stpe' is missing in props validation react/prop-types
```

This means we don't write proper `propTypes` and we need to add it.

#### Error 2

It happens when we use `propTypes` and `setState((prevState, props))`. In this method `react/no-unused-prop-types` can not find use of props.

```bash
'step' PropType is defined but prop is never used  react/no-unused-prop-types
```

To solve I disbale `react/no-unused-prop-types`.

```json
    "react/no-unused-prop-types": [
    0 //off
    ]
```

### porpTypes

React [documentation](https://reactjs.org/docs/typechecking-with-proptypes.html#proptypes) explain it very well. `propTypes` with lowcase `p` is used to define type of props that our component can get. It could define in two ways:

#### Method 1

```js
import propTypes from 'prop-types'

class App extends React.Component{

}
App.propTypes = {
    step: propTypes.number.isRequired
}
```

#### Method 2

```js
import propTypes from 'prop-types'

class App extends React.Component{
    static propTypes = {
        step: propTypes.number.isRequired
    }
}
```

#### List of useful propTypes

```js
  // You can declare that a prop is a specific JS type. By default, these
  // are all optional.
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // Anything that can be rendered: numbers, strings, elements or an array
  // (or fragment) containing these types.
  optionalNode: PropTypes.node,

  // A React element.
  optionalElement: PropTypes.element,

  // You can also declare that a prop is an instance of a class. This uses
  // JS's instanceof operator.
  optionalMessage: PropTypes.instanceOf(Message),

  // You can ensure that your prop is limited to specific values by treating
  // it as an enum.
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // An object that could be one of many types
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),

  // An array of a certain type
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // An object with property values of a certain type
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // An object taking on a particular shape
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),

```

### defaultProps

You can define default values for your props by assigning to the special defaultProps property:

```js
class App extends React.Component{
    static defaultProps = {
        step: 4
    }
}
// Or
App.defaultProps = {
    step: 4
}
```