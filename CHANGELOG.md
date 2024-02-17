# Changelog
---


### [0.33.4] (2024-02-17)


### Bug Fixes

* Fixed ```_createSessionDisplayBtn()``` and ```_createSessionRemoveBtn()``` in ```SessionElement.js``` incorrectly setting the class
  * This seems to have not caused a bug thanks to webpack compiling


### Test Changes

* Added ```SessionElement.test.js```
  * ```SessionElement.js``` passed unit testing





---
### [0.33.3] (2024-02-16)


### Code Refactoring

* Refactored ```deleteSession.js```, ```fetchUserHistory.js```, and ```fetchUsername.js``` to now use ```redirectAfterDelayMillisecond()``` if there's no loginToken, instead of just redirecting the user without any feedback


### Test Changes

* Added ```SessionAPI.test.js```
  * ```SessionAPI.js``` passed unit testing
<br>
* Added ```HistoryAPI.test.js```
  * ```HistoryAPI.js``` passed unit testing
<br>
* Added ```deleteSession.test.js```
  * ```deleteSession.js``` passed unit testing
<br>
* Added ```fetchUserHistory.test.js```
  * ```fetchUserHistory.js``` passed unit testing
<br>
* Added ```fetchUsername.test.js```
  * ```fetchUsername.js``` passed unit testing
<br>
* Added ```SessionElement.test.js```
  * ```SessionElement.js``` passed unit testing
<br>
* Fixed a flaw in the logic for ```SignInAPI.test.js``` and ```SignUpAPI.test.js```
* Fixed some unit tests using ```jest.clearAllMocks()``` instead of ```jest.resetAllMocks()```
* All modules under ```js/components/services/``` have passed unit testing


---
### [0.33.2] (2024-02-15)


### Test Changes

* Added ```RevealPassword.test.js```
  * ```RevealPassword.js``` passed unit testing
<br>
* Added ```SignUpAPI.test.js```
  * ```SignUpAPI.js``` passed unit testing
<br>
* Added ```SignInAPI.test.js```
  * ```SignInAPI.js``` passed unit testing
<br>
* All modules under ```js/components/signing/``` have passed unit testing


---
### [0.33.1] (2024-02-14)


### Code Refactoring

* Refactored ```LinksContainer.js``` to now always set ```this._linksContainerElement``` to a div with a 'links-container' class
  * There's no point in making it reusable, as it's only meant for the ```signIn.html``` and ```signUp.html``` pages
* Refactored ```signIn.js``` and ```signUp.js``` to now create an instance of ```LinksContainer``` without passing in a class


### Test Changes

* Completed ```LinksContainer.test.js``` 
* ```LinksContainer.js``` passed unit testing 


---
### [0.33.0] (2024-02-14)


### Features

* Added edge case protection for 'type' parameter in ```messagePopup.js```
  * It now includes logic to ensure that the 'type' parameter is always a **non-empty** string. If the user passes it as anything else, it will default back to 'cta' to prevent unexpected behavior
<br>

* Added edge case protection for ```redirectAfterDelayMillisecond.js``` to ensure a valid 'target' parameter is passed in
  * 'target' will now also default back to 'index.html' if includes whitespace or doesn't end with '.html'


### Code Refactoring

* Removed the default export in ```index.js``` as it served no purpose


### Test Changes

* Rewrote ```redirectAfterDelayMillisecond.test.js``` from the grounds up
  * It now properly uses Jest mock functions to ensure appropriate coverage
* ```redirectAfterDelayMillisecond.js``` passed unit testing
* Refactored a few tests to better test for when functions should always return ```undefined```
* All modules under ```js/components/global/``` have passed unit testing 


### Documentation Changes

* Moved away from imperative grammar in the changelog
  * This change also includes capitalizing the first letter in every sentence. This change should make the changelog better to read
* Slight changes to the overall structure of the changelog


---
### [0.32.0] (2024-02-13)


### Code Refactoring

* Renamed ```_reveal()``` in ```FormCheckbox.js``` to ```_revealCheck()```
* Added "hidden" class to links-container in the navbar
* Changed ```__displayUserMenuBtn``` in ```Navbar.js``` to now display either the links-container or user-menu-btn depending on whether the user is logged in
  * This change should take care of the CSS flickering for first-time users, which was caused by the links-container always being visible by default

### Test Changes

* Removed redundant tests from existing unit tests
* Refactored the logic behind some of the existing unit tests
* Refactored the testing logic in ```Navbar.Test.js``` to make better use of jest mocks to cover previously untested code
  * ```Navbar.js``` has now passed unit testing


---
### [0.31.0] (2024-02-12)


### Features

* Added favicon to all HTML pages
* Added ```_scrollIntoView()``` to ```SessionContent.js``` to ensure the browser scrolls the first add-bill button into view
  * This will help with making the next step clearer for the user
  * The function will not continue if a user is **viewing a bill from their history**
  * The function will not continue if the user's screen width is larger than **500 pixels**


### Code Refactoring

* Reworded description ```<meta>``` tag in ```index.html```
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

* Added ```<meta>``` tag to ```index.html``` to help with registering the application with Google
  * This is meant to help drive SEO and track visitor performance


---
### [0.30.3] (2024-02-11)


### Documentation Changes

* Updated ```README.md``` with a little more information about the application


### Features

* Added description ```<meta>``` tags to optimize SEO


### Code Refactoring

* Removed any trace of Font Awesome ```<i>``` element styling
* Refactored user feedback messages to use sign in/sign out terminology, not log in/log out, to ensure consistency
* Changed the background of the sign out popup message to be green to reflect a successful operation
* Added ```title``` attribute to the ```<a>``` element surrounding the title in the navbar


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
  * Refactored ```revealPassword.js``` to accommodate the use of Font Awesome SVGs
<br>
* Refactored ```_createIconContainer``` in ```billElement.js``` to accommodate the use of Font Awesome SVGs
  * It now creates a div's instead of ```<i>``` elements, and appends the SVGs created by the newly added ```_createDeleteIconSVG()``` and ```_createEditIconSVG()```


### Features

* Added keyboard navigation support for the navbar user menu button
* Added ```_createDeleteIconSVG``` in ```billElement.js``` to create the Font Awesome trash-can icon
* Added ```_createEditIconSVG``` in ```billElement.js``` to create the Font Awesome pen-to-square icon


---
### [0.29.4] (2024-02-09)


### Code Refactoring

* Discontinued the use of Google Fonts API
* Implemented the Roboto font locally to improve performance and loading time for first-time users
  * Created font folder in ```/assets/fonts/```


### Build Changes

* Updated build process for ```webpack.config.js```
  * Added ```CopyPlugin``` to bundle assets into production
  * Added support rule for loading font files


---
### [0.29.3] (2024-02-09)


### Code Refactoring

* Changed the Font Awesome CDN across all HTML files
  * This is an experimental change for the sake of enhancing load time, and might be reverted


---
### [0.29.2] (2024-02-08)


### Code Refactoring

* Removed ```disableFBCache``` module from ```index.js```
  * Forward/back caching is useful on the homepage, and won't cause any problems


---
### [0.29.1] (2024-02-08)


### Bug Fixes

* Fixed webpack build command not being ran in the last update


---
### [0.29.0] (2024-02-08)


### Code Refactoring

* Refactored ```BillModal.js```
  * Changed ```populate()``` to now be a private method under the ```billModal``` module
  * Changed ```display()``` to now call ```_populate()``` if a valid bill ID is passed in
<br>

* Refactored ```SessionContent.js```
  * ```_editBill()``` will now only call ```billModal.display()``` thanks to the above changes
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

* Updated ```AddThousandComma.Test.js``` to reflect the above bug fix


---
### [0.27.0] (2024-02-06)


### Code Refactoring

* Changed ```disableBFCache.js``` to ```disableFBCache.js```


### Bug Fixes

* Fixed forward/back cache in browsers causing pages to hang when the user navigates back to them
  * This was done by importing disableFBCache.js into every main JS file



---
### [0.26.20] (2024-02-06)


### Features

* Added ```disableBFCache.js```
  * It should reload the page if the pageshow event is persisted


### Bug Fixes

* Imported ```disableBFCache.js``` to ```session.js```
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
