---
title: Lessons learned
date: 2024-12-06
---

Overall, i learnt massively by building this cookbook manager app. I can code with much less errors and build apps faster now.

## Typos can make you miserable
Checking for typos and incorrect values first and questioning implementation logic later will save you many troubles

## Error handling early on will make you happy
`try .. catch`, standardized `response.json` objects, and checking if the values are _actually_ there and not `null` or `undefined`.. all these, if implemented early on and not as an afterthought, will save countless hours of troubleshooting

## Do not add complexity when not needed
Doing so wasted hours of my life because I added another language (TypeScript), added bleeding edge npm packages (Tailwind v4 beta), added a build tool (Vite) to work with those npm package, used multiple CLIs to manage real-time updates and hot reloads (`tsc`, `tailwind`, `parcel`, `vite`) and more..

In the end, i made do with two npm commands in two terminal windows. But getting there took lots of implementation pain and trials.

## Clarity comes from saying no
The original scope of the app i had in mind was three times the scope of the hours required for this course project. Reducing scope made it simpler to use and easier to build.