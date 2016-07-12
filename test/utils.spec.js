import chai from 'chai';
const expect = chai.expect;

import removeTildes from '../src/api/removeTildes';

describe('Various Utils', function () {
  it('Remove tildes and lowercases strings', function () {
    const str = 'Chocló';
    expect(removeTildes(str)).to.equal('Choclo');
    const str2 = 'ñame';
    expect(removeTildes(str2)).to.equal('name');
  });
});
