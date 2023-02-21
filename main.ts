namespace SpriteKind {
    export const enemy_projectile = SpriteKind.create()
    export const Shuri_projectile = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.enemy_projectile, SpriteKind.Player, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    music.playSoundEffect(music.createSoundEffect(
    WaveShape.Noise,
    2371,
    2396,
    255,
    255,
    125,
    SoundExpressionEffect.Warble,
    InterpolationCurve.Curve
    ), SoundExpressionPlayMode.InBackground)
    Namor.setPosition(138, randint(2, 108))
})
function character_setup () {
    Shuri = sprites.create(assets.image`shuri`, SpriteKind.Player)
    Namor = sprites.create(assets.image`namor`, SpriteKind.Enemy)
    scaling.scaleToPixels(Shuri, 32, ScaleDirection.Uniformly, ScaleAnchor.Middle)
    scaling.scaleToPixels(Namor, 32, ScaleDirection.Uniformly, ScaleAnchor.Middle)
    Shuri.setPosition(4, 95)
    Shuri.setStayInScreen(true)
    Namor.follow(Shuri, 40)
    controller.moveSprite(Shuri, 100, 220)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (started) {
        projectile = sprites.createProjectileFromSprite(assets.image`vibranium`, Shuri, 0, 0)
        projectile.setKind(SpriteKind.Shuri_projectile)
        projectile.setVelocity(225, 0)
        projectile.setFlag(SpriteFlag.DestroyOnWall, true)
        projectile.setFlag(SpriteFlag.AutoDestroy, true)
        Vibranium_Gauntlet_blast()
    }
})
function NeoPixel_setup () {
    strip = light.createStrip(pins.D3, 30)
    strip.setBrightness(10)
    strip.setAll(0x00ffff)
    strip.setPhotonPenColor(0x00ffff)
}
info.onScore(10, function () {
    Namor.destroy()
    game.showLongText("We are safe!", DialogLayout.Bottom)
    Shuri.sayText("WAKANDA FOREVER", 5000, true)
    effects.confetti.startScreenEffect()
    game.over(true)
})
function BG_setup () {
    scroller.setLayerImage(scroller.BackgroundLayer.Layer0, assets.image`wakanda_sky`)
    scroller.setLayerImage(scroller.BackgroundLayer.Layer1, assets.image`back_wakanda`)
    scroller.setLayerImage(scroller.BackgroundLayer.Layer2, assets.image`mid_wakanda`)
    scroller.setLayerImage(scroller.BackgroundLayer.Layer4, assets.image`wak_fore`)
    scroller.scrollBackgroundWithSpeed(-1, 0, scroller.BackgroundLayer.Layer0)
    scroller.scrollBackgroundWithSpeed(-20, 0, scroller.BackgroundLayer.Layer1)
    scroller.scrollBackgroundWithSpeed(-30, 0, scroller.BackgroundLayer.Layer2)
    scroller.scrollBackgroundWithSpeed(-60, 0, scroller.BackgroundLayer.Layer4)
}
function title_sequence () {
    scene.setBackgroundColor(12)
    textSprite = textsprite.create("Black Panther", 0, 15)
    textSprite.setPosition(44, 18)
    textSprite.setMaxFontHeight(10)
    pause(500)
    music.playSoundEffect(music.createSoundEffect(WaveShape.Square, 1, 639, 0, 137, 2400, SoundExpressionEffect.None, InterpolationCurve.Curve), SoundExpressionPlayMode.UntilDone)
    textSprite2 = textsprite.create("WAKANDA", 0, 15)
    textSprite2.setPosition(52, 40)
    textSprite2.setMaxFontHeight(19)
    textSprite2.setOutline(1, 9)
    textSprite3 = textsprite.create("FOREVER", 0, 15)
    textSprite3.setPosition(52, 40)
    textSprite3.setPosition(52, 58)
    textSprite3.setMaxFontHeight(19)
    textSprite3.setOutline(1, 9)
    pause(2000)
}
sprites.onOverlap(SpriteKind.Shuri_projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    music.playSoundEffect(music.createSoundEffect(
    WaveShape.Triangle,
    2371,
    1706,
    255,
    255,
    250,
    SoundExpressionEffect.Warble,
    InterpolationCurve.Curve
    ), SoundExpressionPlayMode.InBackground)
    Namor.setPosition(randint(100, 148), randint(2, 80))
})
// NeoPixel effect
function Vibranium_Gauntlet_blast () {
    // 30 pixel strip
    for (let index = 0; index < 10; index++) {
        strip.photonForward(3)
    }
}
let projectile2: Sprite = null
let textSprite3: TextSprite = null
let textSprite2: TextSprite = null
let textSprite: TextSprite = null
let strip: light.NeoPixelStrip = null
let projectile: Sprite = null
let Shuri: Sprite = null
let Namor: Sprite = null
let started = false
started = false
title_sequence()
BG_setup()
pause(1000)
sprites.destroyAllSpritesOfKind(SpriteKind.Text)
pause(500)
game.showLongText("Battle Namor! But don't get hit!!", DialogLayout.Top)
character_setup()
info.setLife(10)
started = true
NeoPixel_setup()
Vibranium_Gauntlet_blast()
forever(function () {
    pause(randint(600, 900))
    projectile2 = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 4 4 . . . . . . . 
        . . . . . . 4 5 5 4 . . . . . . 
        . . . . . . 2 5 5 2 . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, Namor, -250, 0)
    projectile2.setKind(SpriteKind.enemy_projectile)
    projectile2.setFlag(SpriteFlag.DestroyOnWall, true)
    projectile2.setFlag(SpriteFlag.AutoDestroy, true)
})
forever(function () {
    Namor.x = 138
})
