/* eslint-disable max-len */
// use strict
import SettingsBill from '../public/settings-bill.js';
import assert from 'assert';
import mockdate from 'mockdate';

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
  it('should return true if the warning level has been reached.', () => {
    const testBill = new SettingsBill();
    testBill.setSettings({
      callCost: '2',
      smsCost: '3',
      warningLevel: '8',
      criticalLevel: '40',
    });
    assert.strictEqual(testBill.hasReachedWarningLevel(), false);
    testBill.recordAction('call');
    testBill.recordAction('sms');
    assert.strictEqual(testBill.hasReachedWarningLevel(), false);
    testBill.recordAction('call');
    testBill.recordAction('call');
    testBill.recordAction('call');
    testBill.recordAction('call');
    testBill.recordAction('sms');
    testBill.recordAction('call');
    testBill.recordAction('call');
    testBill.recordAction('sms');
    testBill.recordAction('call');
    assert.strictEqual(testBill.hasReachedWarningLevel(), true);
  });
  it('should return true if the critical level has been reached.', () => {
    const testBill = new SettingsBill();
    testBill.setSettings({
      callCost: '2',
      smsCost: '3',
      warningLevel: '8',
      criticalLevel: '20',
    });
    assert.strictEqual(testBill.hasReachedCriticalLevel(), false);
    testBill.recordAction('call');
    testBill.recordAction('sms');
    assert.strictEqual(testBill.hasReachedCriticalLevel(), false);
    testBill.recordAction('call');
    testBill.recordAction('call');
    testBill.recordAction('call');
    testBill.recordAction('call');
    testBill.recordAction('sms');
    testBill.recordAction('call');
    testBill.recordAction('call');
    testBill.recordAction('sms');
    testBill.recordAction('call');
    assert.strictEqual(testBill.hasReachedCriticalLevel(), true);
  });
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
  it('should return a list of all recorded actions', () => {
    const date = new Date('May 23, 1994 14:15:53');
    mockdate.set(date);
    const testBill = new SettingsBill();
    testBill.setSettings({
      callCost: '2',
      smsCost: '3',
      warningLevel: '8',
      criticalLevel: '20',
    });
    assert.deepStrictEqual(testBill.actions(), []);
    testBill.recordAction('sms');
    testBill.recordAction('sms');
    testBill.recordAction('sms');
    assert.deepStrictEqual(testBill.actions(), [
      {type: 'sms', cost: 3, timestamp: date},
      {type: 'sms', cost: 3, timestamp: date},
      {type: 'sms', cost: 3, timestamp: date},
    ]);
    testBill.recordAction('call');
    testBill.recordAction('call');
    assert.deepStrictEqual(testBill.actions(), [
      {type: 'sms', cost: 3, timestamp: date},
      {type: 'sms', cost: 3, timestamp: date},
      {type: 'sms', cost: 3, timestamp: date},
      {type: 'call', cost: 2, timestamp: date},
      {type: 'call', cost: 2, timestamp: date},
    ]);
    testBill.setSettings({
      callCost: '1.50',
      smsCost: '0.80',
      warningLevel: '14',
      criticalLevel: '25',
    });
    testBill.recordAction('sms');
    testBill.recordAction('call');
    testBill.recordAction('sms');
    testBill.recordAction('sms');
    testBill.recordAction('sms');
    testBill.recordAction('call');
    testBill.recordAction('call');
    assert.deepStrictEqual(testBill.actions(), [
      {type: 'sms', cost: 3, timestamp: date},
      {type: 'sms', cost: 3, timestamp: date},
      {type: 'sms', cost: 3, timestamp: date},
      {type: 'call', cost: 2, timestamp: date},
      {type: 'call', cost: 2, timestamp: date},
      {type: 'sms', cost: 0.8, timestamp: date},
      {type: 'call', cost: 1.5, timestamp: date},
      {type: 'sms', cost: 0.8, timestamp: date},
      {type: 'sms', cost: 0.8, timestamp: date},
      {type: 'sms', cost: 0.8, timestamp: date},
      {type: 'call', cost: 1.5, timestamp: date},
      {type: 'call', cost: 1.5, timestamp: date},
    ]);
    mockdate.reset();
  });
  it('should return a list of all recorded actions filtered by type', () => {
    const date = new Date('May 23, 1994 14:15:53');
    mockdate.set(date);
    const testBill = new SettingsBill();
    testBill.setSettings({
      callCost: '2',
      smsCost: '3',
      warningLevel: '8',
      criticalLevel: '20',
    });
    testBill.recordAction('sms');
    testBill.recordAction('sms');
    testBill.recordAction('sms');
    assert.deepStrictEqual(testBill.actionsFor('sms'), [
      {type: 'sms', cost: 3, timestamp: date},
      {type: 'sms', cost: 3, timestamp: date},
      {type: 'sms', cost: 3, timestamp: date},
    ]);
    assert.deepStrictEqual(testBill.actionsFor('call'), []);
    testBill.recordAction('call');
    testBill.recordAction('call');
    assert.deepStrictEqual(testBill.actionsFor('sms'), [
      {type: 'sms', cost: 3, timestamp: date},
      {type: 'sms', cost: 3, timestamp: date},
      {type: 'sms', cost: 3, timestamp: date},
    ]);
    assert.deepStrictEqual(testBill.actionsFor('call'), [
      {type: 'call', cost: 2, timestamp: date},
      {type: 'call', cost: 2, timestamp: date},
    ]);
    testBill.setSettings({
      callCost: '1.50',
      smsCost: '0.80',
      warningLevel: '14',
      criticalLevel: '25',
    });
    testBill.recordAction('sms');
    testBill.recordAction('call');
    testBill.recordAction('sms');
    testBill.recordAction('sms');
    testBill.recordAction('sms');
    testBill.recordAction('call');
    testBill.recordAction('call');
    assert.deepStrictEqual(testBill.actionsFor('sms'), [
      {type: 'sms', cost: 3, timestamp: date},
      {type: 'sms', cost: 3, timestamp: date},
      {type: 'sms', cost: 3, timestamp: date},
      {type: 'sms', cost: 0.8, timestamp: date},
      {type: 'sms', cost: 0.8, timestamp: date},
      {type: 'sms', cost: 0.8, timestamp: date},
      {type: 'sms', cost: 0.8, timestamp: date},
    ]);
    assert.deepStrictEqual(testBill.actionsFor('call'), [
      {type: 'call', cost: 2, timestamp: date},
      {type: 'call', cost: 2, timestamp: date},
      {type: 'call', cost: 1.5, timestamp: date},
      {type: 'call', cost: 1.5, timestamp: date},
      {type: 'call', cost: 1.5, timestamp: date},
    ]);
    mockdate.reset();
  });
});
