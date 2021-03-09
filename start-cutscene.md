# start cutscene

Starts a cutscene running in the background in which blocks from the story extension can be used.
Blocks from the story extension pause before they finish, so they usually shouldn't be used in [on overlap tile](/reference/scene/on-overlap-tile), [on update](/reference/game/on-update), or [on update interval](/reference/game/on-update-interval) blocks unless they are wrapped in this block.

```sig
story.startCutscene(function () {

})
```

## Example #example

In this example, we create a player and an invisible event trigger. When the player overlaps the trigger, we destroy it and start a cutscene from within the overlap event.

```blocks
namespace SpriteKind {
    export const Duck = SpriteKind.create()
    export const EventTrigger = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.EventTrigger, function (sprite, otherSprite) {
    otherSprite.destroy()
    story.startCutscene(function () {
        controller.moveSprite(thePlayer, 0, 0)
        story.spriteMoveToLocation(thePlayer, thePlayer.x, 20, 100)
        story.printDialog("One day as Samantha walked to school, she encountered a duck.", 80, 90, 50, 150)
        story.printDialog("This had certainly never happened before.", 80, 90, 50, 150)
        story.printDialog("As she locked eyes with the yellow bird, she realized the gravity of this event. Her life would never be the same again.", 80, 90, 50, 150)
        story.spriteMoveToLocation(duck, 180, 20, 100)
        controller.moveSprite(thePlayer)
    })
})
let duck: Sprite = null
let thePlayer: Sprite = null
scene.setBackgroundColor(13)
thePlayer = sprites.create(img`
    b b 2 b b b b b b b . . .
    b b 2 b 3 3 3 3 3 3 . . .
    b . . b 3 3 3 3 3 3 . . .
    . . . b 3 3 1 3 3 1 . . .
    . . . b 3 3 3 3 3 3 . . .
    . . . b 3 3 3 3 3 3 . . .
    . . . . 3 3 3 3 3 3 . . .
    . . . a a a a a a a a . .
    . . a . a a a a a a . a .
    . . a . a a a a a a . a .
    . . 3 . a a a a a a . 3 .
    . . . . e e e e e e . . .
    . . . . c c c c c c . . .
    . . . . c . . . . c . . .
    `, SpriteKind.Player)
thePlayer.setStayInScreen(true)
controller.moveSprite(thePlayer)
thePlayer.setPosition(8, 53)
let event = sprites.create(img`
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    3333333333333333
    `, SpriteKind.EventTrigger)
event.setFlag(SpriteFlag.Invisible, true)
duck = sprites.create(img`
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
    `, SpriteKind.Duck)
duck.setPosition(135, 20)
```


```package
arcade-story=github:microsoft/arcade-storytelling
```