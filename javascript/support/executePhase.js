'use strict';
const fs = require('fs');

module.exports = function (parser, phaseNum) {

  const testsDir = __dirname + '/../../dataset/phase' + phaseNum + '/';

  fs.readdirSync(testsDir)
    .filter(file => file.endsWith('.mml'))
    .forEach((file) => {
      // The actual test:
      const resultFile = file.replace('.mml', '.result');
      const testMML         = fs.readFileSync(testsDir + file, { encoding: 'utf8' });
      const expectedResults = JSON.parse(fs.readFileSync(testsDir + resultFile, { encoding: 'utf8' }));

      it('Parsing of ' + file + ' matches ' + resultFile, () => {
        parser.parse(testMML).should.eql(expectedResults);
      });
    });
};
