/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class Payment extends Contract {

    async initLedger(ctx) {

        const mockList = [
            {
                payment_id: '1000010',
                owner_id: '11112',
                plate_number: 'AB1234',
                amount: '100',
                payment_date: '2021-07-15'
            }, {
                payment_id: '1000010',
                owner_id: '11113',
                plate_number: 'AB1567',
                amount: '120',
                payment_date: '2021-07-10'
            }
        ];

        for (let i = 0; i < mockList.length; i++) {
            await ctx.stub.putState(mockList[i].payment_id, Buffer.from(JSON.stringify(mockList[i])));
        }

    }

    async addNewPayment(ctx, payment_id, owner_id, plate_number, amount, payment_date) {

        const paymentDetails = await ctx.stub.getState(payment_id);
        if (!!paymentDetails) {
            throw new Error(`A payment with ID: ${payment_id} already exists!`);
        }

        const newPayment = {
            payment_id,
            owner_id,
            plate_number,
            amount,
            payment_date
        };

        await ctx.stub.putState(payment_id, Buffer.from(JSON.stringify(newPayment)));

    }

    async getPaymentInfo(ctx, payment_id) {

        const paymentDetails = await ctx.stub.getState(payment_id);

        if (!paymentDetails || paymentDetails.length === 0) {
            throw new Error(`${owner_id} does not exist`);
        }

        return paymentDetails.toString();
    }

    async queryAllPayments(ctx) {
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

module.exports = Payment;
