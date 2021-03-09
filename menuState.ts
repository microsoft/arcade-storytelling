namespace story.menu {
    let state: _BlockMenuState;
    let sceneStack: _BlockMenuState[];

    export function showMenu(options: string[], style: MenuStyle, location: MenuLocation) {
        const state = _getState();

        state.menu.setOptions(options);
        state.menu.setStyle(style);
        state.menu.setLocation(location);
        state.menu.setMenuOpen(true);
    }

    export function closeMenu() {
        const state = _getState();
        state.menu.setMenuOpen(false);
    }

    export function setColors(foreground: number, background: number) {
        const state = _getState();
        state.menu.setColors(foreground, background, background, foreground);
    }

    export function selectedMenuOption(): string {
        const state = _getState();
        return state.menu.selectedMenuOption();
    }

    export function selectedMenuIndex(): number {
        const state = _getState();
        return state.menu.selectedMenuIndex();
    }

    export function isMenuOpen(): boolean {
        const state = _getState();
        return state.menu.isOpen();
    }

    export function onMenuOptionSelected(handler: (option: string, index: number) => void) {
        const state = _getState();
        state.addHandler(handler);
    }

    export class _BlockMenuState {
        menu: MenuSprite;
        handlers: ((option: string, index: number) => void)[];
        controlsEnabled: boolean;

        constructor() {
            this.menu = new MenuSprite();
            this.handlers = [];
            this.controlsEnabled = true;
        }

        addHandler(handler: ((option: string, index: number) => void)) {
            if (handler) {
                this.handlers.push(handler);
            }
        }

        runHandlers(option: string, index: number) {
            if (this.handlers.length) {
                control.runInParallel(() => {
                    for (const handler of this.handlers) {
                        handler(option, index)
                    }
                });
            }
        }

        destroy() {
            this.menu.destroy();
        }
    }

    enum button {
        u = 1,
        r = 1 << 1,
        d = 1 << 2,
        l = 1 << 3,
        a = 1 << 4,
        b = 1 << 5
    }

    export function _init() {
        if (sceneStack) return;
        sceneStack = [];
        state = new _BlockMenuState();

        // can't use controller events because it would override
        // the user's controller handlers. this works okay but
        // it's a little glitchy in the grid layout
        let debounce = 100;
        control.runInParallel(function() {
            while (true) {
                controller.pauseUntilAnyButtonIsPressed();
                if (!state.controlsEnabled) continue;

                if (state.menu.style === MenuStyle.Grid) {
                    debounce = 150
                }
                else {
                    debounce = 100;
                }

                if (controller.A.isPressed()) {
                    for (const handler of state.handlers) {
                        handler(state.menu.selectedMenuOption(), state.menu.selectedMenuIndex());
                    }

                    pause(debounce);
                }
                if (controller.up.isPressed()) {
                    state.menu.moveSelectionVertical(true);
                    pause(debounce);
                }
                if (controller.down.isPressed()) {
                    state.menu.moveSelectionVertical(false);
                    pause(debounce);
                }
                if (controller.left.isPressed()) {
                    state.menu.moveSelectionHorizontal(true);
                    pause(debounce);
                }
                if (controller.right.isPressed()) {
                    state.menu.moveSelectionHorizontal(false);
                    pause(debounce);
                }
            }
        })

        game.addScenePushHandler(function (oldScene: scene.Scene) {
            sceneStack.push(state);
            state = new _BlockMenuState();
        });

        game.addScenePopHandler(function (oldScene: scene.Scene) {
            if (sceneStack.length) {
                state = sceneStack.pop();
            }
            else {
                if (state) {
                    state.destroy();
                }
                state = new _BlockMenuState();
            }
        });
    }

    export function _getState() {
        _init();
        return state;
    }
}
