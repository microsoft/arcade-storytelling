# sprite cancel movement

Cancel the current movement operation on a [sprite](/types/sprite).

```sig
story.cancelSpriteMovement(sprites.create(img`
    .
    `, SpriteKind.Player))
```

## Parameters

* **sprite**: a [sprite](/types/sprite) to cancel the movement operation on

## Example #example

In this example, we create a few objects and place them on the screen. Then we create a player, ask where they would like to move, and choose a destination based on that choice. Putting the cutscene code in a while loop makes it repeat forever. Pressing the B button cancels the current movement and causes the cutscene to advance.

```blocks
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    story.cancelSpriteMovement(sprite)
})
let sprite: Sprite = null
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
sprite = sprites.create(img`
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
            story.spriteMoveToLocation(sprite, rock.x, rock.y, 50)
        } else if (story.checkLastAnswer("T-Shirt")) {
            story.spriteMoveToLocation(sprite, shirt.x, shirt.y, 50)
        } else {
            story.spriteMoveToLocation(sprite, duck.x, duck.y, 50)
        }
    }
})

```


```package
arcade-story=github:microsoft/arcade-storytelling
```