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
  const audioRef = useRef(null);
  const [musicOn, setMusicOn] = React.useState(false);

  const toggleMusic = () => {
    if (musicOn) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setMusicOn(!musicOn);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const vw = window.innerWidth;

      // timeline scrubbed to scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinnedSection.current,
          start: "top top",
          end: "+=2000",
          pin: true,
          scrub: 1,
        },
      });

      // step 1 — couple slides in
      tl.fromTo(brideRef.current, { x: -vw }, { x: 0, duration: 3 })
        .fromTo(
          groomRef.current,
          { x: vw },
          { x: 0, duration: 3 },
          "<", // same time as bride
        )

        // step 2 — line 1 fades up
        .fromTo(
          line1Ref.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 2 },
          "-=0.5",
        )

        // step 3 — line 2
        .fromTo(
          line2Ref.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 2 },
          "-=1",
        )

        // step 4 — big name
        .fromTo(
          nameRef.current,
          { opacity: 0, y: 60, scale: 0.8 },
          { opacity: 1, y: 0, scale: 1, duration: 2.5 },
          "-=1",
        )

        // step 5 — date and location
        .fromTo(
          detailsRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 2 },
          "-=0.5",
        )

        // step 6 — buttons
        .fromTo(
          buttonsRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 2 },
          "-=0.5",
        );

      // background slow parallax
      gsap.to(bgRef.current, {
        y: -80,
        scrollTrigger: {
          trigger: pinnedSection.current,
          start: "top top",
          end: "+=2000",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div>
      {/* audio */}
      <audio ref={audioRef} src="/bgm.mp3" loop />

      {/* section 1 */}
      <div className="h-screen bg-black flex items-center justify-center flex-col">
        <img
          ref={bgRef}
          src="images/rose.jpg"
          className="absolute inset-0 w-full object-cover blur-xs"
          style={{ height: "100%" }}
          alt="background"
        />

        <img
          className="relative top-10"
          src="images/pavanusha-ring.png"
          alt="logo"
        />
        <p
          className=" text-white relative bottom-18 left-15 text-2xl"
          style={{ fontFamily: "Corinthia, cursive" }}
        >
          Two Hearts. One Forever.
        </p>
        <button
          onClick={toggleMusic}
          className=" relative px-5 py-2 bg-white/10 border border-white/30 text-white text-sm rounded-full backdrop-blur-sm hover:bg-white/20 transition"
        >
          {musicOn ? "🔇 Music" : "🎵 Music"}
        </button>
        <div className=" relative animate-bounce items-center flex justify-center flex-col top-15">
          <p className="text-white text-sm mt-4  pt-10 ">
            PLEASE KEEP SCROLLING DOWN TILL THE END
          </p>

          <img
            className=""
            width="25"
            height="25"
            src="https://img.icons8.com/ios/50/FFFFFF/circled-chevron-down.png"
            alt="circled-chevron-down"
          />
        </div>
      </div>

      {/* section 2 — pinned engagement scene */}
      <div ref={pinnedSection} className="relative h-screen overflow-hidden">
        {/* background */}
        <img
          ref={bgRef}
          src="images/e-bg.png"
          className="absolute inset-0 w-full object-cover scale-110 "
          style={{ height: "120%", top: "-10%" }}
          alt="background"
        />

        {/* dark overlay */}
        <div className="absolute inset-0 bg-black/50 z-10" />

        {/* bride */}
        <div
          ref={brideRef}
          className="absolute bottom-0 z-20 h-4/5"
          style={{ right: "45%" }}
        >
          <img
            src="images/e2-nobg-bride.png"
            className="h-full object-contain object-bottom"
            alt="bride"
          />
        </div>

        {/* groom */}
        <div
          ref={groomRef}
          className="absolute bottom-0 z-20 h-4/5"
          style={{ left: "50%" }}
        >
          <img
            src="images/e2-nobg-groom.png"
            className="h-full object-contain object-bottom"
            alt="groom"
          />
        </div>

        {/* text overlay — sits above everything */}
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-start pt-8 top-10 px-6 gap-2 pointer-events-none">
          {/* line 1 */}
          <p
            ref={line1Ref}
            className="text-white text-xl font-bold tracking-widest opacity-0"
            style={{ fontFamily: "Emilys Candy, serif" }}
          >
            You are cordially invited to the
          </p>

          {/* line 2 */}
          <p
            ref={line2Ref}
            className="text-white text-2xl font-bold tracking-widest opacity-0"
            style={{ fontFamily: "Emilys Candy, serif" }}
          >
            Engagement of
          </p>

          {/* name */}
          <h1
            ref={nameRef}
            className="text-yellow-500 text-5xl font-bold tracking-wide text-center opacity-0"
            style={{ fontFamily: "Beau Rivage, cursive" }}
          >
            Pavan & Anusha
          </h1>

          {/* date and location */}
          <div
            ref={detailsRef}
            className="flex flex-col items-center gap-1 opacity-0 justify-center"
          >
            <p
              className="text-white text-sm tracking-widest uppercase text-center"
              style={{ fontFamily: "Emilys Candy, serif" }}
            >
              28<sup>th</sup> June 2026, 10:00 AM Onwards <br />
              Venue - Subz, Jayanagar, Bengaluru
            </p>
          </div>

          {/* buttons */}
          <div
            ref={buttonsRef}
            className="flex gap-3 mt-4 pointer-events-auto opacity-0"
          >
            <a
              href="YOUR_GOOGLE_FORMS_LINK"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2 bg-white/10 border border-white/30 text-white text-sm rounded-full backdrop-blur-sm hover:bg-white/20 transition flex flex-row"
            >
              <img
                width="20"
                height="20"
                src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-rsvp-event-management-flaticons-lineal-color-flat-icons-2.png"
                alt="external-rsvp-event-management-flaticons-lineal-color-flat-icons-2"
              />
              RSVP
            </a>
            <a
              href="https://maps.app.goo.gl/tGBFPnRxaxzuPFZr6"
              target="_blank"
              rel="noreferrer"
              className=" flex flex-row px-5 py-2 bg-white/10 border border-white/30 text-white text-sm rounded-full backdrop-blur-sm hover:bg-white/20 transition"
            >
              <img
                width="20"
                height="20"
                src="https://img.icons8.com/office/40/marker.png"
                alt="marker"
              />{" "}
              Location
            </a>
          </div>
        </div>
      </div>

      {/* section 3 */}
      <div className="relative h-screen overflow-hidden">
        {/* background */}
        <img
          src="images/mantap.png"
          className="absolute inset-0 w-full object-cover scale-110 "
          style={{ height: "120%", top: "-10%" }}
          alt="background"
        />

        {/* dark overlay */}
        <div className="absolute inset-0 bg-black/50 z-10" />

        {/* poojari */}
        <div className="absolute bottom-0 z-20 h-4/5" style={{ right: "45%" }}>
          <img
            src="images/poojari.png"
            className="h-full object-contain object-bottom"
            alt="poojari"
          />
        </div>

        {/* couple */}
        <div
          className="absolute w-full h-full bottom-0 z-20 "
          style={{ left: "0%" }}
        >
          <img
            src="images/wedding-couple.png"
            className="h-full object-contain object-bottom"
            alt="couple"
          />
        </div>

        {/* text overlay — sits above everything */}
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-start pt-8 top-10 px-6 gap-2 pointer-events-none">
          {/* line 1 */}
          <p
            className="text-white text-xl font-bold tracking-widest opacity-0"
            style={{ fontFamily: "Emilys Candy, serif" }}
          >
            You are cordially invited to the
          </p>

          {/* line 2 */}
          <p
            className="text-white text-2xl font-bold tracking-widest opacity-0"
            style={{ fontFamily: "Emilys Candy, serif" }}
          >
            Engagement of
          </p>

          {/* name */}
          <h1
            className="text-yellow-500 text-5xl font-bold tracking-wide text-center opacity-0"
            style={{ fontFamily: "Beau Rivage, cursive" }}
          >
            Pavan & Anusha
          </h1>

          {/* date and location */}
          <div className="flex flex-col items-center gap-1 opacity-0 justify-center">
            <p
              className="text-white text-sm tracking-widest uppercase text-center"
              style={{ fontFamily: "Emilys Candy, serif" }}
            >
              28<sup>th</sup> June 2026, 10:00 AM Onwards <br />
              Venue - Subz, Jayanagar, Bengaluru
            </p>
          </div>

          {/* buttons */}
          <div className="flex gap-3 mt-4 pointer-events-auto opacity-0">
            <a
              href="YOUR_GOOGLE_FORMS_LINK"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2 bg-white/10 border border-white/30 text-white text-sm rounded-full backdrop-blur-sm hover:bg-white/20 transition flex flex-row"
            >
              <img
                width="20"
                height="20"
                src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-rsvp-event-management-flaticons-lineal-color-flat-icons-2.png"
                alt="external-rsvp-event-management-flaticons-lineal-color-flat-icons-2"
              />
              RSVP
            </a>
            <a
              href="https://maps.app.goo.gl/tGBFPnRxaxzuPFZr6"
              target="_blank"
              rel="noreferrer"
              className=" flex flex-row px-5 py-2 bg-white/10 border border-white/30 text-white text-sm rounded-full backdrop-blur-sm hover:bg-white/20 transition"
            >
              <img
                width="20"
                height="20"
                src="https://img.icons8.com/office/40/marker.png"
                alt="marker"
              />{" "}
              Location
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
