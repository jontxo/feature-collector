import { Readable } from 'stream';
import Gherkin from 'gherkin';
import { messages } from 'cucumber-messages';
import { StreamFunctions } from './functions/stream-functions';
import { FileSystemFunctions } from './functions/file-system-functions';

export class CollectFeatureFiles {
  public featuresDir: string;

  public constructor( featuresDir?: string ) {
    this.featuresDir = featuresDir;
  }

  public async collectFeatures(): Promise<messages.IGherkinDocument[]> {
    await new FileSystemFunctions().checkFolder( this.featuresDir )
      .then( result => {
        if ( !result && typeof this.featuresDir !== 'undefined' ) {
          throw new Error( `ENOENT: no such file or directory, stat '${this.featuresDir}'` );
        }
      } );

    if ( typeof this.featuresDir === 'undefined' ) {
      return null;
    }

    const files = await new FileSystemFunctions().getFilesAsync( this.featuresDir );
    const featureFiles = files.filter( file => file.endsWith( '.feature' ) );

    let features = await Promise.all( featureFiles.map( async  feature  => {
      const stream = await <Readable>Gherkin.fromPaths( [feature] );
      const gherkinDocument = ( await new StreamFunctions().streamToArrayAsync( stream ) )[1].gherkinDocument;
      return gherkinDocument;
    } ) );

    features = features.filter( x => x );

    return features.length > 0 ? features : null;
  }
}
