import {
    LivepeerConfig,
    createReactClient,
    studioProvider,
  } from '@livepeer/react';
  import { Player } from '@livepeer/react';
  import * as React from 'react';
  import { useLocation } from 'react-router-dom';
  const livepeerClient = createReactClient({
    provider: studioProvider({
      apiKey: process.env.REACT_APP_LIVEPEER_API_KEY,
    }),
  });
   
  // Pass client to React Context Provider
  export const Livepeer=()=> {
    let location = useLocation();
    console.log("data from livepeer=",location.state.videoURL);
    return (
      <LivepeerConfig client={livepeerClient}>
        <Player
          title="video"
          src={location.state.videoURL}
          autoPlay
          autoUrlUpload={{
            fallback: true,
            ipfsGateway: 'https://cloudflare-ipfs.com',
          }}
        />
      </LivepeerConfig>
    );
  }
  