namespace story {
    /**
     * Moves a sprite directly to a specific x y position and pauses until the move is complete.
     * If there are walls blocking the sprite, it will attempt to move and then teleport
     * to its final destination.
     *
     * A sprite can only have one movement operation active at a time, so calling this on a sprite
     * that is already moving will cancel the other task.
     *
     * @param sprite The sprite to move
     * @param x The absolute x position for the sprite to move to
     * @param y The absolute y position for the sprite to move ot
     * @param speed The speed at which the sprite should move
     */
    //% blockId=story_sprite_move_to_location
    //% block="$sprite move to x $x y $y with speed $speed"
    //% help="github:arcade-story/sprite-move-to-position.md"
    //% inlineInputMode=inline
    //% sprite.shadow=variables_get
    //% sprite.defl=sprite
    //% speed.defl=100
    //% blockGap=8
    //% group="Movement"
    //% weight=80
    export function spriteMoveToLocation(sprite: Sprite, x: number, y: number, speed: number) {
        const distance = calculateDistance(sprite, x, y);
        const time = (distance / speed) * 1000;
        const angle = Math.atan2(y - sprite.y, x - sprite.x);

        sprite.ax = 0;
        sprite.ay = 0;
        sprite.vx = Math.cos(angle) * speed;
        sprite.vy = Math.sin(angle) * speed;

        const key = moveTaskKey(sprite);
        _cancelTask(key);

        let done = false;
        let ref = setTimeout(function () {
            sprite.vx = 0;
            sprite.vy = 0;
            sprite.x = x;
            sprite.y = y;
            done = true;
        }, time);

        let task: Task = {
            key: key,
            isDone: () => done,
            cancel: () => {
                done = true;
                sprite.vx = 0;
                sprite.vy = 0;
                clearTimeout(ref);
            }
        };

        _trackTask(task);
        if (!_isInQueueStoryPart()) {
            _currentCutscene().currentTask = task;
            _pauseUntilTaskIsComplete(task);
        }
    }

    /**
     * Cancels any currently active movement operations on a sprite.
     *
     * @param sprite The sprite to cancel movement on
     */
    //% blockId=story_sprite_cancel_movement
    //% block="$sprite cancel movement"
    //% help="github:arcade-story/sprite-cancel-movement.md"
    //% inlineInputMode=inline
    //% sprite.shadow=variables_get
    //% sprite.defl=sprite
    //% blockGap=8
    //% group="Movement"
    //% weight=70
    export function cancelSpriteMovement(sprite: Sprite) {
        const key = moveTaskKey(sprite);
        _cancelTask(key);
    }

    function calculateDistance(sprite: Sprite, x: number, y: number) {
        return Math.sqrt(Math.pow(sprite.x - x, 2) + Math.pow(sprite.y - y, 2));
    }

    function moveTaskKey(sprite: Sprite) {
        return "move_" + sprite.id;
    }

    // Commented out because the A-Star extension isn't approved
    // /**
    //  * Moves a sprite to a specified location in the tilemap using pathfinding and pauses until the
    //  * movement is complete. If no path is possible, this block will cause an exception.
    //  *
    //  * A sprite can only have one movement operation active at a time, so calling this on a sprite
    //  * that is already moving will cancel the other task.
    //  *
    //  * @param sprite The sprite to move
    //  * @param location The tilemap location to move to
    //  * @param speed The speed at which the sprite should move
    //  */
    // //% blockId=story_sprite_move_to_tile
    // //% block="$sprite move to $location with speed $speed"
    // //% help="github:arcade-story/sprite-move-to-tilemap-location.md"
    // //% sprite.shadow=variables_get
    // //% sprite.defl=sprite
    // //% location.shadow=mapgettile
    // //% speed.defl=100
    // //% blockGap=8
    // //% group="Movement"
    // //% weight=100
    // export function spriteMoveToTile(sprite: Sprite, location: tiles.Location, speed: number) {
    //     const start = tiles.getTileLocation(sprite.x >> game.currentScene().tileMap.scale, sprite.y >> game.currentScene().tileMap.scale)
    //     const key = moveTaskKey(sprite);
    //     _cancelTask(key);
    //     if (start) {
    //         let done = false;
    //         let task = {
    //             key: key,
    //             isDone: () => done,
    //             cancel: () => {
    //                 done = true;
    //                 scene._followPath(sprite, null);
    //             }
    //         };
    //         const path = scene.aStar(start, location);
    //         scene._followPath(sprite, path, speed, () => {
    //             done = true;
    //         });

    //         _trackTask(task);
    //         if (!_isInQueueStoryPart()) {
    //             _currentCutscene().currentTask = task;
    //             _pauseUntilTaskIsComplete(task);
    //         }
    //     }
    //     else if (location) {
    //         spriteMoveToLocation(sprite, location.x, location.y, speed);
    //     }
    // }
}