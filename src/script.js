const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-del]')
const clearDisplayButton = document.querySelector('[data-clear-display]')
const previousOpTextElement = document.querySelector('[data-previous-op]')
const currentOpTextElement = document.querySelector('[data-current-op]')

class Calculator {
    constructor(previousOpTextElement, currentOpTextElement) {
        this.previousOpTextElement = previousOpTextElement
        this.currentOpTextElement = currentOpTextElement
        this.clearDisplay()
    }

    clearDisplay() {
        this.currentOp = ''
        this.previousOp = ''
        this.operation = undefined
    }

    delete() {
        this.currentOp = this.currentOp.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOp.includes('.')) return
        this.currentOp = (this.currentOp.toString() + number.toString()).substring(0, 15)
    }

    chooseOperation(operation) {
        if (this.currentOp === '') return
        if (this.previousOp !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOp = this.currentOp
        this.currentOp = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOp)
        const current = parseFloat(this.currentOp)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOp = computation.toFixed(2)
        this.operation = undefined
        this.previousOp = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[ 0 ])
        const decimalDigits = stringNumber.split('.')[ 1 ]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = '0'
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOpTextElement.innerText =
            this.getDisplayNumber(this.currentOp)
        if (this.operation != null) {
            this.previousOpTextElement.innerText =
                `${this.getDisplayNumber(this.previousOp)} ${this.operation}`
        } else {
            this.previousOpTextElement.innerText = ''
        }
    }
}

const calculator = new Calculator(previousOpTextElement, currentOpTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
    if(numberButtons) {
        calculator.clearDisplay()
    }
})

clearDisplayButton.addEventListener('click', button => {
    calculator.clearDisplay()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

const mapKeybord = {
    '0'         : 'btn 0',
    '1'         : 'btn 1',
    '2'         : 'btn 2',
    '3'         : 'btn 3',
    '4'         : 'btn 4',
    '5'         : 'btn 5',
    '6'         : 'btn 6',
    '7'         : 'btn 7',
    '8'         : 'btn 8',
    '9'         : 'btn 9',
    '*'         : 'mult',
    '/'         : 'division',
    '-'         : 'sub',
    '+'         : 'sum',
    '='         : 'equals',
    'Enter'     : 'equals',
    'Backspace' : 'delete',
    'Escape'    : 'clearDisplay',
    '.'         : 'dot'
}

const Keybord = (e) => {
    const digt = e.key

    const mapkey = () => Object.keys(mapKeybord).indexOf(digt) !== -1

    if(mapkey())
    document.getElementById(mapKeybord[digt]).click()
}
document.addEventListener('keydown', Keybord)