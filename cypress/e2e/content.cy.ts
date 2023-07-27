/// <reference types="cypress"/>
import { RACING_CATEGORIES } from "../config/constants";


describe('Page Content', () => {
  it('Should correctly display page title', () => {
    // Next To Go Races
    cy.visit('http://localhost:3000/');
    cy.get('[data-testid="page-title"]').should('contain', 'Next To Go Races');
  });


  it('Should display expected values for race row contents', () => {
    // Race number, venue name, time to jump
    cy.intercept('GET', 'http://localhost:3000/v2/racing/next-races-category-group?count=5&categories=%5B%224a2788f8-e825-4d36-9894-efd4baf1cfae%22%2C%229daef0d7-bf3c-4f50-921d-8e818c60fe61%22%2C%22161d9be2-e909-4326-8c2c-35ed71fb460b%22%5D', { fixtures: 'get-races' }).as('getData');
    cy.visit('http://localhost:3000/'); 
    cy.wait('@getData')
    //Sanity check
    .its('response.statusCode').should('eq', 200);
    //Unable to move beyond this error: > Cannot convert undefined or null to object

    });

  it('Insert additional tests here and below', () => {
    
    //Content is centered on the page
    cy.visit('http://localhost:3000/');
        cy.get('.app-header > :nth-child(1)').then(($element) => {
            // Get the dimensions of the element
            const elementWidth = $element.width();
            const elementHeight = $element.height();

            // Get the dimensions of the viewport using cy.window()
            cy.window().then((win) => {
                const viewportWidth = win.innerWidth;
                const viewportHeight = win.innerHeight;

                // Calculate the center of the viewport
                const viewportCenterX = viewportWidth / 2;
                const viewportCenterY = viewportHeight / 2;

                // Get the position of the element
                const elementPosition = $element[0].getBoundingClientRect();

                // Calculate the center of the element
                const elementCenterX = elementPosition.left + elementWidth / 2;
                const elementCenterY = elementPosition.top + elementHeight / 2;

                // Assert that the element is centered horizontally and vertically within a tolerance of 1 pixel
                expect(elementCenterX).to.be.closeTo(viewportCenterX, 1);
                expect(elementCenterY).to.be.closeTo(viewportCenterY, 1);
            });
        });

    //Locations start with capital letters
    //Assert if the races are displayed in chronological order
  });
  
});