# MobX Intro Project
_An introduction to MobX. Run with `npm run start`._

## Resources

**YouTube**
- [React JS: How to use MobX for State Management](https://www.youtube.com/watch?v=2ejs-uxSbAk)
- [MobX tutorial #1 - MobX + React is AWESOME](https://www.youtube.com/watch?v=_q50BXqkAfI)
- [Introduction to MobX & React in 2020](https://www.youtube.com/watch?v=pnhIJA64ByY) - uses context also
- [Introduction to MobX and React](https://www.youtube.com/watch?v=Dp75-DnGFrU) - a bit outdated (2017)

**Other resources**
- [Promise state with React + Mobx](https://medium.com/@ridermansb/promise-state-with-react-mobx-86ab4054f43c)
- [Handling data and using decorators with React Components](https://moduscreate.com/blog/ext-js-to-react-handling-data-with-mobx/)
- [Mobx local and external state](https://mobx.js.org/react-integration.html#local-and-external-state)
- [Proxy Objects and toJS](https://stackoverflow.com/questions/51596874/set-array-of-data-into-mobx-array-show-proxy-objects)

**Official Docs**
- [MobX getting started](https://mobx.js.org/getting-started)

## Stack
- [x] MobX - basic setup with Todo list
- [ ] TypeScript
- [ ] [Blueprint.js](https://blueprintjs.com/) - UI Framework
- [ ] React Testing Library

## Learnings
- Using decorators in the store (4th tutorial above) initially didn't work. Using a constructor, and defining functions as `action` and `computed` did.
- Need to set some functions as getters in the store with the `get` keyword
- `toJS` from `mobx` should be used to log out data from the store in a readable way. This is not required for rendering.

## The actual project / roadmap
Todo lists are a great place to start learning a basic thing, but they are a basic thing.
Here is an idea to build up complexity, and make something cool:

- Use YouTube Api to fetch a user's youtube, and all of their videos
- Display a filtering mechanism for the videos
- Filtering should be multi-dimensional. Broader categories of lots of videos will have narrower sub categories containing fewer videos
- If filtering can't be multi-dimensional, one feature should filter, the other should sort
- For example:
  - dropdown 1 shows `all videos` or `playlists`
  - dropdown 2 sorts by `date range`, `a-z`, `z-a`, or `category`
- Add a favourites feature, with a toast / popup from Blueprint.js. Use the Todos functionality for this.
- Implement a searchbar with typeahead functionality
