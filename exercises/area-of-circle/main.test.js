import { areaOfCircle } from './lib.js';
import test from 'node:test';
import assert from 'node:assert';

test('areaOfCircle', async (t) => {
  await t.test('should return the area of a circle given a radius', () => {
    assert.equal(areaOfCircle(10), 314.1592653589793);
    assert.equal(areaOfCircle(1), 3.141592653589793);
  });

  await t.test('should throw an error if the radius is negative', () => {
    assert.throws(
      () => {
        areaOfCircle(-1);
      },
      {
        name: 'Error',
        message: 'Radius cannot be negative',
      }
    );
  });
});
