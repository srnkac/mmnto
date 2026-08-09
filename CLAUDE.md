# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A static site (no build system, no package manager, no tests) deployed via GitHub Pages to the custom domain `dashshare.mmnto.sk` (see `CNAME`). There is no server-side code — every page is plain HTML/CSS/JS served as-is. Repo name on GitHub is `dash-share`. This repo holds only the link-dashboard site; the separate "Memento" business site (`mmnto.sk` / `www.mmnto.sk`) lives in its own repo — see "Hosting limitations" below for why.

## Working with this repo

- There is no build/lint/test tooling. To preview a page, open the `.html` file directly in a browser or serve the directory with any static file server (e.g. `python3 -m http.server`).
- Each top-level `.html` file is an independent, self-contained artifact — most bundle their CSS in a `<style>` block and have no JS dependencies. Changes to one page never require touching another.
- `index.html` is the site's landing page: a manually maintained directory of links grouped into sections (Briefings, Cycling, Weekly Value Screens, ...). When adding a new standalone page to the repo, also add a corresponding `<li><a href="...">` entry to the matching section in `index.html` (or create a new `<section>` if it doesn't fit an existing category).
- Bilingual pages (e.g. the `drugs-worldwide-briefing*.html` pair) are shipped as two separate physical files — one per language — rather than one file with runtime language switching. Follow that pattern for new bilingual content unless told otherwise.

## Hosting limitations (GitHub Pages)

This site is hosted on GitHub Pages, which constrains what's possible without adding infrastructure outside this repo:

- **One custom domain per repo.** A GitHub Pages site is bound to exactly one domain via its `CNAME` file. There is no host-header-based routing — the same repo cannot serve different content for different hostnames (e.g. an apex domain vs. a subdomain pointing at different pages). Multiple logical sites under the same parent domain (like `mmnto.sk` and `dashshare.mmnto.sk`) require separate repos, each with GitHub Pages enabled and its own `CNAME`. That's why the Memento business site (formerly the `mmnto_*` files here) was moved out to its own repo with `CNAME` = `mmnto.sk`, while this repo keeps `CNAME` = `dashshare.mmnto.sk`.
- **No server-side logic.** No redirects, headers, auth, A/B testing, or API routes beyond what GitHub Pages' static file serving and Jekyll (if ever enabled) provide. Anything requiring server logic needs an external service (e.g. a Cloudflare Worker, a separate backend) — not achievable purely by editing files in this repo.
- **DNS is out of scope.** Making a domain/subdomain actually resolve to a Pages site requires DNS records at the registrar (apex → GitHub's IPs or ALIAS/ANAME, subdomains → `<user>.github.io` via CNAME) plus enabling/verifying the custom domain in that repo's GitHub Pages settings. Editing files in this repo cannot change DNS or GitHub repo settings.
- **www vs. apex.** GitHub Pages auto-redirects between an apex domain and its `www` counterpart once the apex is set as the custom domain — a separate `CNAME` entry for `www` is not needed or supported alongside the apex one in the same repo.
