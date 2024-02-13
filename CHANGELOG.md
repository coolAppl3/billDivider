# Changelog
---


### [0.32.0] (2024-02-13)


### Code Refactoring

* rename ```_reveal()``` in ```FormCheckbox.js``` to ```_revealCheck()```
* add "hidden" class to links-container in the navbar
* change ```__displayUserMenuBtn``` in ```Navbar.js``` to now display either the links-container or user-menu-btn depending on whether the user is logged in
  * this change should take care of the CSS flickering for first-time users, which was caused by the links-container always being visible by default

### Test Changes

* remove redundant tests from existing unit tests
* refactor the logic behind some of the existing unit tests
* refactor the testing logic in ```Navbar.test.js``` to make better use of jest mocks to cover previously untested code
  * ```Navbar.js``` has now passed unit testing


---
### [0.31.0] (2024-02-12)

### Features

* add favicon to all HTML pages
* add ```_scrollIntoView()``` to ```SessionContent.js``` to ensure the browser scrolls the first add-bill button into view
  * this will help with making the next step clearer for the user
  * the function will not continue if a user is **viewing a bill from their history**
  * the function will not continue if the user's screen width is larger than **500 pixels**


### Code Refactoring

* reword description ```<meta>``` tag in ```index.html```
* change the order of bills in sessions to always display the most recently-added bill on top
* change mobile phone media queries to now start at widths equal to 450px or below


### Bug Fixes

* fix title values in the history header not having a height when empty
  * this will help prevent the title from moving around while the data loads for first-time visitors


### Build Changes

* add contenthash to css file names in production to help with cache busting new releases


---
### [0.30.4] (2024-02-11)


### Features

* add ```<meta>``` tag to ```index.html``` to help with registering the application with google
  * this is meant to help drive SEO and track visitor performance


---
### [0.30.3] (2024-02-11)


### Documentation Changes

* update ```README.md``` with a little more information about the application


### Features

* add description ```<meta>``` tags to optimize SEO


### Code Refactoring

* remove any trace of Font Awesome ```<i>``` element styling
* refactor user feedback messages to use sign in/sign out terminology, not log in/log out, to ensure consistency
* change the background of the sign out popup message to be green to reflect a successful operation
* add ```title``` attribute to the ```<a>``` element surrounding the title in the navbar


---
### [0.30.2] (2024-02-11)


### Bug Fixes

* fix font files being copied into two different locations due to a webpack misconfiguration


---
### [0.30.1] (2024-02-09)


### Bug Fixes

* fix Font Awesome CDN not being removed in a few pages in the last PR


---
### [0.30.0] (2024-02-09)

### Code Refactoring

* replace Font Awesome icons with local SVGs and discontinued the use of Font Awesome CDN
  * refactor ```revealPassword.js``` to accommodate the use of Font Awesome SVGs
<br>
* refactor ```_createIconContainer``` in ```billElement.js``` to accommodate the use of Font Awesome SVGs
  * it now creates a div's instead of ```<i>``` elements, and appends the SVGs created by the newly added ```_createDeleteIconSVG()``` and ```_createEditIconSVG()```


### Features

* add keyboard navigation support for the navbar user menu button
* add ```_createDeleteIconSVG``` in ```billElement.js``` to create the Font Awesome trash-can icon
* add ```_createEditIconSVG``` in ```billElement.js``` to create the Font Awesome pen-to-square icon


---
### [0.29.4] (2024-02-09)


### Code Refactoring

* discontinue the use of Google Fonts API
* implement Roboto font locally to improve performance and loading time
  * create font folder in assets


### Build Changes

* update build process for ```webpack.config.js```
  * add ```CopyPlugin``` to bundle assets into production
  * add support rule for loading font files


---
### [0.29.3] (2024-02-09)


### Code Refactoring

* change the Font Awesome CDN across all HTML files
  * this is an experimental change for the sake of enhancing load time, and might be reverted


---
### [0.29.2] (2024-02-08)


### Code Refactoring

* remove ```disableFBCache``` module from ```index.js```
  * forward/back caching is useful on the homepage, and won't cause any problems


---
### [0.29.1] (2024-02-08)


### Bug Fixes

* fix webpack build command not being ran in the last update


---
### [0.29.0] (2024-02-08)


### Code Refactoring

* refactor ```BillModal.js```
  * change ```populate()``` to now be a private method under the ```billModal``` module
  * change ```display()``` to now call ```_populate()``` if a valid bill ID is passed in
<br>

* refactor ```SessionContent.js```
  * ```_editBill()``` will now only call ```billModal.display()``` thanks to the above changes
<br>

* change html files to only request the in-use robot-fonts from Google Fonts


### Bug Fixes

* fix Firefox falling back to the default font family for input and button elements
  *  needed to specify the font family for both elements globally
* fix password reveal icon (eye) showing in password inputs elements next to the one by the app

---
### [0.28.0] (2024-02-07)


### Bug Fixes

* fix hardcoded latest session date flickering before data is displayed
* fix chevron in session containers being clipped when rotated downwards
* fix bill modal not displaying the accurate disabled/enabled state for the unshared input


---
### [0.27.1] (2024-02-06)


### Bug Fixes

* fix spans in session header displaying an empty string, instead of 0.00 when needed
  * issue was with addThousandComma.js and the fact that 0 is falsy


### Test Changes

* update addThousandComma.test.js to reflect the above bug fix


---
### [0.27.0] (2024-02-06)


### Code Refactoring

* change disableBFCache.js to disableFBCache.js


### Bug Fixes

* fixed forward/back cache in browsers causing pages to hang when the user navigates back to them
  * this was done by importing disableFBCache.js into every main JS file



---
### [0.26.20] (2024-02-06)


### Features

* add disableBFCache.js
  * it should reload the page if the pageshow event is persisted


### Bug Fixes

* import disableBFCache.js to session.js
  * it should prevent the page from just hanging if the user goes back to it using the browser


### Code Refactoring

* remove meta tag that prevented browser caching


---
### [0.26.19] (2024-02-06)


### Bug Fixes

* disable browser caching
  * experimental change


---
### [0.26.18] (2024-02-05)


### Test Changes

* test changelog
  * testing how the changelog will display ths contents.


---
### [0.26.17] (2024-02-05)


### Code Refactoring

* remove standard-version
  * will manually write the changelog file moving forward


---
### [0.26.16] (2024-02-05)


### Features

* add standard-version to generate changelog


### Code Refactoring

* remove JSON response for endpoints not specified in API
