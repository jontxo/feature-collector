'use strict';

import * as path from 'path';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { describe, it } from 'mocha';
import sinonChai from 'sinon-chai';
import { CollectFeatureFiles } from '../../lib/feature-collector';

const expect = chai.expect;
chai.use( sinonChai );
chai.use( chaiAsPromised );
chai.use( sinonChai );

describe( 'CollectFeatures.ts', async () => {
  describe( 'Happy flows', async () => {
    it( 'should return an output from  folder with features', async () => {
      // Given

      const folder = path.resolve( process.cwd(),
        './test/unit/data/features/empty-and-nested-folders-without-errors' );
      const collectFeatures = new CollectFeatureFiles( folder );

      // When
      const collectedFeatures = await collectFeatures.collectFeatures();

      // Then
      expect( collectedFeatures.length ).to.be.equal( 2 );
    } );

    it( 'should not return an output if it does not find features', async () => {
      // Given
      const folder = path.resolve( process.cwd(), './test/unit/data/jsons' );
      const collectFeatures = new CollectFeatureFiles( folder );

      // When
      const collectedFeatures = await collectFeatures.collectFeatures();

      // Then
      expect( collectedFeatures ).to.be.equal( null );
    } );
  } );
  describe( 'failures', async () => {
    it( 'should not return an output with a null folder', async () => {
      // Given
      const folder: string = null;
      const collectFeatures = new CollectFeatureFiles( folder );

      // When
      await collectFeatures.collectFeatures().catch( error => {
        // Then
        // Expect(error.code).equal("ERR_INVALID_ARG_TYPE");
        expect( error.message ).equal( "ENOENT: no such file or directory, stat 'null'" );
      } );
    } );

    it( 'should return a null with an undefined folder', async () => {
      // Given
      const collectFeatures = new CollectFeatureFiles();

      // When
      const result = await collectFeatures.collectFeatures();

      // Then
      expect( result ).to.equal( null );
    } );

    it( 'should return an error in console when a feature file cannot be parsed', async () => {
      // Given
      const folder = path.resolve( process.cwd(),
        './test/unit/data/features/with-incorrect-table' );
      const collectFeatures = new CollectFeatureFiles( folder );

      // When
      const collectedFeatures = await collectFeatures.collectFeatures();

      // Then
      expect( collectedFeatures ).to.equal( null );
    } );

    it( 'should not return the features with the examples label written twice', async () => {
      // Given
      const folder = path.resolve( process.cwd(),
        './test/unit/data/features/with-label-written-twice' );
      const collectFeatures = new CollectFeatureFiles( folder );

      // When
      const collectedFeatures = await collectFeatures.collectFeatures();

      // Then
      expect( collectedFeatures.length ).to.equal( 1 );
    } );
  } );
} );
