'use strict';
console.log('Starting verification.');
const executePhase = require('./support/executePhase');
const parser       = require('./parser');

// Initialize test frameworks
const chai   = require('chai');
const chaiAP = require('chai-as-promised');
chai.use(chaiAP);
// We favor the BDD style.
chai.should();

describe('MML Syntax Checker', () => {
  // Phase 1:
  describe('Phase 1', () => {
    executePhase(parser, 1);
  });

  // Phase 2:
  describe.skip('Phase 2', () => {
    executePhase(parser, 2);
  });

  // Phase 3:
  describe.skip('Phase 3', () => {
    executePhase(parser, 3);
  });
});
