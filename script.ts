namespace story {
    export enum TextSpeed {
        //% block="very slow"
        VerySlow = 4,
        //% block="slow"
        Slow = 8,
        //% block="normal"
        Normal = 12,
        //% block="fast"
        Fast = 16,
        //% block="very fast"
        VeryFast = 20
    }

    export let _defaultPagePauseLength = 1000;
    export let _defaultFinalPagePauseLength = 1000;

    export class Script {
        pages: MessagePage[];
        foregroundColor: number;
        backgroundColor: number;
        pagePauseMillis: number;
        finalPagePauseLength: number;
        relativeToCamera: boolean;

        constructor(pages?: MessagePage[]) {
            this.pages = pages || [];
            this.foregroundColor = 0xf;
            this.backgroundColor = 0x1;
            this.pagePauseMillis = _defaultPagePauseLength;
            this.finalPagePauseLength = _defaultFinalPagePauseLength;
            this.relativeToCamera = false;
        }

        //% blockId=script_add_line
        //% block="$this(script) add line $text $speed"
        //% weight=90
        //% blockGap=8
        //% group="Script"
        //% deprecated=1
        addLineToCurrentPage(text: string, speed: TextSpeed) {
            if (!this.pages.length) {
                this.pages.push(new MessagePage([]));
            }
            this.pages[this.pages.length - 1].lines.push(line(text, speed));
        }

        //% blockId=script_new_page
        //% block="$this(script) start new page"
        //% weight=80
        //% blockGap=8
        //% group="Script"
        //% deprecated=1
        newPage() {
            this.pages.push(new MessagePage([]));
        }

        //% blockId=script_set_colors
        //% block="$this(script) set text color $foreground background color $background"
        //% foreground.shadow=colorindexpicker
        //% foreground.defl=15
        //% background.shadow=colorindexpicker
        //% background.defl=1
        //% weight=70
        //% blockGap=8
        //% group="Script"
        //% deprecated=1
        setColors(foreground: number, background: number) {
            this.foregroundColor = foreground;
            this.backgroundColor = background;
        }

        //% blockId=script_set_pause_length
        //% block="$this(script) pause for $pauseMillis ms at end of page"
        //% pauseMillis.shadow=timePicker
        //% pauseMillis.defl=1000
        //% weight=60
        //% group="Script"
        //% deprecated=1
        setPagePauseLength(pauseMillis: number) {
            this.pagePauseMillis = pauseMillis;
        }

        //% blockId=script_set_relative_to_camera
        //% block="$this(script) set relative to camera $relativeToCamera"
        //% weight=5
        //% blockGap=8
        //% group="Script"
        //% deprecated=1
        setRelativeToCamera(relativeToCamera: boolean) {
            this.relativeToCamera = relativeToCamera;
        }
    }

    //% blockId=story_create_script
    //% block="create empty script"
    //% blockSetVariable=script
    //% weight=98
    //% group="Script"
    //% deprecated=1
    export function createEmptyScript(): Script {
        const script = new Script();
        return script;
    }

    
    //% blockId=story_create_script_arguments
    //% block="create script $text with text color $foreground back color $background"
    //% text.defl=":)"
    //% foreground.shadow=colorindexpicker
    //% foreground.defl=15
    //% background.shadow=colorindexpicker
    //% background.defl=1
    //% blockSetVariable=script
    //% weight=99
    //% group="Script"
    //% deprecated=1
    export function createScript(text: string, foreground: number, background: number): Script {
        const script = new Script();
        
        if (text) {
            script.addLineToCurrentPage(text, TextSpeed.Normal);
        }

        script.setColors(foreground, background);
        return script;
    }

    //% blockId=story_print_script
    //% block="print $script at x $x y $y z $z"
    //% script.shadow=variables_get
    //% script.defl=script
    //% x.defl=80
    //% y.defl=60
    //% weight=50
    //% inlineInputMode=inline
    //% blockGap=8
    //% group="Script"
    //% deprecated=1
    export function printScript(script: Script, x: number, y: number, z: number, align = false, relativeToCamera = false) {
        const b = new Bubble(z, relativeToCamera || script.relativeToCamera);

        if (align) {
            b.setAlign(x, y);
        }
        else {
            b.setAnchor(x, y);
        }

        startScript(script, b);
    }

    //% blockId=story_sprite_say_script
    //% block="$sprite say $script"
    //% sprite.shadow=variables_get
    //% sprite.defl=sprite
    //% script.shadow=variables_get
    //% script.defl=script
    //% weight=40
    //% group="Script"
    //% deprecated=1
    export function spriteSayScript(sprite: Sprite, script: Script) {
        const b = new Bubble();
        b.setAnchorSprite(sprite);
        b.z = sprite.z;

        startScript(script, b);
    }

    function startScript(script: Script, bubble: Bubble) {
        bubble.foregroundColor = script.foregroundColor;
        bubble.backgroundColor = script.backgroundColor;
        bubble.pagePauseLength = script.pagePauseMillis;
        bubble.finalPagePauseLength = script.finalPagePauseLength;
        bubble.startMessage(script.pages);

        _trackTask(bubble);
        if (!_isInQueueStoryPart()) {
            _currentCutscene().currentTask = bubble;
            _pauseUntilTaskIsComplete(bubble);
        }
    }
}