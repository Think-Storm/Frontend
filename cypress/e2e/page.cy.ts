describe("Sign-in Page", () => {
  it("should navigate from the Sign-in page to the Sign-up page successfully", () => {
    cy.visit("/signin");
    cy.get('a[href="/signup"]').click();
    cy.url().should("include", "/signup");
    cy.get("h1").contains(/sign in/i);
  });
});
