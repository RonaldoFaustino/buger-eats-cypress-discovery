import signup from '../pages/SignupPage';
import signupFactory from '../factories/SignupFactory'
import SignupPage from '../pages/SignupPage';

describe('Signup',() => {

    before( () =>{
        cy.log('Tudo aqui é executado antes uma unica vez ANTES de  TODOS os casos de testes')
    })

    beforeEach( function(){
        cy.log('Tudo aqui é executado sempre ANTES de CADA caso de Teste')
        // cy.fixture('delivery').then((d) => {
        //     this.delivery = d
        // })
    })

    after(function(){
        cy.log('Tudo aqui é executado antes uma unica vez DEPOIS de  TODOS os casos de testes')
    })

    afterEach(function(){
        cy.log('Tudo aqui é executado sempre DEPOIS de CADA caso de Teste')
    })

    it ('User should be delivery',function(){
       
        var delivery = signupFactory.deliver()

        signup.go()
        signup.fillForm(delivery)
        signup.submit()
        
        const expectMenssage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'

        signup.modalContentShouldBe(expectMenssage)

    })

    it ('Incorret document',function(){
        
        var delivery = signupFactory.deliver()

        delivery.cpf = '00000000AAA'

        signup.go()
        signup.fillForm(delivery)
        signup.submit()

        cy.get('.alert-error')
            .should('have.text', 'Oops! CPF inválido')

    })

    it ('Incorret email',function(){

        var delivery = signupFactory.deliver()

        delivery.email = 'teste.com.br'
  
        signup.go()
        signup.fillForm(delivery)
        signup.submit()
        signup.alertMessageShouldBe('Oops! Email com formato inválido.')    
        
    })

    context('Required fields', function(){

        const messages = [
            {filds: 'name', output: 'É necessário informar o nome'},
            {filds: 'cpf', output: 'É necessário informar o CPF'},
            {filds: 'email', output: 'É necessário informar o email'},
            {filds: 'postalcode', output: 'É necessário informar o CEP'},
            {filds: 'number', output: 'É necessário informar o número do endereço'},
            {filds: 'delivery_method', output: 'Selecione o método de entrega'},
            {filds: 'cnh', output: 'Adicione uma foto da sua CNH'}
        ]

        before(function(){
            signup.go()
            signup.submit()
        })

        messages.forEach(function(msg){
            it(`${msg.filds} is required`, function(){
                SignupPage.alertMessageShouldBe(msg.output)
            })
        })
    })

    it('Required fields', function(){
        signup.go()
        signup.submit()
        signup.alertMessageShouldBe('É necessário informar o nome')
        signup.alertMessageShouldBe('É necessário informar o CPF')
        signup.alertMessageShouldBe('É necessário informar o email')
        signup.alertMessageShouldBe('É necessário informar o CEP')
        signup.alertMessageShouldBe('É necessário informar o número do endereço')
        signup.alertMessageShouldBe('Selecione o método de entrega')
        signup.alertMessageShouldBe('Adicione uma foto da sua CNH')
         
    })


})