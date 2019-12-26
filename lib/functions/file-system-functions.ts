'use strict';

import * as fs from 'fs';
import * as path from 'path';
const fsp = fs.promises;
// Const path = require('path');

export class FileSystemFunctions {
  public async getFilesAsync( dir: string ): Promise<string[]> {
    let files = [];
    const getFiles = async ( folder: string ): Promise<string[]> => {
      files = await fsp.readdir( folder );
      const result = files.map( file => {
        const p = path.join( folder, file );
        return fsp.stat( p ).then( stat => ( stat.isDirectory() ? getFiles( p ) : [p] ) );
      } );
      return Array.prototype.concat( ...( await Promise.all( result ) ) ); // Flatten
    };

    return getFiles( dir );
  }

  public async checkFolder( file: string ): Promise<boolean> {
    return fsp
      .stat( file )
      .then( result => result.isDirectory() )
      .catch( () => false );
  }
}
