pragma solidity ^0.4.4;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/Math/SafeMath.sol";

contract GuyFactory is Ownable{

    using SafeMath for uint256;
    
    event NewGuy(uint guyId, string name, uint dna);
    
    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;
    uint coolDownTime = 60 minutes;
    
    struct Guy {
        string name;
        uint dna;
        uint32 level;
        uint32 readyTime;
        uint32 wins;
        uint32 losses;
    }
    
    Guy[] public guys;
    
    mapping (uint => address) public guyToOwner;
    mapping (address => uint) ownerGuyCount;
    
    //@dev function for creating a new "guy"
    function createGuy(string _name, uint _dna) internal{
        uint id = guys.push(Guy(_name, _dna, 1, uint32(now + coolDownTime), 0, 0)) - 1;
        guyToOwner[id] = msg.sender;
        ownerGuyCount[msg.sender]++;
        NewGuy(id, _name, _dna);
    }

    function totalSupply() public view returns (uint) {
        return guys.length - 1;
    }

    function balanceOf(address _owner) public view returns (uint256 count) {
        return ownerGuyCount[_owner];
    }

    function guysFor(address _owner) external view returns (uint[] ids) {
        uint256 guyCount = balanceOf(_owner);

        if (guyCount == 0) {
            // Return an empty array
            return new uint256[](0);
        }

        uint256[] memory result = new uint256[](guyCount);
        uint256 totalGuys = totalSupply();
        uint256 resultIndex = 0;
        uint256 guyId;
        for (guyId = 1; guyId <= totalGuys; guyId++) {
            if (guyToOwner[guyId] == _owner) {
                result[resultIndex] = guyId;
                resultIndex++;
            }
        }

        return result;
    }

    function getGuy(uint _id) public view returns (string name, uint dna) {
        return (guys[_id].name, guys[_id].dna);
    }

    function getGuyCount() public returns(uint count) {
        return guys.length;
    }

    function generateRandomDna(string _str) private view returns (uint) {
        uint rand = uint(keccak256(_str));
        return rand % dnaModulus;
    }

    function createRandomGuy(string _name) public {
        require(ownerGuyCount[msg.sender] <= 2);
        uint randDna = generateRandomDna(_name);
        randDna = randDna - randDna % 100;
        createGuy(_name, randDna);
    }
 
}
  