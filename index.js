/**
 * (c) Copyright Reserved EVRYTHNG Limited 2018.
 * All rights reserved. Use of this material is subject to license.
 */

const { promptForData, validateProduct } = require('./util');

const SMARTLABEL_SITE = 'https://smartlabel.evrythng.io';

/**
 * Validate a product against the schema, and create it if it validates.
 *
 * @param {object} api - The plugin API object from the CLI.
 * @param {object} product - The user-entered product object.
 * @param {string} project - Project ID to use.
 * @returns {Promise} Promise that resolves once the product is created.
 */
const validateAndCreate = async (api, product, project) => {
  validateProduct(product);
  await api.runCommand([
    'products', 'create', JSON.stringify(product), '--project', project,
  ]);

  console.log(`\nFinished! View your new SmartLabel-compatible product:`);
  console.log(`\n  ${SMARTLABEL_SITE}/foodBeverages?product=$PRODUCT_ID&access_token=$APP_API_KEY`);
  console.log('\nWhere $PRODUCT_ID is the product\'s ID, and $APP_API_KEY is an in-scope Application API Key.');
};

/**
 * Get the project ID from the CLI switch, if it exists.
 *
 * @param {object} api - The plugin API object from the CLI.
 * @returns {string} The project ID.
 */
const getProject = (api) => {
  const project = api.getSwitches().PROJECT;
  if (!project) {
    throw new Error('Please specify the --project switch');
  }

  return project;
};

module.exports = (api) => {
  const command = {
    about: 'Create a product compatible with smartlabel.evrythng.io',
    firstArg: 'smartlabel',
    operations: {
      create: {
        execute: async ([, json]) => validateAndCreate(api, JSON.parse(json), getProject(api)),
        pattern: 'create $payload',
        helpPattern: 'create $payload --project <project ID>',
      },
      build: {
        execute: async () => {
          const project = getProject(api);
          const product = await promptForData();
          return validateAndCreate(api, product);
        },
        pattern: 'build',
        helpPattern: 'build --project <project ID>',
      },
    },
  };

  api.registerCommand(command);
};
