# service-fetch

> Provides the fetch API through a web worker

[![License](https://img.shields.io/github/license/idleberg/atom-service-fetch?color=blue&style=for-the-badge)](https://github.com/idleberg/atom-service-fetch/blob/master/LICENSE)
[![Release](https://img.shields.io/github/v/release/idleberg/atom-service-fetch?style=for-the-badge)](https://github.com/idleberg/atom-service-fetch/releases)
[![Downloads](https://img.shields.io/pulsar/dt/service-fetch?style=for-the-badge&color=slateblue)](https://web.pulsar-edit.dev/packages/service-fetch)
[![CI](https://img.shields.io/github/actions/workflow/status/idleberg/atom-service-fetch/default.yml?style=for-the-badge)](https://github.com/idleberg/atom-service-fetch/actions)

## Installation

### Package Manager

Install `service-fetch` from the editor's [Package Manager](http://flight-manual.atom-editor.cc/using-atom/sections/atom-packages/) or the command-line equivalent:

`$ ppm install service-fetch || apm install service-fetch`

### Using Git

Change to your packages directory:

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
$ cd service-fetch
$ ppm install || apm install
```

Build source:

```bash
$ ppm run build || apm run build
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
  }
},
"package-deps": [
  {
    "name": "service-fetch"
  }
]
```

Install [`atom-package-deps`](https://www.npmjs.com/package/atom-package-deps) to handle the package dependency and any fetch implementation for NodeJS as a fallback for when the service is unavailable:

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
        "my-package:fetch-demo": async () =>
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

:warning: Due to the limitations of event messages, the response only contains the [method][Response Methods] matching the `Accept` header:

Accept                     | Response Method
---------------------------|----------------------------
`application/json`         | `response.json()`
`application/octet-stream` | `response.arrayBuffer()`
`multipart/form-data`     | `response.formData()`
`text/*`                   | `response.text()`

When no `Accept` header has been specified, `application/json` will be used as default.

Again, this is an experiment. I'm not sure where this is going, but I'm looking forward to your [feedback][Discussions]!

## License

This work is licensed under the [MIT License](LICENSE)

[Fetch API]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
[Web Workers]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
[Discussions]: https://github.com/idleberg/atom-service-fetch/discussions
[Response Methods]: https://developer.mozilla.org/en-US/docs/Web/API/Response#methods
