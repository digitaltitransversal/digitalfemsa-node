# DigitalFemsa API library for Node.js 
![Node.js CI](https://github.com/digitalfemsa/digitalfemsa-node/workflows/Node.js%20CI/badge.svg)
[![Coverage Status](https://api.codeclimate.com/v1/badges/6d669b88c0b07a3ff6a3/test_coverage)](https://codeclimate.com/github/digitalfemsa/digitalfemsa-node/test_coverage)
[![Downloads](https://img.shields.io/npm/dm/digitalfemsa.svg)](https://www.npmjs.com/package/digitalfemsa)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/digitalfemsa.svg)
[![Version](https://img.shields.io/npm/v/digitalfemsa.svg)](https://www.npmjs.com/package/digitalfemsa)
[![Try on RunKit](https://badge.runkitcdn.com/digitalfemsa.svg)](https://runkit.com/npm/digitalfemsa)

This is the officially supported Node.js library for using DigitalFemsa's APIs.
## Supported API versions
The library supports all APIs under the following services:

| API                                                                                         | Description | Service Name | Supported version |
|---------------------------------------------------------------------------------------------| ----------- |-------|-------------------|
| [Payments API](https://developers.digitalfemsa.com/reference)                  | Our classic integration for online payments. Current supported version | Payments API | **v2.1.0**        |

For more information, refer to our [documentation](https://developers.digitalfemsa.com/v2.1.0/docs).

## Prerequisites
- [DigitalFemsa account](https://panel.digitalfemsa.com/)
- [API key](https://developers.digitalfemsa.com/v2.1.0/docs/como-obtener-tus-api-keys).  your API credential .
- [Install Node.js](https://nodejs.org/en/download/) version 14 or later.

## Installation
Install the [Node.JS package](https://www.npmjs.com/package/digitalfemsa):
```bash
npm install --save digitalfemsa
```

Alternatively, you can download the [release on GitHub](https://github.com/digitalfemsa/digitalfemsa-node/releases).

## Updating

To update the Node.JS package:

``` bash
npm update digitalfemsa
```

Check for breaking changes on the [releases page](https://github.com/digitalfemsa/digitalfemsa-node/releases/).

## Releasing a new SDK version

Use the Make target to bump the SDK version across the repository.

```bash
# Example: bump to 1.0.1
make update-version VERSION=1.0.1
```

What it updates:

- VERSION (file)
- package.json ("version")
- config-node.json ("npmVersion")
- common.ts (User-Agent version and bindings_version)



## Using the library

In order to submit http request to DigitalFemsa API you need to initialize the client. The following example makes a order request:
```ts
import { CustomersApi, Configuration, Customer, CustomerResponse } from "digitalfemsa";

const apikey = "key_xxxxx";
const config = new Configuration({ accessToken: apikey });
const client = new CustomersApi(config);

const customer: Customer = {
  name: "John Constantine",
  email: "frank@google.com",
  phone: "+5215555555555"
}

client.createCustomer(customer).then(response => {
  const customerResponse = response.data as CustomerResponse;
  console.log(customerResponse.id);
}).catch(error => {
  console.error("here", error);
});
```

## Running the tests
Navigate to digitalfemsa-node folder and run the following commands.
```
npm run build
npm run test
```

## Contributing
We encourage you to contribute to this repository, so everyone can benefit from new features, bug fixes, and any other improvements.
Have a look at our [contributing guidelines](https://github.com/digitalfemsa/digitalfemsa-node/blob/main/CONTRIBUTING.md) to find out how to raise a pull request.

## Support
If you have a feature request, or spotted a bug or a technical problem, [create an issue here](https://github.com/digitalfemsa/digitalfemsa-node/issues/choose).

For other questions, [contact our Support Team](https://developers.digitalfemsa.com/discuss).

## Licence
This repository is available under the [MIT license](https://github.com/digitalfemsa/digitalfemsa-node/blob/master/LICENSE).

## See also
* [DigitalFemsa docs](https://developers.digitalfemsa.com/docs)
