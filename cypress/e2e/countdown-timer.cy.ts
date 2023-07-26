describe('Countdown Timer', () => {
  it('Should validate that timer is ticking down', () => {
    // Handle this deterministically through mocking race jump times
    // Mocking the race jump times
    const currentTime = new Date();
    // 1 min from the current time
    const raceJumpTime = new Date(currentTime.getTime() + 60000);
    cy.visit('http://localhost:3000/', {
      onBeforeLoad(win) {
        // Mock the current time to be equal to the race jump time
        cy.stub(win.Date, 'now').returns(raceJumpTime.getTime());
      },
    });

    cy.get(':nth-child(1) > :nth-child(3) > :nth-child(1) > :nth-child(2)').should('contain', '01:00');
    // 10 seconds
    cy.wait(10000);
    cy.get(':nth-child(1) > :nth-child(3) > :nth-child(1) > :nth-child(2)').should('contain', '00:51');
  });

});


/*
it.todo('Should validate that race time sign swaps to negative when expected jump time is exceeded', () => {
  // Handle this deterministically through mocking race jump times
});

it.todo('Should validate that races do not display after 5 minutes past the jump', () => {
  // Handle this deterministically through mocking race jump times
});

it.todo('Insert additional tests here and below', () => {
  //Ensure time is shown only in hours, minutes or seconds
  //Ensure seconds are displayed along with the minutes, when the timer drops below 5m mark
  //Assert lapsed time does not affect the order of the rows
});
*/