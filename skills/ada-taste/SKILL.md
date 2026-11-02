---
name: ada-taste
description: Use when building, modifying, or reviewing user interfaces, layouts, CSS styles, or web applications. Enforces modern aesthetics, typography, color palettes, and zero placeholders.
---
# ada-taste (UI/UX Aesthetics & Design System)

<EXTREMELY-IMPORTANT>
Default LLM UI designs are unacceptable. Never produce generic blue/red buttons, plain white backgrounds, default browser fonts, or placeholder boxy layouts. Every user interface MUST wao the user with modern, premium aesthetics.
</EXTREMELY-IMPORTANT>

## Core Design Principles

1. **Rich & Modern Palette**:
   - Curated HSL/HEX color schemes tailored to the brand identity (e.g., deep dark modes `#0f172a`, vibrant accent glows `hsl(250, 84%, 67%)`).
   - Smooth gradients and subtle semi-transparent borders (`border: 1px solid rgba(255, 255, 255, 0.1)`).
2. **Typography Excellence**:
   - ALWAYS import modern Google Fonts (e.g., Inter, Roboto, Outfit, Plus Jakarta Sans) via CDN in HTML/CSS. Never rely on default system sans-serif.
   - Maintain clear type scale hierarchy (`h1`, `h2`, `h3`, `body`, `caption`) with proper `line-height` and `letter-spacing`.
3. **Dynamic Visual Effects**:
   - Glassmorphism: `backdrop-filter: blur(12px)` with translucent background cards.
   - Smooth micro-interactions: `:hover`, `:focus-visible`, and `:active` CSS transitions (`transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1)`).
4. **Advanced CSS & Layouts**:
   - Use CSS Grid and Flexbox for dynamic layouts. Utilize CSS container queries, `:has()`, `:user-valid`, and custom CSS properties (`--primary-color`).
5. **Zero Placeholders Rule**:
   - NEVER insert empty `<img>` tags or dummy `via.placeholder.com` URLs.
   - **MANDATORY**: Use the `generate_image` tool to produce high-quality, working image assets for UI mockups, logos, avatars, and hero banners.
6. **Antigravity Interactive Widgets (`generative_ui`)**:
   - When communicating UI concepts, mockups, or data visualizations to the user, render rich interactive widgets directly in chat using the `generative_ui` skill.
   - Save self-contained HTML artifacts (using Tailwind CSS `https://www.gstatic.com/antigravity/web/dev/tailwindcss.min.js` and host semantic CSS tokens like `var(--card)`, `var(--foreground)`, `var(--primary)`) with `write_to_file`.
   - Embed inline in chat responses via `<agent-embed src="file:///<artifact_path>/widget.html"></agent-embed>`.
7. **Modern Web Standards (`modern-web-guidance`)**:
   - Adhere strictly to the `modern-web-guidance` skill for all frontend code: native `<dialog>`, HTML Popover API, CSS container queries, CSS View Transitions, and Core Web Vitals (CWV).

## Red Flags (Anti-Rationalization)

| Thought | Reality |
|---|---|
| "This is just a functional prototype, plain CSS is fine" | Prototypes must wow at first glance. Apply the design system. |
| "I'll add custom fonts later" | Import Google Fonts upfront in `index.html` or `styles.css`. |
| "A generic blue button works" | Use curated HSL palette with hover state and shadow. |
| "I'll use placeholder images" | Use `generate_image` tool to create real visual assets. |
| "Static markdown table is enough for UI mockups" | Use `generative_ui` with `<agent-embed>` to render interactive live widgets. |

## Checklist for UI Verification

- [ ] Modern Google Font imported and applied globally.
- [ ] Curated color variables defined in `:root`.
- [ ] Hover/focus states present on all interactive elements (`button`, `a`, `input`).
- [ ] Glassmorphism or elevated card shadows applied to containers.
- [ ] Contrast ratio meets WCAG 2.2 AA (minimum 4.5:1 for normal text).
- [ ] All image tags point to generated image assets or valid assets (zero placeholders).
- [ ] Modern web standards checked via `modern-web-guidance` (popovers, native dialogs, container queries).
- [ ] Rich chat UI rendered via `generative_ui` (`<agent-embed>`) when presenting interactive mockups.


