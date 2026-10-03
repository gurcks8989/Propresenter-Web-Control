// Synthetic demo data only; no live server responses.
const id = (uuid, name, index = 0) => ({uuid,name,index});
function fixture() {
  const logs = [];
  let current = 2,
    active = "song-a";
  const groups = [
    ["Verse 1", { red: 0.18, green: 0.33, blue: 0.75, alpha: 1 }],
    ["Chorus", { red: 0.72, green: 0.16, blue: 0.2, alpha: 1 }],
    ["Bridge", { red: 0.23, green: 0.56, blue: 0.25, alpha: 1 }],
  ].map(([name, color], g) => ({
    uuid: "group-" + g,
    name,
    color,
    slides: Array.from({ length: 6 }, (_, i) => ({
      enabled: true,
      text: `${name}\n슬라이드 ${g * 6 + i + 1} 미리보기\n여기에 가사 또는 본문이 표시됩니다`,
      label: "",
      notes: "",
      size: { width: 1920, height: 1080 },
    })),
  }));
  const items = [
    {
      id: id("header", "예배", 0),
      type: "header",
      header_color: { red: 0.7, green: 0.6, blue: 0.2, alpha: 1 },
    },
    {
      id: id("item-a", "예배의 시작", 1),
      type: "presentation",
      presentation_info: { presentation_uuid: "song-a" },
      target_uuid: "song-a",
    },
    {
      id: id("item-b", "함께 드리는 찬양", 2),
      type: "presentation",
      presentation_info: { presentation_uuid: "song-b" },
      target_uuid: "song-b",
    },
  ];
  const D = {
    "/v1/status/layers": {audio:false,messages:false,props:false,announcements:false,slide:true,media:true,video_input:false},
    "/v1/clear/groups": [{id: id("clear-all", "Clear All"), layers: ["music", "audio_effects", "messages", "props", "announcements", "presentation", "presentation_media", "video_input"], icon: "All"}],
    "/v1/media/playlists": [
      {
        id: id("media-folder", "예배 미디어"),
        type: "group",
        children: [
          {
            id: id("media-list", "배경 · 영상"),
            type: "playlist",
            children: [],
          },
        ],
      },
    ],
    "/v1/media/playlist/media-list": {
      id: id("media-list", "배경 · 영상"),
      items: [
        { id: id("media-blue", "Blue Motion"), type: "video", duration: 120 },
        { id: id("media-gold", "Golden Light", 1), type: "image", duration: 0 },
        {
          id: id("media-welcome", "Welcome · 예배 안내", 2),
          type: "video",
          duration: 60,
        },
      ],
    },
    "/v1/media/playlist/active": {
      playlist: id("media-list", "배경 · 영상"),
      item: id("media-blue", "Blue Motion"),
    },
    "/v1/libraries": [{ uuid: "lib-a", name: "찬양 라이브러리", index: 0 }],
    "/v1/library/%EC%B0%AC%EC%96%91%20%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC":
      {
        items: [
          id("song-a", "예배의 시작"),
          id("song-b", "함께 드리는 찬양", 1),
        ],
        updateType: "all",
      },
    "/version": {
      name: "모의 서버 · 방송 장비와 분리",
      host_description: "ProPresenter MOCK",
    },
    "/v1/playlists": [
      {
        id: id("folder", "기본"),
        field_type: "group",
        children: [
          {
            id: id("playlist-a", "수요예배"),
            field_type: "playlist",
            children: [],
          },
          {
            id: id("playlist-b", "주일예배", 1),
            field_type: "playlist",
            children: [],
          },
        ],
      },
    ],
    "/v1/playlist/focused": {
      playlist: id("playlist-a", "수요예배"),
      item: items[1].id,
    },
    "/v1/playlist/playlist-a": { id: id("playlist-a", "수요예배"), items },
    "/v1/playlist/playlist-b": { id: id("playlist-b", "주일예배"), items },
    "/v1/looks": [
      { id: id("look-a", "기본 출력"), screens: [{ slide: true }] },
      { id: id("look-b", "자막만", 1), screens: [{ slide: false }] },
    ],
    "/v1/look/current": {
      id: id("look-current", "기본 출력"),
      screens: [{ slide: true }],
    },
    "/v1/macros": [
      {
        id: id("macro-a", "찬양 자막"),
        color: { red: 0.1, green: 0.5, blue: 0.3, alpha: 1 },
      },
      {
        id: id("macro-b", "말씀 자막", 1),
        color: { red: 0.4, green: 0.15, blue: 0.6, alpha: 1 },
      },
      {
        id: id("macro-c", "타이틀 표시", 2),
        color: { red: 0.6, green: 0.35, blue: 0.12, alpha: 1 },
      },
    ],
    "/v1/props": [{ id: id("prop-a", "교회 로고"), is_active: true }],
    "/v1/messages": [
      {
        id: id("message-a", "안내 메시지"),
        message: "{Message}",
        tokens: [{ name: "Message", text: { text: "안내 문구" } }],
        is_active: false,
      },
      {
        id: id("message-b", "타이머 안내"),
        message: "{Timer} {Clock}",
        tokens: [
          {
            name: "Timer",
            timer: {
              countdown: { duration: 120 },
              allows_overrun: false,
              format: {
                hour: "none",
                minute: "long",
                second: "long",
                millisecond: "none",
              },
            },
          },
          {
            name: "Clock",
            clock: { date: "none", time: "short", is_24_hours: true },
          },
        ],
        is_active: false,
      },
    ],
    "/v1/timers": [
      {
        id: id("timer-a", "예배 시작"),
        countdown: { duration: 300 },
        allows_overrun: false,
      },
      {
        id: id("timer-b", "설교 시간", 1),
        elapsed: { start_time: 0 },
        allows_overrun: true,
      },
    ],
    "/v1/timers/current": [
      { id: id("timer-a", "예배 시작"), time: "00:04:32", state: "running" },
      { id: id("timer-b", "설교 시간", 1), time: "00:12:18", state: "running" },
    ],
    "/v1/stage/screens": [
      id("screen-a", "무대 모니터"),
      id("screen-b", "방송실 모니터", 1),
    ],
    "/v1/stage/layouts": [
      { id: id("layout-a", "현재 / 다음 슬라이드") },
      { id: id("layout-b", "타이머 + 메시지", 1) },
    ],
    "/v1/stage/layout_map": [
      {
        screen: id("screen-a", "무대 모니터"),
        layout: id("layout-a", "현재 / 다음 슬라이드"),
      },
      {
        screen: id("screen-b", "방송실 모니터"),
        layout: id("layout-b", "타이머 + 메시지"),
      },
    ],
    "/v1/stage/message": "준비해 주세요",
    "/v1/audio/playlists": [
      { id: id("audio-a", "예배 전 BGM"), type: "playlist", children: [] },
    ],
    "/v1/audio/playlist/audio-a": {
      id: id("audio-a", "예배 전 BGM"),
      items: [
        { id: id("track-a", "Quiet Worship"), type: "audio", duration: 240 },
        { id: id("track-b", "Piano Prelude", 1), type: "audio", duration: 185 },
      ],
    },
    "/v1/capture/settings": { rtmp: { server: "rtmp://mock.example/live" } },
    "/v1/capture/status": {
      status: "inactive",
      capture_time: "0:00",
      status_text: "",
    },
    "/v1/status/audience_screens": true,
    "/v1/status/stage_screens": true,
    "/v1/timer/system_time": 1790765742,
  };
  for (const l of ["presentation", "announcement", "audio"]) {
    D["/v1/transport/" + l + "/current"] = {
      name:
        l === "presentation"
          ? "Worship Background.mp4"
          : l === "audio"
            ? "Quiet Worship"
            : "",
      duration: l === "announcement" ? 0 : 240,
      is_playing: l === "presentation",
    };
    D["/v1/transport/" + l + "/time"] = 62;
  }
  const presentation = () => ({
    id: id(active, active === "song-a" ? "예배의 시작" : "함께 드리는 찬양"),
    groups,
    destination: "presentation",
    current_arrangement: "arrangement",
    arrangements: [{ id: id("arrangement", "기본"), groups: [] }],
  });
  function handle(url, method = "GET", body) {
    const u = new URL(url, "http://localhost"),
      p = u.pathname;
    logs.push({ path: p, query: u.search, method, body });
    if (p === "/v1/presentation/song-a" || p === "/v1/presentation/song-b") {
      const value = presentation();
      const key = p.split("/").pop();
      return {
        presentation: {
          ...value,
          id: id(key, key === "song-a" ? "예배의 시작" : "함께 드리는 찬양"),
        },
      };
    }
    const libraryMatch = p.match(
      /^\/v1\/library\/[^/]+\/(song-[ab])(?:\/(\d+))?\/trigger$/,
    );
    if (libraryMatch) {
      active = libraryMatch[1];
      current = Number(libraryMatch[2] || 0);
      return null;
    }
    if (p === "/v1/presentation/active")
      return { presentation: presentation() };
    if (p === "/v1/presentation/focused") return presentation().id;
    if (p === "/v1/presentation/slide_index")
      return {
        presentation_index: {
          presentation_id: presentation().id,
          index: current,
        },
      };
    if (p === "/v1/playlist/active")
      return {
        presentation: {
          playlist: id("playlist-a", "수요예배"),
          item: items[active === "song-a" ? 1 : 2].id,
          playlist_item: items[active === "song-a" ? 1 : 2],
        },
        announcements: { playlist: null, item: null },
      };
    let m = p.match(/^\/v1\/playlist\/[^/]+\/(\d+)\/(\d+)\/trigger$/);
    if (m) {
      active = Number(m[1]) === 1 ? "song-a" : "song-b";
      current = Number(m[2]);
      return null;
    }
    m = p.match(/^\/v1\/playlist\/[^/]+\/(\d+)\/trigger$/);
    if (m) {
      active = Number(m[1]) === 1 ? "song-a" : "song-b";
      current = 0;
      return null;
    }
    if (p.endsWith("/next/trigger")) {
      current++;
      return null;
    }
    if (p.endsWith("/previous/trigger")) {
      current--;
      return null;
    }
    if (method === "PUT" && p.startsWith("/v1/timer/")) {
      const uuid = p.split("/").pop(),
        i = D["/v1/timers"].findIndex((t) => t.id.uuid === uuid);
      D["/v1/timers"][i] = body;
      return body;
    }
    if (method === "PUT") {
      D[p] = body;
      return null;
    }
    if (method === "DELETE") {
      D[p] = "";
      return null;
    }
    if (
      p.endsWith("/trigger") ||
      p.endsWith("/clear") ||
      /\/(start|stop|reset|play|pause)$/.test(p) ||
      p.includes("/increment/") ||
      p.includes("/skip_") ||
      p.includes("/go_to_end") ||
      p.includes("/layout/") ||
      p.includes("/clear/layer/")
    )
      return null;
    if (p in D) return D[p];
    throw Error("Unknown mock route " + p);
  }
  return { D, logs, handle, setCurrent: (n) => (current = n) };
}
