# Smart Variables

Helper functions for better data managment & cleaner code.

### Installation
```bash
npm install smart-variables
```

### API

**createStorageVariable**

Simply synchronizes any operations with localStorage or sessionStorage.

View usage [here](https://github.com/humanfriend22/smart-variables/blob/da007df4c170e6ecf7d8ac418a193f3c487f478f/src/index.test.ts#L27).

**createElementVariable**

When the variable is referenced, if the internal reference is `undefined`, then a new call will be made via `document.querySelector`. This way, the element is always ready when your code runs.

View usage [here](https://github.com/humanfriend22/smart-variables/blob/da007df4c170e6ecf7d8ac418a193f3c487f478f/src/index.test.ts#L73).