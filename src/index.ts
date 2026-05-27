export interface GameAudioPackageDescriptor {
  readonly packageName: string;
  readonly featureFlagId: string;
  readonly envPrefix: string;
  readonly summary: string;
}

export const GAME_AUDIO_PACKAGE = "@plasius/game-audio";
export const GAME_AUDIO_ENV_PREFIX = "GAME_AUDIO";
export const GAME_AUDIO_FEATURE_FLAG_ID = "game.audio.foundation.enabled";
export const GAME_AUDIO_TTS_FEATURE_FLAG_ID = "game.audio.tts-playback.enabled";
export const GAME_AUDIO_SFX_OCCLUSION_FEATURE_FLAG_ID = "game.audio.sfx-occlusion.enabled";
export const GAME_AUDIO_MUSIC_FEATURE_FLAG_ID = "game.audio.music.enabled";
export const GAME_AUDIO_SYSTEM_SOUNDS_FEATURE_FLAG_ID = "game.audio.system-sounds.enabled";
export const GAME_AUDIO_REACT_PROVIDER_FEATURE_FLAG_ID = "game.audio.react-provider.enabled";

export const gameAudioFeatureFlags = Object.freeze({
  foundation: GAME_AUDIO_FEATURE_FLAG_ID,
  ttsPlayback: GAME_AUDIO_TTS_FEATURE_FLAG_ID,
  sfxOcclusion: GAME_AUDIO_SFX_OCCLUSION_FEATURE_FLAG_ID,
  music: GAME_AUDIO_MUSIC_FEATURE_FLAG_ID,
  systemSounds: GAME_AUDIO_SYSTEM_SOUNDS_FEATURE_FLAG_ID,
  reactProvider: GAME_AUDIO_REACT_PROVIDER_FEATURE_FLAG_ID,
});

export const GAME_AUDIO_BUSES = Object.freeze(["master", "tts", "dialogue", "sfx", "ambient", "music", "system", "diagnostic"] as const);
export type GameAudioBus = (typeof GAME_AUDIO_BUSES)[number];
export const GAME_AUDIO_CATEGORIES = Object.freeze(["tts", "dialogue", "sfx", "ambient", "music", "system", "ui", "diagnostic"] as const);
export type GameAudioCategory = (typeof GAME_AUDIO_CATEGORIES)[number];
export type GameAudioPriority = "background" | "normal" | "important" | "critical";

export interface GameAudioAssetRef {
  readonly assetId: string;
  readonly kind: "buffer" | "stream" | "tts" | "music-stem" | "system";
  readonly uri?: string;
  readonly contentHash?: string;
}

export interface GameAudioCommandBase {
  readonly commandId: string;
  readonly category: GameAudioCategory;
  readonly priority: GameAudioPriority;
  readonly issuedAtEpochMs: number;
  readonly deadlineEpochMs?: number;
}

export interface PlayGameAudioCommand extends GameAudioCommandBase {
  readonly type: "play";
  readonly asset: GameAudioAssetRef;
  readonly bus?: GameAudioBus;
}

export interface StopGameAudioCommand extends GameAudioCommandBase {
  readonly type: "stop";
  readonly targetCommandId?: string;
  readonly bus?: GameAudioBus;
}

export type GameAudioCommand = PlayGameAudioCommand | StopGameAudioCommand;

export const packageDescriptor: GameAudioPackageDescriptor = Object.freeze({
  packageName: GAME_AUDIO_PACKAGE,
  featureFlagId: GAME_AUDIO_FEATURE_FLAG_ID,
  envPrefix: GAME_AUDIO_ENV_PREFIX,
  summary: "Engine-agnostic in-game audio contracts for commands, buses, assets, policy, and rollout.",
});

export function isGameAudioBus(value: string): value is GameAudioBus {
  return (GAME_AUDIO_BUSES as readonly string[]).includes(value);
}

export function getDefaultGameAudioBus(category: GameAudioCategory): GameAudioBus {
  if (category === "tts") return "tts";
  if (category === "dialogue") return "dialogue";
  if (category === "ambient") return "ambient";
  if (category === "music") return "music";
  if (category === "system" || category === "ui") return "system";
  if (category === "diagnostic") return "diagnostic";
  return "sfx";
}
