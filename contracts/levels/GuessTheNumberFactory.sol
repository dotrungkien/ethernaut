pragma solidity ^0.4.18;

import './base/Level.sol';
import './GuessTheNumber.sol';

contract GuessTheNumberFactory is Level {

  function createInstance(address _player) public payable returns (address) {
    _player;
    return (new GuessTheNumber).value(msg.value)();
  }

  function validateInstance(address _instance, address _player) public returns (bool) {
    _player;
    GuessTheNumber instance = GuessTheNumber(_instance);
    return instance.isComplete();
  }
}
