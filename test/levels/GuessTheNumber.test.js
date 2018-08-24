const GuessTheNumberFactory = artifacts.require('./levels/GuessTheNumberFactory.sol')
const GuessTheNumber = artifacts.require('./attacks/GuessTheNumber.sol')

const Ethernaut = artifacts.require('./Ethernaut.sol')

import * as utils from '../utils/TestUtils'
import { expectThrow } from 'openzeppelin-solidity/test/helpers/expectThrow'


contract('GuessTheNumber', function(accounts) {

  let ethernaut
  let level
  let player = accounts[0]

  before(async function() {
    ethernaut = await Ethernaut.new();
    level = await GuessTheNumberFactory.new()
    await ethernaut.registerLevel(level.address)
  });

  it('should allow the player to solve the level', async function() {

    const instance = await utils.createLevelInstance(
      ethernaut, level.address, player, GuessTheNumber,
      {from: player, value: web3.toWei(1, 'ether')}
    )
    await instance.guess(42, {from: player, value: web3.toWei(1, 'ether')})
    assert.ok(await instance.isComplete())

    // Factory check
    const ethCompleted = await utils.submitLevelInstance(
      ethernaut,
      level.address,
      instance.address,
      player
    )
    assert.equal(ethCompleted, true)
  });

});
