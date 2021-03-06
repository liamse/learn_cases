# How to package your packages as Yeoman generotr?

Two ways to create a generator is create [manually](http://yeoman.io/authoring/) or create by [`generator-generator`](https://github.com/yeoman/generator-generator) as wizard.

## Generator-generator

This module create scaffolds out of a complete generator directory structure. This make a way to compare my own created directory structure with a perfessional one. The `generator-generator` module create a generator that works properly and at first, I am going to create this by my own.

First, install [`yeoman`](http://yeoman.io/learning/). Second, install [`generator-generator`](https://github.com/yeoman/generator-generator). Next, run following command:

```bash
yo generator
// or
yo generator:subgenerator <name>

```

In first method - `yo generator`- it ask some questions that I mention some of the important of them. First, `**Your Generator Name** (generator-<YOUR_EXISTING_FOLDER_NAME>)`. I must start my generator name with `generator` and seperate them with dash line (`-`). Camel words type is automatically convert to dash line words and lowercase all of them. Second, It ask about `Description`. Next, It ask; `Project home page url`. I don't have any, then for start I use my github page. Then `Auther's Name ()`. This can be a list of names and github profile addresses I guess. Then `Send coverage reports to coveralls?`, this question related to [coveralls](https://coveralls.io/) website. It shows which parts of your code aren't coverd by your test suite. As I want to test it. I say `Yes`. And It ask me my `github username`. Finally choose your `Lisence`.

It create these direcotry structure:

```text
.
├── generators/
│   └── app/
│       ├── index.js
│       └── templates/
│           └── dummyfile.txt
├── .editorconfig
├── .eslintignore
├── .gitattributes
├── .gitignore
├── .travis.yml
├── .yo-rc.json
├── LICENSE
├── README.md
├── package.json
└── __tests__/
    └── app.js
```

**Good Point:** it creates README.md files that explain how your generator can be install and some information about licences and dependencies.

**Eslint error:** if you run `npm run test` in version `4.0.2` it raise an error as following:

```bash
/generators/app/index.js
  10:13  error  Replace ``Welcome·to·the·flawless·${chalk.red('generator-basic-type-script')}·generator!`` with `⏎········`Welcome·to·the·flawless·${chalk.red('generator-basic-type-script')}·generator!`⏎······`  prettier/prettier
```

It can be fix automatically. Or you can convert it to this:

```js
    yosay(
    `Welcome to the flawless ${chalk.red('generator-basic-type-script')} generator!`
    )
```

## Running the generator

In your generator root folder run follwing code:

```bash
npm link
```

Then the Yeoman know your generator as normal generators. Create your new project directory and into it run `yo your_generator`. To find more information as I mention before in **Good Point** you have a good explanation of how to work with your generator.

## Manage dependencies with `package.json`

You just need to create a variable as same as `package.json` file. `fs` module can read and write it to destination folder as a `package.json` file. `npmInstall` function install all dependencies and dev dependencies.

For example you want to install `eslint` as dev dependency and `react` as dependency. 

```js
 writing() {
    const pkgJson = {
        devDependencies: {
            eslint: "^3.15.0"
        },
        dependencies: {
            react: "^16.2.0",
        },

    };
    // Create package.json file in destination path with pkgJson content
    this.fs.extendJSON(
      this.destinationPath('package.json'),
      pkgJson
    );
  }

  install() {
    this.npmInstall();
  }
```

This is equvalent to call `npm install` on created `package.json` file.

`yarnInstall()` can be used instead of `npmInstall()`. If you rather `yarn`, it need to aware about `yarn` cache management. It creates the `yarn.lock` and if you change `package.json`, it caches and does not change anything.

### Extends existing package.json

I have a `package.json` and only want to change some of attributes of it for new project. For example, for each new project I only want to change `name`. To do it with this method I require to open `package.json` and extend it. [deep-extend](https://github.com/unclechu/node-deep-extend) is a good library to help in this version. To find a good example you can see [generator-generator](https://github.com/yeoman/generator-generator/blob/master/app/index.js) own repository.

```js
const extend = require('deep-extend');

// ...

prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'Your Project Name Name?',
        default: ''
      },
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.gitUserName;
      this.props = props;
    });
  }

writing() {
    const pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    extend(pkg, {
      name: this.props.projectName,
      dependencies: {
        react: "^16.2.0",
      },
      devDependencies: {
        eslint: "^3.15.0"
      }
    });
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  }

```

You see we read `package.json` file from `destinationPath` and extend it with `deep-extend` library to add our dependencies and name that get from user with `prompts`.

## Yeoman: basic-type-script generator

`basic-type-scrip` is a yeoman generator. It use `webpack` and `TypeScript`. It is a very small `npm` project that does not use `gulp`. It must be simple to only use when I want to test a little project. Yeoman generotr is best choise for me.

As webserver I like to use python simple webserver.