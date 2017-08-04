# iTransact SDK for NodeJS

As a quick helper for our NodeJS community to get up and running even faster in your favorite dependency manager, we have created this API / SDK wrapper specifically tailored for NodeJS and Express. 

More details at [iTransact Developer API](http://developers.itransact.com/api-reference/#operation/postTransactions)

## Features
- [NodeJS](https://nodejs.org/en/)

## Usage 
If there is a platform you would like to see in addition to `npm` for dependency management, let us know.

### NPM Install
Run the following command at the root fo your project

```bash
npm install itransact-node
```

[iTransact SDK on NPM]()


### Manual Install

Download the zip, or use git submodules to pull the SDK into your project.

### Import Example

Here is an example implementation:

#### With NPM
```javascript
Coming soon
```

#### Without NPM
```javascript
Coming soon
```

#### Example Response
Example successful `postResult` using the example above will return a 201 with the following fields / value types:
```json
{
  "id": "string",
  "amount": 0,
  "status": "string",
  "settled": "string",
  "instrument": "string",
  "metadata": [
    {
      "key": "string",
      "value": "string"
    }
  ],
  "payment_source": {
    "name": "string",
    "default": "string",
    "type": "string",
    "expired": "string",
    "month": "string",
    "year": "string",
    "brand": "string",
    "last_four_digits": "string",
    "sec_code": "string"
  },
  "credits": {
    "amount": 0,
    "state": "string"
  },
  "credited_amount": "string"
}
```

Check out the files in `/examples` for other ideas for implementation.

## Testing

Unit tests on this project are run using Mocha. You can find each test in the `/test` folder.

After doing an npm install mocha, and chai will be available to run using the following command. 

```bash
./node_modules/.bin/mocha --reporter spec
```  