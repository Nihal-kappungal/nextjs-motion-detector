# Motion Detection

A fun project that detects when a user shakes their phone and triggers an on-screen toast notification. Built with Next.js, React, and the DeviceMotion API.

## What It Does

Shake your phone and a toast appears at the top of the screen. That's it. Simple, but it opens the door to some interesting possibilities.

## How It Works

1. The app detects if the user is on a mobile device
2. On iOS, it requests motion permission from the user
3. Listens to `devicemotion` events and calculates acceleration magnitude
4. When acceleration exceeds a threshold (with a 2-second cooldown), it triggers a toast

## Real-World Use Cases

While this is just a fun demo, shake detection can be practical in production websites:

- **E-commerce** — Shake to get a discount code or flash deal
- **Support** — Shake to open a help/feedback form
- **Navigation** — Shake to jump to a specific section
- **Accessibility** — Shake as an alternative input gesture
- **Gaming** — Shake to perform in-game actions
- **Social** — Shake to "wave" at nearby users or trigger a reaction
- **Randomization** — Shake to shuffle content, get a random item, or spin a wheel
- **Emergency** — Shake to trigger an SOS or alert feature

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- TypeScript
- DeviceMotion Web API

## Getting Started

```bash
# install dependencies
pnpm install

# run dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) on your phone and shake it.

## Project Structure

```
app/
  page.tsx              # Home page (black screen)
  layout.tsx            # Root layout
  globals.css           # Tailwind config + global styles

components/shake/
  useShakeDetection.ts  # Hook — motion listener, threshold, cooldown, iOS permission
  ShakeDetector.tsx     # Orchestrator — permission button, connects hook to toast
  ShakePopup.tsx        # Toast component — top-center notification
```

## Notes

- **iOS** requires a user gesture to request motion permission — a button appears for this
- **Android** enables motion detection directly, no permission needed
- **Desktop** — shake detection is disabled, nothing renders
- Shake threshold and cooldown can be tuned in `useShakeDetection.ts`
