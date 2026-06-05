import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const pinnedSection = useRef(null);
  const bgRef = useRef(null);
  const brideRef = useRef(null);
  const groomRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const nameRef = useRef(null);
  const detailsRef = useRef(null);
  const buttonsRef = useRef(null);

  const weddingSection = useRef(null);
  const weddingBgRef = useRef(null);
  const weddingCoupleRef = useRef(null);
  const weddingPoojariRef = useRef(null);
  const wLine1Ref = useRef(null);
  const wLine2Ref = useRef(null);
  const wNameRef = useRef(null);
  const wDetailsRef = useRef(null);
  const wButtonsRef = useRef(null);

  const audioRef = useRef(null);
  const flapLeftRef = useRef(null);
  const flapRightRef = useRef(null);
  const flapContainerRef = useRef(null);
  const openBtnRef = useRef(null);

  const [musicOn, setMusicOn] = useState(false);
  const [opened, setOpened] = useState(false);

  const topBorderRef = useRef(null);
  const divider1Ref = useRef(null);
  const heartDividerRef = useRef(null);
  const bottomBorderRef = useRef(null);
  const taglineRef = useRef(null);

  const toggleMusic = () => {
    if (musicOn) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setMusicOn(!musicOn);
  };

  const handleOpen = () => {
    // play music
    audioRef.current
      .play()
      .then(() => setMusicOn(true))
      .catch((e) => console.log("blocked:", e));

    // fade out button first
    gsap.to(openBtnRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
    });

    // flaps open outward
    gsap.to(flapLeftRef.current, {
      x: "-100%",
      duration: 1.2,
      ease: "power3.inOut",
      delay: 0.2,
    });

    gsap.to(flapRightRef.current, {
      x: "100%",
      duration: 1.2,
      ease: "power3.inOut",
      delay: 0.2,
      onComplete: () => {
        gsap.set(flapContainerRef.current, { display: "none" });
        document.body.style.overflow = "auto"; // ← add this here
        setOpened(true);
      },
    });
  };
  useEffect(() => {
    document.body.style.overflow = "hidden"; // disable on load
    return () => {
      document.body.style.overflow = "auto"; // cleanup
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const vw = window.innerWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinnedSection.current,
          start: "top top",
          pin: true,
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(brideRef.current, { x: -vw }, { x: 0, duration: 2 })
        .fromTo(groomRef.current, { x: vw }, { x: 0, duration: 2 }, "<")
        // top border fades in first
        .fromTo(
          topBorderRef.current,
          { opacity: 0, scaleX: 0 },
          { opacity: 1, scaleX: 1, duration: 1, transformOrigin: "center" },
          "-=0.5",
        )
        .fromTo(
          line1Ref.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.2 },
          "-=0.3",
        )
        .fromTo(
          divider1Ref.current,
          { opacity: 0, scaleX: 0 },
          { opacity: 1, scaleX: 1, duration: 0.8, transformOrigin: "center" },
          "-=0.5",
        )
        .fromTo(
          line2Ref.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.2 },
          "-=0.5",
        )
        .fromTo(
          nameRef.current,
          { opacity: 0, y: 60, scale: 0.8 },
          { opacity: 1, y: 0, scale: 1, duration: 1.5 },
          "-=0.8",
        )
        .fromTo(
          heartDividerRef.current,
          { opacity: 0, scaleX: 0 },
          { opacity: 1, scaleX: 1, duration: 0.8, transformOrigin: "center" },
          "-=0.5",
        )
        .fromTo(
          detailsRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.5",
        )
        .fromTo(
          bottomBorderRef.current,
          { opacity: 0, scaleX: 0 },
          { opacity: 1, scaleX: 1, duration: 1, transformOrigin: "center" },
          "-=0.3",
        )
        .fromTo(
          buttonsRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.3",
        )
        .fromTo(
          taglineRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          "-=0.3",
        );

      gsap.to(bgRef.current, {
        y: -80,
        scrollTrigger: {
          trigger: pinnedSection.current,
          start: "top top",
          toggleActions: "play none none none",
        },
      });

      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: weddingSection.current,
          start: "top top",
          end: "+=2000",
          pin: true,
          scrub: 1,
        },
      });

      tl2
        .fromTo(
          weddingCoupleRef.current,
          { y: 300, opacity: 0 },
          { y: 0, opacity: 1, duration: 3 },
        )
        .fromTo(
          wLine1Ref.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 2 },
          "-=0.5",
        )
        .fromTo(
          wLine2Ref.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 2 },
          "-=1",
        )
        .fromTo(
          wNameRef.current,
          { opacity: 0, y: 60, scale: 0.8 },
          { opacity: 1, y: 0, scale: 1, duration: 2.5 },
          "-=1",
        )
        .fromTo(
          wDetailsRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 2 },
          "-=0.5",
        )
        .fromTo(
          wButtonsRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 2 },
          "-=0.5",
        );

      gsap.to(weddingBgRef.current, {
        y: -80,
        scrollTrigger: {
          trigger: weddingSection.current,
          start: "top top",
          end: "+=2000",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const calendarLink = (title, date, location, details) => {
    const base = "https://calendar.google.com/calendar/render?action=TEMPLATE";
    return `${base}&text=${encodeURIComponent(
      title,
    )}&dates=${date}&location=${encodeURIComponent(
      location,
    )}&details=${encodeURIComponent(details)}`;
  };

  const engagementCal = calendarLink(
    "Engagement of Pavan & Anusha",
    "20260628T100000/20260628T140000",
    "Subz, Jayanagar, Bengaluru",
    "You are cordially invited!",
  );

  const weddingCal = calendarLink(
    "Wedding of Pavan & Anusha",
    "20260701T100000/20260701T160000",
    "Venue Placeholder, Bengaluru",
    "You are cordially invited to the wedding of Pavan & Anusha!",
  );

  return (
    <div>
      <audio ref={audioRef} src="/bgm.mp3" loop preload="auto" />

      {/* ── FLAP COVER ── */}
      <div
        ref={flapContainerRef}
        className="fixed inset-0 z-50 flex overflow-hidden"
      >
        {/* left flap */}
        <div
          ref={flapLeftRef}
          className="w-1/2 h-full relative overflow-hidden flex items-center justify-end"
          style={{ background: "linear-gradient(135deg, #1a0a00, #3d1a00)" }}
        >
          {/* decorative border */}
          <div className="absolute inset-2 border border-yellow-600/40 pointer-events-none" />
          {/* gold pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle, #d4af37 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          <p
            className="text-yellow-600/60 text-6xl pb-60 pr-10 select-none "
            style={{ fontFamily: "Beau Rivage, cursive" }}
          >
            P
          </p>
        </div>

        {/* right flap */}
        <div
          ref={flapRightRef}
          className="w-1/2 h-full relative overflow-hidden flex items-center justify-start"
          style={{ background: "linear-gradient(225deg, #1a0a00, #3d1a00)" }}
        >
          <div className="absolute inset-2 border border-yellow-600/40 pointer-events-none" />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle, #d4af37 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          <p
            className="text-yellow-600/60 text-6xl pb-60 pl-10 select-none"
            style={{ fontFamily: "Beau Rivage, cursive" }}
          >
            A
          </p>
        </div>

        {/* center seam + button */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none">
          {/* vertical gold seam line */}
          <div className="absolute top-0 bottom-0 w-px bg-yellow-600/50" />

          {/* open button */}
          <div
            ref={openBtnRef}
            className="pointer-events-auto flex flex-col items-center gap-3 z-10"
          >
            {/* decorative ring around button */}
            <div
              className="w-20 h-20 rounded-full border border-yellow-500/50 flex items-center justify-center"
              style={{
                background: "radial-gradient(circle, #3d1a00, #1a0a00)",
              }}
            >
              <div className="w-14 h-14 rounded-full border border-yellow-500/30 flex items-center justify-center">
                <p
                  className="text-yellow-500/70 text-2xl"
                  style={{ fontFamily: "Beau Rivage, cursive" }}
                >
                  ♥
                </p>
              </div>
            </div>
            <button
              onClick={handleOpen}
              className="px-8 py-3 text-yellow-400 text-sm tracking-[0.3em] uppercase border border-yellow-600/50 rounded-full backdrop-blur-sm hover:bg-yellow-900/30 transition-all duration-300"
              style={{ background: "rgba(61, 26, 0, 0.8)" }}
            >
              Open <span className=" text-lg">❧</span>
            </button>
            {/*<p className="text-yellow-600/50 text-xs tracking-widest uppercase">
              tap to reveal
            </p>*/}
          </div>
        </div>
      </div>

      {/* ── SECTION 1 — LANDING ── */}
      <div className="h-screen bg-black flex items-center justify-center flex-col relative overflow-hidden">
        <img
          src="images/landing-bg.png"
          className="absolute inset-0 w-full h-full object-cover blur-2px"
          alt="background"
        />
        <div className="absolute inset-0 bg-black/70" />
        <img
          className="relative bottom-20 z-10 px-10 scale-120"
          src="images/pavanusha-ring2.png"
          alt="logo"
        />
        <p
          className="text-white relative bottom-20 left-15 text-2xl z-10"
          style={{ fontFamily: "Corinthia, cursive" }}
        >
          Two Hearts. One Forever.
        </p>
        <button
          onClick={toggleMusic}
          className="relative top-25 z-10 px-5 py-2 bg-white/10 border border-white/30 text-white text-sm rounded-full backdrop-blur-sm hover:bg-white/20 transition"
        >
          {musicOn ? (
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/pulsar-line/48/FAB005/no-audio.png"
              alt="no-audio"
            />
          ) : (
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/pulsar-line/48/FAB005/musical-notes.png"
              alt="musical-notes"
            />
          )}
        </button>
        <div className="relative animate-bounce items-center flex justify-center flex-col top-35 z-10">
          <p className="text-white text-sm mt-4 pt-10">PLEASE SCROLL DOWN</p>
          <img
            width="25"
            height="25"
            src="https://img.icons8.com/ios/50/FFFFFF/circled-chevron-down.png"
            alt="scroll down"
          />
        </div>
      </div>

      {/* ── SECTION 2 — ENGAGEMENT ── */}
      <div ref={pinnedSection} className="relative h-screen overflow-hidden">
        <img
          ref={bgRef}
          src="images/engagement-bg.png"
          className="absolute inset-0 w-full object-cover scale-110"
          style={{ height: "120%", top: "-10%" }}
          alt="background"
        />
        <div className="absolute inset-0 bg-black/70  z-10" />
        <div
          ref={brideRef}
          className="absolute bottom-8  z-20 h-4/5"
          style={{ right: "46%" }}
        >
          <img
            src="images/e-bride2.png"
            className="h-full object-contain object-bottom scale-110"
            alt="bride"
          />
        </div>
        <div
          ref={groomRef}
          className="absolute bottom-8 z-20 h-4/5"
          style={{ left: "52%" }}
        >
          <img
            src="images/e-groom2.png"
            className="h-full object-contain object-bottom scale-110"
            alt="groom"
          />
        </div>
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-start pt-6 px-6 gap-1 pointer-events-none">
          {/* ornate top border */}
          <div
            ref={topBorderRef}
            className="flex items-center gap-2 w-full justify-center mb-1"
          >
            <div className="h-px flex-1 bg-linear-to-r from-transparent to-yellow-600/60" />
            <span className="text-yellow-500 text-xs">✦</span>
            <div className="h-px w-6 bg-yellow-600/60" />
            <span className="text-yellow-500 text-base">❧</span>
            <div className="h-px w-6 bg-yellow-600/60" />
            <span className="text-yellow-500 text-xs">✦</span>
            <div className="h-px flex-1 bg-linear-to-l from-transparent to-yellow-600/60" />
          </div>

          {/* line 1 */}
          <p
            ref={line1Ref}
            className="text-white text-sm text-center tracking-[0.2em] uppercase"
            style={{ fontFamily: "Emilys Candy, serif" }}
          >
            You are cordially invited to the
          </p>

          {/* divider */}
          <div
            ref={divider1Ref}
            className="flex items-center gap-2 w-3/4 justify-center"
          >
            <div className="h-px flex-1 bg-yellow-600/40" />
            <span className="text-yellow-500/60 text-xs">◆</span>
            <div className="h-px flex-1 bg-yellow-600/40" />
          </div>

          {/* line 2 */}
          <p
            ref={line2Ref}
            className="text-white text-lg font-bold tracking-[0.15em] uppercase"
            style={{ fontFamily: "Emilys Candy, serif" }}
          >
            Engagement of
          </p>

          {/* name */}
          <h1
            ref={nameRef}
            className="text-yellow-400/80 text-5xl font-bold tracking-wide text-center leading-tight"
            style={{
              fontFamily: "Beau Rivage, cursive",
              textShadow: "0 0 5px rgba(212,175,55,0.5)",
            }}
          >
            Pavan & Anusha
          </h1>

          {/* small heart divider */}
          <div
            ref={heartDividerRef}
            className="flex items-center gap-2 w-3/4 justify-center"
          >
            <div className="h-px flex-1 bg-yellow-600/40" />
            <span className="text-yellow-500/80 text-sm">♥</span>
            <div className="h-px flex-1 bg-yellow-600/40" />
          </div>

          {/* date and location */}
          <div
            ref={detailsRef}
            className="flex flex-col items-center gap-1 text-center"
          >
            {/* date */}
            <div className="flex items-center gap-2">
              <span className="text-yellow-500 text-xs">
                <img
                  width="20"
                  height="20"
                  src="https://img.icons8.com/comic/100/FAB005/calendar.png"
                  alt="calendar"
                />
              </span>
              <p
                className="text-white text-xs tracking-widest uppercase"
                style={{
                  fontFamily: "Jost, sans-serif",
                  letterSpacing: "0.15em",
                }}
              >
                28<sup>th</sup> June 2026, 11:00 AM Onwards
              </p>
            </div>
            {/* location */}
            <div className="flex items-center gap-2">
              <span className="text-yellow-500 text-xs">
                <img
                  width="20"
                  height="20"
                  src="https://img.icons8.com/dotty/80/FAB005/map-pin.png"
                  alt="map-pin"
                />
              </span>
              <p
                className="text-white text-xs tracking-widest uppercase"
                style={{
                  fontFamily: "Jost, sans-serif",
                  letterSpacing: "0.15em",
                }}
              >
                Subz, Jayanagar, Bengaluru
              </p>
            </div>
          </div>

          {/* bottom divider */}
          <div
            ref={bottomBorderRef}
            className="flex items-center gap-2 w-full justify-center mt-1"
          >
            <div className="h-px flex-1 bg-linear-to-r from-transparent to-yellow-600/60" />
            <span className="text-yellow-500 text-xs">✦</span>
            <div className="h-px w-6 bg-yellow-600/60" />
            <span className="text-yellow-500 text-base">❧</span>
            <div className="h-px w-6 bg-yellow-600/60" />
            <span className="text-yellow-500 text-xs">✦</span>
            <div className="h-px flex-1 bg-linear-to-l from-transparent to-yellow-600/60" />
          </div>

          {/* buttons */}
          <div
            ref={buttonsRef}
            className="flex gap-2 mt-2 pointer-events-auto flex-wrap justify-center"
          >
            <a
              href="https://forms.gle/hJ4Hm6C7GnnFQ5rXA"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-4 py-1.5 border border-yellow-600/50 text-yellow-100 text-xs rounded-full backdrop-blur-sm transition"
              style={{
                background: "rgba(61,26,0,0.6)",
                fontFamily: "Jost, sans-serif",
                letterSpacing: "0.1em",
              }}
            >
              <img
                width="20"
                height="20"
                src="https://img.icons8.com/wired/64/FAB005/like-message.png"
                alt="rsvp"
              />
              RSVP
            </a>
            <a
              href="https://maps.app.goo.gl/tGBFPnRxaxzuPFZr6"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-4 py-1.5 border border-yellow-600/50 text-yellow-100 text-xs rounded-full backdrop-blur-sm transition"
              style={{
                background: "rgba(61,26,0,0.6)",
                fontFamily: "Jost, sans-serif",
                letterSpacing: "0.1em",
              }}
            >
              <img
                width="20"
                height="20"
                src="https://img.icons8.com/carbon-copy/100/FAB005/map-marker.png"
                alt="location"
              />
              LOCATION
            </a>
            <a
              href={engagementCal}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-4 py-1.5 border border-yellow-600/50 text-yellow-100 text-xs rounded-full backdrop-blur-sm transition"
              style={{
                background: "rgba(61,26,0,0.6)",
                fontFamily: "Jost, sans-serif",
                letterSpacing: "0.1em",
              }}
            >
              <img
                width="25"
                height="25"
                src="https://img.icons8.com/dotty/80/FAB005/reminder.png"
                alt="reminder"
              />
              REMIND ME
            </a>
          </div>

          {/* tagline */}
          <div ref={taglineRef} className="flex items-center gap-2 mt-2">
            <span className="text-yellow-600/50 text-xs">✦</span>
            <p
              className="text-yellow-600 text-lg font-bold tracking-widest italic"
              style={{ fontFamily: "Corinthia, cursive" }}
            >
              Celebrate Love, Cherish Forever
            </p>
            <span className="text-yellow-600/50 text-xs">✦</span>
          </div>
        </div>
      </div>

      {/* ── SECTION 3 — WEDDING ── 
      <div ref={weddingSection} className="relative h-screen overflow-hidden">
        <img
          ref={weddingBgRef}
          src="images/mantap.png"
          className="absolute inset-0 w-full object-cover scale-110"
          style={{ height: "120%", top: "-10%" }}
          alt="background"
        />
        <div className="absolute inset-0 bg-black/50 z-10" />

        <div
          ref={weddingCoupleRef}
          className="absolute bottom-0 top-4 z-20 h-full w-full"
        >
          <img
            src="images/wedding-people.png"
            className="h-full w-full object-contain object-bottom scale-110"
            style={{ objectPosition: "center" }}
            alt="couple"
          />
        </div>
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-start pt-8 px-6 gap-2 pointer-events-none">
          <p
            ref={wLine1Ref}
            className="text-white text-center text-xl font-bold tracking-widest opacity-0"
            style={{ fontFamily: "Emilys Candy, serif" }}
          >
            You are cordially invited to the
          </p>
          <p
            ref={wLine2Ref}
            className="text-white text-2xl font-bold tracking-widest opacity-0"
            style={{ fontFamily: "Emilys Candy, serif" }}
          >
            Wedding of
          </p>
          <h1
            ref={wNameRef}
            className="text-yellow-500 text-5xl font-bold tracking-wide text-center opacity-0"
            style={{ fontFamily: "Beau Rivage, cursive" }}
          >
            Pavan & Anusha
          </h1>
          <div
            ref={wDetailsRef}
            className="flex flex-col items-center gap-1 opacity-0 text-center"
          >
            <p
              className="text-white text-sm tracking-widest uppercase"
              style={{ fontFamily: "Emilys Candy, serif" }}
            >
              DATE & VENUE :<br />{" "}
              <span className="font-bold text-2xl">TO BE ANNOUNCED</span>
            </p>
          </div>
          {/* buttons 
          <div
            ref={wButtonsRef}
            className="flex gap-3 mt-4 pointer-events-auto opacity-0 flex-wrap justify-center"
          >
            <a
              href="YOUR_GOOGLE_FORMS_LINK"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 px-5 py-2 bg-white/10 border border-white/30 text-white text-sm rounded-full backdrop-blur-sm hover:bg-white/20 transition"
            >
              <img
                width="20"
                height="20"
                src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-rsvp-event-management-flaticons-lineal-color-flat-icons-2.png"
                alt="rsvp"
              />
              RSVP
            </a>
            <a
              href="YOUR_MAPS_LINK"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 px-5 py-2 bg-white/10 border border-white/30 text-white text-sm rounded-full backdrop-blur-sm hover:bg-white/20 transition"
            >
              <img
                width="20"
                height="20"
                src="https://img.icons8.com/office/40/marker.png"
                alt="location"
              />
              Location
            </a>
            <a
              href={weddingCal}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 px-5 py-2 bg-white/10 border border-white/30 text-white text-sm rounded-full backdrop-blur-sm hover:bg-white/20 transition"
            >
              📅 Remind Me
            </a>
          </div>
        </div>
      </div>
          */}
    </div>
  );
}

export default App;
