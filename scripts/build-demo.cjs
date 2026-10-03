const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
let html = fs.readFileSync(path.join(root, 'propresenter_control_v9.html'), 'utf8');
const source = html;
const fixture = fs.readFileSync(path.join(__dirname, 'demo-fixture.js'), 'utf8');
const runtime = fs.readFileSync(path.join(__dirname, 'demo-runtime.js'), 'utf8');
function localizeBanner(page) {
  return page.replace('</body>', `<script>
  document.addEventListener('DOMContentLoaded', () => {
    const lang = document.documentElement.lang === 'ko' ? 'ko' : 'en';
    const labels = {
      demo: {ko:'데모 · 샘플 데이터', en:'DEMO · Sample data only'},
      connect: {ko:'실제 연결 →', en:'Live connection →'},
      sample: {ko:'샘플 데모', en:'Sample demo'},
      download: {ko:'HTML 다운로드', en:'Download HTML'}
    };
    document.querySelectorAll('[data-banner-label]').forEach(el => {
      el.textContent = labels[el.dataset.bannerLabel][lang];
    });
    document.querySelector('#hostingBanner').style.visibility = 'visible';
  });
  </script></body>`);
}
html = html.replace('<head>', `<head><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:; connect-src 'none'; form-action 'none'; base-uri 'none'">`);
html = html.replace('<body>', '<body><div id="hostingBanner" style="visibility:hidden;height:32px;display:flex;gap:16px;align-items:center;justify-content:center;background:#164d68;color:white;font:12px system-ui"><span data-banner-label="demo"></span><a href="index.html" data-banner-label="connect" style="color:white"></a></div><style>.workspace{height:calc(100dvh - 137px)!important}</style>');
html = html.replace('<script>', `<script>${fixture}\n${runtime}</script><script>`);
html = html.replaceAll('ppControlV9', 'ppControlDemo');
html = html.replace('String(s ?? "")', 'String(typeof s === "string" && s.startsWith("https://demo.invalid/") ? window.demoThumbnail(s) : (s ?? ""))');
html = html.replace('preview.src = src', 'preview.src = window.demoThumbnail(src)').replace('im.src = src', 'im.src = window.demoThumbnail(src)');
html = html.replace('if (params.has("host")) config.host = params.get("host");', 'config.host = "https://demo.invalid"; config.disconnected = false;');
html = html.replace('const address = splitServer(config.host);', 'const address = splitServer(config.demoAddress || "");');
html = html.replace('const next = serverFromFields(),', 'const demoAddress = serverFromFields(); const next = "https://demo.invalid",');
html = html.replace('config.host = next;', 'config.demoAddress = demoAddress; config.host = next;');
html = html.replace('$("#settingsDialog").showModal();', `
  let note = document.querySelector('#demoConnectionNote');
  if (!note) {
    note = document.createElement('p'); note.id = 'demoConnectionNote';
    note.style.cssText = 'font-size:12px;line-height:1.5;color:#b8c5da';
    $("#hostInput").closest('label').before(note);
  }
  note.textContent = language === 'en'
    ? 'Demo: address and port can be edited and saved, but only sample data is used. Choose Live connection in the top banner to connect to equipment.'
    : '데모: 주소와 포트를 입력·저장할 수 있지만 샘플 데이터만 사용합니다. 실제 장비에 연결하려면 상단의 실제 연결을 선택하세요.';
  $("#settingsDialog").showModal();`);
fs.mkdirSync(path.join(root, 'docs'), {recursive:true});
fs.writeFileSync(path.join(root, 'docs/demo.html'), localizeBanner(html));
let live = source.replace('<head>', `<head><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data: http: https:; connect-src http: https:; form-action 'none'; base-uri 'none'">`);
live = live.replaceAll('ppControlV9', 'ppControlWebLive');
// A fresh page always waits for an explicit Connect; URL parameters cannot arm controls.
live = live.replace('if (params.has("host")) config.host = params.get("host");', 'config.disconnected = true; config.readOnly = true;');
live = live.replace('config.readOnly = params.get("readonly") !== "0";', 'config.readOnly = true;');
live = live.replace('<body>', '<body><div id="hostingBanner" style="visibility:hidden;height:32px;display:flex;gap:16px;align-items:center;justify-content:center;background:#75451a;color:white;font:12px system-ui">ProPresenter Web Control <a href="demo.html" data-banner-label="sample" style="color:white"></a><a href="control.html" download="propresenter_web_control.html" data-banner-label="download" style="color:white"></a></div><style>.workspace{height:calc(100dvh - 137px)!important}</style>');
live = live.replace('</body>', `<script>
document.addEventListener('DOMContentLoaded', () => {
  const en = document.documentElement.lang === 'en';
  const note = document.createElement('p');
  note.style.cssText = 'font-size:12px;line-height:1.5;color:#b8c5da';
  note.textContent = en
    ? 'Connect to ProPresenter on the same network. Allow local network access if your browser asks. Use its Network settings port. If connection fails, check the server, local-network permission, CORS and HTTPS/HTTP restrictions; this page cannot distinguish all causes. Download the HTML for local use if needed. Read-only starts enabled; disable it only when ready to control output.'
    : '같은 네트워크의 ProPresenter에 연결하세요. 브라우저가 로컬 네트워크 접근을 요청하면 허용하세요. 포트는 ProPresenter 네트워크 설정을 확인하세요. 연결 실패 시 서버·로컬 네트워크 권한·CORS·HTTPS/HTTP 제한을 확인하세요. 모든 원인을 자동 판별할 수는 없습니다. 필요하면 HTML을 다운로드해 로컬에서 실행하세요. 읽기 전용으로 시작하며 실제 제어가 필요할 때만 해제하세요.';
  document.querySelector('#hostInput').closest('label').before(note);
  document.querySelector('#settings').click();
});
</script></body>`);
fs.writeFileSync(path.join(root, 'docs/live.html'), localizeBanner(live));
fs.writeFileSync(path.join(root, 'docs/index.html'), localizeBanner(live));
fs.writeFileSync(path.join(root, 'docs/control.html'), source);
const version = source.match(/name="application-version" content="([^"]+)"/)[1];
fs.writeFileSync(path.join(root, 'docs/update.json'), JSON.stringify({version}, null, 2) + '\n');
fs.writeFileSync(path.join(root, 'docs/.nojekyll'), '');
