// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Counter {
    uint public count;

    // Function to get the current count
    function get() public view returns (uint) {
        return count;
    }

    // Function to increment count by 1
    function inc() public {
        count += 1;
    }

    // Function to decrement count by 1
    function dec() public {
        count -= 1;
    }

    // Function to set count to a specific value
    function set(uint _count) public {
        count = _count;
    }

    // Function to increment count by a specific value
    function incBy(uint _count) public {
        count += _count;
    }

    // Function to decrement count by a specific value
    function decBy(uint _count) public {
        count -= _count;
    }

    //    function to reset counter
    function reset() public {
        count = 0;
    }


}
