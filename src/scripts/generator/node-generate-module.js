/*
  Generates a module file for a given contract abi path.

  node node-generate-module.js "path to abi"
 */

const path = require('path');
const abiPath = process.argv[2];
const outputPath = `../custom/${path.parse(abiPath).base.split('.')[0]}.js`;

// load up abi json
const fs = require('fs');
const rawData = fs.readFileSync(abiPath);
const json = JSON.parse(rawData);

const scriptImports = [
  "import { ethers } from 'ethers'",
  'import { getState } from "../modules/web3modal"',
  'import { network } from "../config.json"'
]

const scriptFunctions = []

Object.values(json).forEach((value) => {
  // generate header
  const inputs = value.inputs.map((i) => `${i.name}`)
  const outputs = value.outputs?.map((i) => `${i.name}`)
  const functionComment = `/*\n\tInputs: [${inputs}]\n\tOutputs: [${outputs}]\n*/`;
  const functionHeader = `export async function ${value.name} (pair${inputs.length > 0 ? ', ' : ''}${inputs}) {`

  // generate content
  const mutability = value.stateMutability
  let body

  switch (mutability) {
    case "view":
    case "pure":
      // read-only
      body = `\treturn await pair.contract.${value.name}(${inputs})`
      break
    case "payable":
      // requires mutation support
      const signer = generateSigner()
      const transaction = generateTransaction(inputs.includes('amount'))

      body = ''
      signer.forEach((i) => body += `${i}\n`)
      transaction.forEach((i) => body += `${i}\n`)

      body += `\treturn await signedContract.${value.name}(${inputs}, tx)`
      break
  }

  if (!body) {
    return
  }

  const final = `${functionComment}\n${functionHeader}\n${body}\n}`
  scriptFunctions.push(final)
})

function generateSigner() {
  const lines = [
    '\tconst provider = getState().provider',
    '\tconst signer = await provider.getSigner()',
    '\tconst address = await signer.getAddress()',
    '\tconst signedContract = pair.contract.connect(signer)'
  ];

  return lines
}

function generateTransaction(hasAmount) {
  const lines = [
    '\tconst tx = {',
    '\t\tnonce: (await provider.getTransactionCount(address)) || undefined,',
    `\t\tgasLimit: pair.info.gasLimit[network]${hasAmount ? ' * amount' : ''}`,
    '\t}'
  ]

  return lines
}

let scriptFinal = ''

scriptImports.forEach((i) => scriptFinal += `${i}\n`)
scriptFinal += '\n'
scriptFunctions.forEach((func) => scriptFinal += `${func}\n\n`)

// console.log(scriptFinal)
console.log(`Created script at \'${outputPath}\'!`)
console.log('')
console.log('**Important**')
console.log('For any function that handles multiple tokens, and has an amount not labeled as \'amount\', manually multiply the gas by the amount.')
console.log('Also, double-check each function for validity!')
console.log('')
console.log('Any function that requires a \'sender.value\' amount, you will need to manually input that into the \'tx\' object!')

// output file
fs.writeFileSync(outputPath, scriptFinal)
