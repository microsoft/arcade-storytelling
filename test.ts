// story.printDialog("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", 80, 60, 1, 15, story.TextSpeed.Fast) 
controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
    story.clearQueuedStoryParts();
    game.splash("CLEARED!");
})

story.queueStoryPart(() => {
    story.printDialog("Here is some test text. it's got some punctuation, and i wouldn't love if it didn't break like i expected it too.", 80, 90, 50, 150, 0xF, 0x1, story.TextSpeed.VeryFast);
});
story.queueStoryPart(() => {
    story.printDialog("Here is some more text; if you pressed A to clear before this started and it's still showing up, something is wrong :(", 80, 90, 50, 150);
});
