# print text

Prints some text onto the screen at a location one character at a time.

```sig
story.printText("hello", 80, 60, 15, 1, story.TextSpeed.VerySlow)
```

## Parameters

* **text**: a [string](/types/string) that contains the text to print to the screen
* **x**: a [number](/types/number) representing the x coordinate the text should be centered as it prints
* **y**: a [number](/types/number) representing the y coordinate the text should be centered as it prints
* **foreground**: an optional [number](/types/number) color for the text that is printed to the screen
* **background**: an optional [number](/types/number) color for the rectangle that appears behind the text
* **speed**: an optional speed that controls how fast the text is printed

## Example #example

Create a plate sprite and a burger sprite and have the burger bounce around the screen. When the plate overlaps with the burger, show some text asking if it's time to eat. When the overlap stops, show some disappointed text.

```blocks
namespace SpriteKind {
    export const Plate = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Plate, SpriteKind.Food, function (sprite, otherSprite) {
    if (!(overlapping)) {
        overlapping = true
        story.startCutscene(function () {
            story.printText("Time to eat?", 80, 20)
        })
    }
})
let overlapping = false
let plateSprite = sprites.create(img`
    ...............bbbbbbbbbbbbbbbbbbb...............
    ...........bbbbdd111111111111111ddbbbb...........
    ........bbbd1111111111111111111111111dbbb........
    ......bbd11111111dddddddddddddd111111111dbb......
    ....bbd1111111ddd11111111111111dddd1111111dbb....
    ...bd111111ddd111111111111111111111ddd111111db...
    ..bd11111ddd111ddddddddddddddddddd111ddd11111db..
    .bd11111dd111dddd111111111111111dddd111dd11111db.
    .b11111d111ddd111111111111111111111ddd111d11111b.
    bd11111d1ddd1111111111111111111111111ddd1111111db
    b11111d1ddd111111111111111111111111111ddd1d11111b
    b11111ddddd111111111111111111111111111ddddd11111b
    b11111ddddd111111111111111111111111111dddbd11111b
    b111111dddd111111111111111111111111111dddb111111b
    bd111111dddd1111111111111111111111111dddbd11111db
    .b1111111dddd11111111111111111111111dddbd111111b.
    .bd1111111dbbdd1111111111111111111dddbbd111111db.
    ..bd11111111dbbdd111111111111111dddbbd1111111db..
    ...bd111111111dbbbbbbdddddddddddddd111111111db...
    ....bbd11111111111dbbbbbbbbbddd11111111111dbb....
    ......bbdd11111111111111111111111111111ddbb......
    ........bbbdd11111111111111111111111ddbbb........
    ...........bbbbbddd11111111111dddbbbbb...........
    ................bbbbbbbbbbbbbbbbb................
    `, SpriteKind.Plate)
let burger = sprites.create(img`
    ...........ccccc66666...........
    ........ccc4444444444666........
    ......cc444444444bb4444466......
    .....cb4444bb4444b5b444444b.....
    ....eb4444b5b44444b44444444b....
    ...ebb44444b4444444444b444446...
    ..eb6bb444444444bb444b5b444446..
    ..e6bb5b44444444b5b444b44bb44e..
    .e66b4b4444444444b4444444b5b44e.
    .e6bb444444444444444444444bb44e.
    eb66b44444bb444444444444444444be
    eb66bb444b5b44444444bb44444444be
    fb666b444bb444444444b5b4444444bf
    fcb666b44444444444444bb444444bcf
    .fbb6666b44444444444444444444bf.
    .efbb66666bb4444444444444444bfe.
    .86fcbb66666bbb44444444444bcc688
    8772effcbbbbbbbbbbbbbbbbcfc22778
    87722222cccccccccccccccc22226678
    f866622222222222222222222276686f
    fef866677766667777776667777fffef
    fbff877768f86777777666776fffffbf
    fbeffeefffeff7766688effeeeefeb6f
    f6bfffeffeeeeeeeeeeeeefeeeeebb6e
    f66ddfffffeeeffeffeeeeeffeedb46e
    .c66ddd4effffffeeeeeffff4ddb46e.
    .fc6b4dddddddddddddddddddb444ee.
    ..ff6bb444444444444444444444ee..
    ....ffbbbb4444444444444444ee....
    ......ffebbbbbb44444444eee......
    .........fffffffcccccee.........
    ................................
    `, SpriteKind.Food)
burger.setBounceOnWall(true)
burger.setVelocity(15, 25)
game.onUpdate(function () {
    if (overlapping && !(burger.overlapsWith(plateSprite))) {
        overlapping = false
        story.startCutscene(function () {
            story.printText("Awwwww....", 80, 20)
        })
    }
})

```


```package
arcade-story=github:microsoft/arcade-storytelling
```