var assert = require('assert');

describe('General test', function () {
    it('Execute pdf generation on existing charge with order', async function () {

        const invoice_id = 'ch_1Blg0sBBh3le1kgVPJTctLkm';
        const stripe_key = 'XXXXXXXXXXXX';

        const fs = require('fs');
        const path = require('path');

        const stripepdfinvoice = require('../index')(stripe_key, {
            company_name: 'Trusk',
            company_address: '14 rue Charles V',
            company_zipcode: '75004',
            company_city: 'Paris',
            company_country: 'France',
            company_siret: '146-458-246',
            company_vat_number: '568-3587-345',
            company_logo: path.resolve("batman.jpg"),
            color: '#2C75FF',
        });

        let stream = await stripepdfinvoice(invoice_id, {
            client_company_name: 'My Company',
            client_company_address: '1 infinite Loop',
            client_company_zipcode: '95014',
            client_company_city: 'Cupertino, CA',
            client_company_country: 'USA',
            receipt_number: 'ER56T67'
        });

        stream.pipe(fs.createWriteStream('./invoice.pdf'));
        stream.on('end', () => {
            console.log('done');
        });
        stream.on('error', (error) => {
            console.log(error);
        });

    });

});
