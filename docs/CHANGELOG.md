## <a name="version-4.6.0">4.6.0</a>

Release Date: 2018-04-29

Full Jira Release Notes: https://bit.ly/2GlnGJ1

### <a name="version-4.6.0-download-build-assets">Download Build Assets:</a>

Build Server: http://bamboo.infor.com/browse/label/release-460
Npm: http://npm.infor.com
Angular Components Change Log: http://git.infor.com/projects/SOHO/repos/angular-components/browse/CHANGELOG.md

### <a name="version-4.6.0-download-build-assets">Demo Site</a>

http://usalvlhlpool1.infor.com/4.6.0/components/

### <a name="version-4.6.0-key-new-features">Key New Features</a>
- Treemap Component Added

### <a name="version-4.6.0-behavior-changes">Behavior Changes</a>

### <a name="version-4.6.0-improvements">Improvements</a>

### <a name="version-4.6.0-breaking-changes">Code Updates / Breaking Changes</a>
- The internal template engine changed for better XSS security as a result one feature is no longer supported.
If you have a delimiter syntax to embed html such as `{{& name}}` please change this to the `{{{name}}}` alternate syntax.
- jQuery - Updated from 3.1.1 to 3.3.1

### <a name="version-4.5.0-bug-fixes">Bug Fixes</a>
- Angular - Added fixes so that the soho.migrate script is no longer needed.

(X Jira Issues Solved this release, Backlog Dev X, Design X, Unresolved X, Test Coverage X% )

## <a name="version-4.5.0">4.5.0</a>

Release Date: 2018-03-29

Full Jira Release Notes: https://bit.ly/2GlnGJ1

### <a name="version-4.5.0-download-build-assets">Download Build Assets:</a>

Build Server: http://bamboo.infor.com/browse/label/release-450
Npm: http://npm.infor.com
Angular Components Change Log: http://git.infor.com/projects/SOHO/repos/angular-components/browse/CHANGELOG.md

### <a name="version-4.5.0-download-build-assets">Demo Site</a>

http://usalvlhlpool1.infor.com/4.5.0/components/

### <a name="version-4.5.0-key-new-features">Key New Features</a>
- Experimental new font added from IDS. You can enable the new font as explained on http://bit.ly/2p2sjjZ
- Datagrid - Added support for pasting from excel
- Datagrid - Added option to specify which column stretches

### <a name="version-4.5.0-behavior-changes">Behavior Changes</a>
- Search Field - ESC incorrectly cleared the field and was inconsistent. The proper key is ctrl + backspace (PC )/ alt + delete (mac) to clear all field contents. ESC no longer does anything.

### <a name="version-4.5.0-improvements">Improvements</a>
- Datagrid - Added support for a two line title on the header
- Dropdown - Added onKeyPress override for custom key strokes
- Datepicker - Added support to select ranges
- More unit tests
- Contextual Action Panel - Added an option to add a right side close button.
- Removed jsHint in favor of Eslint

### <a name="version-4.5.0-breaking-changes">Code Updates / Breaking Changes</a>
- Swaplist - changed custom events `beforeswap and swapupdate` data from `Array: list-items-moved` to `Object: from: container-info, to: container-info and items: list-items-moved` to use data more reliable way by the (SOHO-7407).

### <a name="version-4.5.0-bug-fixes">Bug Fixes</a>
- Angular - Added new wrappers for Radar, Bullet, Line, Pie, Sparkline
- Angular Dropdown - Fixed missing data from select event
- Colorpicker - Added better translation support
- Compound Field - Fixed layout with some field types
- Datepicker - Fixed issues with validation in certain locales
- Datepicker - Not able to validate on MMMM
- Datagrid - Fixed bug that filter did not work when it started out hidden.
- Datagrid - Fixed issue with context menu not opening repeatedly
- Datagrid - Fixed bug in indeterminate paging with smaller page sizes
- Datagrid - Fixed error when editing some numbers
- Datagrid - Added support for single line markup
- Datagrid - Fixed exportable option, which was not working for both csv and xls export
- Datagrid - Fixed column sizing logic to work better with alerts and alerts + text
- Datagrid - Fixed bug when reordering rows with expandable rows
- Datagrid - Added events for opening and closing the filter row.
- Datagrid - Fixed bugs on multiselect + tree grid
- Datagrid - Fixed problems with missing data on click events when paging
- Datagrid - Fixed problems editing with paging
- Datagrid - Fixed Column alignment calling updateDataset
- Datagrid - Now passes sourceArgs for the filter row
- Dropdown - Fixed cursor on disabled items
- Editor - Added paste support for links
- Editor - Fixed bug that prevented some shortcut keys from working.
- Editor - Fixed link pointers in readonly mode
- Expandable Area - Fixed bug when not working on second page
- General - Some ES6 imports missing
- Personalization - Added support for cache bust
- Locale - Fixed some months missing in some cultures
- Listview - Removed redundant resize events
- Line - Fixed problems updating data
- Mask - Fixed bug on alpha masks that ignored the last character
- Modal - Allow enter key to be stopped for forms. Allow filter row to work if a grid is on a modal.
- Fileupload - Fixed bug when running in Contextual Action Panel
- Searchfield - Fixed wrong width
- Step Process - Improved layout and responsive
- Step Process - Improved wrapping of step items
- Targeted Achievement - Fixed icon alignment
- Timepicker - Fixed error calling removePunctuation
- Text Area - Adding missing classes for use in responsive-forms.
- Toast - Fixed missing animation
- Toolbar - Added
- Tree - Fixed a bug where if the callback is not async the node wont open.
- Track Dirty - Fixed error when used on a file upload
- Track Dirty - Did not work to reset dirty on editor and Multiselect
- Validation - Fixed more extra events firing

(67 Jira Issues Solved this release, Backlog Dev 378, Design 105, Unresolved 585, Test Coverage 6% )

## <a name="version-4.4.0">4.4.0</a>

Release Date: 2018-02-18

Full Jira Release Notes: http://bit.ly/2oCLCRp

### <a name="version-4.4.0-download-build-assets">Download Build Assets:</a>

Build Server: http://bamboo.infor.com/browse/label/release-440
Npm: http://npm.infor.com
Angular Components Change Log: http://git.infor.com/projects/SOHO/repos/angular-components/browse/CHANGELOG.md

### <a name="version-4.4.0-download-build-assets">Demo Site</a>

http://usalvlhlpool1.infor.com/4.4.0/components/

### <a name="version-4.4.0-key-new-features">Key New Features</a>
- We are now ES6. The Components are now built using Rollup and the internals are ES6, there is still a jquery dependency that will be graduall phased out.
- The d3 version being used was updated from version 3 to version 4.0
- Added new Radar Chart Component http://bit.ly/2t66XHu
- Translations - Added 39 new translations and updated all missing translations
- Added New Multi List Pattern http://bit.ly/2Flm8ln
- Block Grid  - Added features to select elements (single, multi, mixed)
- Side By Side Tabs - Added new side by side tabs pattern http://bit.ly/2F7XUr3

### <a name="version-4.4.0-corrections">Corrections to Your Code</a>
- Change the d3 script to the new version `d3.v4.js`
- The completion chart had a likely not widely used 'update' api. This was removed in favor of 'update(settings)' that all the other components use. You may need to refactor your update call to completion chart. See completion-chart/test-updated.html for an example
- Some not widely used line chart examples time formatters. Some functions are renamed. See the examples or https://github.com/d3/d3-time/releases
- The options for pie and label have changed. All the of label and formatter rules have different settings objects. Also, you can now control the tooltip, legend and lines independently. If using the labels option see examples for and docs for updates if you have any issues with pie or donut.
- Projects will need to add the `sohoxi-migrate-4.4.0.js` script until global references in your code are replaced with `Soho.[global]`. Globals have be moved to the Soho namespace (for example: the "Formatters" global should be replaced with "Soho.Formatters").  See (SOHO-7457)[https://jira.infor.com/browse/SOHO-7457] for the entire list.
- *Locale* - To set an `existingCulturesPath` for Locale, there's now a global `SohoConfig` object that should be defined before the Soho object is included by your project.  Setting a default cultures path can be done by defining `SohoConfig.culturesPath`.
- *List/Detail Pattern* - a new javascript wrapper has been created for this pattern.  The javascript portion is opt-in, but we've moved some list/detail-specific "screen-shifting" code that used to be located in the ListView component into this new wrapper component.  If you depend on the "screen-shifting" that was previously located in ListView, please see the source code in `<project-root>/components/list-detail/list-detail.js` and correct your code to notify this component of which elements in your application contain the "list" and "detail" areas.
- *Two-Column Layouts* - New "fixed"-style two-column layout sizes have been added that required a semantic change of some existing sizes.  What used to be the `fixed-lg` size (450px sidebar) is now the `fixed-xl` size.  A new `fixed-lg` size has taken its place (400px sidebar).  We've also added `fixed-sm` (275px) and `fixed-mm` (300px) in-between for more granular column sizing options.

### <a name="version-4.4.0-behavior-changes">Behavior Changes</a>
- Datepicker - When using the time version, the time will now update immediately when selected for better usability.

### <a name="version-4.4.0-improvements">Improvements</a>
- Accordion - Added support for icons on sub item
- Busy Indicator - Its now possible to set  border, font and icon color
- Busy Indicator - Its now possible using the updated() method to set the text while the indicator is running.
- Charts - Added support for empty messages when there is no data. If you pass in no data it will no longer error and will show an empty icon and message.
- Datagrid - Made MaximumFractionDigits setting work on percent and decimal filters
- Datagrid - Added a colspan option so that columns may be spanned. This can take either a column index or a function for doing it dynamically per row.
- Datagrid - Enhanced TargetedAchievement Formatter to set text on it
- Datagrid - Added events closefilterrow and openfilterrow
- Datagrid - Added selectable option to select siblings in tree grid.
- Datagrid - Added selectable option to not select children in tree grid.
- Datagrid - Added multiselect filter type option
- Datagrid - Added ability to set results counts on the toolbar
- Dropdown - Added type to select on noSearch option
- Trackdirty - Is now a component with a full lifecycle (destroy ect)
- Testing - Added new test scaffolding for unit and functional testing. Using Jasmine, Karma, Protractor, Istanbul and browser stack. Working to more full test coverage.

### <a name="version-4.4.0-bug-fixes">Bug Fixes</a>
- Angular - Updated jQuery types
- Angular - Added a new Code Block, Custom Component Example
- Angular Alerts - Added a way access the native element when using the error directive
- Angular App Menu - Fixed rendering bugs
- Angular Dropdown - Exposed showSelectAll
- Angular Popdown - Exposed open method on popdown.
- Angular Listview - Added beforeActivated event
- Angular Modal - Fixed a bug that prevent modals from opening from CAP
- Angular Slider - Fixed errant data on the value input
- Angular Toolbar - Toolbar now allows you to pass in a SohoPopupMenuOptions object as a `moreMenuSettings` setting.
- Angular Form - Fixed onValid event which was not getting triggered
- Angular Toolbar - Fixed bug setting maxVisibleButton to one
- Accordion - Improved contrast
- App Menu - Fixed a bug that caused constant toggling at exactly 767 width
- App Menu - Improved the search option, as it was missing some results.
- App Menu - Fixed issue closing on Mac safari
- Composite Form - Fixed touch events that were faulty on mobile, fixed missing tab overflow
- Colorpicker - Fixed errors initializing on forms
- Datagrid - Fixed an error exporting without specifying a file name
- Datagrid - Fixed hide and showColumn to work with grouped headers
- Datagrid - Fixed wrong rows returned in events when paging indeterminate
- Datagrid - Fixed a problem opening popups on numeric filter columns
- Datagrid - Fixed a bug opening popups on invalid date filters
- Datagrid - Added a way to set the empty message dynamically.
- Datagrid - Fixed problems with contents filter and an empty item
- Datagrid - Fixed hover color on tall rows
- Datagrid - Fixed checkbox rendering on contents filter in Edge
- Datagrid - Fixed incorrect alignment on RTL columns
- Datagrid - Fixed incorrectpoint icon in non select mode
- Datagrid - Fixed bugs filtering with date and time in the filter
- Datagrid - Fixed bugs in IE11 using context menus
- Datagrid - Fixed bugs in IE11 using context menus
- Datagrid - Fixed bugs in filter row that reset the list to contains
- Datagrid - Fixed bug that caused filter row to clear on resize
- Datagrid - Fixed tooltip direction on grid tooltips
- Datagrid - Fixed several bugs that caused column alignment to come out wrong.
- Datagrid - Added RTL fixes
- Datepicker - Fixed in correctly shown arabic dates.
- Datepicker - Fixed issues that caused incorrect dates when using Angular.js directives
- Datepicker - Fixed invalid change event that fired on blur even if it didnt change.
- Datepicker - Fixed incorrect height on months in IE11
- Dropdown - Fixed issue with &quot; in it
- Expandable Area - Fixed misalignment when nesting / using with fieldsets
- Fileupload - Fixed misalignment on icon
- Hierarchy - Fixed lazy loading and click events on mobile
- Hierarchy - Fixed problem with data on the top node
- Hierarchy - Fixed alignment issues
- Lookup - Fixed an error when using single quotes in data-options
- Lookup - Fixed RTL issues
- Listview - Fixed a bug that caused links to not work on selectable lists
- Listview - Allowed favorite to click without selecting
- Listview - Added ability tio have all four pager buttons and page size selector
- Popover - Fixed some icon alignment issues
- Modal - Fixed missing padding when dropdowns are added.
- Multiselect - Now trigger events when clicking Select All
- Icons - Updated icon-save-new icon to look better
- Icons - Added new icons for design mode, wrench and magic wand
- Icons - Added new way to align icons in labels
- Timepicker - Fixed a bug that caused timepicker to not be corrected once in error state
- Timepicker - Made icon change color to red on error, like other components did.
- Tabs - Fixed missing SVG's on IE11
- Targeted Achievement Chart - Fixed the high contrast version to pass WCAG AAA
- Toolbar - Fixed added <p> tags when ommitting audible spans on icon buttons
- Searchfield - Fixed an error when using arrays for data passed in. Can now be object data or array based data.
- Slider - Added readonly and destroy methods
- Swap List - Fixed issue in that it was unusable when starting out empty
- Validation - Fixed image bleed on the required icon
- Validation - Fixed layout issue on validation messages

(146 Jira Issues Solved this release, Backlog Dev 382, Design 96, Unresolved 499, Test Coverage 2% - Initial New Tool Added)

## <a name="version-4.3.4">4.3.4</a>

Release Date: 2017-12-20

Full Jira Release Notes: http://bit.ly/2D6PShK

### <a name="version-4.3.4-download-build-assets">Download Build Assets:</a>

Build Server: http://bamboo.infor.com/browse/label/release-434
Npm: http://npm.infor.com
Angular Specific Change Log: http://git.infor.com/projects/SOHO/repos/angular-components/browse/CHANGELOG.md

### <a name="version-4.3.4-download-build-assets">Demo Site</a>

http://usalvlhlpool1.infor.com/4.3.4/components/

### <a name="version-4.3.4-key-new-features">Key New Features</a>
- Side By Side Module Tabs - http://bit.ly/2D5GbAc
- Field Options -  http://bit.ly/2BzyqCb


### <a name="version-4.3.4-breaking-changes">Corrections to Your Code</a>
- Datagrid - The dynamic mask example now uses the new mask options (example components/mask/test-number-mask-gauntlet.html). Please refactor to pass an object back with the options like the sample page http://git.infor.com/projects/SOHO/repos/controls/browse/components/datagrid/test-dynamic-mask.html

### <a name="version-4.3.3-behavior-changes">Behavior Changes</a>
- In Listview the click and dblick and contextmenu events showed the data of next item in the dataset. If your code was working around this by adding a -1 you should note that its now correctly showing the data of the array index.

### <a name="version-4.3.3-improvements">Improvements</a>
- Datagrid - Added an example with a hover menu
- Donut - Added an improved legend example http://bit.ly/2D2t9mR
- Examples - Added paging to the Search Page example http://bit.ly/2AY5OBl
- Validation - Added getMessage api call to get the message type.
- General - Added support to use yarn and npm 5
- Splitter - Added maxWidth option so dragging can be restricted
- Toast - Major performance improvements
- Popupmenu - Added ajax call for submenus
- Datepicker - Added ability to set current calendar (umalqura vs gregorian)
- Validation - Added for message types (info, warning, error, alert)
- Tree - added api calls to close and open a node

### <a name="version-4.3.3-bug-fixes">Bug Fixes</a>
- Angular - Popupmenu - Added ajax callback
- Angular - Popupmenu - Fixed bug causing menus to not work with keyboard
- Angular - Colorpicker - Fixed missing changed event
- Angular - Editor - Added ability to toggle link options
- Angular - Popover - This example was broken, now is fixed
- Angular - Popover - Added missing keepOpen option
- Angular - Tooltip - Fixed periodic error in SPA with tooltips
- Angular - Colorpicker - Added showLabel and editable inputs
- Accordion - Made chevron centered
- Applictaion Menu - Fixed bug that caused the incorrect cursor to show
- Autocomplete - Fixed bugs causing the browser autocomplete to show incorrectly
- Bar chart - Fixed wrong number formatting on tooltip
- Breadcurmb - Fixed layout on mobile / small screen
- Column Chart - Added missing showLegend option to hide legend
- Charts (All) - Fixed bug causing double animation
- Datagrid - Fixed bug when using paging with removeSelected
- Datagrid - Fixed bug making filter menus unusable on IOS
- Datagrid - Fixed bug showing wrong data with paging + click events
- Datagrid - Fixed bug with empty filter
- Datagrid - Fixed bug where reorder events fire several times
- Datagrid - Fixed more column alignment issues
- Datagrid - Fixed wrong count when all items are filtered out
- Datagrid - Fixed bug on ie causing icons to not show in menus
- Datagrid - Fixed default column size to take into account filter area
- Datagrid - Fixed bug that made expandable fields expand when filtering
- Datagrid - Fixed glitches editing in RTL mode
- Datepicker - Fixed invalid years when moving across year on ja-JP
- Datepicker - Fixed alignment on the minutes picker
- Dropdown - Ctrl key is now ignored if pressed in combinations
- Dropdown - Fixed bug in short field styles
- Editor - Fixed bugs with multiple editors on a page
- Editor - Improved rendering performance by 10 times
- Editor - Improved bullet list pasting on IE
- Hyperlinks - Fixed high contrast style
- Expandable Area - Smoothed animation on IE
- File upload - Fixed incorrext X position
- Listview - Fixed bug where click event showed wrong data
- Lookup - Restored broken keyboard functionality
- Org Chart - Fixed line alignment issues and lazy loading
- Place - Fixed invalid rounding causing some elements to be incorrectly placed
- Radios - Improved dirty indication support
- Search - Fixed a bug where menu position was slighly off
- Sass - Fixed compilation errors
- Spinbox - Fixed a bug where a value of range could be added
- Spinbox - Fixed a bug where ranges could not be typed
- Spinbox - Fixed issues with 24 times.
- Tabs - Changed disableTab to select a valid tab
- Tabs - Fixed icon alignment issue
- Timepicker - Fixed keyboard behavior on scrolling pages
- Fixed - Issue using keyboard to close tabs
- Validation - Fixed text area validtion on keypress
- Validation - Allow readonly fields to be enabled and validate when enabled
- Validation - Fixed bug on modal validation with email addresses

(91 Jira Issues Solved this release, Backlog Dev 326, Design 226, Unresolved 632)

## <a name="version-4.3.3">4.3.3</a>

Release Date: 2017-11-21

Full Jira Release Notes: http://bit.ly/2jHU9CS

### <a name="version-4.3.3-download-build-assets">Download Build Assets:</a>

Build Server: http://bamboo.infor.com/browse/label/release-433

Npm: http://npm.infor.com

### <a name="version-4.3.3-download-build-assets">Demo Site</a>

http://usalvlhlpool1.infor.com/4.3.3/components/

### <a name="version-4.3.3-key-new-features">Key New Features</a>
- Datagrid - Added a message area and scroll bar with a configurable message for when there is no visible rows, example: http://bit.ly/2B0zo9d
- Soho XI Now available on a global CDN , see http://git.infor.com/projects/SOHO/repos/controls/browse/README.md for details.
- Angular samples updated to use Angular version 5.0
- Added a search example with larger search - http://bit.ly/2hHSSre
- Added a image initials and statuses - http://bit.ly/2jb4CCU
- Added search to the application menu - http://bit.ly/2zb0WYZ
- Dropdown now supports icons in the list
- Added a new Step Process Chart - http://bit.ly/2mOH9N6

### <a name="version-4.3.3-breaking-changes">Breaking Changes</a>
- Tabs - changed custom event `beforeactivate` to `beforeactivated` to prevent clashing with a Microsoft IE11/Edge-specific event by the same name (SOHO-5994).
-

### <a name="version-4.3.3-breaking-changes">Corrections to Your Code</a>
- Svgs -> Search and replace ` xmlns:xlink="http://www.w3.org/1999/xlink"` with nothing. This fixes a security scan issue.

### <a name="version-4.3.3-behavior-changes">Behavior Changes</a>
- Enhanced the focus state styling based on customer feedback

### <a name="version-4.3.3-improvements">Improvements</a>
- Charts - Darkened up lines
- Charts - Made a setting to draw the axis from the middle of charts
- Composite Form - Made a setting to place the header on the left or the top - http://bit.ly/2zUicVZ
- Datagrid - Added a setting to split a cell
- Datagrid - Added a column setting (uppercase: true)  to uppercase cell content
- Datagrid - Added a setting to remove the select all checkbox
- Datagrid - Fixed wrong scrollbar height on grouped headers + short rows
- Datagrid - Added a column setting columns (exportable: false) to specify columns that should not be export when exporting to excel
- Datagrid - Added a setting to show filter count in the results
- Datagrid - Added a setting to move the negative sign on export
- Datagrid - Added a color picker editor
- Dropdown - Added a maxWidth option so lists could have a contained width.
- Dropdown - Added tooltip support for list items
- Icons - Added more icons, mostly related to file types
- Fileupload - Added an x to clear the selection
- Field Options - Added a menu next to each field type
- Reduced gap between labels and inputs
- Locale - Allow currency sign to be set in format and parse
- Listview - Added mixed selection mode and click and double click click events
- Mask - Can now work with localization settings properly
- Patterns - Added header detail sample http://bit.ly/2jbzFi6
- Targetted Achievement - Added ability to set text on the body of the element.
- Swap List - Added setting to disable sections
- Validation - Added ability to make info and warning messages
- Validation - Added ability to focus an error field

### <a name="version-4.3.3-bug-fixes">Bug Fixes</a>
- Angular - Added more settings to colorpicker
- Angular - Fixed dirty tracking on editor
- Angular - Added new api to angular masked input
- Angular - Fixed broken grouped data example
- Angular - Allow swap list buttons to be localized
- Angular - Added paging example for Hierarch Component
- Angular - Added Advanced file upload
- Application Menu - Fixed bug that caused ESC to toggle the menu
- Autocomplete - Fixed visual separation between input and list
- Autocomplete - Fixed cursor trap
- Builder - Fixed problems with popdown
- Charts - Fixed issue and made examples for large numbers of axis points
- Charts - Made tooltip destroy on component destroy
- Compound Field - Aligned labels on dropdown
- Color Picker - Improved keyboard support
- Color Picker - Added an example just showing the swatch
- Contextual Action Panel - Made esc key work to close
- Datagrid - Fixed alignment issue on the datagrid tree
- Datagrid - Fixed text overlap on long text on dropdown editor
- Datagrid - Fixed sorting issue with paging (on checkbox columns)
- Datagrid - Fixed grid to have a scroll bar when there is no rows
- Datagrid - Added a message to the toolbar if errors are on a different page
- Datagrid - Added a fix to filter results count when zero
- Datagrid - Fixed alignment on grouping
- Datagrid - Fixed scroll bar sizing and dark background on IE
- Datagrid - Fixed default filter sizes
- Datagrid - Fixed column misalignment issue
- Datagrid - Fixed filter issue on numbers with a thousands separator
- Datagrid - Filter now resets page to page one
- Datagrid - Fixed retainment of selections and activations when re-rendering or sorting
- Datagrid - Fixed wrong data passed to click event
- Datagrid - Synced editor , formatter and filter with new Mask API
- Datagrid - Fixed gap between drag arrows
- Datagrid - Fixed bug with select all checkbox and paging
- Datagrid - Allow filter buttons to toggle when clicked twice
- Datepicker - Fixed bad validation on YYYY
- Datepicker - Made tree and selections work better together
- Datepicker - Fixed error when filtering on some date column data
- Datepicker - Made grouping and selection work better together.
- Datepicker - Fixed bug with thousands separator on filter bar
- Datepicker - Fixed bug working with activation and paging
- Datepicker - Allow validation to fire on enter key
- Dropdown - Allow backspace to reset the search
- Dropdown - Close dropdown when scrolling on dialogs
- Dropdown - Fixed issue with empty whitespace in the items.
- Dropdown - Changed padding on Group headers
- Expandable Area - Fixed spacing on consecutive expandable areas
- Header - Fixed separator style issue
- Hero - Fixed mobile display issue
- Fieldset - Added an example of intending different sections.
- Fileupload - fixed IE Edge infinite popup loop
- Input - Fixed clear button alignment issues
- Input - Fixed style issues on short fields
- List View - Fixed missing border on IE
- Locale - Fixed Russian / Ukraine translations on about component
- Locale - Improved time support
- Locale - Fixed Japanese translations of AM and PM
- Locale - Fixed exception on formatDate with Arabic
- Locale - Added new translations (Hindi, Japanese)
- Lookup - Fixed bug and keyboard on single select
- Lookup - Fixed display with and without the actions button
- List Builder - Fixed an error using updateDataset
- Message - Improved confirmation message alignment
- Menu Button - Fixed padding issue when no whitespace is in the markup
- Modal - Made the close event not bubble down to components on the modal.
- Modal - Fixed bug that the enter key closed the form on pager buttons
- Modal - will now close when using the browser back button in SPA apps
- Modal - Fixed missing icons on IE
- Module Tabs - Added setting to set Menu Text
- Pager - Fixed display issue on Android
- Popup Menu - Fixed RTL issues
- Popup Menu - Fixed bug with disabled sub items and keyboard
- RTL Fixes on Property Sheet, List View and Password Samples/Patterns and searchfield
- Tabs - Fixed error icon alignment issue
- Targeted Achievement - Fixed issue when measure is based on 100
- Targeted Achievement - Fixed display issue on labels
- Targeted Achievement - Added setting to remove the icon
- Text Area - Fixed text display on counter
- Toolbar - Improvements to alignment, overflow and search field algorithm
- Tooltip - Fixed contrast with links on tooltips
- Tree - All setting of background color on badges
- Radio - Fixed dirty tracking
- Timepicker - Fixed dropdown alignment issues
- Tooltip - Fixed IOS font issue
- Tooltip - Fixed bug where sometimes tooltip didn't display
- Tooltip - Fixed destroy error message
- Searchfield - Fixed issue with reseting search
- Searchfield - Fixed problem using ctrl+arrow on cap
- Searchfield - Fixed bug on collapsible search fields hitting the x
- Searchfield - Fixed bug on collapsible search fields in the header
- Splitter - Fixed an IE 11 visual issue
- Splitter - Added a right side example and ability to set a initial split width there.
- Swap List - Fixed UI checkbox position
- Validation - Fixed bug using incorrect field to trigger.
- Validation - Fixed issue in removeError with inline errors
- Validation - Fixed some excess events firing

(172 Jira Issues Solved this release, Backlog Dev 335, Design 237, Unresolved 663)

## <a name="version-4.3.2">4.3.2</a>

Release Date: 2017-09-18

Full Jira Release Notes: http://bit.ly/2fynFq7

### <a name="version-4.3.2-download-build-assets">Download Build Assets:</a>

Build Server: http://bamboo.infor.com/browse/label/release-432

Npm: http://npm.infor.com

### <a name="version-4.3.2-download-build-assets">Demo Site</a>
http://usalvlhlpool1.infor.com/4.3.2/components/

### <a name="version-4.3.2-key-new-features">Key New Features</a>
- Mask - Big changes to support locale and squash all bugs. ([SOHO-3849](https://jira.infor.com/browse/SOHO-3849))
- Added Search Form Pattern http://bit.ly/2xdaeTV

### <a name="version-4.3.2-breaking-changes">Breaking Changes</a>
- PopupMenu - To clarify disabled items should be achieved by adding either the disabled attribute to the anchor tag or adding both the attribute to the anchor tag and the class is-disabled to the li element. Only adding the class will not work as only one mapping was possible. See examples components/popupmenu/example-disabled-submenus and components/popupmenu/test-toggle-disabled.html
- Not entirely breaking but file upload should now be done without an inline label as per components/fileupload/example-index. This wont break but will cause a loop on ie edge due to an ie edge bug if initializing it this way.
- Module Tabs - Also Not entirely breaking but for module tabs, the application menu should slide out at the top level of the tabs. This requires markup changes to work correctly. Move the applictaion menu out to the top level and wrap the module-tabs-container and tab-container (tab list) in a page-container no-scroll. See http://git.infor.com/projects/SOHO/repos/controls/browse/components/tabs-module/example-index.html

### <a name="version-4.3.2-behavior-changes">Behavior Changes</a>
- Timepicker - The default of roundToInterval is now true. Since the default options are intervals of 5 we felt this made the most sense since it was reported as a bug twice. If you want to allow entering time out of the dropdown intervals you will now have to set this to false.

### <a name="version-4.3.2-improvements">Improvements</a>
- Angular - Added Spin Box Wrapper
- Angular - Added Colorpicker Wrapper
- Angular - Added Chart Typings
- Angular - Added toolbar alignRight support
- Accordion - Added api to update portions of the accordion
- Advanced File Upload - Added browse button
- App Menu - Added an optional role dropdown menu.
- App Menu - Now supports RTL correctly
- ColorPicker - Added select only mode (editable: false)
- Line Chart - Added a way to make two line axis labels
- Datagrid - Huge performance improvement for Datagrid when filter is enabled
- Datagrid - More docs added for formatters and column types
- Datagrid - Added csv export mode to get rid of the warning messages
- Datepicker - Now corrects 2/3 digit dates to a correct 4 digit date.
- Datepicker - Added option to disable / add a custom validation
- Datepicker - Now supports changing options while initialized
- Datepicker - Added dropdown option to select year and month
- Datepicker - Added examples for selecting just year and month
- Datepicker - Added support for first day of week (locales that dont start week on Sun)
- Dropdown - Fixed bug when rendering really long text dropdowns
- File Upload - Now supports required
- Listview - Added new 'unselected' event
- Mask - Support for numeric negative masks
- Mask - Api refactoring and cleanup
- Mask - Added better non-US keyboard support
- Mask - Fixed locale support
- Mask - Fixed percent support (prefix/suffix percent sign)
- Module Tabs - Corrected category search
- Texarea - Added option to grow the input based on what is typed
- Timepicker - Works better on android
- Timepicker - Fixed issue with rounding when pasting
- Timepicker - Fixed issue where dropdowns moved when scrolling
- Charts - Added getSelected and setSelected method for all charts
- List Detail - Added additional examples for searching within the pattern as per http://bit.ly/2xLKsct and  http://bit.ly/2wpvPLQ
- Password / Reset Password - Fixed RTL Support
- Validation - Now triggers an event
- Validation - Added a method to return the current error message for a field

### <a name="version-4.3.2-bug-fixes">Bug Fixes</a>
- Autocomplete - Fixed focus trap issue
- Datagrid - Search filter only worked on one page
- Datagrid - Fixed exporting issue when personalization occured.
- Datagrid - Fixed bug editing cell after filtering
- Datagrid - Fixed alignment of filter row when using align column option
- Datagrid - Fixed filter was accepting non-number values on number type columns
- Datagrid - Fixed icon rendering issue
- Datagrid - Fixed edge column rendering issue
- Datagrid - Fixed bug on resize that made selection disappear
- Datagrid - Fixed bug rendering when toggling filter row
- Datagrid - Fixed context menu rendering
- Datagrid - Fixed non-saved filter row on page reload
- Datagrid - Fixed reset to default not working first time ever
- Datepicker - Fixed RTL formatting
- Datepicker - Fixed missing change event on change
- Datepicker - Fixed mismatched ctrl+arrow direction keys
- Dropdown - Fixed list pixel jogging opening lists on retina displays
- Dropdown - Fixed issues using num pad
- Charts - Fixed bug that tooltip did not close on scroll
- Circle Pager - Fixed bug where paging dots are shown when just one page.
- Colorpicker - Added mode to support all or no uppercase, Added support for 3 digit hex
- Expandable area - Fixes to high contrast theme
- Editor - Fixes to adding links for edge and on blank text
- Editor - Fixes to allow pasting on Edge and Safari
- Editor - Fixed same vs new window option
- Editor - Fixed error in chrome pasting
- File Upload - Fixed issue in edge causing the dialog to never close.
- Icons - A few new icons added
- Listbuilder - Fixed zindex issues when working with modal
- Listview - Fixed page size issue, when reloading dataset
- Locale - Fixed percent formatting
- Locale - Fixed negative formatting by locale
- Mask - Fixed misplaced decimal on init
- Mask - Fixed all Safari and Android issues
- Mask - Fixed currency symbol support
- Mask - Fixed negative support
- Popupmenu - Fixed scrolling issue on longer menus
- Popupmenu - Fixed rendering on edge cases on immediate mode
- Timpicker - Fixed validation rule to check seconds
- Tree - Fixed Xss issue

(106 Jira Issues Solved, Backlog Still 594 including 165 Design)

## <a name="version-4.3.1">4.3.1</a>
*Release Date:* 2017-08-02
*JIRA Release Notes:* http://bit.ly/2w6X8Xw

### <a name="version-4.3.1-download-build-assets">Download Build Assets:</a>
Build Server: http://bamboo.infor.com/browse/label/release-431
Npm: http://npm.infor.com

### <a name="version-4.3.1-demo-site">Demo Site</a>
http://usalvlhlpool1.infor.com/4.3.1/components/

### <a name="version-4.3.1-key-new-features">Key New Features</a>
- More Angular Wrappers (About, Color Picker, Accordion, Popover)
- Line Chart - Added options to rotate axis for longer labels
- Card/List - Added new group action area toolbar
- 128 Bugs and Enhancements
- Toolbar / Search - Further stability Enhancements

### <a name="version-4.3.1-breaking-changes">Breaking Changes</a>
- Listview - since it was confusing about `selected` event, now `selected` and `unselected` events will fire when selecting or de-selecting an item in list. It used to be fire only `selected` event when any selection gets changed selecting or de-selecting.
- Dropdown - Instead of using the clear option as a value, the clear option is done as a class. Change `<option value="clear"></option>` to `<option class="clear"></option>`.

### <a name="version-4.3.1-behavior-changes">Behavior Changes</a>
- Datepicker - When using date picker with time, if you open the field blank the time will be 12:00 not current time. Same with selecting today (unless the time is changed)

### <a name="version-4.3.1-improvements">Improvements</a>
- Accordion - Added expand/collapse all api method
- Angular - About - Added about wrapper
- Angular - Color Picker - Added color picker wrapper
- Angular - Accordion - Added accordion wrapper
- Angular - Textarea - Added validation support
- Angular - Editor - Added validation support to change buttons
- Angular - Popover - Added popover support
- Angular - Datagrid - Added template cell support
- Angular - Datagrid - Fixed styling issues on fixed header scrolling
- Angular - Home Page - Added home page component wrapper
- Angular - Mask - Fixed issues using mask with required fields, model was not updated.
- Card/List - Added new group action area toolbar [View Example](http://usalvlhlpool1.infor.com/4.3.1/components/cards/example-group-action.html)
- Color picker - Added option to use color name for display
- Datagrid - improved data on entereditmode and exiteditmode events
- Datagrid - Added option to re run column layouts on resize
- Angular - Empty Widgets - Added icons and examples for empty widgets
- General - Added inline documentation and better docs and better organization. This is ongoing work as we continue to add more docs. If you see something missing you want to see, let us know.
- Line Chart - Added options to better format axises
- Line Chart - Added options to rotate axis for longer labels
- Lookup - Added option to prevent opening (temporarily for ajax requests)
- Lookup - Readonly mode will now allow the modal to open for viewing.
- Pie - Updated pie width and label styling, fixed ios rendering

### <a name="version-4.3.1-bug-fixes">Bug Fixes</a>
- Build Mapper - Improved Speed and fixed bug with multiple files open, update to new path structure
- About - Fixed wrong browser reoported in Edge
- About - Fixed missing translations (Translations pending for translation team)
- Angular - CAP - Fixed memory leaking due to not calling destroy
- Angular - Fileupload - Fixed text bleeding onto the icon
- Angular - Modal - Fixed modal nesting issue
- Application Menu - Fixed issue that caused menu to reopen on page resize
- Application Menu - Made selection color respect the personalization color
- Autocomplete - Fixed focus trap issue
- Busy indicator - Smoothed out jarring when closing out the animation, fixed positional issues in some layouts
- Cap - Fixed errors when destroying with no toolbar
- Composite Form - Added ability to use without a form section
- Compound Field - Fixed checkbox and switch to work in this layout
- Donut - Fixed WCAG AAA contrast on high contrast theme
- Dirty Tracking - Added orginal reset method.
- Datagrid - Fixed bug working with toolbar search and multiselect
- Datagrid - Fixed wrong data on double click event in the select event
- Datagrid - Fixed issues with using paging and selection on non-first pages
- Datagrid - Fixed a bug dragging the last grid column
- Datagrid - Allow rowTemplate to be omitted on expandable grid (you can pass in the event the row contents)
- Datagrid - Fixed excel export not showing checkbox data
- Datagrid - Fixed multiple source ajax calls for filtering and paging
- Datagrid - Fixed missing seconds setting on datepicker time
- Datagrid - Fixed issue where zero was shown as blank string
- Datagrid - Made it possible to disable toolbar search. Note that you must set toolbar.keywordFilter for search to work.
- Datagrid - Fixed error on expanded row
- Datagrid - Fixed issue where filter row did not appear after restoring to default
- Datepicker - Fixed issue where number of days in the month were off
- Datepicker - Fixed czech and polish translations
- Datepicker - Fixed lookup validation style bug
- Datepicker - Fixed intermittant selection issues
- Datepicker - Fixed time section selection issues and display issues
- Datagrid - Fixed issue with tooltip that hung around when scrolling
- Datagrid - Fixed left/right position of special characters
- Datagrid - Fixed missing args on isEditable api function
- Dropdown - Fixed bug selecting blank elements (since near clearable logic was added)
- Fileupload - Added file type support and example
- Fileupload - Fixed styling of dirty indicator
- Input - Fixed bugs in short field layouts
- Listview - Fixed bug clicking link elements
- Modal - Fixed validation issues (primary button)
- Modal - Fixed dropdown validation not being called
- Modal - Added flag to facilitate close dialogs on closing tabs.
- Modal - Fix to allow focus back to more elements than buttons
- Module Tabs - Fixed all issues with search field / category search
- Module Tabs - Fixed issues causing personalization color to not be applied
- Module Tabs - Fixed issue that caused tooltips to not update on tab rename
- Popupmenu - Fixed overlapping menu items in RTL mode
- Popupmenu - Fixed missing scrolling on longer menus
- Popupmenu - Fixed zindex issue on IOS
- Popupmenu/Menubutton - Fixed keyboard issues when used on CAP and modal
- Popupmenu - Fixed bug causing them not to open with the app menu active
- Pie - Fixed bug causing selection to not select only one slice
- Pie - Fixed bug causing legend to show NaN with some values
- Searchfield - Fixed destroy issues
- Searchfield - Fixed not working clear on mobile
- Slider - Fixed bug with update api when setting to 0
- Spinbox - Fixed issue that allowed more than max or min to be pasted in
- Swaplist - Fixed dragging bug on 2 column layouts
- Switch - Fixed bug when used in compound fields
- Tabs - Fixed error hitting random function keys when on a tab
- TextArea - Added enable and disable API call
- Toolbar - More improvements to search field and title layouts
- Toolbar - Fixed styling issue on search field when on alternate styles
- Tooltip - Fixed destroy / memory leak
- Timepicker - Fixed issues with drop down widths
- Vertical Tabs - Fixed issues routing tab links

(128 Jira Issues Solved, Backlog Still 442)

## <a name="version-4.3.0">4.3.0</a>
*Release Date:* 2017-05-09
*JIRA Release Notes:* http://bit.ly/2tk0hVy

### <a name="version-4.3.0-download-build-assets">Download Build Assets:</a>
Build Server: http://bamboo.infor.com/browse/label/release-430
Npm: http://npm.infor.com

### <a name="version-4.3.0-demo-site">Demo Site</a>
http://usalvlhlpool1.infor.com/4.3.0/controls

### <a name="version-4.3.0-key-new-features">Key New Features</a>
- Hijri (Umm Al Qura) - Arabic Calendar Support
- Arabic RTL Fixes
- Datagrid - Now Saves all user based settings (by option)
- Datagrid - Added ability to save filter, page, pagesize, rowheight and column widths in local storage
- Vertical Tabs - Now Responsive
- Targetted Achivement Chart Added View Example](http://usalvlhlpool1.infor.com/4.3.0/controls/targeted-achievement)
- "New Tabs" - New Visual Design and functionality for In-Page and Header Tabs
- Soho.infor.com - Now has widget guidelines
- Added an Image Slider Control [View Example](http://usalvlhlpool1.infor.com/4.3.0/tests/circlepager/on-form.html)
- New Example Composite Form shows form layout and behaviors [View Example](http://usalvlhlpool1.infor.com/4.3.0/tests/composite-form/index.html)
- Added Search Form Example [View Example](http://usalvlhlpool1.infor.com/4.3.0/examples/landmark/search-form)

### <a name="version-4.3.0-improvements">Improvements</a>
- Badge - Can now format decimals
- Datagrid - Added am option (allowOneExpanded) to only show one expandable row at a time. It is now the default.
- Datagrid - Added an optional light background color on the list version by adding class datagrid-alternate-bg-color to the datagrid div. See tests/datagrid/datagrid-expandable-row-one-only.html
- Datagrid - Added Favorites Editor
- Datagrid - Changed clickable editors (buttons, favorites, links), to only fire when clicking the object not the cell.
- Datagrid - Added filtered event that fires when filter runs
- Datagrid - Added ability to set filter conditions programmatically with applyFilter
- Datagrid - Added reorderable: false option to disable dragging of a particular column
- Datagrid - Added option to disable row activation
- Datagrid - Added option to close other expanded rows so only one is opened
- Cards - Added Group action area [View Example](http://usalvlhlpool1.infor.com/4.3.0/tests/cards/cards-group-action.html)
- Cards - Added pager to Cards [View Example](http://usalvlhlpool1.infor.com/4.3.0/tests/circlepager/more-than-one-slides-with-tabs.html)
- Cards - Added collapsible card [View Example](http://usalvlhlpool1.infor.com/4.3.0/tests/cards/expandable.html)
- Charts - Added options to line chart to better format the x axis
- Charts - Added options to set the dot radius size
- Colors - Exposed Classes color-error, color-warning, color-good,color-info
- Dropdown - Added ability to set text on blank items on (Clear Selection)
- Dropdown - Added ability to use data- attributes on items
- Examples - [Product Search page example | http://usalvlhlpool1.infor.com/4.3.0/examples/saleshub/product-search.html
], shows an editable listview.
- Editor - Improved Paste support from external applictaions
- Locale - Added new set of translated strings for 37 languages / 49 locales
- Listbuilder - Added api to set selected elements
- Module Tabs - Improved use of search categories on module tabs
- Multiselect - Added ability to move selected items to the top of the entire list or to the top of groups when the list is opened.
- Npm - Fixed main/root file link
- Toggle Button - New official toggle button, can change icon or state to "pressed"
- Toolbar - Improvements to header text being cut off and search field rendering
- Toolbar - Mixed Style Bugs on Toolbar Seperators
- Vertical Tabs - New setting 'verticalResponsive' allows a Vertical Tabset to become an instance of "header tabs" when viewed at the phone breakpoint.
- Vertical Tabs - Fixed height to extend to bottom of the page with scrolling
- Validation - Allow validation to work on "Anniversay" Dates fx June 2016

### <a name="version-4.3.0-bug-fixes">Bug Fixes</a>
- Autocomplete - Fixed bug with many autocompletes in different page areas
- Autocomplete - Fixed bug typing turkish letters
- Accordion - Fixed bug that prevented it from appearing on CAP
- Card - Fixed styling issues on high contrast theme
- Datagrid - Fixed column alignment issue on reload with hidden columns
- Datagrid - Fixed tooltip glitch on validation cells
- Datagrid - Fixed glitch on when column click event fires
- Datagrid - Fixed select all checkbox with paging
- Datagrid - Fixed column to header misalignment
- Datagrid - Fixed editing issues with pager option
- Datagrid - Fixed error calling hideColumn with no data.
- Datagrid - Fixed checkbox header alignment
- Datagrid - Fixed translation issue "1 Results" to "1 Result"
- Datagrid - Fixed scrolling issue on click in IE
- Datagrid - Fixed grouping / totals to work with nested data
- Datagrid - Fixed select all behavior on when interacting with the filter feature
- Datepicker - Updated Polish Translations
- Datepicker - Fixed issue in Japanese that the month is shown twice.
- Datepicker - Prevent validation from firing when open the calendar
- Dropdown - Fixed Broken No Search Option
- Dropdown - Fixed JS error on no match found
- Dropdown - Fixed focus trap
- Dropdown - Unable to set dirty indicator
- Fileupload - Fixed destroy option
- Icons - Fixed missing Icons on IE
- Locale - Fixed parse issue on exactly 12:00 AM
- Locale - Fixed formateDate error on IE and Safari
- Layouts - Allow visible-lg* and visible-xl* to work together
- Listbuilder - Fixed incorrect data in selected handler
- Listbuilder - Fixed issue rendering on tabs
- Multiselect - Fixed init on display: none
- Multiselect - Fixed Bug where groups are not showing during search
- Menu Button - Fixed keyboard trap on disabled items
- Menu Button - Fixed submenus which were not working on IOS
- Modal - Fixed bugs on validation / enabling / disabling buttons
- Modal - Fixed event memory leak
- Module Tabs - Improved usage of search categories in module tab header
- Tabs - Fixed issue with middle mouse click
- Timepicker - Fixed JS error when validating
- Timepicker - Fixed issue where values where set to ...
- Toolbar - Fixed style issue on disabled buttons in the overflow
- Toolbar - Fixed bug with seperators in the overflow menu
- Tree - Added a way to disable parent nodes
- Theming - Improved FOUC issues (FF Only)
- Swap list - fixed scrolling issues

### <a name="version-4.3.0-angular-2.0">Angular 2.0</a>
- Updated CLI
- New Project Branch Structure
- Accordion Wrapped and Added
- Minor Api Updates
- Multiselect - Added tooltip example
- Multiselect - Fixed bug preventing it from being updatable
- Swap List - Fixed bug updating dataset on the buttons
- Menu Button - Fixed wrapping issues
- Fixed issues where masked input fields do not update the model
- DatePicker - Fixed error with time and date picker

### <a name="version-4.3.0-notes">Notes</a>
- Latest bleeding edge build is now available in NPM. Use at your own risk with command:
`npm install @infor/sohoxi@dev`

### <a name="version-4.3.0-breaking-changes">Breaking Changes</a>
- Tag - Revised the spelling of the CSS class for "X" buttons on tags from "is-dismissable" to "is-dismissible".  The original class still works, but is deprecated and will be removed in a future version.
- Multiselect - `moveSelectedToTop` has been deprecated in favor of `moveSelected`, which is now a text string instead of a boolean.  This defaults to `"all"` on Multiselect but can be defined as `"group"` or `"none"` as well.
- Removed Search Results Page as it was an example for the site
- Sign In Page was changed to not copy to invisible fields. Update your markup accordingly. (wont break but may need a look)
- Tabs (Header/Module/Vertical) - it's now necessary to define the `containerElement` setting either through Javascript or via a `data-options` attribute if the element that contains tab panels cannot be directly adjacent to the `.tab-container` element.  Existing tab markup that places tab panels inside of the `.tab-container` element must be changed to contain the panels outside of this element.
- Lightbox and SideBar are deprecated / removed as this is for the soho site only and its being recreated

### <a name="version-4.3.0-behavior-changes">Behavior Changes</a>
- Pie - The Chart now sorts slices in the order of the dataset (was on size from biggest to smallest before).
- Button - Changed the standard `.btn` style on forms to reflect Tertiary button style instead of Secondary button style (SOHO-6083).
- Editor - Removed 'bold','italic','underline', 'anchor', 'quote' options from HTML editor.
- Datagrid - Made a new option enableTooltips which defaults to false. You know need to enable this to have the tooltips anyplace in the datagrid. This has a significant performance especially for Ellipsis columns, so should only be used if you are sure or your datagrid is not huge.
- Datagrid - Added option sizeColumnsEqually which defaults to false. If set all the columns will get an equal size. (this used to do it automatically for the first 8 columns)
- Datagrid - Changd Favorites and Checkbox to only edit when clicking the action object
- Tabs - In-Page/Header tabs will allow the list of tabs to scroll left/right if using a device with touch capabilities.
- Tabs - The "Spillover Menu" for In-Page/Header tabs is now a full list of all available tabs.  This menu has been redesigned to be more touch/responsive friendly.

### <a name="version-4.3.0-ui-changes">Ui Changes</a>
- Added heart and heart-filled icons
- Text/Typography
  - Removed all font-weight: lighter (effecting components: charts, hierarchy, search results, site)
  - Removed all text-transform: uppercase (effecting buttons, modals, bullet chart, timestamp text, dropdown and multiselect, Text Area (word count), Popupmenu Headings, Hero Image, Chart Axises, Toolbar Search Field )
  - Changed H1 - H6 Sizes
  - Introduced new class based colors for fonts
  - Header text reduced from 20px to 18px
  - Links get underlines now by default, have a new hover state
  - Charts should be lower case (fx JAN, FEB should be Jan, Feb) - this is in the data set and should be changed manually.
  - Note that Radios , Switches and Checkboxes should be Sentence case.
- Minor (Design QA) padding and small adjustments to almost all components

### <a name="version-4.3.0-whats-next">What's Next</a>
- New Documentation Site Structure
- Many More Bug Fixes - Particularly Mobile Issues and Accessibility
- Hero Theming
- App Menu Search

## <a name="version-4.2.6">4.2.6</a>
*Release Date:* 2017-04-02
*JIRA Release Notes:* http://bit.ly/2mWAmjY

### <a name="version-4.2.6-download-build-assets">Download Build Assets:</a>
Build Server: http://bamboo.infor.com/browse/SOHO-426
Npm: http://npm.infor.com

### <a name="version-4.2.6-demo-site">Demo Site</a>
http://usalvlhlpool1.infor.com/4.2.6/controls

### <a name="version-4.2.6-key-new-features">Key New Features</a>
- Datagrid - Added RichText Editor
- Datagrid - Added Time Editor
- Datagrid - Added ability to reorder rows
- Datagrid - Added "mixed" section mode and activate event
- More Performance Improvements
- Targeted Achievement - (Form Only) New Chart
- Swaplist - Angular 2.0 Component wrapper added

### <a name="version-4.2.6-improvements">Improvements</a>
- Autocomplete - Improved Mobile Support
- Datagrid - Improved Column Resize Logic
- Datagrid - Added ability to have two line column header
- Datagrid - Added dirty indicator and api for indicating dirty rows
- Datagrid - Changed selection event to pass more info about the action that occurred (select, deselect, selectall, deselectall)
- Dropdown - Mobile Support Improved Greatly
- Fileupload - Prevent Typing, Space key will now open dialog, prevent browser autocomplete from occurring.
- Locale - Changed French Language Translations to be in lower case
- Listbuilder - Added selected event
- Listbuilder - Added updateDataset method to refresh the UI
- Module Tabs - UI Improvements when page is zoomed in the browser
- Module Tabs - Added a tooltip if longer text is cut off
- Pager - Added option hideDisabledPager to hide the pager if only one page
- Rich Text Editor - Better ability to paste into the editor from external documents
- Rich Text Editor - Added font color picker button to set text color
- SearchField - Added api to get / set categories
- Splitter - Added option to show a expand collapse button
- Swaplist - Added updateDataset method to refresh the UI
- Tabs - Added setting to skip lazy loading for "UI only tabs"
- Tree - Allow Badges to accept a Hex Value for color

### <a name="version-4.2.6-bug-fixes">Bug Fixes</a>
- Autocomplete - Fixed runtime exception when filtering dynamically loaded lists
- Autocomplete - Fixed bug when list had two items with the same ID
- Autocomplete - Fixed bug when using mask that prevented tabbing
- Autocomplete - Fixed bug when used on OSX on a modal dialog
- Autocomplete - Fixed UI placement issue of popup on Modal.
- Colorpicker - Fix issue that caused it to not work when on a modal dialog
- Contextual Action Panel - Fixed bug that prevented datepicker from working when on a Contextual Action Panel
- Datagrid - Fixed issue in lookup that prevented the value updating back in the dataset
- Datagrid - Export to excel was missing header information in exported file
- Datagrid - Fixed UI bug on filtering when column is right aligned
- Datagrid - Fixed error when the page URL contains a space
- Datagrid - Fixes to the column width algorithm
- Datagrid - Fixed some cases where "Reset to Default" was not working correctly
- Datagrid - Fixed issue that prevented editing to work with paging
- Datagrid - Fixed issue that caused scrolling when clicking items in the personalization menu
- Datagrid - When adding a validation rule to the cells you can now get additional information from the grid for validating. check: function (value, field, grid) {
- Datagrid - Fixed dropdown editor to expand to width on narrower cells.
- Datagrid - Editors (Lookup and Datepicker), fixed issue clicking trigger icon when cell is focused.
- Datagrid - Autocomplete Editors added additional arguments to pass data to the source function
- Datagrid - Fixed issue with pager when on a card
- Datagrid - Datepicker Editor, Fixed editing issue that caused date to be one day off
- Datagrid - Fixed bug that prevented selecting rows from working while filtered
- Datagrid - Fixed bug in pager when first page equals the last page
- Datepicker - Fixed Korean and Japanese Translation Issue
- Datepicker - Fixed issue where NaNaNa is shown when selecting with some locales
- Dropdown - Fixed IE11 issue that cut off text when element is all Caps
- Dropdown - Fixed bug if &quot is part of one of the data element
- General - Fixed IE Edge bug that caused text to get cut off
- General - Fixed missing Icons on IE11
- Homepage - Fixed error message in some layouts
- Locale - Fixed Thai Translations
- Locale - Fixed hours conversion in some languages
- Locale - Fixed issues in date formatting settings in various languages
- Locale - Fixed bug in formatNumber for percent formatting
- Mask - Fixed tabbing issue in Safari (OSX)
- Mask - Fixed bug when typing numbers with a minus sign
- Modal - Fixed missing SVG's in IE11 when appended to modals
- Modal - Fixed issue in validation that stopped OK button from being enabled with datepicker on the dialog
- Multiselect - Fixed Mobile issues when selecting / checking items
- Pie Chart - Fixed overlapping issue with smaller data points
- Popupmenu - Fixed keyboarding to skip disabled items
- Popupmenu - Fixed issue causing keyboard to not work when used on contextual action panels
- Popupmenu - Fixed broken extraClass option to provide an extra css class
- Popupmenu - Fixed backwards compatibility issue with disabled items
- Popupmenu - Fixed error shown when scrolling page while open
- Popupmenu - Fixed error that occurred occasionally on Contextual Action Panels
- Popupmenu - Fixed keyboard trap on disabled items
- Tabs - Fixed a bug in activated event that caused focus to change
- Toolbar - Fix that caused hidden buttons to appear in the overflow menu
- Searchfield - Fixed destroy method to fully remove all elements
- Searchfield - Improved popup to not cover search field on full page search
- Validation - Fixed backwards compatibility issue when on accordion
- Validation - Fixed issue that caused 0 to appear as "required"
- Themes - Improved Theme Switching Flashing

### <a name="version-4.2.6-ui-changes">Ui Changes</a>
- Datagrid - Reduced left and right padding on Small and Medium Row Height so more data can be shown.
- Datagrid - Fixed missing right border
- Form Buttons - Improved themes to work when icons are added
- Popover - Fixed Dark themes
- Searchfield - Added option to work on white background and sync UI designs
- Wizard - Fixed azure color issue on first wizard tick

### <a name="version-4.2.6-whats-next">What's Next</a>
* Minor (vs patch release) 4.3 up next in approx a month.
* Design QA - Design updates to fully align to latest soho standards
* Datagrid Bug Fixes and Enhancements
* Listbuilder API improvements
* Multiselect Improvements
* Adding new Section on Widget Guidelines to soho.infor.com
* Ability to save Datagrid configuration and restore it (Filters, Columns ect)
* Improvements to circle pager to show more than one item at a time
* Collapsible Cards
* New Pattern - Composite Form
* Dropdown - Clear Selection
* Datagrid - Additional formatters and editors
* Datagrid - Expand Row, Only one at a time
* Layouts - Full width Search on the header
* Layouts - Header with call to action button
* New Component - Toggle - Toggles Stars, Hearts, Icons
* Datagrid - New Deselect Event
* Targeted Achievement - Datagrid Formatter
* Reduce size of npm deployment packages
* New Pattern - Search Form
* Datepicker - Hirji Calendar Support
* Locale - Numeric Improvements
* Tree - Have Disabled Tree nodes

## <a name="version-4.2.5">4.2.5</a>
*Release Date:* 2017-02-23
*JIRA Release Notes:* http://bit.ly/2kQycl2

### <a name="version-4.2.5-download-build-assets">Download Build Assets:</a>
* Build Server: http://bamboo.infor.com/browse/SOHO
* Npm: http://npm.infor.com

### <a name="version-4.2.5-demo-site">Demo Site</a>
http://usmvvwdev53:425/controls

### <a name="version-4.2.5-key-new-features">Key New Features</a>
* Editor - Added color picker
* jQuery - Updated from 3.1.0 to 3.1.1 (non breaking)
* Tabs - Ability to lazy load tab content; Other performance improvements

### <a name="version-4.2.5-improvements">Improvements</a>
* Datagrid - Performance improvements
* Datagrid - Column resize independently; Headers remain in sync
* Datagrid - Scrolling improvements for fixed header and mobile
* Datagrid - Added support for multi-line title
* Datagrid - Fixed Header Row - fixed issues with scrolling and column misalignment
* Datagrid - Built in columns, e.g. drilldown and selection, will now auto-size
* Datagrid Dropdown Editor - Improved keyboard support
* Dropdown - Improved search speed for large result sets
* Dropdown List - Ability to submit your selection using the tab key
* Lookup - Columns resize independently
* Personalization Stylesheet - Option to cache this stylesheet server-side to eliminate the flashing of unstyled content the page loads (see Tips)
* Popover/Tooltip - Performance improvements
* Splitter - Improved dragging performance using CSS Flexbox
* Splitter - Removed extra spacing at top and right (now aligns flush)
* Themes - Switching no longer flashes unstyled content
* Toolbar - Ability to copy title text
* Toolbar - Better handling for long titles

### <a name="version-4.2.5-bug-fixes">Bug Fixes</a>
* About Dialog - Fixed the Russian and Ukrainian translation
* Checkboxes - Fix for .asp alignment issue
* Color Picker - Fix for bug causing color picker to not open again after initial use
* Donut Chart - Fixed center label not showing in IE
* Datagrid - Fixed logic for “does not end with”
* Datagrid Tree - Fixed expanding logic for multiple child nodes
* Datagrid Tree - Fixed syncing of underlying data set
* Datagrid Tree - Fixed bug causing short row height not to work
* Datagrid - Fix to allow for empty datasets
* Datagrid - Fix to treat “0000/00000000” as an empty date
* Datagrid - Fix to remove flashing of “(N Results)” while result is loading
* Datagrid Filter Row - Fixed “Equals and Does Not Equal” Japanese translation
* Datagrid Editor - Fix for deleted data returning space character
* Datagrid Dropdown Editor - Fixed issue where open and closing the dropdown would clear the value
* Date Picker - Fixed bug that prevented tabbing out of a read-only field
* Global - Performance Fix to prevent mobile zoom logic from firing unnecessarily
* List View Multi-Select - Fixed IE 11 bug that caused the scroll to jump to the top of the list after selecting a checkbox
* Lookup - Fixed inconsistency between how single and multi-select fire the change event - in both cases the change event is now fired when the modal
* Mask - Prevents NgMode updates, Mask now passes a parameter that contains the updated value of the Masked field every time it's updated
* Module Tabs - Fixed IE layout bugs
* Search Field - Fix for bug causing multiple “all results” option
* Swaplist - Added method to refresh the swaplist when data changes
* Tabs - Fix to treat “0 more” tabs appropriately (don’t show more menu)
* Text Editor, IE - Fixed issue where only the first extra paragraph break is removed when pasting multiple paragraphs
* Toolbar - Fixed issue for disabled property on menu button options, where disabled buttons on toolbar weren’t showing as disabled when they moved to the overflow
* Tree - Fixed bug in tree reorder logic for dragging
* Validation - Fix to handle empty data-validate attribute

### <a name="version-4.2.5-breaking-changes">Breaking Changes</a>
* Datagrid - No longer forces a minimum width (exact width set is respected); Affects column widths (related to improvements for column resizing)
* List View - No longer initializes every type of component inside it for performance reasons. Instead, the developer can select which elements to initialize. You can do this manually using the render method.
* Tabs - Revised to have CSS-based transitions instead of Javascript-based. This change includes a new method of hiding tab panels by default, instead of showing them by default. This caused a breaking change that requires removing any display: none; inline-styles from .tab-panel elements that may have been pre-defined in older versions.

### <a name="version-4.2.5-ui-changes">Ui Changes</a>
* Icons - The Duplicate Icon has been updated. Make sure to update your SVG
* Positive-Negative Chart - Added more padding to separate chart from legend; moved minus sign to left of number; added padding between squares and labels on chart legend

### <a name="version-4.2.5-tips">Tips</a>
* Global - Personalization may cause a Flash of Unstyled Content (FOUC). To prevent this you now have two choices.
Set the column after loading the soho stylesheet. But before loading the soho stylesheet in the page. The order should be: Set Color, Load Style Sheet (in correct theme), Load Dom, initialize locale and components.
You can call window.Soho.getColorStyleSheet(color) and get the actually style sheet you would need to append. Then save this and add the stylesheet server side. Some colors are generated so you should use the function to get the right styles.
* Toolbar - To get longer titles to display, you may need to add some hints to what “algorithm” to use, like these:
rightAligned: false, // Will always attempt to right-align the contents of the toolbar.
maxVisibleButtons: 3, // Total amount of buttons that can be present, not including the More button
favorButtonset: true // When resizing elements inside the toolbar, setting this to "true" will try to display as many buttons as possible.  Setting to false attempts to show the entire title instead.

### <a name="version-4.2.5-other">Other</a>
* Added section to view performance tests: http://usmvvwdev53:425/performance-tests

## <a name="version-4.2.4">4.2.4 - Minor Release</a>
*Release Date:* 2017-01-10
*JIRA Release Notes:*  http://jira.infor.com/secure/ReleaseNote.jspa?version=27962&styleName=Html&projectId=10980&Create=Create&atl_token=ATP9-LKKS-XFKU-5RYX%7C7c9b3f18b5f46187205e0d24b1489b80c8b4e1a1%7Clin

### <a name="version-4.2.4-key-new-features">Key New Features</a>
* Datagrid - Reset to Default
* List Builder
* Tree Drag and Drop
* Datepicker Color Coded Legend

### <a name="version-4.2.4-breaking-changes">Breaking Changes</a>
* 2016-12-28 - Moved the "add tab button" in the Tabs component from being inside the tabset, to a floating button, similar to how the More button already works.  This is largely controlled by the component itself but it's possible to pre-define the markup for the entire Tabs component.  In these cases, this should be considered a breaking change and markup should be modified (SOHO-5436).
* 2016-12-20 - Removed some code in the Mask control that attempted to automatically detect thousands separators in a number mask.  In some cases explicit disabling of thousands separators was being overridden by this setting, so we removed it (SOHO-5445).
* 2016-12-14 - Moved all the list view examples into seperate files fx listview-status
* 2016-12-06 - Changed the name of the `deactivate` event listener on Toolbar Searchfield to `collapse`, as well as the _deactivate()_ method to _collapse()_, to avoid conflicts with the native "deactivate" event propogated in IE.  This was causing some focus issues and visual glitches in the Toolbar Searchfield (SOHO-5297).  Additionally, the `activated` event trigger was renamed to `expanded`, as well as the _activate()_ method to _expand()_, for the purposes of keeping nomenclature consistent.

### <a name="version-4.2.4-ui-changes">Ui Changes</a>
- None

### <a name="version-4.2.4-affects">Affects</a>
- Datagrid (Columns)
- Toolbar Searchfield
- Toolbar (scroll bar)
- Auto Complete / Editor (xss)
- Datepicker (seconds / time)
- Time Picker
- Tree
- List Builder (New)
- Mask

## <a name="version-4.2.3">4.2.3 - Minor Release</a>
*Release Date: 2016-12-06*
*JIRA Release Notes:* http://bit.ly/2h1veF3

### <a name="version-4.2.3-key-new-features">Key New Features</a>
* Datagrid Grouping and Summary Row
* Swap List API Improvements
* Circle Pager
* Datagrid Validation
* Ajax Dropdowns in Datagrid
* Hero Widget on Home Pages

### <a name="version-4.2.3-breaking-changes">Breaking Changes</a>
* 2016-12-05 - builder-header / subheader should have class header added fx:
class="builder-header header subheader is-personalizable"
* 2016-11-29 - Circlepager - Changed api method names **active** to **showCollapsedView** and **unactive** to **showExpandedView**.
* 2016-11-11 - Swaplist (SOHO-4552) - now returns data arrays instead of jQuery object array, so datasets should be kept in sync with the UI. This will allow for additional data, like the key values, that is not displayed to the user to be used.
* 2016-11-21 - The Button with id = "masthead-icon" on the mast head was changed to use a class. Use: <button type="button" class="masthead-icon" class="btn">

### <a name="version-4.2.3-ui-changes">Ui Changes</a>
* 2016-11-17 - Tree - Changed the selection state to only focus the element instead of the longer bar. This is more performant.

### <a name="version-4.2.3-affects">Affects:</a>
* Autocomplete
* Datagrid
* Popups
* Datepicker
* Tooltip
* Bullet Chart
* Popover
* Paging (list and Datagrid)
* Tabs
* Home pages
* Select/Dropdown

## <a name="version-4.2.2">4.2.2 - Minor Release</a>
*Release Date:* 2016-10-20
*Jira Release Notes:* http://bit.ly/2cwBELt

### <a name="version-4.2.2-key-new-features">Key New Features</a>
* Personalization
* Improved Positioning logic
* Improved Filtering and Tree grid

### <a name="version-4.2.2-breaking-changes">Breaking Changes</a>

* 2016-11-01 - Datagrid Column widths. In 4.2.1 the column widths would not be exact for plain px with eg: width: 125 in the column definition. This should be noted as you may need to adjust this if columns appear to narrow
* 2016-11-01 - Made Dropdown Component dependent on ListFilter Behavior (SOHO-4936)
* 2016-10-18 - Tree renamed method setSelectedNode to selectNode for consistency
* 2016-10-18 - Split place logic into new file place.js. This is a dependency for controls that position like datepicker, tooltip, popup.
* 2016-10-18 - Split initialize logic into 3 files personalize.js for personalization, environment.js for setting up environmental changes like global browser css tags and initialize.js for initializing controls.
* 2016-10-11 - Event personalizecolors now called change colors to match changetheme
* 2016-10-11 - Css File is now called light.scss not grey.css to match Soho Naming standards
* 2016-10-11 - tab-container module-tabs should have class is-personalizable appended for module tabs to handle personalization - SOHO-4162

### <a name="version-4.2.2-ui-changes">Ui Changes</a>
- None

## <a name="version-4.2.1">4.2.1 - Minor Release</a>
*Release Date:* 2016-10-06
*JIRA Release Notes:* http://bit.ly/2cwBELt

### <a name="version-4.2.1-key-new-features">Key New Features</a>
- None

### <a name="version-4.2.1-breaking-changes">Breaking Changes</a>
* 2016-10-05 - Pie and Donut Chart - Changed api option **legendshow** to **showLegend** for consistency.
* 2016-09-16 - Busy Indicator - Changed the **delay** setting to **displayDelay**.  When defining settings inside of the HTML markup using the _data-options_ attribute, using "delay" in some cases would cause settings on different Soho Controls that were named "delay" to conflict, causing them both to be the same number.  Changing the name of property on the more transient Busy Indicator fixed the bug, but it does cause a breaking change.  This was completely changed and there was no deprecation, in order to prevent issues with "delay" from occuring. (see SOHO-2951)

### <a name="version-4.2.1-ui-changes">Ui Changes</a>
- None

## <a name="version-4.2.1-rc1">4.2.1.rc1 - Patch Release</a>
*Release Date:* 2016-09-16
*JIRA Release Notes:* http://bit.ly/2cLADk7

### <a name="version-4.2.1-rc1-key-new-features">Key New Features</a>
* Datagrid Filter Row
* Datagrid Tree
* Bubble Chart
* Positive/Negative Chart
* Datagrid Export to XLS
* Datagrid Icon Buttons
* Datagrid Formatters for Class/ Content Visible
* Datagrid Rendering Performance Boost
* Property Sheet pattern
* Tree - Ability to add nodes with Ajax
* Splitter - Added keyboard/Aria
* Record ID styling - Options

### <a name="version-4.2.1-rc1-breaking-changes">Breaking Changes</a>
* 2016-09-21 - Reverted Changes for external SVG files. For reasons on SOHO-3932 external svg files cannot be supported. We reverted this change back. Please using inline svg's in the page.
* 2016-09-16 - tabs afteractive renamed to afteractived for consistency
* 2016-08-16 - Popupmenu classes were not mutually exclusive now both the is-selectable and has-icons class add extra left padding. It may be needed to remove has-icons if you have a selectable menu and no actual row icons or you might end up with extra space.
* 2016-08-10 - Date and TimePicker - The forceHourMode option was not used in timepicker so was removed. In Datepicker it had a buggy effect. If used it can be removed from your markup. Use the timeFormat option to control 24h vs 12h format.
* 2016-07-14 - Changed app menu so its less backwards compatible. Anyone that has written their app menu markup to sit next to the hamburger button in the header; will need to move that app menu markup to the body in their code manually. So the structure should be icons -> app menu -> page container.
* 2016-07-01 - Changed css table-layout of datagrid. This means that the widths set in columns now work more accurately. In examples previously some of the widths set did not work. Now they do. So this may require update default column widths in grids you use. If you leave width out it will auto size to content as previously.
* 2016-06-14 - Changed font weight of placeholder text to normal (from lighter)
* 2016-06-01 - Wizard now longer has disabled style as this conflicts with "not completed" style. If a situation arises where a wizard tab cannot be clicked, use error messages to indicate.
* 2016-06-01 - Updated to jQuery 3.0 (not really totally required/breaking)
* 2016-06-01 - Renamed (not frequently used) .sort plugin to .arrange.

### <a name="version-4.2.1-rc1-ui-changes">Ui Changes</a>
* 2016-08-30 - http://usmvvwdev53:421/tests/header - Shows a number of header options we added
* 2016-08-24 - Changed border color from graphite02 to graphite03 (this was a mistake and not matching design comps)
* 2016-07-13 - Datagrid alternate row colors Changed
* 2016-06-20 - Changed background color of drop down to transparent (to match designs)
* 2016-06-08 - Vertical Tabs - added 3 themes.
* 2016-06-02 - Design of Datagrid Changed to add back the column next to the selection checkboxes.
* 2016-06-02 - Design of radios/checkboxes changed to reduce size.


## <a name="version-4.2.0">4.2.0 - Minor Release</a>
*Release Date:* 2016-05-26
*JIRA Release Notes:* http://bit.ly/1OCRwLD

### <a name="version-4.2.0-key-new-features">Key New Features</a>
* Module Tabs
* Lightbox
* Datagrid Column Reorder
* Datagrid Personalization
* Expandable Area
* Error States
* Swap List
* Empty States
* Bullet Chart

### <a name="version-4.2.0-breaking-changes">Breaking Changes</a>
* 2016-05-25 - Datepicker
  - If a placeholder is provided it wont be overriden with the date format.
  - isTimepicker changed to showTime - Option value
* 2016-05-11 - Checkboxes - Changed to display inline-block. This should not cause any issues unless you forgot to wrap your checkbox elements in a field element.
* 2016-05-04 - Slider - changed the name of the _refresh()_ method to _setValue()_ so its clear that it sets the value.  _refresh()_ still exists and is marked as "deprecated" - will be removed in future releases.  Please update your code to use _setValue()_ instead of _refresh()_.
* 2016-04-26 - Expandable Area - Event Renamed from open-expandablearea, close-expandablearea to expand, collapse
* 2016-02-23 - Tree - Select Event node ommits {node: elem, data: json}

### <a name="version-4.2.0-ui-changes">Ui Changes</a>
* 2016-05-20 - Tree - Major UX changes
* 2016-05-20 - Toolbar - has version with background fill/border
* 2016-05-20 - New soho.infor.com pages - Added new pages: splitter, popover, pagination, swap list
* 2016-05-11 - Validation Errors - The styling of the validation is now on the bottom of the fields without a tooltip.
* 2016-04-11 - Lookup Area - Removed secondary header, added search.
* 2016-04-11 - Datagrid  - Some colors fx selection state changed. Themes added.
* 2016-04-26 - Expandable Area - Colors and font changed. Changed to not look like an accordion.
* 2016-04-13 - Accordion - The Accordion's default style is now an "in-page" design with less borders and configuration.  The original style is now known as a "panel" accordion.  If you wish to keep your accordion looking how it was previously, you must append a "panel" CSS class to your top-level ".accordion" element.
* 2016-04-13 - Application Menu - The changes for the Accordion in this release affect the internal accordion used by the Application Menu.  If you use this control, make sure it receives the same markup change required by other "panel"-style Accordions.
* 2016-03-07 - Changed Cards - Font size to 1.6 and Icon Color
* 2016-02-23 - Changed File Upload States. Refined all 3 themes.
* 2016-03-30 - Minor changes to the progress indicator
* 2016-03-31 - Hide Focus Support Added to Links. Note that many links will benefit from adding class hide-focus.

### <a name="version-4.2.0-dev-sever-changes">Dev Server Changes</a>
* 2016-04-08 - The Xi Controls Dev Server has been upgraded to Express 4.x.  Some of its dependancies may have changed.  If you rely on our Dev Server for examples/testing, please stop the server, delete this project's _/node\_modules/_ folder, and rerun npm install and  npm run install-test-deps.


## <a name="version-4.1.1">4.1.1 - Patch Release</a>
*Release Date:* 2016-03-18
*JIRA Release Notes:* http://bit.ly/1Upu6WS

### <a name="version-4.1.1-key-new-features">Key New Features</a>
* Splitter Control
* File Upload Control
* Empty States Widget Design
* Lightbox

### <a name="version-4.1.1-breaking-changes">Breaking Changes</a>
* 2016-03-01 - Input Fields - Changed event in datagrid from rowremove, to removerow to match other events.
* 2016-03-01 - Datagrid Control - Changed event in datagrid from rowremove, to removerow to match other events.
* 2016-02-09 - Mask Control - Due to the change in how the options are defined for the Mask Control, the "pattern" definiton no longer resides on the `data-mask` attribute.  However, the `data-mask` attribute is still necessary in order for _initialize.js_ to properly invoke a mask on an input field.  This attribute has become a boolean as a result.  Providing `data-mask` on an input element creates a mask, and not providing it will do nothing.
* 2016-02-09 - Mask Control - Making the move to normalize this Control against the others by setting things up with a `data-options` attribute instead of unqiue HTML5 `data-*` attributes.  In the next version these will no longer work.  Please update your code accordingly.

### <a name="version-4.1.1-ui-changes">Ui Changes</a>
* 2016-02-16 - Changed Hyperlink, Focus state and colors. Refined all 3 themes.
* 2016-02-16 - Changed Breadcrumb, Focus state and colors. Refined all 3 themes.
* 2016-02-16 - Action Button, changed some state colors. Refined all 3 themes.
* 2016-02-19 - Changed Slate and Graphite 10


## <a name="version-4.1.0">4.1.0 - Minor Release</a>
*Release Date:* 2016-01-26
*JIRA Release Notes:* http://bit.ly/1reEaKk

### <a name="version-4.1.0-key-new-features">Key New Features</a>
* Bullet Chart
* Datagrid Contextual Toolbar
* Design Changes for V1.2 of Design Specs

### <a name="version-4.1.0-breaking-changes">Breaking Changes</a>
* 2016-01-18 - Color Picker: the colors array should get colors in a 10xN grid.
* 2016-01-18 - "hyperlink back" class now requires use of an SVG element.
* 2016-01-18 - breadcrumb-arrow class removed use breadcrumb class for header breadcrumbs
* 2016-01-14 - Tree - requires updates to SVG icons
* 2016-01-11 - Listview - Changed the name of the listview-toolbar class to contextual-toolbar as it is shared with datagrid.
* 2016-01-11 - Listview - Modified the "dataset" property that previously could contain both an array of data, or a string containing a URL.  This has now been separated into two properties:  "dataset", which always represents the array of internal data, and "source", which is the original set of data as an array, an object, or a URL.  This normalizes the API to be similar to other controls that implement "source", and makes interfacing with the Pager control easier.
* 2016-01-11 - Listview - Changed the 'loadApi()' method to 'loadData()', to standardize against datagrid.  Did this to make the interfacing of both controls with the Pager control work better, and to be consistent.
* 2016-01-05 - Dropdown - Changed the name of the openList event to openlist for consistency.
* 2015-12-07 - Dropdown/Menu Button - Changed the size of the view box n the svg element. That needs to be updated when updating the css or dropdown arrows look too small.
* 2015-12-07 - Dropdown/Multiselect, Tabs, Vertical Tabs, Wizard - changed the name of the "activate" event to "activated", to prevent conflicts with the built-in "activate" event in Windows browsers (IE/Edge).  This issue is documented in HFC-3221.
* 2015-12-04 - Contextual Action Panel - The order in which the close/destroy methods previously worked has been changed to flow a bit more nicely.  The order was changed to accomodate HFC-3212, where a bug was discovered that caused Contextual Action Panels to leave behind markup and events from a Modal control.

### <a name="version-4.1.0-ui-changes">Ui Changes</a>
* 2016-01-25 - Swap List - Changed fonts down a size, colors.
* 2016-01-25 - Pager - Color Changes, Handle Changes, Pressed/Focus State
* 2016-01-25 - Skip Link - Dropped Drop Shadow, reduced font size
* 2016-01-25 - Modal/PopDown/Popover/Toast - Dropped Drop Shadow, since size reduction and border color increase
* 2016-01-25 - Inputs/Text Area/Search Field/Spin Box - various styles
* 2016-01-25 - Links - slight changes, font size to 12px in some situation
* 2016-01-21 - Datagrid - changed row height options, border colors, toolbar height and darkened some states
* 2016-01-21 - Pager - Updated Pager Style to match SoHo Xi Style Guide v1.2
* 2016-01-21 - Tabs - Blue Bar no longer moves with the "focus" state, and only moves when the "selected" Tab changes.
* 2016-01-21 - Dropdown/Multiselect - Reworked Style to match SoHo Xi Style Guide v1.2, can now focus items in the list after hovering or after keying with the keyboard.
* 2016-01-20 - Color Picker - Has a different popup style and swatch is moved.
* 2016-01-19 - Progress Bar - Is heigher and has darker colors.
* 2016-01-19 - Switch Control - Reworked the style to match the SoHo Xi Style Guide v1.2
* 2016-01-19 - Tabs Control - Reworked the style to match the SoHo Xi Style Guide v1.2
* 2016-01-18 - Radios - Text colors and border colors and a few states changed
* 2016-01-18 - Checkboxes - Text colors and border colors and a few states changed
* 2016-01-15 - Breadcrumbs - Text colors changed
* 2016-01-15 - Badges - Height Changed, text color changed.
* 2016-01-15 - Action Buttons - Changed the colors and all states.
* 2016-01-15 - About - Changed the text colors and added a border. Removed the redundent button.
* 2016-01-14 - Tree - Changed (finalized finally) the styles for trees, added new SVG icons, changed colors and states.
* 2015-12-09 - Datepicker - Style various styles and button positions on date picker
* 2015-11-20 - We did some fine tuning to the color pallette. The following colors have changed: azure05, azure07, amber03, amber06, amber07, amber08, amber09, amber10, emerald09, turquoise04, amethyst01, amethyst04, amethyst05, amethyst06, amethyst07, amethyst08, amethyst09, slate10, alert-orange


## <a name="version-4.0.6">4.0.6 - Patch Release</a>
*Release Date:* 2015-11-16
*JIRA Release Notes:* http://bit.ly/24CCurl

### <a name="version-4.0.6-breaking-changes">Breaking Changes</a>
* 2015-11-16 - All events are now lower case for consistency. For example some events were called beforeOpen this is now beforeopen. Ect.. Try to search your project for any events fx .on('beforeOpen') and rename. Such beforeopen, animateopen , afterstart, animateclosedcomplete, afterreset, animateclosedcomplete, afteropen, afterpaste, beforeclose, animateopencomplete, beforeactivate
* 2015-11-16 - bar-progress type chart was renamed to completion-chart
* 2015-11-16 - List detail has new markup

### <a name="version-4.0.6-ui-changes">Ui Changes</a>
* 2015-11-16 - In the High Contrast themes all colors changed from slate to the graphite spectrum
* 2015-11-16 - List detail has style changes

## <a name="version-4.0.5">4.0.5 - Patch Release</a>
*JIRA Release Notes:* http://bit.ly/24CCyY9

### <a name="version-4.0.5-key-new-features">Key New Features</a>
* Accordion Refactoring ([HFC-2886](http://jira/browse/HFC-2886))
* Lookup

### <a name="version-4.0.5-breaking-changes">Breaking Changes</a>
* 2015-??-?? Accordion Refactoring - Some markup modifications are necessary to retain compatibility with all Accordion controls.  All current examples of Accordions in this repository have been updated to reflect the new Markup (and by proxy, all Application Menus as well).  Markup Changes include:
 `<div class=".accordion-pane"></div>` elements are no longer nested inside of `<div class=".accordion-header"></div>` elements.  Place the Panes immediately following the Headers.
 All Accordion Headers that can expand and show content or subheaders will now contain a trigger button that performs this action.  In cases where the trigger isn't present, it will be created and placed correctly.  If the Accordion Header is at the top-level, the trigger will look like a "chevron" be placed immediately after the `<a>`.  If it's a sub-header, the trigger will be a (+/-) depending on its current state, and will be placed before the `<a>`.
 SVG elements containing icons are no longer placed inside of `<a>` elements.  Icons sit adjacent to the `<a>` elements either by themselves, or inside of trigger buttons.  The Accordion Control will move these icons to their proper locations automatically if they are found inside of `<a>` links.
 In order to correctly space out content inside an accordion, a new element type, `<div class="accordion-content"></div>` can be used inside accordion panes to separate the content from other accordion headers in a more semantic way.
* Datagrid sorting is now matched up via column id - where as before it was field. Should not cause any major issues as most of the time these values are the same , but this was done so that the same field can be used with different id's

### <a name="version-4.0.5-ui-changes">Ui Changes</a>
* The Accordion Control has been redesigned per a new specification ([HFC-2927](http://jira/browse/HFC-2927)).
