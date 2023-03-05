describe("Blog app", function () {
  beforeEach(function () {
    Cypress.on("uncaught:exception", (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });
    cy.request("POST", "http://localhost:3000/api/testing/reset");

    const user = { username: "enghup", name: "Hello", password: "ferries" };

    const invUser = { username: "John", name: "Price", password: "ferries" };

    cy.request("POST", "http://localhost:3000/api/users", user);
    cy.request("POST", "http://localhost:3000/api/users", invUser);

    cy.visit("http://localhost:3000");

    Cypress.Commands.add("login", ({ username, name, password, url }) => {
      cy.request("POST", "http://localhost:3000/api/login", {
        username,
        name,
        password,
      }).then(({ body }) => {
        localStorage.setItem("loggedUser", JSON.stringify(body));
        cy.visit("http://localhost:3000");
      });
    });

    Cypress.Commands.add("addBlog", ({ author, title, url }) => {
      cy.request({
        url: "http://localhost:3000/api/blog",
        method: "POST",
        body: { author, url, title },
        headers: {
          Authorization: `bearer ${
            JSON.parse(localStorage.getItem("loggedUser")).token
          }`,
        },
      });
      cy.visit("http://localhost:3000");
    });

    Cypress.Commands.add("addLike", ({ author, title, url, like, count }) => {
      if (count === 0) {
        return 0;
      }
      console.log(author, title);
      cy.contains("Hairy Pottery").find(".Joe").click();
      cy.contains(title).parent().find(".Hidden").find(".Liker").click();
      cy.contains(title).find(".Joe").click();
      count = count - 1;
      cy.addLike({ author, title, url, like, count });
    });
  });

  it("Login form is shown", function () {
    cy.get(".login").get("#username").get("#password");
  });

  describe("Login", function () {
    it("succeed with correct credentials", function () {
      cy.get("#username").type("enghup");
      cy.get("#password").type("ferries");
      cy.get("#loginbutton").click();
      cy.contains("enghup logged in");
    });
    it("fails with invalid credentials", () => {
      cy.get("#username").type("CHAO");
      cy.get("#password").type("NS");
      cy.get("#loginbutton").click();
      cy.get("#message")
        .should("contain", "Invalid name/password")
        .should("have.css", "color")
        .and("match", /rgb\(255, 0, 0\)/);
    });
  });

  describe("logged in", function () {
    beforeEach(function () {
      cy.login({ username: "enghup", name: "Hello", password: "ferries" });
      cy.addBlog({
        author: "JK Rowling",
        title: "Hairy Pottery",
        url: "meh",
        like: 0,
      });
    });

    it("Adding blog", function () {
      cy.login({ username: "enghup", name: "Hello", password: "ferries" });
      cy.get("#title").type("Super NS Guide");
      cy.get("#name").type("CK Warrior");
      cy.get("#url").type("Wait 20 more years");
      cy.get("#blogSubmit").click();
      cy.contains("Super NS Guide CK Warrior");
    });

    it("User can like blog", function () {
      cy.contains("Hairy Pottery").as("blog");
      cy.get("@blog").get(".Joe").click();
      cy.get("@blog").get(".Liker").click();
      cy.get("@blog").get(".Likes").should("contain", 1);
    });

    it("User can delete blog", function () {
      cy.contains("Hairy Pottery").get(".Joe").click();

      cy.contains("Hairy Pottery").get(".deleter").click();

      cy.should("not.contain", "Hairy Pottery");
    });

    it("Wrong user cannot delete blog", function () {
      cy.get(".logout").click();

      cy.login({ username: "John", name: "Price", password: "ferries" });

      cy.contains("Hairy Pottery").get(".Joe").click();

      cy.contains("Hairy Pottery").get(".deleter").click();

      cy.contains("Hairy Pottery");
    });

    describe("Checking sort function", function () {
      beforeEach(function () {
        cy.addBlog({
          author: "JENM",
          title: "WEEEEEEEEE",
          url: "meh",
          like: 0,
        });
        cy.addLike({
          author: "JK Rowling",
          title: "Hairy Pottery",
          url: "meh",
          count: 3,
        });
      });
      it.only("Sorted blogs", function () {
        cy.get(".blogs").children(0).should("contain", "Hairy Pottery");

        cy.get(".blogs").children(1).should("contain", "JENM");
      });
    });
  });
});
