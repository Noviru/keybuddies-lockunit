function keygen (g_key: number, p_key: number, key: number) {
    p_k = g_key ** key % p_key
    return p_k
}
function key_exchange (key: string, value: number) {
    if (key == "g") {
        g = value
    } else if (key == "p") {
        p = value
    } else if (key == "A") {
        public_key = value
        public_key_answer = keygen(g, p, private_key)
        radio.sendValue("B", public_key_answer)
        secret_key = keygen(public_key, p, private_key)
    } else if (key == "B") {
        public_key_answer = value
        secret_key = keygen(public_key_answer, p, private_key)
    } else if (key == "hidden") {
        key_auth = binary_to_dec(xor_cipher(dec_to_binary(value), dec_to_binary(secret_key)))
        secret_key = 0
    }
}
function dec_to_binary (num: number) {
    binary_key = [
    0,
    0,
    0,
    0,
    0
    ]
    n = num
    i = binary_key.length - 1
    while (n > 0) {
        binary_key[i] = n % 2
        double_to_int(n)
        n = int
        i += -1
    }
    return binary_key
}
function locked () {
    basic.showIcon(IconNames.Sad)
    lockStatus = 0
    basic.pause(5000)
    basic.clearScreen()
}
function xor_cipher (list1: number[], list2: number[]) {
    let result: number[] = []
    basic.clearScreen()
    for (let index = 0; index <= 4; index++) {
        result[index] = (list1[index] + list2[index]) % 2
        if (list1[index] == 1) {
            led.toggle(index, 0)
            basic.pause(500)
        }
        if (list2[index] == 1) {
            led.toggle(index, 2)
            basic.pause(500)
        }
    }
    for (let index = 0; index <= 4; index++) {
        if (result[index] == 1) {
            led.toggle(index, 4)
            basic.pause(500)
        }
    }
    return result
}
function binary_to_dec (binary_list: any[]) {
    decimal = 0
    binary_list.reverse()
    for (let index = 0; index <= binary_list.length - 1; index++) {
        decimal = decimal + binary_list[index] * 2 ** index
    }
    return decimal
}
radio.onReceivedValue(function (name, value) {
    key_exchange(name, value)
    if (key_auth > 0) {
        if (key_auth == master_key && lockStatus == 0) {
            unlocked()
            locked()
        } else {
            wrongKey()
        }
    }
})
function wrongKey () {
    radio.sendValue("status", lockStatus)
    key_auth = 0
    basic.showIcon(IconNames.No)
    basic.clearScreen()
}
function double_to_int (db: number) {
    if (db % 2 == 0) {
        int = db / 2
    } else {
        int = (db - 1) / 2
    }
    return int
}
function unlocked () {
    lockStatus = 1
    key_auth = 0
    radio.sendValue("status", lockStatus)
    basic.showIcon(IconNames.Happy)
    for (let index = 0; index < 1; index++) {
        basic.pause(5000)
    }
    basic.clearScreen()
}
let decimal = 0
let int = 0
let i = 0
let n = 0
let binary_key: number[] = []
let key_auth = 0
let secret_key = 0
let public_key_answer = 0
let public_key = 0
let p = 0
let g = 0
let p_k = 0
let lockStatus = 0
let private_key = 0
let master_key = 0
radio.setGroup(90)
master_key = 15
private_key = randint(1, 10)
lockStatus = 0
basic.forever(function () {
	
})
