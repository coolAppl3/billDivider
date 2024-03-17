# Changelog


---
### [0.40.3] (2024-03-17)


### Features

* Reworked the navigation bar and ditched the drop-down menu
  * Drop-down menu didn't make a lot of sense when it only displayed two options, and finding it wasn't very intuitive to the user
<br>
* A "History" button will no longer be shown in the hero section of `index.html`, since the same button will now permanently be visible in the navbar


### Test Changes

* Removed `index.test.js` as it currently only contains one function that hides the "Sign up" button, which is not worth unit testing


---
### [0.40.2] (2024-03-15)


### Features

* Reworked the reset button in the session header
  * If a user is editing a session, the button will be renamed to "Revert", and will only function as a way of reverting any changes made in relation to the original session that is being edited
    * Reverting a session will affect the sharedWith value as well
<br>
  * If a user is not editing a session, regardless of whether or not they're logged in, the button will be named "Reset", and will function as a way of clearing all the bills in the session
    * Resetting a session has no affect on the sharedWith value, as there's no stored value to reset to
<br>
<bv>
* `messagePopup()` now accepts a third parameter called `durationMilliseconds`, which is set to 200 by default
  * This will help give the function more utility
<br>
* Added a total bill limit of 100 bills per session
  * The user will be notified when the limit is reached through a message in the header, and the add-bill buttons will be disabled


### Bug Fixes

* Fixed reverting a session not revering the sharedWith value


---
### [0.40.1] (2024-03-13)


### Features

* If a user is editing a session, the session's reset button will now also give the user an option to revert all the changes made in relation to the original session, in addition to the two existing options of canceling the action or proceeding with clearing all the bills
  * This feature doesn't make a lot of sense when a session that has been cleared is fully emptied. Further improvements coming in the next patch


### Bug Fixes

* Removed a leftover console log in `BillModal.js`
* Fixed the session's two clear buttons relying on DOM elements, instead of the sessionInfo object 
* Fixed input validation for a bill's unshared value displaying an error message despite the directly owed checkbox being checked
  * The unshared input value, if the directly owed checkbox is checked, is omitted and replaced with 0, so validating it is unnecessary


---
### [0.40.0] (2024-03-13)

### Features

* Reworked how the save button in `session.html` works
  * If the user is logged in and is not editing a session, it will simply save the session
  * If the user is editing a session and attempts to save it with no bills, they are advised that saving the session with no bills will result in it being deleted, and are asked to confirm or cancel the action
  * If the user is editing a bill and has made changes before clicking the save button (assuming there are still bills in the session), they will be prompted to confirm if they want to override the existing bill, opt to save the current session as a new session, or cancel the action
<br>

* Renamed `_saveSession()` to `_handleSaveSession()`. It will now handle the save logic instead, and call other functions accordingly
* Added `_deleteSession()`, `_updateSession()`, and `_addSession()` to `SessionHeader.js` to handle deleting, updating, and adding sessions respectively
  * These functions will be primarily called through `_handleSaveSession()`


### Code Refactoring

* Ensured that event listeners are removed before the confirm modal element is removed from the DOM, to prevent any potential circular reference issues


---
### [0.39.0] (2024-03-11)


### Features

* Checking the "directly owed by" checkbox now doesn't reset the unshared value to 0
  * This will help avoid negative user experience if the user accidentally checks the box
  * `BillModal.js` has been updated to set the unshared value to 0 if the bill if the form is submitted while the checkbox is checked
<br>
* Full keyboard navigation support implemented to `session.html`
* App should now have full keyboard navigation support
* Added a little animation to the bill modal form when it's shown

### Bug Fixes

* Fixed the ability to set a bill's unshared value to be equal to the bill's value itself
* Fixed a minor bug in the addition of "selected" class to the currency options in the start modal


### Code Refactoring

* Improved the look and styling for the "update shared with" button in the session header
* Updated the media queries for `session.html` to improve responsiveness


---
### [0.38.0] (2024-03-09)


### Bug Fixes

* Fixed very long bill names breaking the structure of `session.html`
* Fixed very long sharedWith names breaking the structure of `session.html`
* Fixed very long bill total/split values causing line wraps in `session.html` 
* Fixed very long sharedWith names breaking the structure of `history.html`
* Fixed a leftover console log in `SessionContent.js`
* Fixed the bill's value and unshared value being evaluated against each other, before all inputs are evaluated separately first
* Fixed the "No previous sessions" text having a full height on browsers other than Chrome
* Potential fix to browsers suggesting credit card autocomplete for the log in and sign in forms


### Features

* Increased the character limit for bill names from 24 to 50
* Increased the character limit for sharedWith names from 20 to 50
* All dynamically input names and values can now be hovered and have their content fully displayed
  * This will help with any long values that are overflowing and not fully visible to the user


### Test Changes

* Updated the unit tests in `SessionElement.test.js`, `BillElement.test.js`, and `BillModal.test.js` to accommodate the changes in this patch


---
### [0.37.0] (2024-03-07)


### Code Refactoring

* Added `SignInForm.js` under `js/components/signIn/`
* Moved the main functionality from `signIn.js` to `SignInForm.js` under `js/components/signIn/` to allow for easier scaling and unit tests
* Added `SignUpForm.js` under `js/components/signIn/`
* Moved the main functionality from `signIn.js` to `SignUpForm.js` under `js/components/signIn/` to allow for easier scaling and unit tests
<br>
* Renamed `_signup()` in `SignUpForm.js` to `_signUp()` for consistency
* Renamed `_signupContainerForm` in `SignUpForm.js` to `_signUpContainerForm` for consistency
<br>
* Refactored `SignInForm.js` to make it more readable
* Refactored `SignUpForm.js` to make it more readable


### Bug Fixes

* Fixed `_signUp()` in `SignUpForm.js` not checking for a lack of a response object on any errors that are caught, and not having a default function to handle error codes apart from 401 and 409
* Removed unnecessary extra backend username validation in `users.js` under `/routes`, as there's already a username validation function


### Test Changes

* Added `SignInForm.test.js`
  * `SignInForm.js` passed unit testing
<br>
* Added `SignUpForm.test.js`
  * `SignUpForm.js` passed unit testing
<br>
* All modules under `js/components/signIn/` have passed unit testing
* All modules under `js/components/signUp/` have passed unit testing


---
### [0.36.0] (2024-03-06)


### Bug Fixes

* Fixed `_displayHeroButtons()` adding a button without a parent btn-div element


### Code Refactoring

* Refactored `History.js` to directly call `LoadingModal.display()` and `LoadingModal.remove()` instead of going through an extra step of calling a class function
* Refactored `signIn.js` to not unnecessarily call `_usernameInputIsEmpty()` and `_passwordInputIsEmpty()` twice every time


### Test Changes

* Added `index.test.js`
  * `index.js` passed unit testing
<br>
* Added `session.test.js`
  * `session.js` passed unit testing
<br>
* Added `SessionInfo.test.js`
  * `SessionInfo.js` passed unit testing
<br>
* Added `SessionReference.test.js`
  * `SessionReference.js` passed unit testing
<br>
* All modules under `js/components/session/` have passed unit testing



---
### [0.35.5] (2024-03-04)


### Code Refactoring

* Renamed `_handleSaveButtonEnabling()`  in `SessionHeader.js` to `_handleSaveButtonStatus()`
* Renamed `_enableSaveButton()`  in `SessionHeader.js` to `_enableSaveBtn()`
* Renamed `_disableSaveButton()`  in `SessionHeader.js` to `_disableSaveBtn()`
* Slightly refactored the readability of `SessionHeader.js`


### Test Changes

* Added `SessionHeader.test.js`
  * `SessionHeader.js` passed unit testing
<br>


---
### [0.35.4] (2024-03-01)


### Features

* `_clearContentList()` in `SessionContent.js` now returns undefined and displays an error message, if an invalid listOwner is passed in
* `_slideAndRemoveBill()` in `SessionContent.js` now returns undefined and stops the function, if a falsy value is passed in, or it's not an instance of HTMLElement


### Code Refactoring

* Slightly refactored the readability of `SessionContent.js`
* renamed `_scrollIntoView()` to `_scrollContentIntoView()` to avoid confusion and potential errors


### Test Changes

* Added `SessionContent.test.js`
  * `SessionContent.js` passed unit testing
<br>


---
### [0.35.3] (2024-02-27)


### Bug Fixes

* Hot fix implemented for longer shared-with and bill name values breaking the page structure in `session.html`


---
### [0.35.2] (2024-02-25)


### Code Refactoring

* Slightly refactored `deleteSession.js`, `fetchUserHistory.js`, and `fetchUsername.js` for better readability.
* Slightly refactored `InitSession.js` for better readability.
* Refactored `_changeCurrency()` in `InitSession.js` to make it simpler and less needlessly complicated
* Refactored `_getSelectedCurrency()` in `InitSession.js` to make it simpler and less needlessly complicated


### Test Changes

* Added `generateBillID.test.js`
  * `generateBillID.js` passed unit testing
<br>

* Added `InitSession.test.js`
  * `InitSession.js` passed unit testing


---
### [0.35.1] (2024-02-24)


### Test Changes

* Added `BillModal.test.js`
  * `BillModal.js` passed unit testing



---
### [0.35.0] (2024-02-22)


### Code Refactoring

* Slightly refactored `BillModal.js` to make it more readable
* Renamed server.js to app.js


### Bug Fixes

* Fixed a bug with how production files are being pushed, causing issues with caching JS files
  * A few test PRs were made while working on this fix


### Test Changes

* Refactored the improper use of toEqual() throughout all unit tests, and implemented the use of toBe() to ensure tests also check for data types where needed


---
### [0.34.0] (2024-02-20)


### Bug Fixes

* Fixed a bug where the order of stored bills was always flipped, despite the data not changing, leading to the save button being activated.
  * The bug was due to how `BillModal.js`, `SessionContent.js`, and `SessionInfo.js` handled rendering bills in a given session. All 3 modules have been adjusted and should now work fine.
* Fixed the edit icon in bill elements incorrectly having a title of "remove bill"


### Test Changes

* Added `BillElement.test.js`
  * `BillElement.js` passed unit testing


---
### [0.33.6] (2024-02-19)


### Features

* `_getTotalSessions(sessions)` under `HistoryHeader.js` now ensures that the sessions argument is not falsy or not a type of array.
* `_getLatestSessionDate(sessions)` under `HistoryHeader.js` now ensures that the sessions argument is not falsy or not a type of array.


### Code Refactoring

* Refactored how the total is calculated in `_getTotalSessions(sessions)` under `HistoryHeader.js`


### Test Changes

* Added `HistoryHeader.test.js`
  * `HistoryHeader.js` passed unit testing
<br>
* All modules under `js/components/history/` have passed unit testing


---
### [0.33.5] (2024-02-18)


### Code Refactoring

* Removed `_displaySession()` from `HistoryContent.js` as it was redundant
* Slightly refactored the code in `HistoryContent.js` to remove further small redundancies and improve readability


### Test Changes

* Added `HistoryContent.test.js`
  * `HistoryContent.js` passed unit testing


---
### [0.33.4] (2024-02-17)


### Bug Fixes

* Fixed `_createSessionDisplayBtn()` and `_createSessionRemoveBtn()` in `SessionElement.js` incorrectly setting the class
  * This seems to have not caused a bug thanks to webpack compiling


### Test Changes

* Added `SessionElement.test.js`
  * `SessionElement.js` passed unit testing


---
### [0.33.3] (2024-02-16)


### Code Refactoring

* Refactored `deleteSession.js`, `fetchUserHistory.js`, and `fetchUsername.js` to now use `redirectAfterDelayMillisecond()` if there's no loginToken, instead of just redirecting the user without any feedback


### Test Changes

* Added `SessionAPI.test.js`
  * `SessionAPI.js` passed unit testing
<br>
* Added `HistoryAPI.test.js`
  * `HistoryAPI.js` passed unit testing
<br>
* Added `deleteSession.test.js`
  * `deleteSession.js` passed unit testing
<br>
* Added `fetchUserHistory.test.js`
  * `fetchUserHistory.js` passed unit testing
<br>
* Added `fetchUsername.test.js`
  * `fetchUsername.js` passed unit testing
<br>
* Added `SessionElement.test.js`
  * `SessionElement.js` passed unit testing
<br>
* Fixed a flaw in the logic for `SignInAPI.test.js` and `SignUpAPI.test.js`
* Fixed some unit tests using `jest.clearAllMocks()` instead of `jest.resetAllMocks()`
* All modules under `js/components/services/` have passed unit testing


---
### [0.33.2] (2024-02-15)


### Test Changes

* Added `RevealPassword.test.js`
  * `RevealPassword.js` passed unit testing
<br>
* Added `SignUpAPI.test.js`
  * `SignUpAPI.js` passed unit testing
<br>
* Added `SignInAPI.test.js`
  * `SignInAPI.js` passed unit testing
<br>
* All modules under `js/components/signing/` have passed unit testing


---
### [0.33.1] (2024-02-14)


### Code Refactoring

* Refactored `LinksContainer.js` to now always set `this._linksContainerElement` to a div with a 'links-container' class
  * There's no point in making it reusable, as it's only meant for the `signIn.html` and `signUp.html` pages
* Refactored `signIn.js` and `signUp.js` to now create an instance of `LinksContainer` without passing in a class


### Test Changes

* Completed `LinksContainer.test.js` 
* `LinksContainer.js` passed unit testing 


---
### [0.33.0] (2024-02-14)


### Features

* Added edge case protection for 'type' parameter in `messagePopup.js`
  * It now includes logic to ensure that the 'type' parameter is always a **non-empty** string. If the user passes it as anything else, it will default back to 'cta' to prevent unexpected behavior
<br>

* Added edge case protection for `redirectAfterDelayMillisecond.js` to ensure a valid 'target' parameter is passed in
  * 'target' will now also default back to 'index.html' if includes whitespace or doesn't end with '.html'


### Code Refactoring

* Removed the default export in `index.js` as it served no purpose


### Test Changes

* Rewrote `redirectAfterDelayMillisecond.test.js` from the grounds up
  * It now properly uses Jest mock functions to ensure appropriate coverage
* `redirectAfterDelayMillisecond.js` passed unit testing
* Refactored a few tests to better test for when functions should always return `undefined`
* All modules under `js/components/global/` have passed unit testing 


### Documentation Changes

* Moved away from imperative grammar in the changelog
  * This change also includes capitalizing the first letter in every sentence. This change should make the changelog better to read
* Slight changes to the overall structure of the changelog


---
### [0.32.0] (2024-02-13)


### Code Refactoring

* Renamed `_reveal()` in `FormCheckbox.js` to `_revealCheck()`
* Added "hidden" class to links-container in the navbar
* Changed `__displayUserMenuBtn` in `Navbar.js` to now display either the links-container or user-menu-btn depending on whether the user is logged in
  * This change should take care of the CSS flickering for first-time users, which was caused by the links-container always being visible by default

### Test Changes

* Removed redundant tests from existing unit tests
* Refactored the logic behind some of the existing unit tests
* Refactored the testing logic in `Navbar.Test.js` to make better use of jest mocks to cover previously untested code
  * `Navbar.js` has now passed unit testing


---
### [0.31.0] (2024-02-12)


### Features

* Added favicon to all HTML pages
* Added `_scrollIntoView()` to `SessionContent.js` to ensure the browser scrolls the first add-bill button into view
  * This will help with making the next step clearer for the user
  * The function will not continue if a user is **viewing a bill from their history**
  * The function will not continue if the user's screen width is larger than **500 pixels**


### Code Refactoring

* Reworded description `<meta>` tag in `index.html`
* Changed the order of bills in sessions to always display the most recently-added bill on top
* Changed mobile phone media queries to now start at widths equal to 450px or below


### Bug Fixes

* Fixed title values in the history header not having a height when empty
  * This will help prevent the title from moving around while the data loads for first-time visitors


### Build Changes

* Added hashing to css file names in production to help with cache busting new releases


---
### [0.30.4] (2024-02-11)


### Features

* Added `<meta>` tag to `index.html` to help with registering the application with Google
  * This is meant to help drive SEO and track visitor performance


---
### [0.30.3] (2024-02-11)


### Documentation Changes

* Updated `README.md` with a little more information about the application


### Features

* Added description `<meta>` tags to optimize SEO


### Code Refactoring

* Removed any trace of Font Awesome `<i>` element styling
* Refactored user feedback messages to use sign in/sign out terminology, not log in/log out, to ensure consistency
* Changed the background of the sign out popup message to be green to reflect a successful operation
* Added `title` attribute to the `<a>` element surrounding the title in the navbar


---
### [0.30.2] (2024-02-11)


### Bug Fixes

* Fixed font files being copied into two different locations due to a webpack misconfiguration


---
### [0.30.1] (2024-02-09)


### Bug Fixes

* Fixed Font Awesome CDN not being removed in a few pages in the last PR


---
### [0.30.0] (2024-02-09)


### Code Refactoring

* Replaced Font Awesome icons with local SVGs and discontinued the use of Font Awesome CDN
  * Refactored `revealPassword.js` to accommodate the use of Font Awesome SVGs
<br>
* Refactored `_createIconContainer` in `billElement.js` to accommodate the use of Font Awesome SVGs
  * It now creates a div's instead of `<i>` elements, and appends the SVGs created by the newly added `_createDeleteIconSVG()` and `_createEditIconSVG()`


### Features

* Added keyboard navigation support for the navbar user menu button
* Added `_createDeleteIconSVG` in `billElement.js` to create the Font Awesome trash-can icon
* Added `_createEditIconSVG` in `billElement.js` to create the Font Awesome pen-to-square icon


---
### [0.29.4] (2024-02-09)


### Code Refactoring

* Discontinued the use of Google Fonts API
* Implemented the Roboto font locally to improve performance and loading time for first-time users
  * Created font folder in `/assets/fonts/`


### Build Changes

* Updated build process for `webpack.config.js`
  * Added `CopyPlugin` to bundle assets into production
  * Added support rule for loading font files


---
### [0.29.3] (2024-02-09)


### Code Refactoring

* Changed the Font Awesome CDN across all HTML files
  * This is an experimental change for the sake of enhancing load time, and might be reverted


---
### [0.29.2] (2024-02-08)


### Code Refactoring

* Removed `disableFBCache` module from `index.js`
  * Forward/back caching is useful on the homepage, and won't cause any problems


---
### [0.29.1] (2024-02-08)


### Bug Fixes

* Fixed webpack build command not being ran in the last update


---
### [0.29.0] (2024-02-08)


### Code Refactoring

* Refactored `BillModal.js`
  * Changed `populate()` to now be a private method under the `billModal` module
  * Changed `display()` to now call `_populate()` if a valid bill ID is passed in
<br>

* Refactored `SessionContent.js`
  * `_editBill()` will now only call `billModal.display()` thanks to the above changes
<br>

* Changed html files to only request the in-use robot-fonts from Google Fonts


### Bug Fixes

* Fixed Firefox falling back to the default font family for input and button elements
  *  Needed to specify the font family for both elements globally
* Fixed password reveal icon (eye) showing in password inputs elements next to the one by the app

---
### [0.28.0] (2024-02-07)


### Bug Fixes

* Fixed hardcoded laTest session date flickering before data is displayed
* Fixed chevron in session containers being clipped when rotated downwards
* Fixed bill modal not displaying the accurate disabled/enabled state for the unshared input


---
### [0.27.1] (2024-02-06)


### Bug Fixes

* Fixed spans in session header displaying an empty string, instead of 0.00 when needed
  * Issue was with AddThousandComma.js and the fact that 0 is falsy


### Test Changes

* Updated `AddThousandComma.Test.js` to reflect the above bug fix


---
### [0.27.0] (2024-02-06)


### Code Refactoring

* Changed `disableBFCache.js` to `disableFBCache.js`


### Bug Fixes

* Fixed forward/back cache in browsers causing pages to hang when the user navigates back to them
  * This was done by importing disableFBCache.js into every main JS file



---
### [0.26.20] (2024-02-06)


### Features

* Added `disableBFCache.js`
  * It should reload the page if the pageshow event is persisted


### Bug Fixes

* Imported `disableBFCache.js` to `session.js`
  * It should prevent the page from just hanging if the user goes back to it using the browser


### Code Refactoring

* Removed meta tag that prevented browser caching


---
### [0.26.19] (2024-02-06)


### Bug Fixes

* Disabled browser caching
  * Experimental change


---
### [0.26.18] (2024-02-05)


### Test Changes

* Test changelog
  * Testing how the changelog will display ths contents.


---
### [0.26.17] (2024-02-05)


### Code Refactoring

* Remove standard-version
  * Will manually write the changelog file moving forward


---
### [0.26.16] (2024-02-05)


### Features

* Added standard-version to generate changelog


### Code Refactoring

* Removed JSON response for endpoints not specified in API
