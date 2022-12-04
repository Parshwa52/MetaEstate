import {
    LivepeerConfig,
    createReactClient,
    studioProvider,
  } from '@livepeer/react';
  import * as React from 'react';
   import {DecentralizedStoragePlayback} from "./DecentralizedStoragePlayback";
  const livepeerClient = createReactClient({
    provider: studioProvider({
      apiKey: process.env.REACT_APP_LIVEPEER_API_KEY,
    }),
  });
   
  // Pass client to React Context Provider
  export const Livepeer=()=> {

    return (
      <LivepeerConfig client={livepeerClient}>
        <DecentralizedStoragePlayback videoURL="ipfs://QmWhKnEXbniphokV8bNg6NNSFazFESPaXoCzrMyNYzMvWW"/>
      </LivepeerConfig>
    );
  }
  