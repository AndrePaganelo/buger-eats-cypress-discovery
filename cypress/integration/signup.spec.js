import signup from '../pages/SignupPage'    //importo a classe ja instanciada, assim consigo dizer onde esta a camada de páginas para a camada de testes

describe('Signup', ()=>{

    beforeEach(function() {
        cy.fixture('deliver').then((d)=> {
            this.deliver = d
        })            //busca a massa 
    })
    
    it('User should be deliver', function() {     
        signup.go()     //começo a chamar os steps
        signup.fillForm(this.deliver.signup)
        signup.submmit()

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.modalCotentShouldBe(expectedMessage)   
    })

    it('Incorrect document', function() {        
        signup.go()     
        signup.fillForm(this.deliver.cpf_inv)
        signup.submmit()
        signup.alertMessageShouldBe('Oops! CPF inválido')
    })

    it('Incorrect email', function() {        
        signup.go()     
        signup.fillForm(this.deliver.email_inv)
        signup.submmit()
        signup.alertMessageShouldBe('Oops! Email com formato inválido.')
    })

})  