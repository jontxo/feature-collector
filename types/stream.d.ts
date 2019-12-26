import { Readable } from 'stream';
import { messages } from 'cucumber-messages';

declare namespace cucumberStreams {
  export interface CucumberMessage extends Readable, messages.Envelope {}
}

