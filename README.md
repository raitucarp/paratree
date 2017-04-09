# Paratree

Utility for parsing paragraph into linked structure of sentences and words, for node.js. Also include builtin method to navigate and get detail information for paragraphs, sentences, and words.

## Install

```
npm install paratree --save
```

## Usage

```javascript
const Paratree = require('paratree');

let text = `Bottlenose dolphins living off the coast of southwest Australia have a dilemma. The local octopuses are tasty and packed with protein, but they are also intelligent, fierce fighters. It's not enough to bite the cephalopods' heads off, because octopus nervous systems are so decentralized that their legs can continue the battle even when detached. Nevertheless, the dolphins have persisted in their pursuit of tentacled meals. Now, after years of observation with video, scientists have seen dozens of examples of the dolphins' elaborate octopus hunting strategy.

Bottlenose dolphins are known for problem-solving when it comes to hunting difficult prey. Previously, researchers have seen the dolphins protecting their soft snouts with sponges while digging in the seafloor for fish. Octopus hunting requires other skills, however. First, the octopus has to be disarmed—literally. And then those arms have to be bashed into submission. Those who do not learn this trick are likely to die. In a paper published recently in Marine Mammal Science, Murdoch University marine biologist Kate R. Sprogis and colleagues report that they've come across two dolphins killed while trying to eat octopuses:

It is apparent that octopus handling is a risky behavior, as within our study area a known adult male stranded and a necropsy confirmed the cause of death was from suffocation from a large 2.1 kg octopus. The dolphin had attempted to swallow the octopus, however, the octopus was found almost intact, with the head and the mantle of the octopus in the dolphin's stomach and the 1.3 m long arms separated from the head and extending out of its mouth. Similarly, another [bottlenose dolphin] died from suspected asphyxiation due to an octopus lodged in its mouth and pharynx.

Essentially, the octopuses' tentacles keep fighting, blocking the dolphins' airways, even after most of their bodies have been swallowed. It's a terrifying way to die, but Sprogis and the researchers observe that octopuses must be such valuable prey that they are worth it. Over seven years of observation, she and her team watched 33 dolphins "handling" octopuses in ways that made them meal-ready. Typically, the encounter would start with the dolphin biting the octopus' head off, followed by tossing the legs into the air so that they smack hard into the water over and over. Dolphins would execute the grab-and-toss move about 10-15 times before they were satisfied.`;

const para = new Paratree(text);

// get all paragraphs
console.log(para.paragraphs)

// get all sentences
console.log(para.sentences)

// get all words
console.log(para.words)

// get all unique words
console.log(para.uniqueWords())

//
```

## Docs

Coming soon..

# License

MIT
