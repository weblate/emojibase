import {
  Emoticon,
  Gender,
  Group,
  Hexcode,
  Presentation,
  Shortcode,
  SkinTone,
  Subgroup,
  Unicode,
} from 'emojibase';

export { Emoticon, Gender, Group, Hexcode, Presentation, Shortcode, SkinTone, Subgroup, Unicode };

export interface HexcodeMap<T> {
  [hexcode: string]: T;
}

export type Property =
  // An emoji character.
  | 'Basic_Emoji'
  | 'Emoji'
  // The presentation in which to display the emoji character. Either emoji or text.
  | 'Emoji_Presentation'
  // An emoji or unicode character for modifying complex sequences (hair style, skin tone, etc),
  // and should never be used as a stand-alone emoji.
  | 'Emoji_Component'
  // An emoji character that modifies a preceding emoji base character.
  | 'Emoji_Modifier'
  // An emoji character. Can be modified with a subsequent emoji modifier.
  | 'Emoji_Modifier_Base'
  // A sequence of a base and modifier ("Emoji_Modifier_Base" + "Emoji_Modifier").
  | 'Emoji_Modifier_Sequence'
  // A sequence of unicode characters representing the available keys on a
  // phone dial: 0-9, *, # ("Key" + "FE0F" + "20E3").
  | 'Emoji_Keycap_Sequence'
  // A sequence of 2 regional indicators representing a region flag (nation).
  // "Regional_Indicator" + "Regional_Indicator".
  | 'Emoji_Flag_Sequence'
  // A sequence of characters that are not ZWJ or flag sequences.
  // Currently used for representing sub-region/division flags (country).
  | 'Emoji_Tag_Sequence'
  // A sequence of multiple emoji characters joined with a zero-width-joiner (200D).
  | 'Emoji_ZWJ_Sequence'
  // Either an "Emoji", "Emoji" + "FE0F", or "Emoji_Keycap_Sequence".
  | 'Emoji_Combining_Sequence'
  // An emoji slot that is reserved for future allocations and releases.
  | 'Extended_Pictographic'
  // A unicode character representing one of the 26 letters of the alphabet, A-Z.
  | 'Regional_Indicator'
  // v13+ renamed properties
  | 'RGI_Emoji_Flag_Sequence'
  | 'RGI_Emoji_Modifier_Sequence'
  | 'RGI_Emoji_Tag_Sequence'
  | 'RGI_Emoji_ZWJ_Sequence';

export interface CLDRAnnotation {
  annotation: string;
  tags: string[];
}

export type CLDRAnnotationMap = HexcodeMap<CLDRAnnotation>;

export interface CLDRDataMap {
  [key: string]: string;
}

export interface CLDRLocaleMap {
  subdivisions: CLDRDataMap;
  territories: CLDRDataMap;
}

export interface Emoji {
  // Data
  description: string;
  gender?: Gender | null;
  hexcode: Hexcode;
  property: Property[];
  type: Presentation;
  unicodeVersion: string;
  version: string;
  // Group
  group: Group;
  order: number;
  subgroup: Subgroup;
  // Metadata
  modifications?: HexcodeMap<EmojiModification>;
  name: string;
  variations?: EmojiVariation;
  shortcodes?: Shortcode[];
  emoticon?: Emoticon;
}

export type EmojiMap = HexcodeMap<Emoji>;

export interface EmojiData {
  description: string;
  gender?: Gender | null;
  hexcode: Hexcode;
  property: Property[];
  type: Presentation;
  unicodeVersion: number | null;
  version: number;
}

export type EmojiDataMap = HexcodeMap<EmojiData>;

export interface EmojiGroup {
  group: Group;
  order: number;
  subgroup: Subgroup;
}

export type EmojiGroupMap = HexcodeMap<EmojiGroup>;

export interface EmojiSource {
  hexcode: Hexcode;
  group: Group;
  subgroup: Subgroup;
}

export type EmojiSourceMap = HexcodeMap<EmojiSource>;

export interface EmojiStylesMap {
  emoji: HexcodeMap<boolean>;
  text: HexcodeMap<boolean>;
}

export interface EmojiModification extends Emoji {
  tone: SkinTone | SkinTone[];
}

export interface EmojiVariation {
  text: Hexcode;
  emoji: Hexcode;
  property?: Property[];
}

export type EmojiVariationMap = HexcodeMap<EmojiVariation>;

export interface EmoticonMap {
  [hexcode: string]: string;
}

export interface ParsedLine {
  comment: string;
  fields: string[];
}

export interface ParsedTotals {
  [property: string]: number;
}

export interface ShortcodeMap {
  [hexcode: string]: Shortcode[];
}

export interface ShortcodeDataMap {
  [hexcode: string]: Shortcode | Shortcode[];
}

export interface UnicodeNamesMap {
  [hexcode: string]: string;
}

export interface VersionMap {
  [version: string]: Hexcode[];
}
