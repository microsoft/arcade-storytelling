namespace story {
    let stateStack: ConversationState[];

    enum State {
        Idle,
        Running,
        Cancelled
    }

    class ConversationState {
        state: State;
        lastAnswer: string;
        registeredMenuHandler: boolean;
        currentTask: story.Task;
        soundEnabled: boolean;
        cutsceneQueue: (() => void)[];

        constructor() {
            this.state = State.Idle;
            this.soundEnabled = true;
            this.cutsceneQueue = [];
        }

        showMenu(choices: string[]) {
            if (this.state === State.Cancelled) return;
            if (!this.registeredMenuHandler) {
                this.registeredMenuHandler = true;
                story.menu.onMenuOptionSelected((option: string, index: number) => {
                    this.lastAnswer = option;
                    story.menu.closeMenu();
                });
            }

            let arrows = img`
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 6 6 6 6 6 6 6 1
                1 1 1 1 6 1 1 1 1 6 6 6 6 6 6 6 1
                1 1 1 1 6 1 1 1 1 1 6 6 6 6 6 1 1
                1 1 1 6 6 6 1 1 1 1 6 6 6 6 6 1 1
                1 1 1 6 6 6 1 1 1 1 1 6 6 6 1 1 1
                1 1 6 6 6 6 6 1 1 1 1 6 6 6 1 1 1
                1 1 6 6 6 6 6 1 1 1 1 1 6 1 1 1 1
                1 6 6 6 6 6 6 6 1 1 1 1 6 1 1 1 1
                1 6 6 6 6 6 6 6 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
            `
            let abutton = img`
                1 1 1 1 1 1 1 1 1 1 1
                1 1 1 6 6 6 6 6 1 1 1
                1 1 6 6 6 6 6 6 6 1 1
                1 6 6 6 6 1 6 6 6 6 1
                1 6 6 6 1 6 1 6 6 6 1
                1 6 6 6 1 1 1 6 6 6 1
                1 6 6 6 1 6 1 6 6 6 1
                1 6 6 6 1 6 1 6 6 6 1
                1 1 6 6 6 6 6 6 6 1 1
                1 1 1 6 6 6 6 6 1 1 1
                1 1 1 1 1 1 1 1 1 1 1
            `

            const arrowText = new story.TextSprite(story.TEXT_Z + 1);
            arrowText.setText("SELECT");
            arrowText.setColor(15);
            arrowText.top = screen.height - (arrows.height >> 1) - (arrowText.getHeight() >> 1);

            const buttonText = new story.TextSprite(story.TEXT_Z + 1);
            buttonText.setText("OK");
            buttonText.setColor(15);
            buttonText.top = screen.height - (arrows.height >> 1) - (buttonText.getHeight() >> 1);

            const arrowIcon = new story.IconSprite(story.TEXT_Z + 1);
            arrowIcon.top = screen.height - arrows.height;
            arrowIcon.setIcon(arrows);

            const buttonIcon = new story.IconSprite(story.TEXT_Z + 1);
            buttonIcon.top = screen.height - abutton.height;
            buttonIcon.setIcon(abutton);

            const totalWidth = arrowText.getWidth() + buttonText.getWidth() + arrows.width + abutton.width + 4;

            arrowIcon.left = (screen.width >> 1) - (totalWidth >> 1);
            arrowText.left = arrowIcon.left + arrows.width + 1
            buttonIcon.left = arrowText.left + arrowText.getWidth() + 2;
            buttonText.left = buttonIcon.left + abutton.width + 1;

            const backdrop = new story.RectangleSprite(story.TEXT_Z);
            backdrop.setDimensions(156, arrows.height);
            backdrop.top = screen.height - backdrop.height;
            backdrop.left = (screen.width >> 1) - (backdrop.width >> 1);

            story.menu.showMenu(choices, story.menu.MenuStyle.List, story.menu.MenuLocation.BottomHalf);
            pauseUntil(() => !story.menu.isMenuOpen());

            buttonText.destroy();
            arrowIcon.destroy();
            arrowText.destroy();
            buttonIcon.destroy();
            backdrop.destroy();
        }

        cancel() {
            if (story.menu.isMenuOpen()) {
                story.menu.closeMenu();
            }
            if (this.currentTask && this.currentTask.cancel) {
                this.currentTask.cancel();
                this.currentTask = null;
            }
            if (this.state === State.Running) {
                this.state = State.Cancelled;
            }
        }
    }

    /**
     * Starts a cutscene that runs in the background. There can only
     * be one cutscene active at a time, so calling this multiple times
     * will cause the cutscenes to queue up.
     *
     * @param callback The code to run inside the cutscene
     */
    //% blockId=arcade_story_start_cutscene
    //% block="start cutscene"
    //% help="github:arcade-story//start-cutscene.md"
    //% weight=100
    //% handlerStatement=1
    //% group="Cutscene"
    export function startCutscene(callback: () => void) {
        _currentCutscene().cutsceneQueue.push(callback);
        if (_currentCutscene().state === State.Idle) {
            _currentCutscene().state = State.Running
            control.runInParallel(() => {
                while (_currentCutscene().cutsceneQueue.length) {
                    _currentCutscene().state = State.Running
                    _currentCutscene().cutsceneQueue.shift()();
                    pause(1)
                }
                _currentCutscene().state = State.Idle;
            });
        }
    }

    //% blockId=arcade_story_start_conversation
    //% block="start conversation"
    //% weight=100
    //% handlerStatement=1
    //% group="Cutscene"
    //% deprecated=1
    export function startConveration(callback: () => void) {
        startCutscene(callback);
    }

    /**
     * Prints text out to the bottom half of the screen, one character at a time.
     * The text is printed on top of white background and this block will pause
     * until the printing is complete.
     *
     * @param text The text to print
     * @param label An optional label to display above the text
     */
    //% blockId=arcade_story_print_character_text
    //% block="print character text $text|| with label $label"
    //% help="github:arcade-story//print-character-text.md"
    //% weight=30
    //% group="Text"
    //% blockGap=8
    export function printCharacterText(text: string, label?: string) {
        if (_currentCutscene().cancelled) {
            return;
        }
        const task = printDialog(text, 80, 90, 50, 150);

        if (label) {
            const padding = 1;
            const labelText = new story.TextSprite(story.TEXT_Z + 2);
            labelText.setText(label);
            labelText.top = 65 - labelText.getHeight();
            labelText.attachToTask(task);
            labelText.left = 3;

            const labelBackdrop = new story.RectangleSprite(story.TEXT_Z + 1);
            labelBackdrop.setDimensions(labelText.getWidth() + (padding << 1), labelText.getHeight() + (padding << 1));
            labelBackdrop.setColor(6);
            labelBackdrop.left = labelText.left - padding;
            labelBackdrop.top = 65 - labelText.getHeight() - padding;
            labelBackdrop.attachToTask(task);
        }

        _currentCutscene().currentTask = task;
        _pauseUntilTaskIsComplete(task);
    }

    /**
     * Shows a menu of choices for the player to make and pauses until the player
     * makes a choice. The menu shown to the player uses the up, down, and A buttons,
     * so make sure you ignore those button presses while the menu is open.
     *
     *
     * @param choice1 A choice to appear in the list of player choices
     * @param choice2 A choice to appear in the list of player choices
     * @param choice3 A choice to appear in the list of player choices
     * @param choice4 A choice to appear in the list of player choices
     * @param choice5 A choice to appear in the list of player choices
     */
    //% blockId=arcade_story_show_player_choices
    //% block="show player choices $choice1 $choice2 ||$choice3 $choice4 $choice5"
    //% help="github:arcade-story//show-player-choices.md"
    //% inlineInputMode=inline
    //% weight=80
    //% blockGap=8
    //% group="Menu"
    export function showPlayerChoices(choice1: string, choice2: string, choice3?: string, choice4?: string, choice5?: string) {
        const choices = [choice1];
        if (choice2) choices.push(choice2);
        if (choice3) choices.push(choice3);
        if (choice4) choices.push(choice4);

        _currentCutscene().showMenu(choices);
    }

    /**
     * Checks the last choice made by the player in a menu created by "show player choices".
     *
     * @param choice The text to check against the last choice made
     * @returns True if the choice matches the last answer and false otherwise
     */
    //% blockId=arcade_story_last_answer
    //% block="last answer equals $choice"
    //% help="github:arcade-story//last-answer-equals.md"
    //% weight=70
    //% group="Menu"
    export function checkLastAnswer(choice: string): boolean {
        return _currentCutscene().lastAnswer === choice;
    }

    //% blockId=arcade_story_cancel_conversation
    //% block="cancel conversation"
    //% weight=60
    //% deprecated=1
    //% group="Menu"
    export function cancelCurrentConversation() {
        cancelCurrentCutscene();
    }

    /**
     * Gets the text of the last choice made by the player in a menu created
     * by "show player choices".
     *
     * @returns True if the menu is open and false otherwise
     */
    //% blockId=arcade_story_get_last_answer
    //% block="get last answer"
    //% help="github:arcade-story/get-last-answer.md"
    //% weight=60
    //% blockGap=8
    //% group="Menu"
    export function getLastAnswer(): string {
        return _currentCutscene().lastAnswer;
    }

    /**
     * Checks if the menu created by "show player choices" is still open.
     *
     * @returns True if the menu is open and false otherwise
     */
    //% blockId=arcade_story_is_menu_open
    //% block="is menu open"
    //% help="github:arcade-story/is-menu-open.md"
    //% weight=50
    //% group="Menu"
    export function isMenuOpen(): boolean {
        return story.menu.isMenuOpen();
    }

    /**
     * Cancels the currently active cutscene.
     */
    //% blockId=arcade_story_cancel_cutscene
    //% block="cancel cutscene"
    //% help="github:arcade-story/cancel-cutscene.md"
    //% weight=50
    //% blockGap=8
    //% group="Cutscene"
    export function cancelCurrentCutscene() {
        _currentCutscene().cancel();
    }

    /**
     * Cancels the currently active cutscene as well as any pending
     * cutscenes that haven't started yet.
     */
    //% blockId=arcade_story_cancel_all_cutscenes
    //% block="cancel all cutscenes"
    //% help="github:arcade-story/cancel-all-cutscenes.md"
    //% weight=49
    //% blockGap=8
    //% group="Cutscene"
    export function cancelAllCutscenes() {
        _currentCutscene().cutsceneQueue = [];
        cancelCurrentCutscene();
    }

    function printDialog(text: string, x: number, y: number, height: number, width: number, foreground = 15, background = 1, speed?: story.TextSpeed) {
        const font = image.getFontForText(text);
        const script = story._formatText(text, speed === undefined ? story.TextSpeed.Normal : speed, Math.idiv(width - 8, font.charWidth), Math.idiv(height - 8, font.charHeight));
        script.setColors(foreground, 0);

        const left = x - (width >> 1);
        const top = y - (height >> 1)

        const bubble = new story.Bubble(story.TEXT_Z, true);
        bubble.setAlign(left, top);
        bubble.foregroundColor = script.foregroundColor;
        bubble.backgroundColor = script.backgroundColor;
        bubble.pagePauseLength = script.pagePauseMillis;
        bubble.startMessage(script.pages);

        const backdrop = new story.RectangleSprite(story.TEXT_Z - 1);
        backdrop.setColor(background);
        backdrop.setDimensions(width, height);
        backdrop.left = left;
        backdrop.top = top;
        backdrop.attachToTask(bubble);

        return bubble;
    }

    export function _pauseUntilTaskIsComplete(task: story.Task) {
        const state = _currentCutscene();
        pauseUntil(() => task.isDone() || state.state === State.Cancelled);
    }

    export function _currentCutscene() {
        if (!stateStack) {
            stateStack = [];

            game.addScenePushHandler(() => {
                stateStack.push(new ConversationState());
            });

            game.addScenePopHandler(() => {
                if (stateStack.length) {
                    stateStack[stateStack.length - 1].cancel();
                    stateStack.pop();
                }
            });
        }
        if (!stateStack.length) {
            stateStack.push(new ConversationState());
        }
        return stateStack[stateStack.length - 1];
    }
}