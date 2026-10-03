(() => {
  window.ppDemoMode = true;
  const mock = fixture();
  const storeKey = 'ppControlDemo';
  let demoLanguage = 'en';
  try {
    const saved = JSON.parse(localStorage.getItem(storeKey) || '{}');
    demoLanguage = saved.language === 'ko' ? 'ko' : 'en';
    localStorage.setItem(storeKey, JSON.stringify({...saved, host:'https://demo.invalid', disconnected:false, readOnly:false, language:saved.language || 'en'}));
  } catch {}
  const sampleEnglish = {
    '예배':'Worship', '예배의 시작':'Opening Worship', '함께 드리는 찬양':'Worship Together',
    '예배 미디어':'Worship Media', '배경 · 영상':'Backgrounds & Videos', 'Welcome · 예배 안내':'Welcome',
    '찬양 라이브러리':'Worship Library', '모의 서버 · 방송 장비와 분리':'Demo server · No equipment connection',
    '기본':'Default', '수요예배':'Wednesday Service', '주일예배':'Sunday Service',
    '기본 출력':'Default Look', '자막만':'Lyrics Only', '찬양 자막':'Worship Lyrics', '말씀 자막':'Scripture',
    '타이틀 표시':'Show Title', '교회 로고':'Church Logo', '안내 메시지':'Announcement', '안내 문구':'Announcement text',
    '타이머 안내':'Timer Message', '예배 시작':'Service Start', '설교 시간':'Sermon Time',
    '무대 모니터':'Stage Monitor', '방송실 모니터':'Production Monitor',
    '현재 / 다음 슬라이드':'Current / Next Slide', '타이머 + 메시지':'Timer + Message',
    '준비해 주세요':'Please get ready', '예배 전 BGM':'Pre-service Music'
  };
  function localizeSample(value) {
    if (demoLanguage === 'ko') return value;
    if (typeof value === 'string') return sampleEnglish[value] ?? value.replace(/슬라이드 (\d+) 미리보기/g, 'Slide $1 preview').replaceAll('여기에 가사 또는 본문이 표시됩니다','Lyrics or slide text appear here');
    if (Array.isArray(value)) return value.map(localizeSample);
    if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, v]) => [key, localizeSample(v)]));
    return value;
  }
  window.demoThumbnail = () => 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"><rect width="640" height="360" fill="#141e30"/><path d="M0 260Q180 140 340 250T640 220V360H0Z" fill="#334b69"/><text x="320" y="162" text-anchor="middle" fill="white" font-family="sans-serif" font-size="32">Sample presentation</text><text x="320" y="208" text-anchor="middle" fill="#b0c4de" font-family="sans-serif" font-size="18">Interactive demo · No live output</text></svg>');
  const sampleThumbnail = window.demoThumbnail;
  window.demoThumbnail = () => demoLanguage === 'ko'
    ? sampleThumbnail().replace(encodeURIComponent('Sample presentation'), encodeURIComponent('샘플 프레젠테이션')).replace(encodeURIComponent('Interactive demo · No live output'), encodeURIComponent('체험용 데모 · 실제 송출 없음'))
    : sampleThumbnail();
  window.fetch = async (input, options = {}) => {
    const url = new URL(String(input), location.href);
    url.pathname = url.pathname.replace('Worship%20Library', encodeURIComponent('찬양 라이브러리'));
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
    return {ok:true,status:result===null?204:200,text:async()=>result===null?'':JSON.stringify(localizeSample(result))};
  };
})();
