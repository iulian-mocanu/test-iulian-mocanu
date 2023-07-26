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
    cy.visit('http://localhost:3000/');
    for (let i = 1; i <= 5; i++) {
      cy.get(`:nth-child(${i}) > .race-name > .race-number`).should('contain', /R\d+/);
      cy.get(`:nth-child(${i}) > .race-name > p`).should('exist').and('have.text');
      cy.get(`:nth-child(${i}) > :nth-child(${i}) > :nth-child(${i}) > :nth-child(${i})`).should('exist').and('have.number');
      };
    });

  it('Insert additional tests here and below', () => {
    //There is no lapsed time in the table
    cy.visit('http://localhost:3000/');
    for (let i = 1; i <= 5; i++) {
      cy.get(`:nth-child(${i}) > :nth-child(${i}) > :nth-child(${i}) > :nth-child(${i})`).should('not.contain', '-');
    }
    //Content is centered on the page
    //Locations start with capital letters
    //Assert if the races are displayed in chronological order
  });
  
});