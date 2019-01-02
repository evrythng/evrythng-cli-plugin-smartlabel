const { expect } = require('chai');
const sinon = require('sinon');
const plugin = require('../index');
const util = require('../util');

describe('evrythng-cli-plugin-smartlabel', () => {
  describe('index.js', () => {
    it('should export a function', () => {
      expect(plugin).to.be.a('function');
    });
  });

  describe('util.js', () => {
    afterEach(sinon.restore);

    it('should build a compatible product', async () => {
      const inputs = [
        'BrandName Oatmeal Cranberry Cookies',  // name
        'BrandName',  // brand
        '10293847564738',  // identifiers.gs1:01
        'https://example.com/product.png',  // photos[0]
        '18',  // customFields.smartLabel:added_sugars_dv
        '9',  // customFields.smartLabel:added_sugars_g
        'Egg,Milk,Soy,Wheat,Tree Nuts',  // customFields.smartLabel:allergens
        '150',  // customFields.smartLabel:calories
        'Example Kosher Cert|The Example Kosher Cert attribute includes all products that bear the Example Kosher logo.',  // customFields.smartLabel:certifications
        '0',  // customFields.smartLabel:cholesterol_dv
        '0',  // customFields.smartLabel:cholesterol_mg
        'No Artificial Color|Includes all products making a claim related to the product being free of artificial colors.,No Artificial Flavor|Includes all products making a claim related to the product being free of artificial flavor.,No Preservative|The No Preservative Claim includes all products making a claim related to being free of preservatives.',  // customFields.smartLabel:claims
        '23 Park Blvd, Palo Alto, CA, USA',  // customFields.smartLabel:company_address
        'hello@example.com',  // customFields.smartLabel:company_email
        '+447950821234',  // customFields.smartLabel:company_phone
        'https://example.com/privacy-policy/',  // customFields.smartLabel:company_privacy
        '3',  // customFields.smartLabel:dietary_fiber_dv
        '<1',  // customFields.smartLabel:dietary_fiber_g
        'The BrandName Promise|BrandName Quality is your assurance of great quality products at the best value everyday - from delicious frozen entrees and freshly baked French bread to home essentials. Quality & satisfaction guaranteed or your money back.,Satisfaction Guarantee|OUR PROMISE - QUALITY & SATISFACTION 100% GUARANTEED OR YOUR MONEY BACK.',  // customFields.smartLabel:health
        'Enriched Flour, Wheat Flour, Niacin, Reduced Iron, Vitamin B1 [Thiamin Mononitrate], Vitamin B2 [Riboflavin], Folic Acid, Sugar, Vegetable Oil (Soybean and Palm Oil with TBHQ for freshness), Whole Grain Oats, Raisin Paste, Contains 2% or less of Baking Soda, Salt, Spice, Whey, Soy Lecithin',  // customFields.smartLabel:ingredients
        '2',  // customFields.smartLabel:protein_g
        '10',  // customFields.smartLabel:sat_fat_dv
        '2',  // customFields.smartLabel:sat_fat_g
        '2 Cookies',  // customFields.smartLabel:serving_size
        '11',  // customFields.smartLabel:servings_per_container
        '9',  // customFields.smartLabel:sodium_dv
        '200',  // customFields.smartLabel:sodium_mg
        '10',  // customFields.smartLabel:sugars_g
        '8',  // customFields.smartLabel:total_carbohydrates_dv
        '23',  // customFields.smartLabel:total_carbohydrates_g
        '8',  // customFields.smartLabel:total_fat_dv
        '6',  // customFields.smartLabel:total_fat_g
        '0',  // customFields.smartLabel:trans_fat_g
        'example.com',  // customFields.smartLabel:website_name
        'https://example.com',  // customFields.smartLabel:website_url
        '12.5',  // customFields.smartLabel:weight_oz
      ];

      const expected = {
        customFields: {
          'smartLabel:added_sugars_dv': '18',
          'smartLabel:added_sugars_g': '9',
          'smartLabel:allergens': 'Egg,Milk,Soy,Wheat,Tree Nuts',
          'smartLabel:calories': '150',
          'smartLabel:certifications': 'Example Kosher Cert|The Example Kosher Cert attribute includes all products that bear the Example Kosher logo.',
          'smartLabel:cholesterol_dv': '0',
          'smartLabel:cholesterol_mg': '0',
          'smartLabel:claims': 'No Artificial Color|Includes all products making a claim related to the product being free of artificial colors.,No Artificial Flavor|Includes all products making a claim related to the product being free of artificial flavor.,No Preservative|The No Preservative Claim includes all products making a claim related to being free of preservatives.',
          'smartLabel:company_address': '23 Park Blvd, Palo Alto, CA, USA',
          'smartLabel:company_email': 'hello@example.com',
          'smartLabel:company_phone': '+447950821234',
          'smartLabel:company_privacy': 'https://example.com/privacy-policy/',
          'smartLabel:dietary_fiber_dv': '3',
          'smartLabel:dietary_fiber_g': '<1',
          'smartLabel:health': 'The BrandName Promise|BrandName Quality is your assurance of great quality products at the best value everyday - from delicious frozen entrees and freshly baked French bread to home essentials. Quality & satisfaction guaranteed or your money back.,Satisfaction Guarantee|OUR PROMISE - QUALITY & SATISFACTION 100% GUARANTEED OR YOUR MONEY BACK.',
          'smartLabel:ingredients': 'Enriched Flour, Wheat Flour, Niacin, Reduced Iron, Vitamin B1 [Thiamin Mononitrate], Vitamin B2 [Riboflavin], Folic Acid, Sugar, Vegetable Oil (Soybean and Palm Oil with TBHQ for freshness), Whole Grain Oats, Raisin Paste, Contains 2% or less of Baking Soda, Salt, Spice, Whey, Soy Lecithin',
          'smartLabel:protein_g': '2',
          'smartLabel:sat_fat_dv': '10',
          'smartLabel:sat_fat_g': '2',
          'smartLabel:serving_size': '2 Cookies',
          'smartLabel:servings_per_container': '11',
          'smartLabel:sodium_dv': '9',
          'smartLabel:sodium_mg': '200',
          'smartLabel:sugars_g': '10',
          'smartLabel:total_carbohydrates_dv': '8',
          'smartLabel:total_carbohydrates_g': '23',
          'smartLabel:total_fat_dv': '8',
          'smartLabel:total_fat_g': '6',
          'smartLabel:trans_fat_g': '0',
          'smartLabel:website_name': 'example.com',
          'smartLabel:website_url': 'https://example.com',
          'smartLabel:weight_oz': '12.5'
        },
        brand: 'BrandName',
        name: 'BrandName Oatmeal Cranberry Cookies',
        photos: [
          'https://example.com/product.png'
        ],
        identifiers: {
          'gs1:01': '10293847564738',
        }
      };

      const stub = sinon.stub(util, 'getValue');
      inputs.forEach((item, i) => {
        stub.onCall(i).returns(item);
      });

      const product = await util.promptForData();

      expect(product).to.deep.equal(expected);
      expect(() => util.validateProduct(product)).to.not.throw();
    });
  });
});
