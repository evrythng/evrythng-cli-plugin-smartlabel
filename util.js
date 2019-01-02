/**
 * (c) Copyright Reserved EVRYTHNG Limited 2018.
 * All rights reserved. Use of this material is subject to license.
 */

const { validate } = require('jsonschema');
const readline = require('readline');

const SCHEMA = require('./product.schema.json');

/**
 * Validate a product agains the schema.
 *
 * @param {object} product - The product object to validate.
 */
const validateProduct = (product) => {
  const validation = validate(product, SCHEMA);
  if (validation.errors.length) {
    const lines = validation.errors.map(p => p.stack).join('\n');
    throw new Error(`Validation errors:\n${lines}`);
  }
};

/**
 * Get a single line of input from the user.
 *
 * @param {string} label - The prompt for data, such as 'Product name'.
 * @returns {Promise} Promise that resolves to the answer to the prompt as a string.
 */
const getValue = label => new Promise((resolve) => {
  const rl = readline.createInterface(process.stdin, process.stdout);
  console.log(`\n${label}:`);
  rl.question('> ', (result) => {
    rl.close();
    resolve(result);
  });
});

/**
 * Ask the user for values for each item in the schema
 */
const promptForData = async () => {
  const product = { photos: [], identifiers: {}, customFields: {} };

  console.log('\nPlease provide values for the following data items:');
  product.name = await module.exports.getValue('Name');
  product.brand = await module.exports.getValue('Brand');
  product.identifiers['gs1:01'] = await module.exports.getValue('GS1 GTIN');
  product.photos[0] = await module.exports.getValue('Product image URL');

  const { required } = SCHEMA.properties.customFields;
  for (let i = 0; i < required.length; i += 1) {
    const key = required[i];
    const label = SCHEMA.properties.customFields.properties[key].description;
    product.customFields[key] = await module.exports.getValue(`(${i + 1}/${required.length}) ${label}`);
  }

  return product;
};

module.exports = {
  validateProduct,
  getValue,
  promptForData,
};
