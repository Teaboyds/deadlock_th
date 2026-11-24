# 05: Search, cheat filter and copy

**What to build:** On the Commands page a reader can:

- type in one search box to find commands by English name or by Thai words in the translation
- narrow the list with a three-state cheat filter
- copy any command exactly with one click

See the spec's "Interactive behaviour" decision.

**Blocked by:** 01

**Status:** done

- [x] One search box matches the command name and the Thai translation, case-insensitively
- [x] A cheat filter with three states: all / cheat only / no cheats
- [x] Search and filter combine; command groups with no matching cards are hidden
- [x] When nothing matches, a Thai empty-state message is shown
- [x] Every copy button copies the exact command text and gives brief visual feedback
- [x] The page still renders the full list with JavaScript disabled (search and filter enhance a static list)
- [x] Playwright tests cover: search by English name, search by a Thai word, no-match empty state with hidden groups, each filter state, search + filter combined, and clipboard content after copy
