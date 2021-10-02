# stone

Framework Agnostic Theme based css-in-js

## About

# [WIP] IT WORKS RIGHT NOW BUT IS STILL IN ALPHA STAGES

Stylebone is fun pet project that I wanted to do.
It's based off of [AndrewPrifer/theminator](https://github.com/AndrewPrifer/theminator)'s concept of being to use simple theme configurations and using them as styles.

This though isn't very performant when working with platforms so this library aims to move it ahead by acting as a pre-processor that bundles styles for the same.

This allows us to convert needed theme into proper stylesheets when working with **web** and `StyleSheet.create` insertions when working with something like **React Native**. These are accomplished by babel plugins that create the needed files at runtime and import them as modules for web and create `Stylesheet.create` when working with React Native.

The library isn't limited to the two platforms as you can find other **handlers** (or create your own) to support you preferred platform.

## Documentation

You can read the [docs here](https://stone.reaper.im/)

## Roadmap

- [x] Create style utilities
- [ ] Create babel plugin for converting the style into a stylesheets , this can involve transpiling it to CSS or transpiling it to RN Stylesheet.Create
- [x] Add handling for color manipulation
- [ ] Add more needed plugins for the same
- [x] Write processor for handling conversion into files

## Contributing

Contributions are always welcome!

Follow the general github flow of Fork => PR, make sure that you let the authors know about the issue you pick to avoid overlaps.

## Authors

- [@barelyhuman](https://www.github.com/barelyhuman)

## Support

For support, email ahoy@barelyhuman.dev

## License

[MIT](https://choosealicense.com/licenses/mit/)
