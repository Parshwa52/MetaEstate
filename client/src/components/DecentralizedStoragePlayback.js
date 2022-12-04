import { Player } from '@livepeer/react';
import { parseArweaveTxId, parseCid } from 'livepeer/media';
 import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
export const DecentralizedStoragePlayback = ({data}) => {
    
  const [url, setUrl] = useState('ipfs://QmWhKnEXbniphokV8bNg6NNSFazFESPaXoCzrMyNYzMvWW');
  let location = useLocation();

  const idParsed = useMemo(() => parseCid(url) ?? parseArweaveTxId(url), [url]);
 
  return (
    <div>
      <form>
        
        <input
          type="text"
          placeholder="ipfs://... or ar://"
          onChange={(e) => setUrl(e.target.value)}
        />
       
 
        {url && !idParsed && (
          <h1>Provided value is not a valid identifier.</h1>
        )}
      <h1></h1>
      
 
      {idParsed && (
        <Player
          title={idParsed.id}
          src={url}
          autoPlay
          muted
          autoUrlUpload={{
            fallback: true,
            ipfsGateway: 'https://cloudflare-ipfs.com',
          }}
        />
      )}
      </form>
      </div>
    
  );
};
