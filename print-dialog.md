# print dialog

Prints some left-aligned text onto the screen relative to camera and within a box one character at a time.

```sig
story.printDialog(":)", 80, 90, 50, 150, 15, 1, story.TextSpeed.VerySlow)
```

## Parameters

* **text**: a [string](/types/string) that contains the text to print to the screen
* **x**: a [number](/types/number) representing the center of the box for the text to be printed in on the horizontal axis.
* **y**: a [number](/types/number) representing the center of the box for the text to be printed in on the vertical axis.
* **width**: a [number](/types/number) representing the width of the box for the text to be printed in.
* **height**: a [number](/types/number) representing the height of the box for the text to be printed in.
* **foreground**: an optional [number](/types/number) color for the text that is printed to the screen
* **background**: an optional [number](/types/number) color for the rectangle that appears behind the text
* **speed**: an optional speed that controls how fast the text is printed

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