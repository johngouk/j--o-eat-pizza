namespace SpriteKind {
    export const Poo = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (info.score() > 1) {
        ThePoo = sprites.create(assets.image`ThePoo`, SpriteKind.Poo)
        ThePoo.setPosition(Pizza_Eater.x, Pizza_Eater.y)
        info.changeScoreBy(-1)
    }
})
info.onCountdownEnd(function () {
    game.over(false)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Food, function (sprite, otherSprite) {
    music.powerUp.play()
    Pizza.setPosition(randint(0, 160), randint(0, 120))
    sharkSpeed += 1
})
info.onLifeZero(function () {
    game.over(false)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Poo, function (sprite, otherSprite) {
    music.powerDown.play()
    sprite.startEffect(effects.hearts, 500)
    sprite.destroy()
    EnemyOn = 0
    otherSprite.destroy()
    info.changeLifeBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    Pizza.setPosition(randint(0, 160), randint(0, 120))
    info.changeScoreBy(1)
    info.stopCountdown()
    info.startCountdown(5)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    music.siren.play()
    info.changeLifeBy(-1)
    NastyThing.destroy()
    EnemyOn = 0
})
let sharkVel = 0
let sharkPos = 0
let sharkDirection = 0
let NastyThing: Sprite = null
let ThePoo: Sprite = null
let Pizza: Sprite = null
let Pizza_Eater: Sprite = null
let EnemyOn = 0
scene.setBackgroundColor(7)
let sharkSpeed = 50
EnemyOn = 0
Pizza_Eater = sprites.create(assets.image`PizzaEater`, SpriteKind.Player)
controller.moveSprite(Pizza_Eater)
Pizza_Eater.setStayInScreen(true)
Pizza = sprites.create(img`
    . . . . . . b b b b . . . . . . 
    . . . . . . b 4 4 4 b . . . . . 
    . . . . . . b b 4 4 4 b . . . . 
    . . . . . b 4 b b b 4 4 b . . . 
    . . . . b d 5 5 5 4 b 4 4 b . . 
    . . . . b 3 2 3 5 5 4 e 4 4 b . 
    . . . b d 2 2 2 5 7 5 4 e 4 4 e 
    . . . b 5 3 2 3 5 5 5 5 e e e e 
    . . b d 7 5 5 5 3 2 3 5 5 e e e 
    . . b 5 5 5 5 5 2 2 2 5 5 d e e 
    . b 3 2 3 5 7 5 3 2 3 5 d d e 4 
    . b 2 2 2 5 5 5 5 5 5 d d e 4 . 
    b d 3 2 d 5 5 5 d d d 4 4 . . . 
    b 5 5 5 5 d d 4 4 4 4 . . . . . 
    4 d d d 4 4 4 . . . . . . . . . 
    4 4 4 4 . . . . . . . . . . . . 
    `, SpriteKind.Food)
info.startCountdown(5)
info.setLife(3)
game.onUpdate(function () {
    if (EnemyOn == 0) {
        sharkDirection = randint(0, 1)
        sharkPos = 0
        sharkVel = sharkSpeed
        if (sharkDirection < 0.5) {
            sharkPos = 160
            sharkVel = sharkSpeed * -1
        }
        NastyThing = sprites.create(assets.image`SharkRight`, SpriteKind.Enemy)
        if (sharkVel < 0) {
            NastyThing.setImage(assets.image`SharkLeft`)
        }
        NastyThing.setPosition(sharkPos, randint(0, 120))
        NastyThing.setVelocity(sharkVel, 0)
        EnemyOn = 1
    } else {
        if (NastyThing.x >= 160 && sharkVel > 0 || NastyThing.x <= 0 && sharkVel < 0) {
            NastyThing.destroy()
            EnemyOn = 0
        }
    }
})
