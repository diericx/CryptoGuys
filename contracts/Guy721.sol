pragma solidity ^0.4.4;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-solidity/contracts/Math/SafeMath.sol";

contract Guy721 is GuyFactory, ERC721{

    //@dev safety first
    using SafeMath for uint256;

    //@dev mapping for guy approvals
    mapping(uint => address) guyApprovals;

    //@dev modifier for functions that require guy ownership
    modifier OnlyGuyOwner(uint newGuyId){
        require(msg.sender == guyIndexToOwner[newGuyId]);
        _;
    }

    //@dev approval function (only owner)
    function approve(address _to, uint256 _tokenId) public OnlyGuyOwner(_tokenId){
        guyApprovals[_tokenId] = _to;
        Approval(msg.sender, _to, _tokenId);
    }

    //@dev token transfer logic 
    function _transfer(address _from, address _to, uint256 _tokenId) private {
        ownershipCount[_to] = ownershipCount[_to].add(1);
        ownershipCount[msg.sender] = ownershipCount[msg.sender].sub(1);
        guyIndexToOwner[_tokenId] = _to;
        Transfer(_from, _to, _tokenId);
    }

    //@dev transfer function (only owner)
    function transfer(address _to, uint256 _tokenId) public OnlyGuyOwner(_tokenId) {
        _transfer(msg.sender, _to, _tokenId);
    }

    //@dev returns balance for a specific account
    function balanceOf(address _owner) public view returns (uint256) {
        return ownershipCount[_owner];
    }

    //@dev returns owner of a given token ID
    function ownerOf(uint256 _tokenId) public view returns (address _owner) {
        return guyIndexToOwner[_tokenId];
    }

    //@dev transfer function (approval method)
    function takeOwnership(uint256 _tokenId) public {
        require(guyApprovals[_tokenId] == msg.sender);
        address owner = ownerOf(_tokenId);
        _transfer(owner, msg.sender, _tokenId);
    }
}
