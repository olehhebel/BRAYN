# BRAYN v0.15 — Mobile Prototype

## Local Launch
Open `v0.15/index.html` directly in your browser, or serve with:
```
npx serve v0.15
```

From repository root you can also run:
```
python3 -m http.server 4173 --directory v0.15
```

## GitHub Pages
https://olehhebel.github.io/BRAYN/v0.15/

## Mobile Testing
Scan QR or open the URL in mobile Safari/Chrome.
Add to Home Screen for full-screen experience.

## Debug Panel
On desktop (≥768px), a debug route panel appears on the right.
On mobile, triple-tap the BRAYN logo to show/hide it.

## Screens (34 total)
1. splash → 2. signup → 3. faceId → 4. introVideo
→ 5. transition1 → 6. nameInput → 7. transition2
→ 8. whoAreYou → 9. transition3 → 10. whatWant
→ 11. transition4 → 12. timeWheel → 13. notificationPermission
→ 14. resourceSuccess → 15. resourceEducation → 16. firstProofTrophy
→ 17. aiPathGeneration

**Branch A (Kayra/Orra/Maverick):**
→ 18A. learningContract → 19A. coachVideo → 20A. knowledgeCheck
→ 21A. resourceSuccessRepeat → 22A. tokenReward

**Branch B (Senzor):**
→ 18B. senzorIntro → 19B. identityInfographic → 20B. senzorContract
→ (knowledgeCheck, resourceSuccessRepeat, tokenReward shared)

**Shared conclusion:**
→ 23. brainIdAchievements → 24. calibrationIntro
→ 25A. micPermission OR 25B. textCalibration
→ 26. avatarUpload → 27. finalGeneration → 28. expandedContract
→ 29. galaxyRoom → 30. aiHubTip

## Coach Routing Logic
- Maverick (orange): `whoAreYou=building` OR `whatWant=ideas`
- Orra (cyan): `whatWant=communicate`
- Kayra (green): career-focused choices
- Senzor (pink): default / uncertainty
