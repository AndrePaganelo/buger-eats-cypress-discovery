
class SignupPage {                                              // classe que vai representar a classe de cadastro, insiro as funções:
    
    go() {                                                      // função go que vai acessar a página de cadastro 
        cy.visit('/')                                      

        cy.get('a[href="/deliver"]').click()
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')
    }

    // função Fillform, que vai preencher todo o formulario, recebendo o objeto delivey que é uma massa de teste como argumento
    fillForm(deliver) {

        cy.get('input[name="fullName"]').type(deliver.name)
        cy.get('input[name="cpf"]').type(deliver.cpf)
        cy.get('input[name="email"]').type(deliver.email)
        cy.get('input[name="whatsapp"]').type(deliver.whatsapp)

        cy.get('input[name="postalcode"]').type(deliver.address.postalcode) //preenche com cep
        cy.get('input[type="button"][value="Buscar CEP"]').click()  //clica no botao para buscar cep

        cy.get('input[name="address-number"]').type(deliver.address.number) //seta o numero da variavel
        cy.get('input[name="address-details"]').type(deliver.address.details) //seta o complemento da variavel

        cy.get('input[name="address"]').should('have.value', deliver.address.street)   //checa se a rua que buscou condiz com a massa
        cy.get('input[name="district"]').should('have.value', deliver.address.district)  //checa se o bairro que buscou condiz com a massa
        cy.get('input[name="city-uf"]').should('have.value', deliver.address.city_state)   //checa se a cidade que buscou condiz com a massa

        cy.contains('.delivery-method li', deliver.delivery_method).click()  //uso o contaisn para poder ter o localizador completinho, pois exibia 3 Li (listas)
        cy.get('input[accept="image/*"]').attachFile('/images/'+ deliver.cnh) //concateno com a imagem dentro da pasta images de fixtures
    }

    //função submit, que vai submeter o formulario preenchido
    submmit() {
        cy.get('button[type="submit"]').click()
    }


    modalCotentShouldBe(expectedMessage)   {

        cy.get('.swal2-container .swal2-html-container').should('have.text', expectedMessage)
    }

    alertMessageShouldBe(expectedMessage) {
        
        cy.get('.alert-error').should('have.text', expectedMessage)
    }

}

export default new SignupPage;    //declaro que estou exportando ja instanciado esta pagina para que possa importa-la na camada de testes, que está em cadastro.specs