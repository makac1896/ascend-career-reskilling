# Waypoint — Screen Product Specs
## For UI mockup and user testing, week of March 10–18 2026

---

## Screen Inventory

| # | Screen | New build | Key design constraint |
|---|---|---|---|
| 1 | Landing | Yes | No branding, no platform language, one button |
| 2 | Preparation Room | Yes | Document feels like a real artifact, questions feel like prep |
| 3 | Simulation | Yes | No timer, no rounds, nudges are ignorable |
| 4 | Transition | Yes | Slow, dark, anticipatory — no evaluation language |
| 5 | Post-Simulation | Yes | Single scrollable page, three layers, Waypoint appears here first |
| — | Journal Overlay | Yes | Full-screen, distraction-free, triggered by emotion not navigation |
| 7 | Dashboard | Yes (time-skip state) | Shows growth over 3 simulations, not a first-use state |

---

## Screen 1 — The Landing

**Purpose:** Pull the user into a situation before they know what Waypoint is. Zero friction, zero explanation.

### Layout
Full-screen. Single centered card on a muted background (soft dark gradient or blurred workspace photo). No navigation bar. No logo. No sidebar. Nothing except the card.

### The Card
- **Dimensions:** ~560px wide, vertically centered on screen
- **Background:** White or very light neutral, subtle shadow
- **No header label.** The card speaks directly.

**Card copy (exact):**
> You've just joined a small nonprofit team. They used AI to write their annual community report — the one that goes to funders and community partners.
>
> Something doesn't feel right. The team is meeting now to figure out what to do.
>
> They asked for a fresh perspective. **You're it.**

- **Below the copy:** One line in a lighter weight — *"This takes about 5 minutes."*
- **One button:** `Join the call` — full width of the card, high contrast, primary color

### What is absent (intentional)
- No Waypoint logo or branding
- No "sign up" or "log in"
- No navigation
- No "learn more"
- No description of what the platform does
- No "simulation" language

**Waypoint branding appears for the first time on Screen 5 (post-simulation).** The reveal that this was a career development experience is part of the transformation.

### States
- **Default:** Card centered, button enabled
- **Hover on button:** Subtle lift/color shift
- **No loading state** — click goes immediately to Screen 2

### Design constraint
The card must feel like a notification that has taken over the screen — urgent, specific, personal. Not a product page. Not a landing page. A moment.

---

## Screen 2 — The Preparation Room

**Purpose:** Give the student the same information a real team member would have before a meeting. Establish a behavioral baseline. Make the AI excerpt feel like a real artifact to review, not a text block on a screen.

### Layout
Centered, single-column, max-width ~640px. Clean background matching Screen 1 (continuity of feel). No navigation bar yet. A subtle "preparing your session..." indicator at the top fades out after 1 second — the visual metaphor of a video call loading.

### Section 1 — The Context Card
A card at the top with a slightly warm background tint (off-white, not clinical white).

**Header label (small, muted):** *The situation*

**Body copy:**
> The nonprofit runs programs for Indigenous youth in the community. Their annual report goes to funders, government partners, and the community itself.
>
> Dev, the communications coordinator, used an AI tool to generate a draft. Kira, the program director, thinks the draft is missing something important. They disagree.
>
> You're the newest team member. They want your take before the call.

### Section 2 — The Document Preview
Displayed as a real document — not a quoted paragraph. Give it visual weight:
- White card with a thin border and subtle shadow
- **Document header:** Small nonprofit letterhead-style label — *"Draft — Annual Community Impact Report 2025"* in a slightly formal font
- **Sticky note / annotation element** on the right edge of the document: *"Kira flagged this. Read it before the call."* — informal, handwritten-style font, soft yellow background
- **Document body (the AI excerpt):**

> *"The organization delivered programming to 847 youth participants across 12 community-based initiatives during the 2025 fiscal year. Engagement metrics improved by 23% year-over-year, reflecting strengthened outreach capacity and increased program retention rates. Strategic partnerships with four regional stakeholders enabled expanded service delivery and resource optimization across target demographics."*

No instruction to "evaluate" it. No question. Just a document with a flag.

### Section 3 — Two Baseline Questions
**Label (small, muted):** *Before you join the call —*

Two questions displayed as pill-style selectors. Casual. Fast. Not a survey.

**Question 1:**
> What kind of work sounds most like you right now?

Options (pill buttons, single-select):
- Writing, storytelling, and understanding people
- Solving problems and working with data
- Organizing, planning, and keeping things moving
- I'm still figuring that out

**Question 2:**
> When you disagree with someone in a group, you usually...

Options (pill buttons, single-select):
- Say it directly
- Find a careful way to bring it up
- Keep it to myself unless asked
- Depends on the situation

### CTA
**Button:** `Ready to join` — enabled only after both questions answered. Full width of content column.

### States
- Questions unanswered: button disabled, muted styling
- One question answered: button still disabled
- Both answered: button activates with a subtle transition
- Button clicked: brief loading state (*"Connecting you to the team..."*), then Screen 3

### Design constraints
- No "submit" or "next" language on the button — "Ready to join" keeps the workplace metaphor alive
- Questions must feel like preparation, not assessment. The word "assessment" never appears.
- The annotation on the document should feel informal — it's Kira's note, not a system prompt

---

## Screen 3 — The Simulation

**Purpose:** A live, open conversation between the student and two AI agents. No visible structure. No rounds. No timer. The student types or speaks freely.

### Layout
Two-panel layout:

**Left panel (~65% width) — The Conversation**
- Chat-style interface. Messages from Kira and Dev appear as bubbles.
- Each bubble has: small circular avatar, name, role tag in muted text below the name (*"Program Director"*, *"Communications Coordinator"*)
- Kira and Dev have visually distinct bubble colors — one warm, one cool. Both low-contrast enough to feel like a real workplace tool, not a colorful app.
- **Student input area at the bottom:** text field + small microphone icon. Subtle label: *"Type or speak your response"*
- Enter submits. A send icon appears on typing for clarity.

**Right panel (~35% width) — The Reference Document**
- The AI excerpt from Screen 2, formatted identically as a mini document preview
- Stays visible throughout the entire conversation — she can glance at it like a real meeting with a document open
- Below the excerpt: small presence indicator — three dots with names (Kira ●, Dev ●, You ●) with subtle "online" status styling

### What is absent (intentional)
- No timer
- No progress bar
- No "Round 1 of 3" or any round indicator
- No score display
- No instruction text during the conversation

### The Silent Nudge System
Waypoint's voice — the only moments the platform speaks directly to the student during the simulation. Maximum 2–3 nudges across the whole conversation.

**Trigger conditions:**
- Long pause before responding (>8 seconds after an agent message)
- Student has just disagreed with Dev
- Kira's closing question has just been sent

**Visual design:** A small card that appears at the very bottom of the left panel, above the text input area and clearly separated from the conversation bubbles. Soft tint (very light blue or warm white), no border, gentle fade-in/fade-out animation (~6 second lifespan). Text is small, low-weight, unhurried.

**Nudge copy examples:**
- *"You paused before responding. That's okay — take your time."*
- *"You just disagreed with Dev. Notice how that felt."*
- *"Kira asked you a big question. There's no right answer."*

Nudges never tell the student what to say. They only draw attention to her own experience.

**Design constraint:** Must be ignorable. If the student is in the flow of typing, the nudge must not interrupt. It fades automatically after ~6 seconds.

### Conversation end state
When Kira closes the conversation naturally, the chat input disables, the last message fades slightly, and a 1.5–2 second pause precedes the transition to Screen 4. No "session ended" banner.

---

## Screen 4 — The Transition

**Purpose:** Create a beat of anticipation between the simulation and the reflection. Let the emotional residue settle. Signal that something has been observed.

### Layout
Full-screen. Minimal. Dark or deeply muted background — a deliberate tonal shift from the conversation screen. Content centered vertically and horizontally.

### Content
Two lines of text, centered, generous line spacing:

> **Simulation complete.**
> Kira and Dev have sent you follow-up messages based on your conversation.

After a 1.5 second delay (not immediate):

**Button:** `Open your messages`

### What is absent
- No score
- No "great job" or evaluative language of any kind
- No loading spinner (this screen absorbs processing time gracefully)
- No Waypoint logo — hold it one more beat

### Animation
Text lines fade in sequentially — first line, then second, then button. Slow. This is the only moment in the flow that deliberately slows down.

---

## Screen 5 — The Post-Simulation Screen

**Purpose:** The reveal. Everything the simulation produced, in one integrated experience. Three layers, one scrollable page.

This is also the **first screen where the Waypoint wordmark appears** — top left, small, understated. The student learns what this was.

### Layout
Single scrollable page, max-width ~700px, centered. Three layers flowing vertically. No tabs, no separate navigation between layers.

---

### Layer 1 — The Feedback

**Section header (small, muted):** *From the team*

Two message cards, stacked. Each card:
- Avatar + name + role tag (visual continuity from simulation)
- Message rendered as natural prose — not formatted with bullet points or section labels
- **Structure inside the prose:** specific observation → reframe → growth edge (invisible to the student as structure)
- **At the bottom of each message card:** one resource card + one journal trigger

**Resource card (embedded in the message):**
- Small card, slightly inset
- **Label (tiny, muted):** *Recommended for you based on this conversation*
- Workshop/event name in medium weight
- Date + time in one line
- One-line explanation tied to a specific simulation moment: e.g. *"You showed strong critical reading but held back under pressure. This session practices leading with your insight."*
- CTA: `See details` or `Add to calendar`

**Journal trigger (below resource card):**
- Not a button — an ambient prompt
- *"Want to sit with that for a moment?"* in light, unhurried type
- Thin underline or soft highlight makes it tappable
- Tapping opens the Journal Overlay

---

### Layer 2 — What Showed Up
*(product name — do not use "Signal Map" in the UI)*

**Section header:** *What showed up*

**Subheader (tiny, muted):** *Based on what you said and did — not a quiz. These evolve as you complete more simulations.*

**Strengths demonstrated:**
Each item is a small card:
- Label in medium weight (e.g. *Critical Reading*)
- One-line evidence statement in lighter weight — verbatim or near-verbatim from the conversation (e.g. *"You identified the gap between the report's language and the community it represents — before anyone prompted you to."*)
- Small icon or color indicator

**Growth edges:**
Same card format, slightly warmer/softer background tone — signals "opportunity", not "failure":
- Label (e.g. *Assertiveness Under Pressure*)
- One-line evidence statement (e.g. *"You softened your position when Dev pushed back. Your original point was stronger."*)

**Design constraint:** No numbers. No percentages. No pass/fail. No green/red scoring colors.

---

### Layer 3 — The Way

**Section header:** *The Way*

**Subheader (tiny, muted):** *Three things. Based on what you just did.*

Three cards only. Each has an icon.

**1 — One thing to do this week**
Icon: calendar or arrow-forward

The resource embedded as an action (not a separate list):
> *"Attend 'Navigating Conflict in Teams' — Friday at 2 PM. You held back when Dev challenged you. This session practices exactly that."*

**2 — One thing to reflect on**
Icon: pencil or thought-bubble

The single most resonant journal prompt as a standalone card:
> *"Kira noticed you knew the answer before you said it. Think about where else in your life you wait for permission to speak."*

Tapping opens the Journal Overlay.

**3 — One thing to try next**
Icon: play or next-arrow

> *"Ready to test yourself in a different scenario? This one puts you in a team disagreement about project direction."*

Button: `Start next scenario`

---

### Design constraints for Screen 5
- All three layers visible on one scrollable page — no tabs
- Waypoint wordmark top-left, appearing for the first time
- Tone shift from urgent/immersive (Screens 1–4) to reflective/warm
- Section headers (*"From the team"*, *"What showed up"*, *"The Way"*) are natural language, not UI chrome labels

---

## Journal Overlay

**Purpose:** A moment, not a feature. Triggered by emotion, not navigation.

### Trigger
- Tapping *"Want to sit with that for a moment?"* on any feedback message in Layer 1
- Tapping the reflection card in The Way (Layer 3)

### Layout
Full-screen overlay. The rest of Screen 5 blurs behind it but doesn't disappear. Tapping the blurred area dismisses.

### Content
- **Top of overlay:** The prompt that triggered it, in medium weight
  e.g. *"Kira noticed you knew the answer before you said it. Think about where else in your life you wait for permission to speak."*
- **Below:** Clean, distraction-free text area — no formatting options, no word count, no toolbar
- **Placeholder text:** *"Start typing — or just sit here for a minute."*

### Behavior
- Auto-saved to the student's Waypoint profile
- If closed without writing: prompt saved as a pending reflection accessible from the dashboard
- Timestamp + simulation reference stored invisibly — student sees only the prompt and their own words

### What is absent
- No submit button (auto-save)
- No word count
- No formatting toolbar
- No AI suggestions inside the journal — this space is entirely the student's

---

## Screen 7 — The Dashboard (Time-Skip State)

**Purpose:** Shown as a single slide during the presentation with the verbal framing *"Two months later, after three simulations."* Demonstrates longitudinal value — the portrait getting richer over time.

### Layout
Standard dashboard: sidebar navigation + main content area.

### Sidebar
- Waypoint wordmark
- Navigation: Home, Simulations, What Showed Up, Journal, Resources
- At the bottom: *"Next up: Team Disagreement →"*

### Main content — time-skip state (3 simulations completed)

**Profile card (top left):**
Name, year, program. Below the name: demonstrated strength tags — *not* self-reported. Small pills pulled from simulation history: e.g. *Critical Reading*, *Constructive Problem-Solving*

**What Showed Up — compact view (center):**
Two columns: Strengths / Growth Edges. Each item shows:
- Which simulation it first appeared in
- Whether it has shifted — e.g. *Assertiveness Under Pressure* was a growth edge in Sim 1, now marked as a strength in Sim 3 with a small upward indicator
- *Speed of Conviction* still a growth edge (consistent across 2 simulations)

**Journal (right column):**
2–3 entry previews showing first line of what was written + which simulation triggered it. Link: *"See all reflections →"*

**The Way — updated:**
Current three-action card reflecting the most recent simulation's growth edges.

**Upcoming events (bottom):**
2–3 events filtered by current growth edges. Each with the one-line simulation-based reason.

### Design constraint
This screen answers *"What keeps students coming back?"* without requiring a verbal explanation. The time-skip framing is spoken while this is on screen — it is not written anywhere on the slide.
