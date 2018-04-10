# How to use TypeScript with React

A good starting point is written by [Ogundipe Samuel](https://blog.logrocket.com/how-why-a-guide-to-using-typescript-with-react-fffb76c61614).

## TypeScript Component

As we know fo React, there are two types of data taht control a component, `props` and `state`. TypeScript component get two interfaces for each of them respectively. 

```tsx
interface AppPropsInterface {
    step: number
}
interface AppStateInterface {
    counter: number
}

class App extends React.Component<propsInterface, stateInterface> {
    constractor(props: AppPropsInterface){
        super(props)
        this.state = {
            counter: 1
        }
    }
}
<App step={4} />
```

The above code block is a simple component that get `step` as the `props` and `counter` as the `state`. At `constractor` you see `props` type is `AppPropsInterface`.

## defaultProps

Use `static defaultProps` to create default values for props. TypeScript raise following error when use `YOUR_COMPONENT.defaultProps`.

```bash
[ts] Property 'defaultProps' does not exist on type 'typeof YOUR_COMPONENT'
```
