function decrypt_key (num: number) {
	
}
function locked () {
    lockStatus = 0
    radio.sendNumber(lockStatus)
}
radio.onReceivedValue(function (name, value) {
    tmpValue = value
    decrypt_key(tmpValue)
    if (tmpValue == master_key && lockStatus == 0) {
        unlocked()
        locked()
    } else {
        wrongKey()
    }
})
function wrongKey () {
    basic.showIcon(IconNames.No)
    radio.sendNumber(0)
}
function unlocked () {
    lockStatus = 1
    radio.sendNumber(lockStatus)
    for (let index = 0; index < 1; index++) {
        basic.pause(5000)
    }
}
let tmpValue = 0
let lockStatus = 0
let master_key = 0
master_key = 0
lockStatus = 0
radio.setGroup(90)
basic.forever(function () {
    if (lockStatus == 0) {
        basic.showIcon(IconNames.Sad)
    } else {
        basic.showIcon(IconNames.Happy)
    }
})
