(() => {
  const mock = fixture();
  const storeKey = 'ppControlDemo';
  try {
    const saved = JSON.parse(localStorage.getItem(storeKey) || '{}');
    localStorage.setItem(storeKey, JSON.stringify({...saved, host:'https://demo.invalid', disconnected:false, readOnly:false, language:saved.language || 'en'}));
  } catch {}
  window.demoThumbnail = () => 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"><rect width="640" height="360" fill="#141e30"/><path d="M0 260Q180 140 340 250T640 220V360H0Z" fill="#334b69"/><text x="320" y="162" text-anchor="middle" fill="white" font-family="sans-serif" font-size="32">Sample presentation</text><text x="320" y="208" text-anchor="middle" fill="#b0c4de" font-family="sans-serif" font-size="18">Interactive demo · No live output</text></svg>');
  window.fetch = async (input, options = {}) => {
    const url = new URL(String(input), location.href);
    if (url.hostname !== 'demo.invalid') throw new TypeError('External connections are disabled in this demo');
    if (options.signal?.aborted) throw new DOMException('Aborted','AbortError');
    const p=url.pathname, method=options.method || 'GET';
    let result;
    const media=p.match(/^\/v1\/media\/playlist\/([^/]+)\/([^/]+)\/trigger$/);
    const slide=p.match(/^\/v1\/presentation\/song-[ab]\/(\d+)\/trigger$/);
    if(p.startsWith('/v1/clear/layer/')) {
      mock.D['/v1/status/layers'][p.split('/').at(-1)] = false; result=null;
    } else if(p === '/v1/clear/group/clear-all/trigger') {
      for(const key of Object.keys(mock.D['/v1/status/layers'])) mock.D['/v1/status/layers'][key]=false;
      result=null;
    } else if(media){
      const list=mock.D['/v1/media/playlist/'+media[1]];
      const item=list?.items.find(x=>x.id.uuid===media[2]);
      if(!item) return {ok:false,status:404,text:async()=>''};
      mock.D['/v1/media/playlist/active']={playlist:list.id,item:item.id}; mock.D['/v1/status/layers'].media=true; result=null;
    } else if(slide){mock.setCurrent(Math.min(17,Number(slide[1])));mock.D['/v1/status/layers'].slide=true;result=null;}
    else {
      try { result=mock.handle(url.href,method,options.body===undefined?undefined:JSON.parse(options.body)); }
      catch { return {ok:false,status:404,text:async()=>''}; }
    }
    return {ok:true,status:result===null?204:200,text:async()=>result===null?'':JSON.stringify(result)};
  };
})();
