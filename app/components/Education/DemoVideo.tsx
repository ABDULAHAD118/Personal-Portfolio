'use client';
import { useEffect, useRef, useState } from 'react';
import {
    Maximize,
    Minimize,
    Pause,
    Play,
    Volume2,
    VolumeX,
} from 'lucide-react';

const SPEEDS = [1, 1.5, 2];

const clock = (s: number) =>
    `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

// Portrait app recording in a phone frame, with our own controls instead of the browser's.
export default function DemoVideo({
    src,
    poster,
}: {
    src: string;
    poster: string;
}) {
    const video = useRef<HTMLVideoElement>(null);
    const frame = useRef<HTMLDivElement>(null);
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const [time, setTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [full, setFull] = useState(false);
    const [speed, setSpeed] = useState(1);

    // Also catches Esc, so the icon stays in sync however full screen ends.
    useEffect(() => {
        const sync = () =>
            setFull(document.fullscreenElement === frame.current);
        document.addEventListener('fullscreenchange', sync);
        return () => document.removeEventListener('fullscreenchange', sync);
    }, []);

    const toggle = () => {
        const v = video.current;
        if (!v) return;
        if (v.paused) v.play();
        else v.pause();
    };
    const fullscreen = () => {
        const v = video.current as
            (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
        if (document.fullscreenElement) document.exitFullscreen();
        // iOS Safari only allows fullscreen on the video element itself.
        else if (frame.current?.requestFullscreen)
            frame.current.requestFullscreen();
        else v?.webkitEnterFullscreen?.();
    };

    return (
        <div
            ref={frame}
            className="group border-line bg-panel fullscreen:rounded-none fullscreen:border-0 fullscreen:bg-black fullscreen:p-0 relative rounded-[2.25rem] border p-2 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)]"
        >
            <video
                ref={video}
                src={src}
                poster={poster}
                playsInline
                preload="none"
                onClick={toggle}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onEnded={() => setPlaying(false)}
                onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
                className="aspect-[9/20] w-full cursor-pointer rounded-[1.75rem] bg-black object-cover group-[:fullscreen]:h-full group-[:fullscreen]:rounded-none group-[:fullscreen]:object-contain"
            >
                Your browser can&apos;t play this video.
            </video>

            {/* Big play button while paused */}
            {!playing && (
                <button
                    type="button"
                    onClick={toggle}
                    aria-label="Play demo video"
                    className="bg-accent text-on-accent absolute inset-0 m-auto grid size-16 cursor-pointer place-items-center rounded-full shadow-[0_10px_30px_-8px_rgb(0_0_0/0.6)] transition-transform hover:scale-105 active:scale-95"
                >
                    <Play className="ml-1 size-7 fill-current" aria-hidden />
                </button>
            )}

            {/* Control bar: seek bar on its own row, buttons below. Stays visible while paused, fades in on hover or focus while playing */}
            <div
                className={`absolute inset-x-3 bottom-3 flex flex-wrap items-center gap-x-1 gap-y-1.5 rounded-xl bg-black/70 px-2 pt-3 pb-1.5 text-white backdrop-blur-md transition-opacity duration-300 ${
                    playing
                        ? 'opacity-0 group-hover:opacity-100 focus-within:opacity-100'
                        : 'opacity-100'
                }`}
            >
                <button
                    type="button"
                    onClick={toggle}
                    aria-label={playing ? 'Pause' : 'Play'}
                    className="grid size-7 shrink-0 cursor-pointer place-items-center rounded-md hover:bg-white/15"
                >
                    {playing ? (
                        <Pause className="size-4 fill-current" aria-hidden />
                    ) : (
                        <Play className="size-4 fill-current" aria-hidden />
                    )}
                </button>
                <input
                    type="range"
                    min={0}
                    max={duration || 0}
                    step={0.1}
                    value={time}
                    onChange={(e) => {
                        if (video.current)
                            video.current.currentTime = Number(e.target.value);
                    }}
                    aria-label="Seek"
                    aria-valuetext={`${clock(time)} of ${clock(duration)}`}
                    style={
                        {
                            '--fill': `${duration ? (time / duration) * 100 : 0}%`,
                        } as React.CSSProperties
                    }
                    className="order-first mx-1 h-1 basis-full cursor-pointer appearance-none rounded-full bg-[linear-gradient(to_right,var(--color-accent)_var(--fill),rgb(255_255_255/0.25)_var(--fill))] [&::-moz-range-thumb]:size-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white [&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                />
                <span className="mr-auto shrink-0 pl-1 font-mono text-[0.6875rem] tabular-nums">
                    {clock(time)}
                    {duration > 0 && ` / ${clock(duration)}`}
                </span>
                <button
                    type="button"
                    onClick={() => {
                        const next =
                            SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length];
                        if (video.current) video.current.playbackRate = next;
                        setSpeed(next);
                    }}
                    aria-label={`Playback speed ${speed}x`}
                    className="h-7 shrink-0 cursor-pointer rounded-md px-1.5 font-mono text-[0.6875rem] tabular-nums hover:bg-white/15"
                >
                    {speed}x
                </button>
                <button
                    type="button"
                    onClick={() => {
                        if (!video.current) return;
                        video.current.muted = !muted;
                        setMuted(!muted);
                    }}
                    aria-label={muted ? 'Unmute' : 'Mute'}
                    className="grid size-7 shrink-0 cursor-pointer place-items-center rounded-md hover:bg-white/15"
                >
                    {muted ? (
                        <VolumeX className="size-4" aria-hidden />
                    ) : (
                        <Volume2 className="size-4" aria-hidden />
                    )}
                </button>
                <button
                    type="button"
                    onClick={fullscreen}
                    aria-label={full ? 'Exit full screen' : 'Full screen'}
                    className="grid size-7 shrink-0 cursor-pointer place-items-center rounded-md hover:bg-white/15"
                >
                    {full ? (
                        <Minimize className="size-4" aria-hidden />
                    ) : (
                        <Maximize className="size-4" aria-hidden />
                    )}
                </button>
            </div>
        </div>
    );
}
