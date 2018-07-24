import { expect } from 'chai';
import 'mocha';
import Paratree from '../';
import story from './story';

describe('Paratree Test', () => {

  const p = new Paratree(story);

  it('should create paratree instance', () => expect(p).to.be.an.instanceof(Paratree));
  it('should be has 4 paragraphs', () => expect(p.paragraphs.length).to.be.equal(4));
  it('should implement Paranode', () => expect(p.id).to.be.a('string'));
});