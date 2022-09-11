// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Gazeto is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("GazetoNft", "GZNFT") {}

    struct Article {
        uint256 tokenId;
        address owner;
        string uri;
    }

    mapping(uint256 => Article) private articles;

    // mint an NFt
    function safeMint(
        string memory uri
    ) public payable returns (uint256) {
        require(bytes(uri).length > 0, "Enter valid uri");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _mint(msg.sender, tokenId);

        _setTokenURI(tokenId, uri);
        createArticle(tokenId, uri, msg.sender);
        return tokenId;
    }

    //Create Ticket Functionality
    function createArticle(
        uint256 tokenId,
        string memory uri,
        address owner
    ) private {
        articles[tokenId] = Article(
            tokenId,
            owner,
            uri
        );
    }


    function getArticle(uint256 tokenId) public view returns (Article memory) {
        return articles[tokenId];
    }

    function getArticleLength() public view returns (uint256) {
        return _tokenIdCounter.current();
    }


    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId)
    internal
    override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
    public
    view
    override(ERC721, ERC721URIStorage)
    returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC721, ERC721Enumerable)
    returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
