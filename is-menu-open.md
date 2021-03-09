# is menu open

Checks to see if the menu created by the [show player choices]() block is currently open

```sig
story.isMenuOpen()
```


## Example #example

In this example we have a menu show up after 5 seconds to ask the user to upgrade their ship and
disable the button events we created using "is menu open".

```blocks
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(story.isMenuOpen())) {
        projectile = sprites.createProjectileFromSprite(img`
            3 3
            3 3
            3 3
            3 3
            `, sprite, 0, -100)
    }
})
info.onCountdownEnd(function () {
    story.startCutscene(function () {
        story.printText("Upgrade ship?", 80, 60)
        controller.moveSprite(sprite, 0, 0)
        story.showPlayerChoices("New Blaster", "New Thrusters", "No Thanks")
        controller.moveSprite(sprite, 100, 0)
    })
})
let projectile: Sprite = null
let sprite: Sprite = null
sprite = sprites.create(img`
    . . . . . . . c d . . . . . . .
    . . . . . . . c d . . . . . . .
    . . . . . . . c d . . . . . . .
    . . . . . . . c b . . . . . . .
    . . . . . . . f f . . . . . . .
    . . . . . . . c 4 . . . . . . .
    . . . . . . . f f . . . . . . .
    . . . . . . . e 4 . . . . . . .
    . . . . . . e e 5 2 . . . . . .
    . . . . . . e 4 5 2 . . . . . .
    . . . . . c c c 2 2 2 . . . . .
    . . . . e e 4 4 4 5 2 2 . . . .
    . . e f f f c c 2 2 f f 2 2 . .
    . e e e e 2 2 4 4 4 4 5 4 2 2 .
    e e e e e e 2 2 4 4 4 5 4 4 2 2
    e e e e e e 2 2 4 4 4 4 5 4 2 2
    `, SpriteKind.Player)
controller.moveSprite(sprite, 100, 0)
sprite.bottom = 120
info.startCountdown(5)
```

```package
arcade-story=github:microsoft/arcade-storytelling
```