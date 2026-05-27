import { describe, expect, it } from "vitest";

import {
  GAME_AUDIO_BUSES,
  GAME_AUDIO_CATEGORIES,
  GAME_AUDIO_ENV_PREFIX,
  GAME_AUDIO_FEATURE_FLAG_ID,
  GAME_AUDIO_MUSIC_FEATURE_FLAG_ID,
  GAME_AUDIO_PACKAGE,
  GAME_AUDIO_REACT_PROVIDER_FEATURE_FLAG_ID,
  GAME_AUDIO_SFX_OCCLUSION_FEATURE_FLAG_ID,
  GAME_AUDIO_SYSTEM_SOUNDS_FEATURE_FLAG_ID,
  GAME_AUDIO_TTS_FEATURE_FLAG_ID,
  gameAudioFeatureFlags,
  getDefaultGameAudioBus,
  isGameAudioBus,
  packageDescriptor,
  type GameAudioCommand,
} from "../src/index.js";

describe("@plasius/game-audio", () => {
  it("exports package metadata and rollout flags", () => {
    expect(packageDescriptor.packageName).toBe(GAME_AUDIO_PACKAGE);
    expect(packageDescriptor.featureFlagId).toBe(GAME_AUDIO_FEATURE_FLAG_ID);
    expect(packageDescriptor.envPrefix).toBe(GAME_AUDIO_ENV_PREFIX);
    expect(gameAudioFeatureFlags.ttsPlayback).toBe(GAME_AUDIO_TTS_FEATURE_FLAG_ID);
    expect(gameAudioFeatureFlags.sfxOcclusion).toBe(GAME_AUDIO_SFX_OCCLUSION_FEATURE_FLAG_ID);
    expect(gameAudioFeatureFlags.music).toBe(GAME_AUDIO_MUSIC_FEATURE_FLAG_ID);
    expect(gameAudioFeatureFlags.systemSounds).toBe(GAME_AUDIO_SYSTEM_SOUNDS_FEATURE_FLAG_ID);
    expect(gameAudioFeatureFlags.reactProvider).toBe(GAME_AUDIO_REACT_PROVIDER_FEATURE_FLAG_ID);
  });

  it("defines stable buses and categories", () => {
    expect(GAME_AUDIO_BUSES).toContain("master");
    expect(GAME_AUDIO_BUSES).toContain("music");
    expect(GAME_AUDIO_CATEGORIES).toContain("tts");
    expect(GAME_AUDIO_CATEGORIES).toContain("system");
    expect(isGameAudioBus("sfx")).toBe(true);
    expect(isGameAudioBus("unknown")).toBe(false);
  });

  it("maps categories to default buses", () => {
    expect(getDefaultGameAudioBus("tts")).toBe("tts");
    expect(getDefaultGameAudioBus("dialogue")).toBe("dialogue");
    expect(getDefaultGameAudioBus("music")).toBe("music");
    expect(getDefaultGameAudioBus("ui")).toBe("system");
    expect(getDefaultGameAudioBus("sfx")).toBe("sfx");
  });

  it("supports a portable play command shape", () => {
    const command: GameAudioCommand = { type: "play", commandId: "cmd-1", category: "sfx", priority: "normal", issuedAtEpochMs: 1, asset: { assetId: "footstep-stone-01", kind: "buffer", uri: "asset://audio/footstep-stone-01.ogg" } };
    expect(command.type).toBe("play");
    expect(command.asset.assetId).toBe("footstep-stone-01");
  });
});
