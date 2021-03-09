# cancel current text

Removes all text that is currently being drawn to the screen by blocks from the Story extension.

This will also cause any currently paused text blocks to immediately advance.

```sig
story.clearAllText()
```

## Example #example

This example uses the cancel current text block inside a button event to allow the player to skip text in a cutscene.

```blocks
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    story.clearAllText()
})
story.startCutscene(function () {
    story.printDialog("This game contains an epic tale of the rise and fall of the kingdom of Chambrela!", 80, 60, 120, 150)
    story.printDialog("One that couldn't possibly be understood without knowing the history of the royal family, as well as their ancestry", 80, 60, 120, 150)
    story.printDialog("Our story begins with Prince Rupert, whose father, Bartholomew, was a little known fish merchant", 80, 60, 120, 150)
    story.printDialog("Before marrying the queen, Bartholomew....", 80, 60, 120, 150)
})
```

```package
arcade-story=github:microsoft/arcade-storytelling
```
