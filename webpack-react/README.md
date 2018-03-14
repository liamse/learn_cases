## React.js
### Requirement Modules
```js
    "react": "^16.2.0",
    "react-dom": "^16.2.0",
    "babel-plugin-transform-class-properties": "^6.24.1",
```
### Webpack Configuration
```js
{ 
    test: /\.(js|jsx)$/, 
    exclude: /node_modules/, 
    loader: "babel-loader" 
}
```
### Babel Configuration
```js
{
    "presets": [
        "env",
        "react"
    ],
    "plugins": [
        "babel-plugin-transform-class-properties"
    ]
}
```
`babel-plugin-transform-class-properties` is needed because if you don't use it you get some errors when you want to write following kind of methods and property definition of class. 
```js
class YourComponent extends React.Component {
    //This property raise error
    state = {
        open: true,
        close: false
    }
    //This method raise error
    sampleMethod = () => {
        return 'samaple code';
    }
}
```
To solve errors, you can use `babel-plugin-transform-class-properties` plugins or you can downgrade your code this way:
```js
class YourComponent extends React.Component {
    constractor(){
        super()
        this.state = {
            open: true,
            close: false
        }
        sampleMethode() {
            return 'sample code'
        }
    }
}
```
### complete webpack.conf.js
