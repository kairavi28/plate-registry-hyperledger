/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const Owner = require('./lib/owner');
const Plate = require('./lib/plate');
const Payment = require('./lib/payment');
const Vehicle = require('./lib/vehicle');
const Assigned_Plate = require('./lib/assigned_plate');

module.exports.Owner = Owner;
module.exports.Plate = Plate;
module.exports.Payment = Payment;
module.exports.Vehicle = Vehicle;
module.exports.Assigned_Plate = Assigned_Plate;

module.exports.contracts = [Owner, Plate, Payment, Vehicle, Assigned_Plate];
