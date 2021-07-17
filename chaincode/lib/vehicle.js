/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class Vehicle extends Contract {

    async initLedger(ctx) {

        console.info('============= START : Initialize Vehicle Ledger ===========');
        const registered_vehicles = [
            {
                chassis_number: '10138682', //vehicle identification number
                automobile_type: 'car',
                make: 'Toyota',
                model: 'Prius',
                year: '2020',
                engine_number: '6582331'
            }, {
                chassis_number: '10138683',
                automobile_type: 'car',
                make: 'Hyundai',
                model: 'Elentra',
                year: '2020',
                engine_number: '6582332'
            }
        ];

        for (let i = 0; i < registered_vehicles.length; i++) {
            await ctx.stub.putState(registered_vehicles[i].chassis_number, Buffer.from(JSON.stringify(registered_vehicles[i])));
            console.info('Added <--> ', registered_vehicles[i]);
        }

        console.info('============= END : Initialize Vehicle Ledger ===========');
    }

    async addVehicleInfo(ctx, chassis_number, automobile_type, make, model, year, engine_number) {

        console.info('============= START : Create ledger for Storing Vehicle Information ===========');

        const vehicleDetails = await ctx.stub.getState(chassis_number);
        if (!!vehicleDetails.length) {
            throw new Error(`${chassis_number} already exists!`);
        }

        const vehicle = {
            chassis_number,
            automobile_type,
            make,
            model,
            year,
            engine_number
        };

        await ctx.stub.putState(chassis_number, Buffer.from(JSON.stringify(vehicle)));
        console.info('============= END : Create ledger for Storing Vehicle Information ===========');
    }

    async getVehicleInfo(ctx, chassis_number) {
        const vehicleDetails = await ctx.stub.getState(chassis_number);
        if (!vehicleDetails || vehicleDetails.length === 0) {
            throw new Error(`${chassis_number} does not exist`);
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

module.exports = Vehicle;
