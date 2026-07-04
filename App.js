const { useState, useEffect, useRef } = React;

const DOWNLOAD_URL = "./YT Downloader.exe";
const FILE_NAME = "YT Downloader.exe";

const STRINGS = {
  ar: {
    dir: "rtl",
    badge: "الإصدار الحالي متاح",
    title1: "حمّل فيديوهاتك من يوتيوب",
    titleAccent: "بضغطة واحدة",
    desc: "برنامج بسيط وسريع لتحميل الفيديوهات لجهازك، بدون تعقيد وبدون إعلانات مزعجة.",
    download: "تحميل البرنامج",
    downloading: (p) => `جاري التحميل… ${p}%`,
    done: "تم بدء التحميل",
    size: "14.2 MB",
    os: "Windows 10 / 11",
    version: "الإصدار 2.4.1",
    f1t: "سريع", f1d: "تحميل بأقصى سرعة إنترنت متاحة",
    f2t: "آمن", f2d: "ملف مفحوص وخالٍ من الفيروسات",
    f3t: "بسيط", f3d: "واجهة سهلة، من غير تعقيد",
    footer: "جميع الحقوق محفوظة",
    langBtn: "English",
    themeLight: "فاتح",
    themeDark: "داكن",
  },
  en: {
    dir: "ltr",
    badge: "Latest version available",
    title1: "Download YouTube videos",
    titleAccent: "in one click",
    desc: "A simple, fast app to save videos to your device — no clutter, no annoying ads.",
    download: "Download the app",
    downloading: (p) => `Downloading… ${p}%`,
    done: "Download started",
    size: "14.2 MB",
    os: "Windows 10 / 11",
    version: "Version 2.4.1",
    f1t: "Fast", f1d: "Downloads at your full connection speed",
    f2t: "Safe", f2d: "Scanned file, virus-free",
    f3t: "Simple", f3d: "Clean interface, zero clutter",
    footer: "All rights reserved",
    langBtn: "العربية",
    themeLight: "Light",
    themeDark: "Dark",
  },
};

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7"/>
      <path d="M3 12H21M12 3C14.5 5.5 15.8 8.6 15.8 12C15.8 15.4 14.5 18.5 12 21C9.5 18.5 8.2 15.4 8.2 12C8.2 8.6 9.5 5.5 12 3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.7"/>
      <path d="M12 2.5V4.5M12 19.5V21.5M21.5 12H19.5M4.5 12H2.5M18.4 5.6L17 7M7 17L5.6 18.4M18.4 18.4L17 17M7 7L5.6 5.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 14.5C18.6 15.3 17 15.8 15.3 15.8C10.2 15.8 6 11.6 6 6.5C6 4.8 6.5 3.2 7.3 1.8C4 3.3 1.7 6.7 1.7 10.6C1.7 15.9 6 20.2 11.3 20.2C15.2 20.2 18.6 17.9 20 14.5Z" fill="currentColor"/>
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4V15M12 15L7 10M12 15L17 10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 18V19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19V18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
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
          <button
            className="icon-btn"
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            aria-label="switch language"
          >
            <GlobeIcon />
            <span className="label">{t.langBtn}</span>
          </button>
          <button
            className="icon-btn"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="toggle theme"
          >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
            <span className="label">{theme === "light" ? t.themeDark : t.themeLight}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero({ t }) {
  const [state, setState] = useState("idle");
  const [progress, setProgress] = useState(0);
  const linkRef = useRef(null);

  const startDownload = () => {
    if (state === "downloading") return;
    setState("downloading");
    setProgress(0);
    let p = 0;
    const timer = setInterval(() => {
      p += Math.random() * 18 + 8;
      if (p >= 100) {
        p = 100;
        clearInterval(timer);
        setProgress(100);
        setState("done");
        if (linkRef.current) linkRef.current.click();
        setTimeout(() => setState("idle"), 2200);
      } else {
        setProgress(p);
      }
    }, 200);
  };

  return (
    <div className="hero">
      <div className="app-icon-wrap">
        <img src="app-icon.png" alt="YT Downloader icon" />
      </div>

      <span className="eyebrow">
        <span className="dot"></span>
        {t.badge}
      </span>

      <h1>{t.title1} <span>{t.titleAccent}</span></h1>
      <p className="desc">{t.desc}</p>

      <button
        className={"download-btn" + (state === "downloading" ? " downloading" : "")}
        onClick={startDownload}
        disabled={state === "downloading"}
      >
        <DownloadIcon />
        {state === "idle" && t.download}
        {state === "downloading" && t.downloading(Math.min(Math.round(progress), 100))}
        {state === "done" && t.done}
      </button>

      {state === "downloading" && (
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      )}

      <div className="meta-row">
        <span>{t.os}</span>
        <span className="sep">•</span>
        <span>{t.size}</span>
        <span className="sep">•</span>
        <span>{t.version}</span>
      </div>

      <a ref={linkRef} href={DOWNLOAD_URL} download={FILE_NAME} style={{ display: "none" }}>download</a>

      <div className="features">
        <div className="feature">
          <div className="ficon">⚡</div>
          <h3>{t.f1t}</h3>
          <p>{t.f1d}</p>
        </div>
        <div className="feature">
          <div className="ficon">🛡️</div>
          <h3>{t.f2t}</h3>
          <p>{t.f2d}</p>
        </div>
        <div className="feature">
          <div className="ficon">✨</div>
          <h3>{t.f3t}</h3>
          <p>{t.f3d}</p>
        </div>
      </div>
    </div>
  );
}

function Footer({ t }) {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <span>YT Downloader © 2026</span>
        <span>{t.footer}</span>
      </div>
    </footer>
  );
}

function App() {
  const [lang, setLang] = useState("ar");
  const [theme, setTheme] = useState("light");
  const t = STRINGS[lang];

  useEffect(() => {
    document.documentElement.setAttribute("dir", t.dir);
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="page">
      <Header lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} t={t} />
      <main>
        <Hero t={t} />
      </main>
      <Footer t={t} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);