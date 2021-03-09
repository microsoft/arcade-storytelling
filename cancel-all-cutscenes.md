# cancel all cutscenes

Cancels the current cutscene that is running within a [start cutscene]() block and all pending cutscenes. This will only cancel blocks from the "Story" category; other blocks like [ask for string](/reference/game/ask-for-string) will not be cancelled.

```sig
story.cancelAllCutscenes()
```

## Example #example

In this example, we use [cancel all cutscenes]() to interrupt a conversation when the A button is pressed.

```blocks
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    story.cancelAllCutscenes()
    story.startCutscene(function () {
        story.printCharacterText("OBJECTION!!!!", "Prosecutor")
        story.printCharacterText("That video is clearly using clips from the popular video \"CAT LUVS SUNBEAM LOL PLZ SUBSCRIBE\"", "Prosecutor")
    })
})
story.startCutscene(function () {
    story.printCharacterText("Your honor, I think you'll find that there is no way my client could have been present when the heist occurred", "Defense")
    story.printCharacterText("As you can see, the surveillance footage clearly indicates that my client was playing a charity tennis match against a cat at the time", "Defense")
})
story.startCutscene(function () {
    story.printCharacterText("He lost three straight sets. Who would make up such a shameful display?", "Defense")
    story.printCharacterText("My client sits here, ashamed, knowing that the world now sees that a cat with no interest in the sport could beat them in a game of tennis", "Defense")
    story.printCharacterText("Who would allow themselves to be subjected to such humiliation? The cat was napping in a sunbeam for most of the second set", "Defense")
    story.printCharacterText("My client had nothing to do with this terrible crime", "Defense")
})

```

```package
arcade-story=github:microsoft/arcade-storytelling
```


