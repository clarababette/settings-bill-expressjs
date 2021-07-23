/* eslint-disable max-len */
// use strict
import SettingsBill from '../public/settings-bill.js';
import assert from 'assert';

describe('The settings bill', () => {
  it('should set and change the cost of a call and sms as well as the warning and critical levels.', () => {
    const testBill = new SettingsBill();
    assert.deepStrictEqual(testBill.getSettings(), {
      callCost: undefined,
      smsCost: undefined,
      warningLevel: undefined,
      criticalLevel: undefined,
    });
    testBill.setSettings({
      callCost: '2',
      smsCost: '3',
      warningLevel: '8',
      criticalLevel: '20',
    });
    assert.deepStrictEqual(testBill.getSettings(), {
      callCost: 2,
      smsCost: 3,
      warningLevel: 8,
      criticalLevel: 20,
    });
  });
  it('should record a call and add it to the total calls and grandtotal', () => {
    const testBill = new SettingsBill();
    testBill.setSettings({
      callCost: '2',
      smsCost: '3',
      warningLevel: '8',
      criticalLevel: '20',
    });
    assert.deepStrictEqual(testBill.totals(), {
      smsTotal: 0,
      callTotal: 0,
      grandTotal: 0,
    });
    testBill.recordAction('call');
    testBill.recordAction('call');
    assert.deepStrictEqual(testBill.totals(), {
      smsTotal: 0,
      callTotal: 4,
      grandTotal: 4,
    });
  });
  it('should record a sms and add it to the sms total and grandtotal', () => {
    const testBill = new SettingsBill();
    testBill.setSettings({
      callCost: '2',
      smsCost: '3',
      warningLevel: '8',
      criticalLevel: '20',
    });
    assert.deepStrictEqual(testBill.totals(), {
      smsTotal: 0,
      callTotal: 0,
      grandTotal: 0,
    });
    testBill.recordAction('sms');
    testBill.recordAction('sms');
    testBill.recordAction('sms');
    assert.deepStrictEqual(testBill.totals(), {
      smsTotal: 9,
      callTotal: 0,
      grandTotal: 9,
    });
  });
  it('should return the grandtotal and the call and sms totals', () => {
    const testBill = new SettingsBill();
    testBill.setSettings({
      callCost: '2',
      smsCost: '3',
      warningLevel: '8',
      criticalLevel: '20',
    });
    assert.deepStrictEqual(testBill.totals(), {
      smsTotal: 0,
      callTotal: 0,
      grandTotal: 0,
    });
    testBill.recordAction('sms');
    testBill.recordAction('sms');
    testBill.recordAction('sms');
    assert.deepStrictEqual(testBill.totals(), {
      smsTotal: 9,
      callTotal: 0,
      grandTotal: 9,
    });
    testBill.recordAction('call');
    testBill.recordAction('call');
    assert.deepStrictEqual(testBill.totals(), {
      smsTotal: 9,
      callTotal: 4,
      grandTotal: 13,
    });
  });
  it('should return the grandtotal and the call and sms totals', () => {
    const testBill = new SettingsBill();
    testBill.setSettings({
      callCost: '2',
      smsCost: '3',
      warningLevel: '8',
      criticalLevel: '20',
    });
    assert.deepStrictEqual(testBill.totals(), {
      smsTotal: 0,
      callTotal: 0,
      grandTotal: 0,
    });
    testBill.recordAction('sms');
    testBill.recordAction('sms');
    testBill.recordAction('sms');
    assert.deepStrictEqual(testBill.totals(), {
      smsTotal: 9,
      callTotal: 0,
      grandTotal: 9,
    });
    testBill.recordAction('call');
    testBill.recordAction('call');
    assert.deepStrictEqual(testBill.totals(), {
      smsTotal: 9,
      callTotal: 4,
      grandTotal: 13,
    });
  });
});
