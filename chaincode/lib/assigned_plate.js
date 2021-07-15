/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class Assigned_Plate extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Vehicle Ledger ===========');
        const mocklist = [
            {
                owner_id: '11112',
                plate_number: 'AB1234',
                chassis_number: '10138682'
            }, {
                owner_id: '11113',
                plate_number: 'AB1567',
                chassis_number: '10138683',
            }
        ];

        for (let i = 0; i < mocklist.length; i++) {
            await ctx.stub.putState(mocklist[i].plate_number, Buffer.from(JSON.stringify(mocklist[i])));
            console.info('Added <--> ', mocklist[i]);
        }

        console.info('============= END : Initialize Vehicle Ledger ===========');
    }
    async addPlateInfo(ctx, owner_id, plate_number, chassis_number) {
        console.info('============= START : Create ledger for Storing Vehicle Information ===========');

        const vehicleDetails = await ctx.stub.getState(plate_number);
        if (!!vehicleDetails) {
            throw new Error(`${plate_number} already exists!`);
        }

        const plate = {
            owner_id,
            plate_number,
            chassis_number
        };

        await ctx.stub.putState(plate_number, Buffer.from(JSON.stringify(plate)));
        console.info('============= END : Create ledger for Storing Vehicle Information ===========');
    }

    async getPlateInfo(ctx, plate_number) {
        const plateDetails = await ctx.stub.getState(plate_number);
        if (!plateDetails || plateDetails.length === 0) {
            throw new Error(`${plate_number} does not exist!`);
        }
        console.log(plateDetails.toString());
        return plateDetails.toString();
    }

    async queryAllPlateRecords(ctx) {
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

module.exports = Assigned_Plate;
