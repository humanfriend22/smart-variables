# Smart Variables

Helper functions for better data managment & cleaner code.

### Installation
```bash
npm install smart-variables
```

### API

**createStorageVariable**

Simply synchronizes any operations with localStorage or sessionStorage.

View usage here.

**createElementVariable**

When the variable is referenced, if the internal reference is `undefined`, then a new call will be made via `document.querySelector`. This way, the element is always ready when your code runs.

View usage here.