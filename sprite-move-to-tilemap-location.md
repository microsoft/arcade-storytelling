# sprite move to tilemap location

Moves a [sprite](/types/sprite) to a specified location in the tilemap using pathfinding and pauses until the movement is complete. If no path is possible, this block will cause an exception.

A [sprite](/types/sprite) can only have one movement operation active at a time, so calling this on a [sprite](/types/sprite) that is already moving will cancel the other task.

```sig
story.spriteMoveToTile(sprites.create(img`
    .
`, SpriteKind.Player), tiles.getTileLocation(0, 0), 100)
```

## Parameters

* **sprite**: a [sprite](/types/sprite) to move to a tile
* **location**: the [tile](/types/tile) location to move to
* **speed**: a [number](/types/number) representing how fast the [sprite](/types/sprite) should move to its destination


```package
arcade-story=github:microsoft/arcade-storytelling
```