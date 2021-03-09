namespace story {
    let stateStack: StoryState[];
    export class StoryState {
        queue: (() => void)[];
        running: boolean;
        lock: boolean;
        protected activeTasks: Task[];

        constructor() {
            this.activeTasks = [];
            this.queue = [];
            this.running = false;
        }

        trackTask(task: Task) {
            this.activeTasks.push(task);
        }

        reset() {
            this.activeTasks = [];
            this.running = false;
        }

        shouldAdvance() {
            return !this.activeTasks.some(task => !task.isDone());
        }

        cancelByKey(key: string) {
            for (const task of this.activeTasks) {
                if (task.key === key && task.cancel) {
                    task.cancel();
                    return;
                }
            }
        }

        clear() {
            this.queue = [];
            for (const task of this.activeTasks) {
                if (task.cancel)
                    task.cancel();
            }
            this.reset();
        }

        clearFinishedTasks() {
            if (this.activeTasks.some(task => task.isDone())) {
                this.activeTasks = this.activeTasks.filter(task => !task.isDone());
            }
        }
    }

    //% blockId=story_queue_story_part
    //% block="queue story part"
    //% group="Sequence"
    //% handlerStatement=1
    //% deprecated=1
    export function queueStoryPart(cb: () => void) {
        init();
        stateStack[stateStack.length - 1].queue.push(cb);
    }

    //% blockId=story_clear_story_parts
    //% block="clear queued story parts"
    //% group="Scene"
    //% deprecated=1
    export function clearQueuedStoryParts() {
        init();
        stateStack[stateStack.length - 1].clear();
    }

    export function _trackTask(task: Task) {
        init();
        const state = stateStack && stateStack[stateStack.length - 1];
        if (state) {
            state.trackTask(task);
        }
    }

    export function _cancelTask(key: string) {
        const state = stateStack && stateStack[stateStack.length - 1];
        if (state) {
            state.cancelByKey(key);
        }
    }

    export function _isInQueueStoryPart() {
        if (stateStack && stateStack.length) {
            const state = stateStack[stateStack.length - 1]
            return state.lock;
        }
        return false;
    }

    function init() {
        if (stateStack) return;

        stateStack = [new StoryState()];

        let lock = false;

        game.addScenePushHandler(function () {
            stateStack.push(new StoryState());
        });

        game.addScenePopHandler(function() {
            stateStack.pop();

            if (stateStack.length === 0) {
                stateStack.push(new StoryState());
            }
        });

        game.onUpdate(function() {
            const state = stateStack[stateStack.length - 1];
            state.clearFinishedTasks();
            if (state.lock) return;
            
            if (state.queue.length) {
                if (state.shouldAdvance() || !state.running) {
                    if (state.running) {
                        state.queue.shift();
                        state.reset();
                    }

                    if (state.queue.length) {
                        state.running = true;
                        control.runInParallel(function () {
                            state.lock = true;
                            state.queue[0]();
                            state.lock = false;
                        });
                    }
                }
            }
        });
    }
}