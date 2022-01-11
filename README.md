# Spellbook

> Yet another markdown notebook

## What I want

- Aesthetics (easy to change "skins")
- Code highlight
- Spellbook CLI for fetching shell commands (dunno how!)
- PlantUML rendering
- Hotkeys
- Good live search (vector space model)

## EventBus

Communication between front end components should work with events.

```js
eb.subscribe('MAGIC', () => {
  console.log('Magic happened!')
})
```

- Event without payload `eb.publish('MAGIC')`
- Event with payload `eb.publish('MAGIC', { msg: 'magical payload' })`

But maintained single source of truth? How would it work?

```js
eb.listen('key.name', (key, value, oldValue) => {
  console.log(`${key} changed from ${oldValue} to ${value}`)
})

eb.store('key.name', 1)
eb.store('key.name', 3)
```

Something like this?