/// <reference types="cypress" />


describe('feelo blog', () => {
    beforeEach(() => {
        cy
            .visit('/')
    })

    it('should have an about title element inside the about area element', () => {

        cy
            .get('.about-area')
            .scrollIntoView()
            .find('.section-title > .title')
            .should('exist')
    })

    it('should have a thumbnail image with intrinsic width of 495 and height of 780', () => {
        cy
            .get('.about-area .thumbnail img')
            .should(($img) => {
                expect($img[0].naturalWidth).to.equal(495)
                expect($img[0].naturalHeight).to.equal(780)
            })
    })

    it('should show a contact page after clicking the contact button, where clicking the name input field focuses it.', () => {
        cy
            .get('[data-cy=contact-btn]')
            .click()
        cy
            .get('.contact-form--1')
            .scrollIntoView()
            .find('input[name=name]')
            .click()
            .should('be.focused')
    })

    it('should show a contact page after clicking the contact button, where clicking the name input field focuses it and clicking on another field blurs the name field.', () => {
        cy
            .get('[data-cy=contact-btn]')
            .click()
        cy
            .get('.contact-form--1')
            .scrollIntoView()
            .find('input[name=name]')
            .click()
            .next()
            .click()
            .should(($email) => {
                expect($email.prev()).to.not.be.focused
            })

    })

    it('should show an error message after filling out and submitting the form in the contact page', () => {
        cy
            .get('[data-cy=contact-btn]')
            .click()
        cy
            .get('.contact-form--1')
            .scrollIntoView()
            .find('#contact-form-active')
            .children()
            .should(([$name, $email, $subj, $msg, $submit]) => {
                $name.value = 'Stamat Serafimov'
                $email.value = 'stamat@gmail.com'
                $subj.value = 'Regarding my spicy chicken order'
                $msg.value = 'I found your site by randomly typing words and I think this is the right place. Why is my spicy chicken order still not ready??'
                $submit.click()
            })

        cy
            .get('.form-output > .error')
            .should('have.text', 'Oops! An error occured and your message could not be sent.')
    })
})
