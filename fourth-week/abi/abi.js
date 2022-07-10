export const ABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "postid",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "uri",
				"type": "string"
			}
		],
		"name": "postcreated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "posturi",
				"type": "string"
			}
		],
		"name": "makepost",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "fetchPost",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "posturi",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "creator",
						"type": "address"
					}
				],
				"internalType": "struct Parrot.post[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "parrot_id",
		"outputs": [
			{
				"internalType": "string",
				"name": "posturi",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "creator",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]