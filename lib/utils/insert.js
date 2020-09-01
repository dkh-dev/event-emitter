'use strict'

const insertBefore = (array, item, itemAfter) => {
  const index = array.indexOf(item)
  let indexAfter = array.indexOf(itemAfter)

  if (indexAfter === -1 && index === -1) {
    return void array.push(item)
  }

  if (indexAfter === -1) {
    return
  }

  if (index !== -1 && index + 1 !== indexAfter) {
    // if it exists but it isn't before listenerAfter
    // temprarily remove it from the list
    array.splice(index, 1)

    // as an item has been removed from the list
    // indexAfter might have been updated
    indexAfter -= (index < indexAfter ? 1 : 0)
  }

  // and now adding it to the list
  array.splice(indexAfter, 0, item)
}

module.exports = insertBefore
