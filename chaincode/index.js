/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const Owner = require('./lib/owner');
const Plate = require('./lib/plate');
const Payment = require('./lib/payment');

module.exports.Owner = Owner;
module.exports.Plate = Plate;
module.exports.Payment = Payment;

module.exports.contracts = [Owner, Plate, Payment];
