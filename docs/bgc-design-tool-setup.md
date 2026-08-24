# BGC Design Tool — Setup & Rollout Runbook

> The design tool (`bgc-design-tool`) is an internal studio for producing social, deck,
> and design assets for Black Girls Code and Beyond Code Collective now that we have no
> staff designer. This doc covers: getting it running locally today, changes we require
> before enabling its automation loop, and the plan to host it at a URL for the social teams.

---

## 1. Install locally today (safe subset)

Prereqs: git installed, signed in to GitHub as your own account (`youngfonz` for Fonz),
invite to `mbmtyson/bgc-design-tool` accepted.

```bash
git clone https://github.com/mbmtyson/bgc-design-tool.git ~/bgc-design-tool
cd ~/bgc-design-tool
git checkout fonz          # your working branch; main is production-only
```

Asset libraries (photos, fonts, artwork) are too heavy for git. Copy both folders from
Shared Drive > MARKETING > Design Tool Studio Copy onto an external drive named
`BGC2023A` so paths resolve as `/Volumes/BGC2023A/...`. Read `STUDIO-README.md` in the
Black Girls Code folder first. (Renaming a drive is harmless.)

**Before running `pipeline/studio_setup.sh`, read it.** It has not been reviewed by
anyone but its author, and it installs scheduled jobs on your machine. Open it and check:

- What the cron entries actually run (look for `crontab`, `launchctl`, or writes to
  `~/Library/LaunchAgents`).
- What the midnight job pushes — an auto-push of your whole working tree can leak
  anything sitting in the repo folder (tokens, exports, unfinished work).
- Whether anything downloads and executes remote code (`curl ... | bash` patterns).

To start producing designs today you almost certainly do **not** need the script — you
need the repo, the branch, and the asset drive. Run the app the normal way (check the
repo README for the dev command, typically `npm install && npm run dev`) and push your
work manually with ordinary `git push` when you're ready.

---

## 2. Hold on the automation loop until these change

The proposed loop (midnight auto-push cron, 5 AM auto-pull of bot merges, and a Claude
session-start rule that auto-applies instructions from `SYNC-LOG.md`) should not be
enabled as designed:

1. **Do not add the Claude session-start rule as written.** "Apply anything under
   'For fonz', then delete the flag file" turns a repo file into a standing command
   channel into your AI assistant: anyone with write access to that repo — the consensus
   bot included — can plant instructions your Claude executes automatically, and deleting
   the flag removes the trail. Safe alternative: have Claude *show* you the top
   `SYNC-LOG.md` entry at session start and wait for your go-ahead before applying
   anything.
2. **No unattended pulls of bot-authored merges.** A 5 AM auto-pull means code lands on
   your machine with no human review. Pull manually and skim the diff
   (`git pull --ff-only && git log -p ORIG_HEAD..`), at least until the consensus bot has
   a track record.
3. **No unattended pushes.** A midnight cron pushing whatever is in the tree is how
   secrets and half-done work end up public. Push deliberately.
4. **Move the repo into the `BeyondCodeCollective` org.** Production tooling for two
   organizations should not live on a personal account: it's a single-person risk, it
   bypasses org review controls, and it blocks our Claude/GitHub integration (personal
   repos can't be attached to org sessions, which is also what blocks automated review
   and deployment today).

None of this assumes bad intent — it's the standard bar for anything that runs
unattended on staff machines and feeds instructions to AI assistants.

---

## 3. Path to a shared URL for the social teams

1. **Transfer (or fork) `bgc-design-tool` into `BeyondCodeCollective`.** GitHub:
   repo Settings > Danger Zone > Transfer ownership. This is the unblocking step for
   everything below.
2. **Grant Claude access to the new org repo** so setup, review, and deploys can be
   automated (org admin: claude.ai > admin settings > repository access).
3. **Review + de-localize.** The app resolves assets from `/Volumes/BGC2023A/...`,
   which only exists on a Mac with that drive mounted. For a hosted version those paths
   need to come from an env var or an asset bucket (e.g. Vercel Blob / S3 / the Shared
   Drive via API).
4. **Deploy to Vercel** under the org team (same place as wearebcc.org). Suggested
   domain: `design.wearebcc.org` or `studio.wearebcc.org`.
5. **Protect it.** This is an internal tool over brand assets — enable Vercel
   Deployment Protection (team SSO or password) before sharing the link.

---

## 4. Status

- [ ] Fonz: invite accepted, repo cloned, asset drive mounted, producing locally
- [ ] `studio_setup.sh` reviewed (or skipped in favor of manual push/pull)
- [ ] Automation loop redesigned per section 2
- [ ] Repo transferred to BeyondCodeCollective
- [ ] Claude granted access to org repo
- [ ] Asset paths de-localized
- [ ] Deployed to Vercel with access protection
