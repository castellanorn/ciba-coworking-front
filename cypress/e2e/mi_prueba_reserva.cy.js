// mi_prueba_contacto.cy.js

describe('Prueba del Botón de Contacto', () => {
  it('Visita la Página de Contacto al hacer clic en IconFooter', () => {
    // 1. Visitar la página principal
    cy.visit('http://localhost:5173/'); // Cambia esta URL si es necesario

    // 2. Hacer clic en el botón de contacto 'IconFooter'
    cy.get('.icon-footer') // Asegúrate de que este selector es correcto
      .should('be.visible') // Verifica que el botón es visible
      .click(); // Haz clic en el botón

    // 3. Verificar que la URL cambió a la página de contacto
    cy.url().should('include', '/contacte'); // Asegúrate de que la URL contenga '/contacte'

    // 4. Verificar que un elemento específico esté presente en la página de contacto
    cy.contains('contacte'); // Cambia 'Texto Esperado' por un texto que debería estar presente en la página de contacto
  });
});
