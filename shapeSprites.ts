namespace story {
    export class ShapeSprite extends sprites.BaseSprite {
        color: number;
        left: number;
        top: number;
        parent: Task;

        constructor(z: number) {
            super(z);
            this.left = 0;
            this.top = 0;
            this.color = 1;
        }

        setColor(color: number) {
            this.color = color;
        }

        attachToTask(task: Task) {
            this.parent = task;
        }

        destroy() {
            game.currentScene().allSprites.removeElement(this);
            if (this.parent && !this.parent.isDone()) {
                if (this.parent.cancel) this.parent.cancel();
            }
        }

        __drawCore(camera: scene.Camera) {
            this.drawShape(this.left, this.top, this.color);
        }

        __update(camera: scene.Camera, dt: number) {
            if (this.parent && this.parent.isDone()) {
                this.destroy();
            }
        }

        protected drawShape(left: number, top: number, color: number) {
            // subclass
        }
    }

    export class TextSprite extends ShapeSprite {
        text: string;
        
        setText(text: string) {
            this.text = text;
        }

        getWidth() {
            return this.text ? 
            image.getFontForText(this.text).charWidth * this.text.length : 
            0;
        }

        getHeight() {
            return this.text ? 
            image.getFontForText(this.text).charHeight : 
            0;
        }

        protected drawShape(left: number, top: number, color: number) {
            if (this.text) {
                screen.print(this.text, left, top, color);
            }
        }
    }

    export class RectangleSprite extends ShapeSprite {
        width: number;
        height: number;
        isOutline: boolean
        
        setDimensions(width: number, height: number) {
            this.width = width;
            this.height = height;
        }

        setSolid(isSolid: boolean) {
            this.isOutline = !isSolid;
        }

        protected drawShape(left: number, top: number, color: number) {
            if (this.width && this.height) {
                if (this.isOutline) {
                    screen.drawRect(left, top, this.width, this.height, color);
                }
                else {
                    screen.fillRect(left, top, this.width, this.height, color);
                }
            }
        }
    }

    export class IconSprite extends ShapeSprite {
        icon: Image;

        setIcon(icon: Image) {
            this.icon = icon;
        }

        protected drawShape(left: number, top: number, color: number) {
            screen.drawImage(this.icon, left, top);
        }
    }
}