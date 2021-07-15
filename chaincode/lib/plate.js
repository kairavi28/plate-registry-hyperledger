/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class Plate extends Contract {

    async initLedger(ctx) {

        const mockList = [
            {
                plate_number: 'AB1234',
                owner_id: '11112',
                registration_date: '2021-01-15',
                renewals: '[]'
            }, {
                plate_number: 'AB1567',
                owner_id: '11112',
                registration_date: '2021-01-20',
                renewals: '[]'
            }
        ];

        for (let i = 0; i < mockList.length; i++) {
            await ctx.stub.putState(mockList[i].plate_number, Buffer.from(JSON.stringify(mockList[i])));
        }

    }

    async addNewPlate(ctx, plate_number, owner_id, registration_date) {

        const plateDetails = await ctx.stub.getState(plate_number);
        if (!!plateDetails) {
            throw new Error(`Plate number: ${plate_number} already exists!`);
        }

        const newPlate = {
            plate_number,
            owner_id,
            registration_date,
            renewals: '[]'
        };

        await ctx.stub.putState(plate_number, Buffer.from(JSON.stringify(newPlate)));

    }

    async addRenewalDetails(ctx, plate_number, renewals) {

        const plateDetails = await ctx.stub.getState(plate_number);
        if (!plateDetails || plateDetails.length === 0) {
            throw new Error(`${plate_number} does not exist`);
        }

        plateDetails.renewals = renewals;

        await ctx.stub.putState(plate_number, Buffer.from(JSON.stringify(plateDetails)));

    }


    async getPlateInfo(ctx, plate_number) {

        const plateDetails = await ctx.stub.getState(plate_number);

        if (!plateDetails || plateDetails.length === 0) {
            throw new Error(`${plate_number} does not exist`);
        }

        return plateDetails.toString();
    }

    async queryAllPlates(ctx) {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const { key, value } of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }
}

module.exports = Plate;
