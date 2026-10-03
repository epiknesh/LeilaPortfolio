# Decisions Needed From Owner

Running list, most recent first. Checked items were resolved; unchecked items are still open. This file is bundled up for review whenever the owner returns — nothing here blocks continued unattended work, since a reasonable default is always chosen and recorded, but these are the calls worth a human double-check.

---

## OPEN

### 7. GitHub OAuth App registered, but Leila needs her own GitHub account + collaborator access
**Where:** `/admin` (Sveltia CMS), GitHub repo settings.
**What's happening:** a GitHub OAuth App ("Leila Portfolio") is registered, pointed at the live Netlify URL with callback `https://api.netlify.com/auth/done`, so `/admin` can authenticate via "Sign In with GitHub." That login proves identity but does not by itself grant edit access — GitHub's own collaborator permissions on the repo gate whether a signed-in user can actually read/write content through the CMS.
**What I need from you:** have Leila create her own free GitHub account (not share yours), then add her as a collaborator at `github.com/epiknesh/LeilaPortfolio/settings/access` → Add people. She accepts the emailed invite, then signs into `/admin` with her own GitHub login.
**Separately flagged, deferred by owner:** the repo is currently public (anyone can view code/content on GitHub, though write access stays collaborator-gated). Owner wants to think about public vs. private separately — not blocking.

### 6. Homepage "about [me]" / "software" / "information" assets pending from Leila
**Where:** homepage, top of the About intro section (`src/pages/index.astro`).
**What's happening:** per direct instruction, the hand-script "about [me]" heading and "software" / "information" sub-labels are now placeholder boxes (dashed border, bracketed placeholder text) instead of live text — Leila is making a real logo (replaces "about [me]") and a typescript/wordmark treatment of her name (replaces "software" / "information").
**What I need from you:** once those two image files exist, swap the two placeholder elements in `index.astro` for real `<img>` tags. Flagging dimensions aren't finalized either — the placeholder boxes are sized roughly (120px / 72px min-height) to approximate where the real assets will sit, but that's a guess, not a spec from Leila.

---

## OPEN

### 1. UP Arki 2026 yearbook spread — real classmates' personal info
**Where:** Portfolio PDF page 16, bottom two rows (individual student spreads for "Pol", "Eri", "Kity", "Vince" — includes names, photos, and what appears to be birthdate/personal fields).
**Issue:** These are identifiable third parties (Leila's classmates) who consented to appear in a print yearbook, not necessarily a public website. Publishing their names/photos/personal info on leilabanta.com without confirmed consent is a privacy risk to them, and a reputational risk to Leila if someone objects.
**Default action taken:** Only using the yearbook **cover** and the **"What is Class 2026 Made Of" infographic spread** (no identifiable individuals) for the website's UP Arki 2026 case study. Individual student bio spreads are excluded from the site by default.
**Follow-up catch:** during an image-quality review pass, found that the originally-curated cover mockup crop (`up-arki-yearbook/cover-and-open-spread-mockup.png`) still showed a sliver of an *open* spread in the background — first a partially legible bio card, then on closer inspection a fully readable individual's name, photo, and personal facts ("LEANDRO dar juan," hometown, birthday, etc.) that the original crop bounds had cut close to but not fully excluded. Re-cropped from the original source page to show only the closed book cover with no part of any open spread visible. Worth noting as a reminder to double-check crop bounds carefully on any future privacy-sensitive image, not just judge by the intended subject.
**What I need from you:** Confirm this is the right call, or confirm Leila has consent from those classmates to publish their spreads, in which case I can include them.

### 2. Portraiture project — identifiable real people
**Where:** Portfolio PDF pages 21–22 ("Exploration with Portraiture," "Ruin and Reverie").
**Issue:** Real models/friends are clearly identifiable. Standard practice for a photography-inclusive design portfolio (unlike case #1, this isn't a privacy overreach by default), but worth a confirmation since it's going from a PDF she controls distribution of to a public, indexable website.
**Default action taken:** Included as-is, treated the same as any other case study — this is normal portfolio practice.
**What I need from you:** Just a sanity check — let me know if Leila wants these two projects held back or treated differently.

### 3. Final production typography
**Where:** Site-wide.
**Issue:** The approved design proposal used Playfair Display / Jost / IBM Plex Mono as Google Fonts stand-ins to pitch the *direction* (stamp serif / body sans / mono caption). The PDF's actual "PORTFOLIO" wordmark and "about [me]" script are hand-worked, not set in an existing font — no Google Font will match them exactly.
**Default action taken:** Proceeding with a closer-matching Google Fonts selection for production (documented in PROJECT_CONTEXT.md §7 as decided), and treating the "PORTFOLIO" stamp wordmark itself as a locked image/vector asset traced from the original PDF art rather than trying to recreate it in a live font — this preserves exact fidelity for the one piece of type that most needs it.
**What I need from you:** Nothing blocking — flagging in case you'd rather commission/license a closer hand-lettered typeface later.

---

## RESOLVED

### C: drive critically full
Was a blocking, machine-wide issue (hit 0 bytes free once). As of 2026-10-02, holding ~3GB free — enough headroom to work normally, though `rm -rf dist` after a local build remains good practice. See PROJECT_CONTEXT.md §14.

### No git repository initialized
Resolved 2026-10-02: `git init`'d, curated images/PDFs copied for real into the repo (junctions removed), pushed to `github.com/epiknesh/LeilaPortfolio`, connected to Netlify for auto-deploy-on-push. See PROJECT_CONTEXT.md §11l.

### Contact form needed a real Formspree account to work
Resolved 2026-10-03: owner created a Formspree account and form; real form ID (`mnpnealz`) dropped into `ContactForm.astro`, replacing the placeholder. Submissions now deliver for real.
