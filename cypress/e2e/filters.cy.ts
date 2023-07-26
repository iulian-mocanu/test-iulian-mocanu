describe('Category Filters', () => {
  it('Should validate that all checkboxes are checked by default', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[data-testid="category-filter-4a2788f8-e825-4d36-9894-efd4baf1cfae"] > [data-testid="category-filter-checkbox"]').should('be.checked');
    cy.get('[data-testid="category-filter-9daef0d7-bf3c-4f50-921d-8e818c60fe61"] > [data-testid="category-filter-checkbox"]').should('be.checked');
    cy.get('[data-testid="category-filter-161d9be2-e909-4326-8c2c-35ed71fb460b"] > [data-testid="category-filter-checkbox"]').should('be.checked');
  });


  
    it('Should validate that checkboxes filter content appropriately', () => {
      // Compare against intercepted real data
      // This test may need to be split into multiple for each category depending on how you structure it
      //test 1 would be: make sure thoroughbred is ticked and assert locations
      //test 2 would be as above but for the greyhound
      //test 3 is for harness and assert location is Yarra Valley
      cy.visit('http://localhost:3000/');
      cy.get(`[data-testid="category-filter-4a2788f8-e825-4d36-9894-efd4baf1cfae"] > [data-testid="category-filter-checkbox"]`)
      .uncheck();
      cy.get(`[data-testid="category-filter-9daef0d7-bf3c-4f50-921d-8e818c60fe61"] > [data-testid="category-filter-checkbox"]`)
      .uncheck();
      //making sure the box is ticked before assertion
      cy.get(`[data-testid="category-filter-161d9be2-e909-4326-8c2c-35ed71fb460b"] > [data-testid="category-filter-checkbox"]`)
      .should('be.checked');
      //checking all rows to contain the exact location
      for (let i = 1; i <= 5; i++) {
      cy.get(`:nth-child(${i}) > .race-name > p`).should('contain','Yarra Valley')}
    });
  


  it('Should validate that unchecking all checkboxes re-enables all', () => {
    cy.visit('http://localhost:3000/');
    cy.get(`[data-testid="category-filter-4a2788f8-e825-4d36-9894-efd4baf1cfae"] > [data-testid="category-filter-checkbox"]`)
      .uncheck();
    cy.get(`[data-testid="category-filter-9daef0d7-bf3c-4f50-921d-8e818c60fe61"] > [data-testid="category-filter-checkbox"]`)
      .uncheck();
    cy.get(`[data-testid="category-filter-161d9be2-e909-4326-8c2c-35ed71fb460b"] > [data-testid="category-filter-checkbox"]`)
      .uncheck();
    cy.get('[data-testid="category-filter-4a2788f8-e825-4d36-9894-efd4baf1cfae"] > [data-testid="category-filter-checkbox"]').should('be.checked');
    cy.get('[data-testid="category-filter-9daef0d7-bf3c-4f50-921d-8e818c60fe61"] > [data-testid="category-filter-checkbox"]').should('be.checked');
    cy.get(`[data-testid="category-filter-161d9be2-e909-4326-8c2c-35ed71fb460b"] > [data-testid="category-filter-checkbox"]`)
      .should('be.checked');
  });
  /*
    it.todo('Insert additional tests here and below', () => {
      //Check for existing filters and fail the test if extra filters are found
    });
    */
});