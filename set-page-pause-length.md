# set page pause length

Prints some left-aligned text onto the screen within a box one character at a time.

```sig
story.setPagePauseLength(1000, 1000)
```

## Parameters

* **page pause length**: a [number](/types/number) of milliseconds that text printed to the screen should pause before advancing to the next page
* **final page pause length**: a [number](/types/number) of milliseconds that text printed to the screen should pause before disappearing on the final page


## Example #example

Create a cutscene where a duck is asking his computer about the weather, and set the page pause length to 0 to create an effect where it looks like the computer is glitching out. Set it back afterwards to continue the scene.

```blocks
let duck = sprites.create(img`
    . . . . . . . . . . b 5 b . . .
    . . . . . . . . . b 5 b . . . .
    . . . . . . b b b b b b . . . .
    . . . . . b b 5 5 5 5 5 b . . .
    . . . . b b 5 d 1 f 5 5 d f . .
    . . . . b 5 5 1 f f 5 d 4 c . .
    . . . . b 5 5 d f b d d 4 4 . .
    . b b b d 5 5 5 5 5 4 4 4 4 4 b
    b d d d b b d 5 5 4 4 4 4 4 b .
    b b d 5 5 5 b 5 5 5 5 5 5 b . .
    c d c 5 5 5 5 d 5 5 5 5 5 5 b .
    c b d c d 5 5 b 5 5 5 5 5 5 b .
    . c d d c c b d 5 5 5 5 5 d b .
    . . c b d d d d d 5 5 5 b b . .
    . . . c c c c c c c c b b . . .
    . . . . . . . . . . . . . . . .
    `, SpriteKind.Player)
duck.setPosition(40, 60)
let computer = sprites.create(img`
    . . . b b b b b b b b b . . . .
    . . b 1 d d d d d d d 1 b . . .
    . b 1 1 1 1 1 1 1 1 1 1 1 b . .
    . b d b c c c c c c c b d b . .
    . b d c 6 6 6 6 6 6 6 c d b . .
    . b d c 6 d 6 6 6 6 6 c d b . .
    . b d c 6 6 6 6 6 6 6 c d b . .
    . b d c 6 6 6 6 6 6 6 c d b . .
    . b d c 6 6 6 6 6 6 6 c d b . .
    . b d c c c c c c c c c d b . .
    . c b b b b b b b b b b b c . .
    c b c c c c c c c c c c c b c .
    c 1 d d d d d d d d d d d 1 c .
    c 1 d 1 1 d 1 1 d 1 1 d 1 1 c .
    c b b b b b b b b b b b b b c .
    c c c c c c c c c c c c c c c .
    `, SpriteKind.Player)
computer.setPosition(120, 60)
story.startCutscene(function () {
    story.spriteSayText(duck, "Computer, what's the weather like today?")
    story.spriteSayText(computer, "bzzzt", 6, 15, story.TextSpeed.VerySlow)
    story.spriteSayText(duck, "Uh, computer?")
    story.setPagePauseLength(0, 0)
    for (let index = 0; index < 2; index++) {
        story.spriteSayText(computer, "snowy", 6, 15, story.TextSpeed.VeryFast)
        story.spriteSayText(computer, "rainy", 6, 15, story.TextSpeed.VeryFast)
        story.spriteSayText(computer, "clear", 6, 15, story.TextSpeed.VeryFast)
        story.spriteSayText(computer, "hot", 6, 15, story.TextSpeed.VeryFast)
        story.spriteSayText(computer, "mostly sunny", 6, 15, story.TextSpeed.VeryFast)
        story.spriteSayText(computer, "i have no idea", 6, 15, story.TextSpeed.VeryFast)
    }
    story.setPagePauseLength(1000, 1000)
    story.spriteSayText(duck, "Okay, we might need to debug a few things...")
})
```


```package
arcade-story=github:microsoft/arcade-storytelling
```