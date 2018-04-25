## Running and Debugging Tests
To run BrowserStack you need to place your copy the following configuration, and place the keys in your path.

Run a specific functional test suite
 `env PROTRACTOR_SPECS='components/dropdown/dropdown.func-spec.js' npm run functional:local`

One way to update your .zprofile, .bashprofile, .bashrc, or .zshrc, or append the value on the command by setting env, `env BROWSER_STACK_USERNAME=''... #followed by the command`
```sh
export BROWSER_STACK_USERNAME=xxxxxxxxxxxxx
export BROWSER_STACK_ACCESS_KEY=yyyyyyyyyyy
```

## Debugging a Functional Test
1. Put a debugger; statement at a place in the test/code.
2. Open Chrome Dev Tools
3. Refresh the page and the debugger will pop up / or click the debugger button (had less luck with this.)

## Debugging Functional Tests
1. Put a debugger; statement at a place in the test/code for example under the `res = await AxeBuilder` command.
2. Start the server normally with `node server`
3. In another terminal run the functional test with `env PROTRACTOR_SPECS='kitchen-sink.func-spec.js' npx -n=--inspect-brk protractor test/protractor.conf.js` in watch mode
4. In Chrome open `chrome://inspect` in a new tab.
5. Click 'Open dedicated DevTools for Node.
6. Hit Play on the debugger
7. View `res.violations` in the console

## Running all Functional Tests Silently for Continuous Integration
`npm run functional:ci`

## Watching a Test
You may when building a test out want to watch it. You can leave the test running and as you change the file.
The test will rerun.

- Your test(s) will run.
- Keep the page open and console running
- Update your test and save
- Tests will run again.. Repeat..

## Test Recipes
- Click something and get result
- Open a test page and find a value (id or aria)
- Open a dropdown list and menu button
- Select a menu button menu item etc..
- Themes
- RTL

## E2E Testing Coverage
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
https://hackernoon.com/testing-your-frontend-code-part-ii-unit-testing-1d05f8d50859

## FAQ

> How come we do so much browser exclusion logic?

Each browser has a different Selenium driver with different capabilities. We plan highlight this difference for manual testing. As browser capabilities get updated, we should revisit tests that don't work. As for the Chrome exclusions, we are only testing visual regression on Chrome. Chrome is the default local functional test browser, and will be responsible for aiding the creation of the baseline images for visual regression testing.

> Why are so many Axe Rules disabled?

This a bit complex as the light theme is not completely WCAG AA... and per component in various states (open/close) may not be WCAG 2AA as well. Additional various rules are at the application level and not suitable for review on this level. Currently, this is a @TODO, we hope to enable rules like "color-contrast" which are critical to various users.

## Problems
 - Visual Regression
     - Maintaining baseline screenshots across different environments is problematic, and not consistent. The same machines need to run comparisons. Different machines can be generated their own screenshots, and compare them to screenshots on other system.
 - Browser driver differences
    - Lack of process to automate a record of differences to to aid reduction of manual testing
    - Lack of process to check automated tests manually

