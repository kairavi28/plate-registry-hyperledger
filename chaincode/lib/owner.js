/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class Owner extends Contract {

    async initLedger(ctx) {

        const mockList = [
            {
                owner_id: '11112',
                first_name: 'John',
                last_name: 'Smith',
                registration_date: '2021-05-20'
            }, {
                owner_id: '11113',
                first_name: 'Jennifer',
                last_name: 'Palmiro',
                registration_date: '2018-10-15'
            }
        ];

        for (let i = 0; i < mockList.length; i++) {
            await ctx.stub.putState(mockList[i].owner_id, Buffer.from(JSON.stringify(mockList[i])));
        }

    }

    async addNewOwner(ctx, owner_id, first_name, last_name, registration_date) {

        const ownerDetails = await ctx.stub.getState(owner_id);
        if (!!ownerDetails) {
            throw new Error(`Customer with ID: ${owner_id} already exists!`);
        }

        const newOwner = {
            owner_id,
            first_name,
            last_name,
            registration_date
        };

        await ctx.stub.putState(owner_id, Buffer.from(JSON.stringify(newOwner)));

    }

    async getOwnerInfo(ctx, owner_id) {

        const ownerDetails = await ctx.stub.getState(owner_id);

        if (!ownerDetails || ownerDetails.length === 0) {
            throw new Error(`${owner_id} does not exist`);
        }
        
        return ownerDetails.toString();
    }

    async queryAllOwners(ctx) {
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

module.exports = Owner;
