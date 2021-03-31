'use strict';

import { should } from 'chai';

should();

describe('Math', function () {
  describe('#abs()', function () {
    it('should return positive value of given negative number', function () {
      Math.abs(-5).should.equal(5);
    });

    it('should return positive value of given positive number', function () {
      Math.abs(3).should.equal(3);
    });

    it('should return 0 given 0', function () {
      Math.abs(0).should.equal(0);
    });
  });
});
