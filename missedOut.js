const fs = require('fs');
const assert = require('assert');

const AIRDROP_LIST = 'missedOutAirdropList.json';
const MASKS_POOL = 'missedOutMasksPool.json';

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 */
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
/**
 * Sleep function
 * @param {*} ms 
 * @returns 
 */
const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
} 

(async () => {
  console.log(`${new Date().toISOString()} Draw started!`);
  /**
   * Get list of airdrop wallets
   * These wallets were verified purchasers during the presale
   */
  const verifiedDiscordIds = JSON.parse(fs.readFileSync(AIRDROP_LIST)).sort();
  const numOfDiscords = verifiedDiscordIds.length;
  /**
   * Get the remaining masks' names, these are 1,233 masks remaining offchain
   */
  const masks = JSON.parse(fs.readFileSync(MASKS_POOL));
  
  const report = [];
  /**
  * Randomly pick a discord user and map it to a random mask
  */
  for (let i = 0; i < numOfDiscords; i++) {
    rollNumberForUser = getRandomInt(0, verifiedDiscordIds.length - 1);
    rollNumberForMask = getRandomInt(0, masks.length - 1);
    const pickedUser = verifiedDiscordIds[rollNumberForUser];
    const pickedMask = masks[rollNumberForMask];
    console.log(`${new Date().toISOString()} Round\t${i}\t=>\t<%s> \t\t\t\t<%s>`, pickedUser, pickedMask)
    
    report.push({
      discord: pickedUser,
      mask: pickedMask
    });
    /**
     * Remove the picked user & mask from their lists so they won't get picked again
     */
    verifiedDiscordIds.splice(rollNumberForUser, 1);
    masks.splice(rollNumberForMask, 1);
    
    /**
     * Wait for 1 second so that people is able to see the progress during live streaming
     * Otherwise it's too fast to see.
     */
    await sleep(1000);
  }

  /**
   * Check if there are duplicate masks or duplicate users in the report
   */
  const allUsers = Array.from(new Set(report.map(({discord}) => discord)));
  const allMasks = Array.from(new Set(report.map(({mask}) => mask)));
  assert(allUsers.length === numOfDiscords);
  assert(allMasks.length === numOfDiscords);

  /**
   * Writing draw report to a file;
   */
  fs.writeFileSync('missed_out_airdrop_report.json', JSON.stringify(report, null, 4))
  console.log(`${new Date().toISOString()}: Draw completed!`);
})();