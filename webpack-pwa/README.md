### Required Modules
```js
"webpack-pwa-manifest": "^3.6.1",
```
### webpack.config.js
```js
const WebpackPwaManifest = require('webpack-pwa-manifest')
//...
plugins: [
    //...
new WebpackPwaManifest({
    name: 'Esmaeil Samadi',
    short_name: 'ESM',
    description: 'Personal PWA',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    inject: true,
    icons: [
        {
            src: path.resolve('src/assets/icons/webpack.png'),
            sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
            destination: path.join('assets', 'icons'),

        },
        {
            src: path.resolve('src/assets/icons/webpack.png'),
            size: 1024,
            destination: path.join('assets', 'icons', 'ios'),
            ios: 'startup'
        },
        {
            src: path.resolve('src/assets/icons/webpack.png'),
            sizes: [36, 48, 72, 96, 144, 192, 512],
            destination: path.join('assets', 'icons', 'android')
        }
    ],
    ios: true,
    ios: {
        'apple-mobile-web-app-title': 'AppTitle',
        'apple-mobile-web-app-status-bar-style': 'black'
    },
})
]
```
### src/ Folder structure
```
YOUR_MODUEL_FOLDER
    |- src
        |- assets
            |- icons
                |- webpack.png //(1024x1024)
```
### dist/ Folder structure
```
YOUR_MODUEL_FOLDER
    |- dis
        |- assets
            |- icons
                |- ios
                    |- icon_1024x1024.[hash number].png
                |- android
                    |- icon_36x36.[hash number].png
                    |- icon_48x48.[hash number].png
                    |- icon_72x72.[hash number].png
                    |- icon_96x96.[hash number].png
                    |- icon_144x144.[hash number].png
                    |- icon_192x192.[hash number].png
                    |- icon_512x512.[hash number].png
                |- icon_96x96.[hash number].png
                |- icon_128x128.[hash number].png
                |- icon_192x192.[hash number].png
                |- icon_256x256.[hash number].png
                |- icon_384x384.[hash number].png
                |- icon_512x512.[hash number].png
```
### HTML File meta tags
```html
<head>
<!-- ... -->
    <meta name="apple-mobile-web-app-title" content="AppTitle" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta name="theme-color" content="#ffffff" />
    <link rel="apple-touch-startup-image" href="assets/icons/ios/icon_1024x1024.[hash number].png" />
    <link rel="manifest" href="manifest.[hash number].json" />
</head>
```
