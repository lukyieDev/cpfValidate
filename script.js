$('.cpfInput').mask('000.000.000-00');
class validadorCPF {
    constructor(){
        this.inputValue = document.querySelector('.cpfInput')
        this.result = document.querySelector('.result')
    }
    validar(){
        this.clickConfirmar()
    }
    clickConfirmar(){
        const confirmBtn = document.querySelector('.confirmBtn')
        confirmBtn.addEventListener('click', ()=>{
            const cpfLimpo = this.inputValue.value.replace(/\D+/g,'')
            if(this.inputValue.value.length != 14){
                alert('CPF invalido ou Incompleto.')
                this.inputValue.value = ''
                this.inputValue.focus()
                return
            }
            if(this.sequencia(cpfLimpo)){
                alert('Numeros Sequencias, Nao Sao validos')
                return
            }
            const cpfArray = cpfLimpo.split('')
            cpfArray.splice(9,2)
            cpfArray.push(this.primeiroDigito(cpfArray))
            cpfArray.push(this.segundoDigito(cpfArray))
            this.verificarCPF(cpfArray, cpfLimpo)
        })
    }
    sequencia(cpfLimpo){
        const sequencia = cpfLimpo[0].repeat(cpfLimpo.length);
        return sequencia === cpfLimpo;
    };

    primeiroDigito(cpfArray){
        const somaDigitos = cpfArray.map((num, index)=>{return num * (10 - index)})
        .reduce((acumalador, valorCorrente)=>acumalador+=valorCorrente,0)
        const digito1 = (11 - (somaDigitos % 11)) > 9 ? '0' : (11 - (somaDigitos % 11))
        return String(digito1)
    };
    segundoDigito(cpfArray){
        const somaDigitos = cpfArray.map((num, index)=>{return num * (11 - index)})
        .reduce((acumalador, valorCorrente)=>acumalador+=valorCorrente,0)
        const digito2 = (11 - (somaDigitos % 11)) > 9 ? '0' : (11 - (somaDigitos % 11))
        return String(digito2)
    };
    verificarCPF(cpfArray,cpfLimpo){
    const cpfCalculado = cpfArray.join('')
    this.result.style.display = 'flex'
    return cpfCalculado === cpfLimpo ? this.result.textContent = `${this.inputValue.value} Seu CPF é Valido!` : this.result.textContent = `${this.inputValue.value} Seu CPF é Invalido!`
}
}
const validarCPF = new validadorCPF()
validarCPF.validar()