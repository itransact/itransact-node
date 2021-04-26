## Local Development

This repository is a wrapper for the iTransact API. Any development should occur in the API first then updated here where necessary.



## Testing
Unit tests on this project are run using Mocha. You can find each test in the `/test` folder.

*Note: We utilize the npm package [dotenv](https://www.npmjs.com/package/dotenv) for testing different environments.
Once you add these environment variables using your own `.env` using the  [.env.default](.env.default) file for reference the tests will function properly.
You are also able to add the required variables it to your PATH directly to achieve the same effect*

Example `.env` file:
```dotenv
# Used in unit tests.
ITRANSACT_ENVIRONMENT=production
ITRANSACT_API_USERNAME=your_api_username
ITRANSACT_API_KEY=your_api_key
```

You can run the following commands from [package.json](package.json) to execute the tests.

```bash
npm test
```

```bash
npm run test-report
```

```bash
npm run test-check-coverage
```

```bash
./node_modules/.bin/mocha --reporter spec
```  