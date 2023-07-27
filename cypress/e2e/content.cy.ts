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
    cy.intercept('GET', 'http://localhost:3000/v2/racing/next-races-category-group?count=5&categories=%5B%224a2788f8-e825-4d36-9894-efd4baf1cfae%22%2C%229daef0d7-bf3c-4f50-921d-8e818c60fe61%22%2C%22161d9be2-e909-4326-8c2c-35ed71fb460b%22%5D', 
    { fixture: 'get-races.json'  }).as('getData');
    cy.visit('http://localhost:3000/'); 
    cy.wait('@getData').its('response.statusCode').should('eq', 200);

    //1.Identify the top 5 earliest races based on "advertised_start"
    //1.a Get the race summaries from the JSON data
    cy.fixture('get-races.json').then((data) => {
      const raceSummaries = data.race_summaries;

      // 1.b Sort the race summaries based on the earliest advertised start time
      const sortedRaceSummaries = Object.values(raceSummaries).sort((a, b) =>
        new Date(a.advertised_start) - new Date(b.advertised_start)
      );

      // 1.c Get the top 5 races with the earliest advertised start
      const top5Races = sortedRaceSummaries.slice(0, 5);

      // 1.d Extract the meeting name and race number for each of the top 5 races
      const earliestRaceNumbers = top5Races.map((race) => race.race_number);

      // 1.e Log the results for verification
      cy.log(top5Races);

      // 2. Perform the assertions for each race number
      cy.get(':nth-child(1) > .race-name > .race-number').should('contain', earliestRaceNumbers[0]);
      cy.get(':nth-child(2) > .race-name > .race-number').should('contain', earliestRaceNumbers[1]);
      cy.get(':nth-child(3) > .race-name > .race-number').should('contain', earliestRaceNumbers[2]);
      cy.get(':nth-child(4) > .race-name > .race-number').should('contain', earliestRaceNumbers[3]);
      cy.get(':nth-child(5) > .race-name > .race-number').should('contain', earliestRaceNumbers[4]);
    });
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