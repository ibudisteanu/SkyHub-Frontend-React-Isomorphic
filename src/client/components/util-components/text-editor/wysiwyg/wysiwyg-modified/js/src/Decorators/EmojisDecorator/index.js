import EmojisDecorator from './EmojisDecorator';
import Suggestion from './Suggestion';

const getDecorators = (config) => {
  return [
    (new EmojisDecorator(config.mentionClassName)).getEmojiDecorator(),
    (new Suggestion(config)).getSuggestionDecorator()
  ]
};

module.exports = getDecorators;
