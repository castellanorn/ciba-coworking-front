// cypress/support/e2e.js
// Aquí puedes agregar configuraciones globales y comandos personalizados

// Un ejemplo de comando personalizado
Cypress.Commands.add('login', (username, password) => {
    cy.get('input[name=username]').type(username);
    cy.get('input[name=password]').type(password);
    cy.get('button[type=submit]').click();
});
