const { useState, useEffect, useRef } = React;

const DOWNLOAD_URL = "./YT Downloader.exe";
const FILE_NAME = "YT Downloader.exe";
const STORAGE_LANG = "yt-downloader-lang";
const STORAGE_THEME = "yt-downloader-theme";

const STRINGS = {
  ar: {
    dir: "rtl",
    badge: "الإصدار الحالي متاح",
    title1: "حمّل برنامجك",
    titleAccent: "بسرعة وبوضوح",
    desc: "تنزيل مباشر لبرنامج YT Downloader بواجهة بسيطة، تجربة سريعة، ونسبة تحميل مبنية على البيانات الفعلية.",
    download: "تحميل البرنامج",
    downloading: "جاري التحميل",
    done: "اكتمل التحميل",
    failed: "فشل التحميل",
    retry: "إعادة المحاولة",
    progress: "التقدم",
    unknownSize: "جارٍ حساب الحجم…",
    size: "14.2 MB",
    os: "Windows 10 / 11",
    version: "الإصدار 2.4.1",
    fast: "سريع",
    fastDesc: "واجهة خفيفة وتحميل مباشر",
    real: "تقدم حقيقي",
    realDesc: "النسبة محسوبة من البيانات المستلمة فعليًا",
    simple: "بسيط",
    simpleDesc: "تجربة واضحة بدون خطوات زائدة",
    ready: "جاهز للتحميل",
    footer: "جميع الحقوق محفوظة",
    language: "English",
    light: "فاتح",
    dark: "داكن",
    ariaLang: "تغيير اللغة",
    ariaTheme: "تغيير المظهر",
    downloaded: "تم تحميل",
    remaining: "متبقي",
    speed: "السرعة",
    eta: "الوقت المتبقي",
    calculating: "يتم الحساب…",
    downloadError: "تعذر تحميل الملف. تأكد أن ملف YT Downloader.exe موجود في الموقع ثم حاول مرة أخرى.",
  },
  en: {
    dir: "ltr",
    badge: "Latest version available",
    title1: "Download your app",
    titleAccent: "fast and clearly",
    desc: "A direct YT Downloader download with a clean interface, fast experience, and progress based on real received data.",
    download: "Download the app",
    downloading: "Downloading",
    done: "Download complete",
    failed: "Download failed",
    retry: "Try again",
    progress: "Progress",
    unknownSize: "Calculating size…",
    size: "14.2 MB",
    os: "Windows 10 / 11",
    version: "Version 2.4.1",
    fast: "Fast",
    fastDesc: "Lightweight interface and direct download",
    real: "Real progress",
    realDesc: "Progress is calculated from actual received data",
    simple: "Simple",
    simpleDesc: "A clear experience with no unnecessary steps",
    ready: "Ready to download",
    footer: "All rights reserved",
    language: "العربية",
    light: "Light",
    dark: "Dark",
    ariaLang: "Change language",
    ariaTheme: "Change theme",
    downloaded: "Downloaded",
    remaining: "remaining",
    speed: "Speed",
    eta: "Time left",
    calculating: "Calculating…",
    downloadError: "The file could not be downloaded. Make sure YT Downloader.exe exists on the website and try again.",
  },
};

function GlobeIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7"/><path d="M3 12H21M12 3C14.5 5.5 15.8 8.6 15.8 12C15.8 15.4 14.5 18.5 12 21C9.5 18.5 8.2 15.4 8.2 12C8.2 8.6 9.5 5.5 12 3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/></svg>;
}
function SunIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.7"/><path d="M12 2.5V4.5M12 19.5V21.5M21.5 12H19.5M4.5 12H2.5M18.4 5.6L17 7M7 17L5.6 18.4M18.4 18.4L17 17M7 7L5.6 5.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>;
}
function MoonIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 14.5C18.6 15.3 17 15.8 15.3 15.8C10.2 15.8 6 11.6 6 6.5C6 4.8 6.5 3.2 7.3 1.8C4 3.3 1.7 6.7 1.7 10.6C1.7 15.9 6 20.2 11.3 20.2C15.2 20.2 18.6 17.9 20 14.5Z" fill="currentColor"/></svg>;
}
function DownloadIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4V15M12 15L7 10M12 15L17 10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 18V19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19V18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}
function formatSpeed(bytesPerSecond) {
  return `${formatBytes(bytesPerSecond)}/s`;
}
function formatEta(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "--";
  if (seconds < 60) return `${Math.ceil(seconds)}s`;
  const minutes = Math.floor(seconds / 60);
  const secs = Math.ceil(seconds % 60);
  return `${minutes}m ${secs}s`;
}

function Header({ lang, setLang, theme, setTheme, t }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="brand">
          <img src="app-icon.png" alt="YT Downloader" />
          <span className="brand-name">YT Downloader</span>
        </div>
        <div className="header-actions">
          <button className="icon-btn" onClick={() => setLang(lang === "ar" ? "en" : "ar")} aria-label={t.ariaLang} title={t.ariaLang}>
            <GlobeIcon /><span className="label">{t.language}</span>
          </button>
          <button className="icon-btn" onClick={() => setTheme(theme === "light" ? "dark" : "light")} aria-label={t.ariaTheme} title={t.ariaTheme}>
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
            <span className="label">{theme === "light" ? t.dark : t.light}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero({ t }) {
  const [state, setState] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [received, setReceived] = useState(0);
  const [total, setTotal] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [eta, setEta] = useState(null);
  const [error, setError] = useState(false);
  const abortRef = useRef(null);

  useEffect(() => () => abortRef.current?.abort(), []);

  const startDownload = async () => {
    if (state === "downloading") return;

    setState("downloading");
    setProgress(0);
    setReceived(0);
    setTotal(0);
    setSpeed(0);
    setEta(null);
    setError(false);

    const controller = new AbortController();
    abortRef.current = controller;
    const startedAt = performance.now();

    try {
      const response = await fetch(DOWNLOAD_URL, {
        method: "GET",
        cache: "no-store",
        signal: controller.signal,
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      if (!response.body) throw new Error("ReadableStream is unavailable");

      const contentLength = Number(response.headers.get("content-length"));
      const knownTotal = Number.isFinite(contentLength) && contentLength > 0 ? contentLength : 0;
      setTotal(knownTotal);

      const reader = response.body.getReader();
      const chunks = [];
      let loaded = 0;
      let lastUpdate = startedAt;
      let lastLoaded = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        loaded += value.byteLength;

        const now = performance.now();
        const elapsed = (now - startedAt) / 1000;
        const instantWindow = (now - lastUpdate) / 1000;
        if (instantWindow >= 0.15 || knownTotal > 0) {
          const currentSpeed = elapsed > 0 ? loaded / elapsed : 0;
          setReceived(loaded);
          setSpeed(currentSpeed);
          if (knownTotal > 0) {
            const percent = Math.min(99.9, (loaded / knownTotal) * 100);
            setProgress(percent);
            setEta(currentSpeed > 0 ? (knownTotal - loaded) / currentSpeed : null);
          }
          lastUpdate = now;
          lastLoaded = loaded;
        }
      }

      setReceived(loaded);
      setProgress(100);
      setTotal(knownTotal || loaded);

      const blob = new Blob(chunks, { type: response.headers.get("content-type") || "application/octet-stream" });
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = FILE_NAME;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);

      setState("done");
      setEta(0);
      setTimeout(() => setState("idle"), 2600);
    } catch (err) {
      if (err.name === "AbortError") return;
      console.error("YT Downloader download error:", err);
      setError(true);
      setState("idle");
    } finally {
      abortRef.current = null;
    }
  };

  const roundedProgress = Math.round(progress);
  const displayTotal = total > 0 ? formatBytes(total) : t.unknownSize;

  return (
    <div className="hero">
      <div className="hero-top">
        <div className="app-icon-wrap"><img src="app-icon.png" alt="YT Downloader icon" /></div>
        <span className="eyebrow"><span className="dot"></span>{state === "idle" && !error ? t.ready : state === "done" ? t.done : t.badge}</span>
        <h1>{t.title1} <span>{t.titleAccent}</span></h1>
        <p className="desc">{t.desc}</p>

        <div className="download-area">
          <button className="download-btn" onClick={startDownload} disabled={state === "downloading"}>
            <DownloadIcon />
            {state === "downloading" ? `${t.downloading} ${roundedProgress}%` : state === "done" ? t.done : error ? t.retry : t.download}
          </button>

          {state === "downloading" && (
            <div className="progress-wrap">
              <div className="progress-meta">
                <span>{t.progress}</span>
                <strong>{roundedProgress}%</strong>
              </div>
              <div className="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={roundedProgress}>
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="download-stats">
                <span>{formatBytes(received)} / {displayTotal}</span>
                <span>{formatSpeed(speed)}</span>
                <span>{eta === null ? t.calculating : `${t.eta}: ${formatEta(eta)}`}</span>
              </div>
            </div>
          )}

          {error && <p className="download-error" role="alert">{t.downloadError}</p>}

          <div className="meta-row">
            <span>{t.os}</span><span className="sep">•</span><span>{t.size}</span><span className="sep">•</span><span>{t.version}</span>
          </div>
        </div>
      </div>

      <div className="features">
        <div className="feature"><div className="ficon">⚡</div><h3>{t.fast}</h3><p>{t.fastDesc}</p></div>
        <div className="feature"><div className="ficon">◔</div><h3>{t.real}</h3><p>{t.realDesc}</p></div>
        <div className="feature"><div className="ficon">✦</div><h3>{t.simple}</h3><p>{t.simpleDesc}</p></div>
      </div>
    </div>
  );
}

function Footer({ t }) {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <span>YT Downloader © 2026</span>
        <span className="footer-status"><span className="dot"></span>{t.ready}</span>
        <span>{t.footer}</span>
      </div>
    </footer>
  );
}

function App() {
  const [lang, setLang] = useState(() => localStorage.getItem(STORAGE_LANG) || "ar");
  const [theme, setTheme] = useState(() => localStorage.getItem(STORAGE_THEME) || "light");
  const t = STRINGS[lang] || STRINGS.ar;

  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = lang;
    localStorage.setItem(STORAGE_LANG, lang);
  }, [lang, t.dir]);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_THEME, theme);
  }, [theme]);

  return <div className="page"><Header lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} t={t}/><main><Hero t={t}/></main><Footer t={t}/></div>;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);