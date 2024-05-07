describe('Testing refistration flow', () => {
    beforeEach(()=>{
        cy.visit('http://localhost:4200/')
      })

    it('Navigates the specialist user as expected', () => {  
      cy.get('[data-cy="specialist-signUp"]').click()
  
      cy.location('pathname').should('equal', '/register')  
      
    })

    it('Opens Sign up modal that navigates specialist to register', () => {  
        cy.get('[data-cy="signUp"]').click()
    
        cy.get('[data-cy="rolePrompt" ]').should('be.visible') 
        
        cy.get('[data-cy="specialistRole"]').click()

        cy.location('pathname').should('equal', '/register')         
      })

      it('Opens Sign up modal that navigates specialist to register', () => {  
        cy.get('[data-cy="signUp"]').click()
    
        cy.get('[data-cy="rolePrompt" ]').should('be.visible') 
        
        cy.get('[data-cy="clientBtn"]').click()

        cy.location('pathname').should('equal', '/register')         
      })

      it('Registers user successfully from fixtures data', ()=>{


        cy.visit('http://localhost:4200/register')

        cy.fixture('register.json').then((dataArray)=>{
            dataArray.forEach((data:{firstName:string,lastName:string, email:string,phoneNumber:string,role:string, password:string}) => {
            cy.get('[data-cy="fname-input" ]').type(data.firstName)
            cy.get('[data-cy="lname-input"]').type(data.lastName)
            cy.get('[data-cy="email-input"]').type(data.email)
            cy.get('[data-cy="phone-input"]').type(data.phoneNumber)
            cy.get('[data-cy="password"]').type(data.password)

    
              if(data.email == 'hello@cypress.io' && data.password == '12345678'){
                cy.get('[ data-cy="create-account-link" ]').click()
                cy.location('pathname').should('equal', '')
                cy.visit('http://localhost:4200/login')
              }else if(data.email == 'hello@cypress.io' && data.password != '12345678'){
                cy.get('[ data-cy="create-account-link" ]').click()
                cy.get('[data-cy="IncorrectPw"]').contains('Email already exists')
              }else
              cy.get('[ data-cy="create-account-link" ]').click()
              cy.get('[data-cy="IncorrectPw"]').contains('Field is required')
            });
          })
      })

  })

  describe('Working with fixtures to test login', ()=>{
    let data:{
      email:string,
      password:string
    }
    before(()=>{
      cy.fixture('login.json').then((info)=>{
        data = info
      })
    })

    it('Iterates through login.json to test and tries to login', ()=>{

      cy.visit('http://localhost:4200/login')

      cy.fixture('login.json').then((dataArray)=>{
        dataArray.forEach((data:{email:string, password:string}) => {
          cy.get('[data-cy="email-field" ]').type(data.email)
          cy.get('[data-cy="password-field" ]').type(data.password)

          if(data.email == 'hello@cypress.io' && data.password == '12345678'){
            cy.get('[data-cy="login-button"]').click()
            cy.location('pathname').should('equal', '')
            cy.visit('http://localhost:4200/login')
          }else if(data.email == 'hello@cypress.io' && data.password != '12345678'){
            cy.get('[data-cy="login-button"]').click()
            cy.get('[data-cy="IncorrectPw"]').contains('Incorrect Password')
          }else
          cy.get('[data-cy="login-button"]').click()
          cy.get('[data-cy="IncorrectPw"]').contains('Field is required')
        });
      })

    })
  })


