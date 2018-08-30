# Notes on Getting Translations and Localization

## Process Summary

- We use the en-US.js as the source in <http://git.infor.com/projects/SOHO/repos/controls/browse/components/locale/cultures>
- We copy that to `\\nlbavwmemq1\cc\FromDev\SohoUX\`
- Arrange timing with the translation team (Henry Wondergem contact)
- When it comes back it comes in `\\nlbavwmemq1\cc\ToDev\SohoUX\`
- We have to manually copy and paste the sections in the rest of the files in <http://git.infor.com/projects/SOHO/repos/controls/browse/components/locale/cultures> as parts of the files are different except the messages section

## Dates and numbers

All the date and number info in each file comes from or is derived from the <http://cldr.unicode.org/>.
There is a JSON download with the info. Use the en-us.js master file for organization and copy the stuff for each locale.

## Translations

All the stuff in the messages section comes from the Infor Translation Team. If they dont support a locale you could also send the file out for someone to fill in.
They translate our stuff quarterly and the latest file should be copied to  `\\nlbavwmemq1\cc\FromDev\SohoUX\` periodically. When they are done they copy it to `\\nlbavwmemq1\cc\ToDev\SohoUX\`.

When you get the file back.

- copy the messages section of each file into the respective file
- add any \ in front of ' in the file. This happens on aafrakans fr and ru and uk locales, but can be tested with a linter
- ensure the spacing is kept in tact.
- no-NO and nb-NO are copies of each other so copy no-NO to both
- zh-TW and  zh-Hant are copies of each other so copy zh-TW to both and change the names
- zh-CN and  zh-Hans are copies of each other so copy zh-TW to both and change the names
- all the en- ones and es- ones are copies

To add a new translation string and use it in the code add it in the en-US.js

- Keep the alphabetic Order
- Add a comment to explain to the translator where and how this is used for context.
- You can also add an es-ES translated by google for testing the locales. This will be replaced when it comes back.
