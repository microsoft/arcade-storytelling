namespace story {
    //% blockId=story_push_scene
    //% block="push scene"
    //% blockGap=8
    //% group="Scene"
    //% deprecated=1
    export function pushScene() {
        game.pushScene();
    }

    //% blockId=story_pop_scene
    //% block="pop scene"
    //% blockGap=8
    //% group="Scene"
    //% deprecated=1
    export function popScene() {
        game.popScene();
    }

    //% blockId=story_clear_scene
    //% block="clear scene"
    //% blockGap=8
    //% group="Scene"
    //% deprecated=1
    export function clearScene() {
        popScene();
        pushScene();
    }

    /**
     * Cancels all text from the story extension that is currently visible on the screen.
     */
    //% blockId="story_clear_all_text"
    //% block="cancel current text"
    //% help="github:arcade-story/cancel-current-text.md"
    //% group="Cutscene"
    //% blockGap=8
    //% weight=20
    export function clearAllText() {
        for (const bubble of getAllBubbles()) {
            bubble.destroy();
        }
    }

    export function getAllBubbles() {
        const all: Bubble[] = [];

        for (const sprite of game.currentScene().allSprites) {
            if (sprite instanceof Bubble) {
                all.push(sprite);
            }
        }

        return all;
    }
}