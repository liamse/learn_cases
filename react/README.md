# React

## Simple useage of setState

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
