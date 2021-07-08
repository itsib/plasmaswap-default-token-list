const packageJson = require('../package.json');
const { validateTokenList } = require('@plasma-fi/token-lists');
const { expect } = require('chai');
const { getAddress } = require('@ethersproject/address');
const buildList = require('../src/build-list');


describe('Default List:', () => {
  const defaultTokenList = buildList();

  it('Validates', () => {
    expect(!!validateTokenList(defaultTokenList)).to.equal(true);
  });

  it('Contains no duplicate addresses', () => {
    const map = {};
    for (let token of defaultTokenList.tokens) {
      const key = `${token.chainId}-${token.address}`;
      expect(typeof map[ key ])
        .to.equal('undefined');
      map[ key ] = true;
    }
  });

  it('Contains no duplicate symbols', () => {
    const map = {};
    for (let token of defaultTokenList.tokens) {
      const key = `${token.chainId}-${token.symbol.toLowerCase()}`;
      expect(typeof map[ key ])
        .to.equal('undefined');
      map[ key ] = true;
    }
  })

  it('Contains no duplicate names', () => {
    const map = {};
    for (let token of defaultTokenList.tokens) {
      const key = `${token.chainId}-${token.name.toLowerCase()}`;
      expect(typeof map[ key ])
        .to.equal('undefined', `duplicate name: ${token.name}`);
      map[ key ] = true;
    }
  })

  it('All addresses are valid and checksummed', () => {
    for (let token of defaultTokenList.tokens) {
      expect(getAddress(token.address)).to.eq(token.address);
    }
  });

  it('Version matches package.json', () => {
    expect(packageJson.version).to.match(/^\d+\.\d+\.\d+$/);
    expect(packageJson.version).to.equal(`${defaultTokenList.version.major}.${defaultTokenList.version.minor}.${defaultTokenList.version.patch}`);
  });
});
