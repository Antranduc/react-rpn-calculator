import React  from 'react';
import Screen from './Screen/Screen'
import Keypad from './Keypad/Keypad'

class Calculator extends React.Component {
    state = {
        equation: '',
        result: 0
    }

    onButtonPress = event => {
        let equation = this.state.equation;
        const pressedButton = event.target.innerHTML;

        if(pressedButton === 'C') 
            return this.clear();
        else if ((pressedButton >= '0' && pressedButton <= '9') || pressedButton === '.')
            equation += pressedButton;
        else if (['+', '-', '*', '/', '%'].indexOf(pressedButton) !== -1){
            /* equation += ' ' + pressedButton + ' '; */
            var tempEquation = equation.split(' ');
            if(tempEquation.length < 2){
                alert('Not enough arguments.');
            }else{
                var num2 = Number(tempEquation.pop());
                var num1 = Number(tempEquation.pop());
                switch(['+', '-', '*', '/', '%'].indexOf(pressedButton)){
                    case 0:
                        this.setState({result: num1 + num2});
                        this.setState({equation: tempEquation.join(' ')});
                        break;
                    case 1:
                        this.setState({result: num1 - num2});
                        this.setState({equation: tempEquation.join(' ')});
                        break;
                    case 2:
                        this.setState({result: num1 * num2});
                        this.setState({equation: tempEquation.join(' ')});
                        break;
                    case 3:
                        this.setState({result: num1 / num2});
                        this.setState({equation: tempEquation.join(' ')});
                        break;
                    case 4:
                        this.setState({result: num1 % num2});
                        this.setState({equation: tempEquation.join(' ')});
                        break;
                    default:
                        break;
                }
            }
        }else if(pressedButton === 'Enter'){
            /* Original code for regular calculator
            try{
                const evalResult = eval(equation);
                const result = Number.isInteger(evalResult) ? evalResult : evalResult.toFixed(2);
                this.setState({result});
            }catch(error){
                alert('Invalid Mathematical Equation');
            }
            */
           equation += ' ';
        }else{
            equation = equation.trim();
            equation = equation.substr(0, equation.length-1);
        }
        this.setState({equation: equation});
    }

    clear(){
        this.setState({equation: '', result: 0});
    }
    render() {
        return(
            <main className="calculator">
                <Screen equation={this.state.equation} result={this.state.result}/>
                <Keypad onButtonPress={this.onButtonPress}/>
            </main>
        );
    }
}

export default Calculator;