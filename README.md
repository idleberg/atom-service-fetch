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
$ cd service-fetch && npm install
```

Build source:

```bash
$ npm run build
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
      "0.2.0": "consumeFetch"
    }
  },
  "package-deps": [
    {
      "name": "service-fetch"
    }
  ]
}
```

Install `atom-package-deps` to handle the package dependency and any fetch implementation for NodeJS as a fallback for when the service is unavailable:

**Example**:

`npm install atom-package-deps cross-fetch`

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

  async demoCommand() {
    const response = await this.fetch('https://atom.io/api/packages', {
      headers: {
        'Accept': 'application/json'
      }
    });

    console.log(await response.json());
  }
};
```

:warning: Due to the limitations of event messages, the response only contains the [method][Response Methods] matching the `Accept` specified in the header options.

Content Type               | Response Method
---------------------------|----------------------------
`application/json`         | `response.json()`
`application/octet-stream` | `response.arrayBuffer()`
`text/*`                   | `response.text()`

When the `Accept` is omitted, `application/json` will be used as default.

Again, this is an experiment. I'm not sure where this is going, but I'm looking forward to your [feedback][Discussions]!

## License

This work is licensed under the [MIT License](LICENSE)

[Fetch API]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
[Web Workers]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
[Discussions]: https://github.com/idleberg/atom-service-fetch/discussions
[Issues]: https://github.com/idleberg/atom-service-fetch/issues
[Response Methods]: https://developer.mozilla.org/en-US/docs/Web/API/Response#methods
