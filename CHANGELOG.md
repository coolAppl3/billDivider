# Changelog
---


### [0.28.0] (2024-02-07)


### Bug Fixes

* fix hardcoded latest session date flickering before data is displayed
* fix chevron in session containers being clipped when rotate downwards
* fix bill modal not displaying the accurate disabled/enabled state for the unshared input


### [0.27.1] (2024-02-06)


### Bug Fixes

* fix spans in session header displaying an empty string, instead of 0.00 when needed
  * issue was with addThousandComma.js and the fact that 0 is falsy


### Test Changes

* update addThousandComma.test.js to reflect the above bug fix



### [0.27.0] (2024-02-06)


### Code Refactoring

* change disableBFCache.js to disableFBCache.js


### Bug Fixes

* fixed forward/back cache in browsers causing pages to hang when the user navigates back to them
  * this was done by importing disableFBCache.js into every main JS file



### [0.26.20] (2024-02-06)


### Features

* add disableBFCache.js
  * it should reload the page if the pageshow event is persisted


### Bug Fixes

* import disableBFCache.js to session.js
  * it should prevent the page from just hanging if the user goes back to it using the browser


### Code Refactoring

* remove meta tag that prevented browser caching



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
