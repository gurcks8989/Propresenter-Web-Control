const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
let html = fs.readFileSync(path.join(root, 'propresenter_control_v9.html'), 'utf8');
const source = html;
const fixture = fs.readFileSync(path.join(__dirname, 'demo-fixture.js'), 'utf8');
const runtime = fs.readFileSync(path.join(__dirname, 'demo-runtime.js'), 'utf8');
html = html.replace('<head>', `<head><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:; connect-src 'none'; form-action 'none'; base-uri 'none'">`);
html = html.replace('<body>', '<body><div style="height:32px;display:flex;gap:16px;align-items:center;justify-content:center;background:#164d68;color:white;font:12px system-ui">DEMO · Sample data only <a href="live.html" style="color:white">실제 연결 / Live connection →</a></div><style>.workspace{height:calc(100dvh - 137px)!important}</style>');
html = html.replace('<script>', `<script>${fixture}\n${runtime}</script><script>`);
html = html.replaceAll('ppControlV9', 'ppControlDemo');
html = html.replace('String(s ?? "")', 'String(typeof s === "string" && s.startsWith("https://demo.invalid/") ? window.demoThumbnail(s) : (s ?? ""))');
html = html.replace('preview.src = src', 'preview.src = window.demoThumbnail(src)').replace('im.src = src', 'im.src = window.demoThumbnail(src)');
html = html.replace('if (params.has("host")) config.host = params.get("host");', 'config.host = "https://demo.invalid"; config.disconnected = false;');
html = html.replace('const host = $("#hostInput").value.trim();', 'const host = "https://demo.invalid";');
html = html.replace('u.port = String(Number(value));', 'u.port = ""; // The displayed example port never changes the mock origin.');
html = html.replace('$("#settingsDialog").showModal();', '$("#hostInput").value = "localhost"; $("#portInput").value = "1025"; $("#hostInput").disabled = true; $("#portInput").disabled = true; $("#settingsDialog").showModal();');
fs.mkdirSync(path.join(root, 'docs'), {recursive:true});
fs.writeFileSync(path.join(root, 'docs/index.html'), html);
let live = source.replace('<head>', `<head><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data: http: https:; connect-src http: https:; form-action 'none'; base-uri 'none'">`);
live = live.replaceAll('ppControlV9', 'ppControlWebLive');
// A fresh page always waits for an explicit Connect; URL parameters cannot arm controls.
live = live.replace('if (params.has("host")) config.host = params.get("host");', 'config.disconnected = true; config.readOnly = true;');
live = live.replace('config.readOnly = params.get("readonly") !== "0";', 'config.readOnly = true;');
live = live.replace('<body>', '<body><div style="height:32px;display:flex;gap:16px;align-items:center;justify-content:center;background:#75451a;color:white;font:12px system-ui">LIVE · 실제 장비 연결 <a href="index.html" style="color:white">Demo</a><a href="control.html" download="propresenter_web_control.html" style="color:white">HTML 다운로드 / Download</a></div><style>.workspace{height:calc(100dvh - 137px)!important}</style>');
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
fs.writeFileSync(path.join(root, 'docs/live.html'), live);
fs.writeFileSync(path.join(root, 'docs/control.html'), source);
fs.writeFileSync(path.join(root, 'docs/.nojekyll'), '');
