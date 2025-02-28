import { EMOJI, TEXT } from 'emojibase';
import hasProperty from '../helpers/hasProperty';
import { UnicodeNamesMap, EmojiMap, EmojiGroupMap, EmojiVariationMap, EmoticonMap } from '../types';
import { SKIN_MODIFIER_PATTERN, SEQUENCE_REMOVAL_PATTERN } from '../constants';

export default function joinMetadataToData(
  emojis: EmojiMap,
  names: UnicodeNamesMap,
  groups: EmojiGroupMap,
  variations: EmojiVariationMap,
  emoticons: EmoticonMap,
) {
  Object.keys(emojis).forEach((hexcode) => {
    const emoji = emojis[hexcode];

    // Determine the correct default presentation
    // http://unicode.org/reports/tr51/#Emoji_Presentation
    emoji.type = emoji.property.some(
      (prop) =>
        prop === 'Basic_Emoji' || prop === 'Emoji_Presentation' || prop.endsWith('Sequence'),
    )
      ? EMOJI
      : TEXT;

    // Pull in the official name for each hexcode part
    const name: string[] = [];

    // Tag and flag sequences don't have meaningful names,
    // so use the descriptions parsed from the offical data files
    if (
      hasProperty(emoji.property, [
        'Emoji_Flag_Sequence',
        'RGI_Emoji_Flag_Sequence',
        'Emoji_Tag_Sequence',
        'RGI_Emoji_Tag_Sequence',
      ])
    ) {
      name.push(emoji.description.toUpperCase());
    } else {
      let hasSkinTone = '';

      hexcode.split('-').forEach((code) => {
        if (code.match(SEQUENCE_REMOVAL_PATTERN)) {
          // Skip joiners
        } else if (code.match(SKIN_MODIFIER_PATTERN)) {
          hasSkinTone = code;
        } else if (names[code]) {
          name.push(names[code]);
        }
      });

      // If an emoji sequence utilizes a skin tone, let's move that part of
      // the name to the very end, as it's quite jarring otherwise.
      if (hasSkinTone) {
        name.push(names[hasSkinTone]);
      }
    }

    emoji.name = name.join(', ');

    // Pull in the official group and order
    if (groups[hexcode]) {
      emoji.group = groups[hexcode].group;
      emoji.subgroup = groups[hexcode].subgroup;
      emoji.order = groups[hexcode].order;
    }

    // Pull in text and emoji variations
    if (variations[hexcode]) {
      emoji.variations = {
        emoji: variations[hexcode].emoji,
        text: variations[hexcode].text,
      };
    }

    // Pull in emoticon
    if (emoticons[hexcode]) {
      emoji.emoticon = emoticons[hexcode];
    }
  });
}
