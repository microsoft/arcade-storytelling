# sprite move to position

Moves a [sprite](/types/sprite) directly to a specific x y position and pauses until the move is complete. If there are walls blocking the [sprite](/types/sprite), it will attempt to move and then teleport to its final destination.

A [sprite](/types/sprite) can only have one movement operation active at a time, so calling this on a sprite that is already moving will cancel the other task.

```sig
story.spriteMoveToLocation(sprites.create(img`
    .
    `, SpriteKind.Player), 0, 0, 100)
```

## Parameters

* **sprite**: a [sprite](/types/sprite) to move to a position
* **x**: a [number](/types/number) x position to move to
* **y**: a [number](/types/number) y position to move to
* **speed**: a [number](/types/number) representing how fast the [sprite](/types/sprite) should move to its destination

## Example #example

In this example, we create a few objects and place them on the screen. Then we create a player, ask where they would like to move, and choose a destination based on that choice. Putting the cutscene code in a while loop makes it repeat forever.


```blocks
let rock = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . b b b b b b b . . . .
    . . . . b b b b b b b b b . . .
    . . . b b b b b b b b b b . . .
    . . . b b b b b b b b b b . . .
    . . . b b b b b b b b b b b . .
    . . c b b b b b b b b b b b . .
    . . c b b b b b b b b b b b . .
    . . c b b b b b b b b b b b . .
    . . c c c c b b b b b b b b . .
    . . . . . c c c c c c c c c . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    `, SpriteKind.Player)
rock.setPosition(24, 21)
let shirt = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . b b b b b b b b . . . .
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
    2 2 2 2 c 2 c 2 2 2 c 2 2 2 2 2
    2 2 2 c c c c c 2 c c 2 2 2 2 2
    . . 2 2 c 2 c 2 2 2 c 2 2 2 . .
    . . 2 c c c c c 2 2 c 2 2 2 . .
    . . 2 2 c 2 c 2 2 c c c 2 2 . .
    . . 2 2 2 2 2 2 2 2 2 2 2 2 . .
    . . c c 2 2 2 c 2 2 c c 2 2 . .
    . . c 2 c 2 c 2 c 2 c 2 c 2 . .
    . . c 2 c 2 c c c 2 c 2 c 2 . .
    . . c c 2 2 c 2 c 2 c c 2 2 . .
    . . 2 2 2 2 2 2 2 2 2 2 2 2 . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    `, SpriteKind.Player)
shirt.setPosition(71, 98)
let duck = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . 5 5 5 . . . . . . . .
    . . . . . 5 f 5 . . . . . . . .
    . . . . 4 5 5 5 . . . . . . . .
    . . . . . . . 5 . . . . . . . .
    . . . . . . . 5 5 5 5 5 5 5 . .
    . . . . . . . 5 5 5 5 5 5 . . .
    . . . . . . . 5 5 5 5 5 5 . . .
    . . . . . . . . 4 . 4 . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    `, SpriteKind.Player)
duck.setPosition(132, 23)
let sprite = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . b b . . . . . . . . . . .
    . . . b b b b b b b b b b . . .
    . . . . 3 3 3 3 3 3 3 3 b . . .
    . . . . 3 1 3 3 1 3 3 3 b . . .
    . . . . 3 3 3 3 3 3 3 3 . . . .
    . . . . 3 3 3 3 3 3 3 3 . . . .
    . . . a a a c a a a a a a . . .
    . . a . a b c a c c a a . a . .
    . . a . a a c a a a a a . a . .
    . . a . a b c a a a a a . a . .
    . . 3 . a a c a a a a a . 3 . .
    . . . . e e 4 e e e e e . . . .
    . . . . c c c c c c c c . . . .
    . . . . c c c c c c c c . . . .
    . . . . c . . . . . . c . . . .
    `, SpriteKind.Player)
scene.setBackgroundColor(7)
story.startCutscene(function () {
    while (true) {
        story.spriteSayText(sprite, "Hmm...")
        story.spriteSayText(sprite, "Where should I walk?")
        story.showPlayerChoices("Rock", "T-Shirt", "Duck")
        if (story.checkLastAnswer("Rock")) {
            story.spriteMoveToLocation(sprite, rock.x, rock.y, 100)
        } else if (story.checkLastAnswer("T-Shirt")) {
            story.spriteMoveToLocation(sprite, shirt.x, shirt.y, 100)
        } else {
            story.spriteMoveToLocation(sprite, duck.x, duck.y, 100)
        }
    }
})

```


```package
arcade-story=github:microsoft/arcade-storytelling
```