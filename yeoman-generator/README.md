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

I do both of them. By wizard, it ask some questions that I mention some of important of them.First, `**Your Generator Name** (generator-<YOUR_EXISTING_FOLDER_NAME>)`. I must start my generator name with `generator` and seperate them with dash line (`-`). Camel words type is automatically convert to dash line words and lowercase all of them. Second, It ask about `Description`. Next, It ask; `Project home page url`. I don't have any, then for start I use my github page. Then `Auther's Name ()`. This can be a list of names and github profile addresses I guess. Then `Send coverage reports to coveralls?`, this question related to [coveralls](https://coveralls.io/) website. It shows which parts of your code aren't coverd by your test suite. As I want to test it. I say `Yes`. And It ask me my `gihub username`. Finally choose your `Lisence`.

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

## Manually create directory structure of generator

