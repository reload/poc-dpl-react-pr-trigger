describe("Searchlist", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "https://stage.followsearches.dandigbib.org/list/default",
      status: 200,
      response: [
        {
          id: 70,
          hit_count: 200,
          last_seen: "2019-12-15 23:10:13",
          query: "Star Wars",
          title: "Min favorit søgning"
        },
        {
          id: 21,
          hit_count: 150,
          last_seen: "2019-12-15 22:01:23",
          query: "into the spider verse",
          title: "De bedste film i verden"
        }
      ]
    });
  });

  it("Loads a list of saved searches", () => {
    cy.visit("/iframe.html?id=apps-searchlist--entry");
    cy.contains("Star Wars");
    cy.contains("Min favorit søgning");
    cy.contains("Vis søgeresultat");
    cy.contains("200 nye materialer siden 15/12-2019.");
    cy.contains("De bedste film i verden");
    cy.contains("into the spider verse");
  });

  it("Click a saved search", () => {
    cy.visit("/iframe.html?id=apps-searchlist--entry");
    cy.contains("Vis søgeresultat").click();
    cy.contains("Vis søgeresultat").should(
      "have.attr",
      "href",
      "https://lollandbib.dk/search/ting/Star%20Wars"
    );
  });

  it("The list is empty", () => {
    cy.server();
    cy.route({
      method: "GET",
      url: "https://stage.followsearches.dandigbib.org/list/default",
      status: 200,
      response: []
    });
    cy.visit("/iframe.html?id=apps-searchlist--entry");
    cy.contains("Ingen gemte søgninger.");
  });

  it("The list failed to load", () => {
    cy.server();
    cy.route({
      method: "GET",
      url: "https://stage.followsearches.dandigbib.org/list/default",
      status: 500,
      response: {}
    });
    cy.visit("/iframe.html?id=apps-searchlist--entry");
    cy.contains("Gemte søgninger kunne ikke hentes.");
  });

  it("Remove a saved search", () => {
    cy.server();
    cy.route({
      method: "DELETE",
      url: "https://stage.followsearches.dandigbib.org/list/default/*",
      status: 204,
      response: {}
    });
    cy.visit("/iframe.html?id=apps-searchlist--entry");
    cy.contains("Star Wars");
    cy.contains("Fjern fra listen").click();
    cy.contains("Star Wars").should("not.be.visible");
  });

  it("Fail trying to remove a saved search", () => {
    cy.server();
    cy.route({
      method: "DELETE",
      url: "https://stage.followsearches.dandigbib.org/list/default/*",
      status: 500,
      response: {}
    });
    cy.visit("/iframe.html?id=apps-searchlist--entry");
    cy.contains("Fjern fra listen").click();
    cy.get("h2").should("have.length", 2);
  });
});
