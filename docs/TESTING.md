## @TODOS
- Prioritizing Initial Components
  - Button
  - Dropdown
  - Multiselect
  - Listview
  - PopupMenu
- ~~Screenshots~~
- ~~Protractor Recipes~~

## Unit Testing
In computer programming, unit testing is a software testing method by which individual units of source code, sets of one or more computer program modules together with associated control data, usage ...

## Functional Testing
Functional testing is a software testing process used within software development in which software is tested to ensure that it conforms with all requirements.

Test whether the flow of an application is performing as designed from start to finish.

Targeting
  - By ID
  - By Property (aria properties)
      element(by.css('div[aria-controls=dropdown-list]'))

It also may include integration testing which is the phase in software testing in which individual software modules are combined and tested as a group
  - Clicking on elements, looking on the page, accessibility


It also maybe include regression testing, which is a type of software testing which verifies that software which was previously developed and tested still performs the same way after it was changed or interfaced with other software.
  - Screen Shots
     - We are utilizing a plugin to aide with the collection, and analysis of screenshots. On Chrome only currently, we capture screenshots, and compare them to a baseline(most current and valid) screenshots
     - The tool will capture screenshots, and save the screenshots to the `../.tmp/actual/` directory. If the screenshot is valid, and can then be moved to the baseline directory where it should be committed, and saved in the git repository.

## Running and Debugging Tests
Run just the api spec, for debugging with Chrome. For debugging use statements in the unit tests, and open Chrome DevTools
 `KARMA_SPECS='components/dropdown/unit/dropdown-api.spec.js' npm run local:unit` // Only runs API spec

Run several spec tests with a Glob, for debugging with Chrome.
 `KARMA_SPECS='components/dropdown/unit/dropdown*.spec.js' npm run local:unit` // Glob example

Run just an api test, headless.
 `env KARMA_SPECS='components/locale/unit/locale-api.spec.js' npm run ci:unit`

To run BrowserStack you need to place your copy the following configuration, and place the keys in your path.

Run a specific functional test suite
 `env PROTRACTOR_SPECS='components/dropdown/functional/dropdown.functional-spec.js' npm run local:functional`

One way to update your .zprofile, .bashprofile, .bashrc, or .zshrc, or append the value on the command by setting env, `env BROWSER_STACK_USERNAME=''... #follwed  by the command`
```sh
export BROWSER_STACK_USERNAME=xxxxxxxxxxxxx
export BROWSER_STACK_ACCESS_KEY=yyyyyyyyyyy
```

## Debugging a Unit Test
1. Put a debugger; statement at a place in the test/code.
2. Run the unit test with `env KARMA_SPECS='components/locale/unit/locale-api.spec.js' npm run local:unit`
4. Open Chrome tools
5. Refresh the page and the debugger will pop up / or click the debugger button (had less luck with this.)

## Debugging Functional Tests
1. Put a debugger; statement at a place in the test/code for example under the `res = await AxeBuilder` command.
2. Start the server normally with `node server`
3. In another terminal run the functional test with `env PROTRACTOR_SPECS='test/kitchen-sink.functional-spec.js' npx -n=--inspect-brk protractor protractor.conf.js` in watch mode
4. In Chrome open `chrome://inspect` in a new tab.
5. Click 'Open dedicated DevTools for Node.
6. Hit Play on the debugger
7. View `res.violations` in the console

## Running all Unit Tests Silently for Continuous Integration
`npm run ci:unit`

## Running all Unit Tests on BrowserStack
After configuration, `npm run browserstack:unit`

## Watching a Test
You may when building a test out want to watch it. You can leave the test running and as you change the file.
The test will rerun.

1. Run the targeted request test with a command like `env KARMA_SPECS='components/locale/unit/locale-api.spec.js' npm run local:unit`
3. Your test(s) will run.
4. Keep the page open and console running
5. Update your test and save
6. Tests will run again.. Repeat..

## Checking Unit Test Coverage
1. Run the test with `env KARMA_SPECS='components/locale/unit/locale-api.spec.js' npm run local:unit`
2. While the browser is open. Go to `cd coverage`
3. Start a simple web server `python -m SimpleHTTPServer`
4. Open up a browser and go to http://localhost:8000/ and browse in to the page

## Test Recipes
- Click something and get result
- Open a test page and find a value (id or aria)
- Open a dropdown list and menu button
- Select a menu button menu item etc..
- Themes
- RTL

## Functional Testing Coverage
* Excluding screen reader (JAWS, etc) testing

##### Testing Coverage Rating Scale
☹️ 😕 🙂 😁

Component | Functional Test Coverage
------------- | :-------------:
Dropdown | ☹️
MultiSelect | 🙂
Validation | ☹️
Popupmenu | 😕
Button | 😁

## Testing Resources

List of All "Matchers"
https://jasmine.github.io/api/3.0/matchers.html

Karma Adaptors
https://www.npmjs.com/browse/keyword/karma-adapter

Testing Overview
https://medium.com/powtoon-engineering/a-complete-guide-to-testing-javascript-in-2017-a217b4cd5a2a
https://blog.kentcdodds.com/write-tests-not-too-many-mostly-integration-5e8c7fff591c
http://jasonrudolph.com/blog/2008/10/07/testing-anti-patterns-potpourri-quotes-resources-and-collective-wisdom/
https://marcysutton.github.io/a11y-and-ci/#/

https://codecraft.tv/courses/angular/unit-testing/jasmine-and-karma/

Coverage
https://github.com/dwyl/learn-istanbul

## FAQ

> How come we do so much browser exclusion logic?

Each browser has a different Selenium driver with different capabilities. We plan highlight this difference for manual testing. As browser capabilities get updated, we should revisit tests that don't work. As for the Chrome exclusions, we are only testing visual regression on Chrome. Chrome is the default local functional test browser, and will be responsible for aiding the creation of the baseline images for visual regression testing.

> Why are so many Axe Rules disabled?

This a bit complex as the light theme is not completely WCAG AA... and per component in various states (open/close) may not be WCAG 2AA as well. Additional various rules are at the application level and not suitable for review on this level. Currently, this is a @TODO, we hope to enable rules like "color-contrast" which are critical to various users.
