import test from 'ava';
import Paratree from './';
import _ from 'lodash';

let text = `Bottlenose dolphins living off the coast of southwest Australia have a dilemma. The local octopuses are tasty and packed with protein, but they are also intelligent, fierce fighters. It's not enough to bite the cephalopods' heads off, because octopus nervous systems are so decentralized that their legs can continue the battle even when detached. Nevertheless, the dolphins have persisted in their pursuit of tentacled meals. Now, after years of observation with video, scientists have seen dozens of examples of the dolphins' elaborate octopus hunting strategy.

Bottlenose dolphins are known for problem-solving when it comes to hunting difficult prey. Previously, researchers have seen the dolphins protecting their soft snouts with sponges while digging in the seafloor for fish. Octopus hunting requires other skills, however. First, the octopus has to be disarmed—literally. And then those arms have to be bashed into submission. Those who do not learn this trick are likely to die. In a paper published recently in Marine Mammal Science, Murdoch University marine biologist Kate R. Sprogis and colleagues report that they've come across two dolphins killed while trying to eat octopuses:

It is apparent that octopus handling is a risky behavior, as within our study area a known adult male stranded and a necropsy confirmed the cause of death was from suffocation from a large 2.1 kg octopus. The dolphin had attempted to swallow the octopus, however, the octopus was found almost intact, with the head and the mantle of the octopus in the dolphin's stomach and the 1.3 m long arms separated from the head and extending out of its mouth. Similarly, another [bottlenose dolphin] died from suspected asphyxiation due to an octopus lodged in its mouth and pharynx.

Essentially, the octopuses' tentacles keep fighting, blocking the dolphins' airways, even after most of their bodies have been swallowed. It's a terrifying way to die, but Sprogis and the researchers observe that octopuses must be such valuable prey that they are worth it. Over seven years of observation, she and her team watched 33 dolphins "handling" octopuses in ways that made them meal-ready. Typically, the encounter would start with the dolphin biting the octopus' head off, followed by tossing the legs into the air so that they smack hard into the water over and over. Dolphins would execute the grab-and-toss move about 10-15 times before they were satisfied.`;

let para = new Paratree(text);
test('Should has 4 paragraphs', t => {
  t.is(para.paragraphs.length, 4);
});

test('Paragraphs should has same parent', t => {
  para.paragraphs.forEach(paragraph => {
    let parent = paragraph.parent();
    t.is(parent, para);
  });
});

test('Should has 21 sentences', t => {
  t.is(para.sentences.length, 21);
});

test('Sentences should has parent and equals with its siblings.', t => {
  para.paragraphs.forEach(paragraph => {
    paragraph.sentencesCollection.forEach(sentence => {
      t.is(sentence.parent(), paragraph);
    });
  });
});

test('Should has 389 words', t => {
  t.is(para.words.length, 389);
});

test('Words should has parent and equals with its siblings.', t => {
  para.paragraphs.forEach(paragraph => {
    paragraph.sentencesCollection.forEach(sentence => {
      sentence.wordsCollection.forEach(word => {
        t.is(word.parent(), sentence);
      });
    });
  });
});

test('Should has 223 unique words', t => {
  t.is(para.uniqueWords().length, 223);
});

test('Should has 2243 characters', t => {
  t.is(para.charactersLength(), 2443);
});

test('Should has 2052 characters with no spaces', t => {
  t.is(para.charactersNoSpaceLength(), 2052);
});

test('Should has 44 words in longest sentences', t => {
  t.is(para.longestSentence().words.length, 44);
});

test('Should has 6 words in shortest sentences', t => {
  t.is(para.shortestSentence().words.length, 6);
});

test('Should has 18.xx average words length per sentence', t => {
  t.truthy(para.averageWordSentence() > 18);
});

test('Should has more than 100 average characters length per sentence', t => {
  t.truthy(para.averageCharacterSentence() > 100);
});

test('Should has more than 5 char average length in word', t => {
  t.truthy(para.averageWordLength() > 5);
});

test('Find paragraph by id\'s equals to sample data', t => {
  let sampleParagraph = _.sample(para.paragraphs);
  let {id} = sampleParagraph;
  t.is(sampleParagraph, para.findParagraphById(id));
});

test('Find paragraph by index\'s result equals to sample data', t => {
  let sampleParagraph = _.sample(para.paragraphs);
  let {index} = sampleParagraph;
  t.is(sampleParagraph, para.findParagraphByIndex(index));
});

test('Find sentence by id\'s result equals to sample data ', t => {
  let sampleSentence = _.sample(para.sentences);
  let {id} = sampleSentence;

  t.is(sampleSentence, para.findSentenceById(id));
  t.is(sampleSentence, sampleSentence.parent().findSentenceById(id));
});

test('Find sentence by index\'s result equals to sample data', t => {
  let sampleParagraph = _.sample(para.paragraphs);
  let sampleSentence = _.sample(sampleParagraph.sentencesCollection);
  let {index} = sampleSentence;

  t.is(sampleSentence, sampleParagraph.findSentenceByIndex(index));
});

test('Find word by id\'s result equals to sample data ', t => {
  let sampleWord = _.sample(para.words);
  let {id} = sampleWord;

  t.is(sampleWord, para.findWordById(id));
  t.is(sampleWord, sampleWord.parent().findWordById(id));
});

test('Find word by index\'s result equals to sample data ', t => {
  let sampleParagraph = _.sample(para.paragraphs);
  let sampleSentence = _.sample(sampleParagraph.sentencesCollection);
  let sampleWord = _.sample(sampleSentence.wordsCollection);
  let {index} = sampleWord;

  t.is(sampleWord, sampleSentence.findWordByIndex(index));
});

test('Capable to navigate to the next or previous paragraph', t => {
  let sampleParagraph = _.sample(para.paragraphs);
  let {index} = sampleParagraph;

  let nextParagraph = sampleParagraph.next();
  let prevParagraph = sampleParagraph.prev();

  if (nextParagraph) {
    let {index: nextParagraphIndex} = nextParagraph;
    t.is(nextParagraphIndex, index + 1);
  }

  if (prevParagraph) {
    let {index: prevParagraphIndex} = prevParagraph;
    t.is(prevParagraphIndex, index - 1);
  }

});


test('Capable able to navigate to the next or previous sentence in a paragraph', t => {
  let sampleParagraph = _.sample(para.paragraphs);
  let sampleSentence = _.sample(sampleParagraph.sentencesCollection);
  let {index} = sampleSentence;

  let nextSentence = sampleSentence.next();
  let prevSentence = sampleSentence.prev();

  if (nextSentence) {
    let {index: nextSentenceIndex} = nextSentence;
    t.is(nextSentenceIndex, index + 1);
  }

  if (prevSentence) {
    let {index: prevSentenceIndex} = prevSentence;
    t.is(prevSentenceIndex, index - 1);
  }
});

test('Capable to navigate to the next or previous words in a sentence', t => {
  let sampleParagraph = _.sample(para.paragraphs);
  let sampleSentence = _.sample(sampleParagraph.sentencesCollection);
  let sampleWord = _.sample(sampleSentence.wordsCollection);
  let {index} = sampleWord;

  let nextWord = sampleWord.next();
  let prevWord = sampleWord.prev();

  if (nextWord) {
    let {index: nextWordIndex} = nextWord;
    t.is(nextWordIndex, index + 1);
  }

  if (prevWord) {
    let {index: prevWordIndex} = prevWord;
    t.is(prevWordIndex, index - 1);
  }
});
