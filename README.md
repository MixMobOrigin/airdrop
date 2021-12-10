# Project Title

Airdrop draw scripts

## Description

This script will randomly pick a discord user to a random mask, which will be used later for the actual airdropping. Running this script during live streaming can ensure the airdrop of MixMob masks is fair and transparent to everyone.

* airdropList.json file contains the discord userIds that are entitled for the airdrop
* remainingMasks.json file contains remaining masks' name that haven't been pushed to Solana blockchain yet
* The draw.log file stores logs for running the script during livestream
* airdrop_report.json file is the final result of this draw event
* The whole draw process will be livestreamed and video recorded.

All the code, logs and report will be available: https://github.com/MixMobOrigin/airdrop for reference.
### Executing program

```
node index.js
```
