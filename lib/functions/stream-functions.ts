'use strict';
import { Readable } from 'stream';
import { cucumberStreams } from '../../types/stream';

export class StreamFunctions {
  public streamToArrayAsync( stream: Readable ): Promise<cucumberStreams.CucumberMessage[]> {
    return new Promise( ( resolve, reject ) => {
      const items: cucumberStreams.CucumberMessage[] = [];
      stream.on( 'data', items.push.bind( items ) );
      stream.on( 'error', reject );
      stream.on( 'end', () => resolve( items ) );
    } );
  }
}
