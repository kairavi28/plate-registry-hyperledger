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
        const assigned_plates = [
            {
                client_id: '17653661',
                chassis_number: '10138682',
                plate_number: 'KUOGN85R3B012814'
            }, {
                client_id: '17653662',
                chassis_number: '10138682',
                plate_number: 'KUOGN82R3J012909'
            }
        ];

        for (let i = 0; i < assigned_plates.length; i++) {
            await ctx.stub.putState(assigned_plates[i].plate_number, Buffer.from(JSON.stringify(assigned_plates[i])));
            console.info('Added <--> ', assigned_plates[i]);
        }

        console.info('============= END : Initialize Vehicle Ledger ===========');
    }
    async addVehicleInfo(ctx, client_id, chassis_number, plate_number) {
        console.info('============= START : Create ledger for Storing Vehicle Information ===========');

        const vehicleDetails = await ctx.stub.getState(plate_number);
        if (!!vehicleDetails) {
            throw new Error(`${plate_number} already exists!`);
        }

        const vehicle = {
            client_id,
            chassis_number,
            plate_number
        };

        await ctx.stub.putState(plate_number, Buffer.from(JSON.stringify(vehicle)));
        console.info('============= END : Create ledger for Storing Vehicle Information ===========');
    }

    async getVehicleInfo(ctx, plate_number) {
        const vehicleDetails = await ctx.stub.getState(plate_number);
        if (!vehicleDetails || vehicleDetails.length === 0) {
            throw new Error(`${plate_number} does not exist!`);
        }
        console.log(vehicleDetails.toString());
        return vehicleDetails.toString();
    }

    async queryAllVehicles(ctx) {
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
