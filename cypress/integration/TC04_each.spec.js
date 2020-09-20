describe('Example to demonstrate the use each in Cypress', function () {
    before(function () {
        cy.visit('https://opensource-demo.orangehrmlive.com/')
    })

    beforeEach(function () {
        cy.fixture('testdata').then(function (testdata) {
            this.testdata = testdata
        })
    })

    it('Validate successful Login', function () {
        cy.get('#txtUsername').type(this.testdata.username)
        cy.get('#txtPassword').type(this.testdata.password)
        cy.get('#btnLogin').click()
        cy.get('#welcome').contains(this.testdata.welcomeText)
    })

    it('Validate all the Quick Launch Texts', function () {
        cy.get('.quickLaunge').each(($el, index) => {
            expect($el).to.contain(this.testdata.quickLaunch[index])
        })
    })

    it('Validate the Employee Distribution by Subunit Piechart Values and sum of percentage values', function () {
        var total = 0
        cy.get('.pieLabel').each(($el, index) => {
            expect($el).to.contain(this.testdata.empDistPieChart[index])
            total = total + parseInt($el.text())
        }).then(() => {
            expect(total).to.equal(99)
        })
    })
})