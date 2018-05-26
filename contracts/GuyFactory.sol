pragma solidity ^0.4.4;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/Math/SafeMath.sol";

contract GuyFactory is Ownable{
    // Imports
    using SafeMath for uint256;
    // Events
    event NewGuy(uint guyId, string name, uint dna);
    
    // Structs
    struct Guy {
        string name;
        uint dna;
        uint32 level;
        uint32 wins;
        uint32 losses;
    }

    // -- Storage --
    // Consts
    uint DNA_DIGITS = 16;
    uint DNA_MODULUS = 10 ** DNA_DIGITS;
    uint COOLDOWN_TIME = 60 minutes;
    // Total guys array
    Guy[] public guys;
    // Maps
    mapping (uint256 => address) public guyIndexToOwner;
    mapping (address => uint256) ownershipCount;
    
    //@dev function for creating a new "guy"
    function createGuy(string _name, uint _dna, address owner) internal returns(uint256) {
        Guy memory _guy = Guy({
            name: _name,
            dna: _dna,
            level: 1,
            wins: 0,
            losses: 0
        });

        uint256 newGuyId = guys.push(_guy) - 1;
        guyIndexToOwner[newGuyId] = owner;
        ownershipCount[owner]++;

        return newGuyId;
        // emit NewGuy(id, _name, _dna);
    }

    //@dev returns the total supply
    function totalSupply() public view returns (uint) {
        return guys.length;
    }

    //@dev returns the tokens for an account
    function guysFor(address _owner) external view returns (uint256[] ids) {
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
            if (guyIndexToOwner[guyId] == _owner) {
                result[resultIndex] = guyId;
                resultIndex++;
            }
        }

        return result;
    }

    //@dev returns the data for a specific token
    function getGuy(uint256 _id) public view returns (string name, uint dna) {
        return (guys[_id].name, guys[_id].dna);
    }

    function generateRandomDna(string _str) private view returns (uint) {
        uint rand = uint(keccak256(_str));
        return rand % DNA_MODULUS;
    }

    function createRandomGuy(string _name, address _owner) public returns(uint256) {
        // require(ownershipCount[_owner] <= 2);
        uint randDna = generateRandomDna(_name);
        randDna = randDna - randDna % 100;
        uint256 id = createGuy(_name, randDna, _owner);
        return id;
    }
 
}
  