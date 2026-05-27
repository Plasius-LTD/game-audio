# @plasius/game-audio

[![npm version](https://img.shields.io/npm/v/%40plasius%2Fgame-audio.svg)](https://www.npmjs.com/package/@plasius/game-audio)
[![Build Status](https://img.shields.io/github/actions/workflow/status/Plasius-LTD/game-audio/ci.yml?branch=main&label=build&style=flat)](https://github.com/Plasius-LTD/game-audio/actions/workflows/ci.yml)
[![coverage](https://img.shields.io/codecov/c/github/Plasius-LTD/game-audio)](https://codecov.io/gh/Plasius-LTD/game-audio)
[![License](https://img.shields.io/github/license/Plasius-LTD/game-audio)](./LICENSE)
[![Code of Conduct](https://img.shields.io/badge/code%20of%20conduct-yes-blue.svg)](./CODE_OF_CONDUCT.md)
[![Security Policy](https://img.shields.io/badge/security%20policy-yes-orange.svg)](./SECURITY.md)
[![Changelog](https://img.shields.io/badge/changelog-md-blue.svg)](./CHANGELOG.md)

Engine-agnostic in-game audio contracts for Plasius runtime packages.

Apache-2.0. ESM + CJS builds. TypeScript types included.

## Installation

```bash
npm install @plasius/game-audio
```

## Scope

This repository is part of the Plasius in-game audio package suite.

It owns:

- typed audio commands for TTS, dialogue, diegetic SFX, music, ambience, and System/UI sounds
- stable bus and category taxonomy
- engine-agnostic asset references and playback policy contracts
- privacy-safe telemetry and rollout flag constants

It does not own game-world authority, speech provider credentials, raw TTS generation, or product-specific feature-flag evaluation.

## Feature Flag

- `game.audio.foundation.enabled`

## Usage

```ts
import {
  packageDescriptor,
  GAME_AUDIO_PACKAGE,
  GAME_AUDIO_FEATURE_FLAG_ID,
} from "@plasius/game-audio";

console.log(packageDescriptor.packageName === GAME_AUDIO_PACKAGE);
console.log(packageDescriptor.featureFlagId === GAME_AUDIO_FEATURE_FLAG_ID);
```

## Development

```bash
npm install
npm run build
npm test
npm run test:coverage
npm run pack:check
```

## Governance

- Architecture decisions: [docs/adrs](./docs/adrs)
- Security policy: [SECURITY.md](./SECURITY.md)
- Code of conduct: [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)
- CLA and legal docs: [legal](./legal)

## License

Apache-2.0
