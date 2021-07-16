/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class Assigned_Plate extends Contract {

    getKey(chassis_number, plate_number) {
        return `${chassis_number}-${plate_number}`; //the key to each row is a composite key)
    }

    async initLedger(ctx) {
        console.info('============= START : Initialize Vehicle Ledger ===========');
        const mocklist = [
            {
                chassis_number: '10138682',
                plate_number: 'AB1234',
                assign_date: '2020-10-10'
            }, {
                chassis_number: '10138682',
                plate_number: 'AB1567',
                assign_date: '2020-10-11',
            }
        ];

        for (let i = 0; i < mocklist.length; i++) {
            const key = getKey(mocklist[i].chassis_number, mocklist[i].plate_number);
            await ctx.stub.putState(key, Buffer.from(JSON.stringify(mocklist[i])));
            console.info('Added <--> ', mocklist[i]);
        }

        console.info('============= END : Initialize Vehicle Ledger ===========');
    }

    async addPlateInfo(ctx, chassis_number, plate_number, assign_date) {
        console.info('============= START : Create ledger for Storing Vehicle Information ===========');

        const key = getKey(chassis_number, plate_number);

        const vehicleDetails = await ctx.stub.getState(key);
        if (!!vehicleDetails) {
            throw new Error('Registry already exists!');
        }

        const newAssignedPlate = {
            chassis_number,
            plate_number,
            assign_date
        };

        await ctx.stub.putState(key, Buffer.from(JSON.stringify(newAssignedPlate)));
        console.info('============= END : Create ledger for Storing Vehicle Information ===========');
    }

    async getPlateInfo(ctx, chassis_number, plate_number) {

        const key = getKey(chassis_number, plate_number);

        const plateDetails = await ctx.stub.getState(key);
        if (!plateDetails || plateDetails.length === 0) {
            throw new Error('Registry does not exist!');
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
