# service-fetch

> Provides the fetch API through a web worker

[![apm](https://flat.badgen.net/apm/license/service-fetch)](https://atom.io/packages/service-fetch)
[![apm](https://flat.badgen.net/apm/v/service-fetch)](https://atom.io/packages/service-fetch)
[![apm](https://flat.badgen.net/apm/dl/service-fetch)](https://atom.io/packages/service-fetch)
[![CircleCI](https://flat.badgen.net/circleci/github/idleberg/atom-service-fetch)](https://circleci.com/gh/idleberg/atom-service-fetch)
[![David](https://flat.badgen.net/david/dep/idleberg/atom-service-fetch)](https://david-dm.org/idleberg/atom-service-fetch)

## Installation

### apm

Install `service-fetch` from Atom [install view](atom://settings-view/show-package?package=service-fetch) or use the command-line equivalent:

`$ apm install service-fetch`

### Using Git

Change to your Atom packages directory:

**Windows**

```powershell
# Powershell
$ cd $Env:USERPROFILE\.atom\packages
```

```cmd
:: Command Prompt
$ cd %USERPROFILE%\.atom\packages
```

**Linux & macOS**

```bash
$ cd ~/.atom/packages/
```

Clone the repository as `service-fetch`:

```bash
$ git clone https://github.com/idleberg/atom-service-fetch service-fetch
```

Install dependencies:

```bash
cd service-fetch && npm install
```

Build source:

```bash
npm run build
```

## Usage

*This is an experiment*

Have you ever thought that your Atom package should perform HTTP requests [using web workers][Web Workers]? Would it be great if you could use the standard [Fetch API][Fetch API] and *something* would handle the web worker part for you?

This package is service provider that aims to achieve that. You use a common interface, the services handles the rest. Let's take a look at this through an example implementation.

To consume the service in your package, add the following to your `package.json`:

```json
"consumedServices": {
  "service-fetch": {
    "versions": {
      "1.0.0": "consumeFetch"
    }
  },
  "dependencies": {
    "cross-fetch": ">=3 <4"
  }
}
```

Next up, let's create a package:

```js
import { CompositeDisposable, Disposable } from 'atom';
import crossFetch from 'cross-fetch';

export default {
  // Fallback implementation for when the service is unavailable
  fetch: crossFetch,

  // Consume the service
  consumeFetch(fetchService) {
    this.fetch = fetchService;

    return new Disposable(() => {
      this.fetch = null;
    });
  },

  // Optional: Add a demo command
  activate() {
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        "my-package:fetch-data": async () =>
          await this.demoCommand(),
      })
    );
  },

  async demoCommand(pathToFile) {
    const = await this.fetch('https://atom.io/api/packages', {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log(response);
  }
};
```

Take note that the response object differs from [Fetch API][Fetch API] in several ways:

```js
{
  "body": [/* omitted */],
  "checksums": {
    "md5": "862dec5c27142824a394bc6464928f48",
    "sha1": "deb6c11e1971aa61dbbcbc76e5ea7553a5bea7b7",
    "sha256": "0679246d6c4216de0daa08e5523fb2674db2b6599c3b72ff946b488a15290b62",
    "sha512": "6ba146a01b3ab7b81e81c9ffb30ac81b1bc891db1afcdd4386eb9a5f4a9b02b3ffa6042c914196b0e75ec344b0372cffd3f73188721343bc458f063342ebb98b"
  },
  "redirected": false,
  "status": 200,
  "statusText": "OK",
  "timeout": 0,
  "url": "https://atom.io/api/packages"
}
```

Again, this is an experiment. I'm looking forward to your [feedback][Discussions] or [bug reports][Issues].

## License

This work is licensed under the [MIT License](LICENSE)

[Fetch API]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
[Web Workers]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
[Discussions]: https://github.com/idleberg/atom-service-fetch/discussions
[Issues]: https://github.com/idleberg/atom-service-fetch/issues
