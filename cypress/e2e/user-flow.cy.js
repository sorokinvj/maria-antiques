/// <reference types="cypress" />

const { wait } = require('@testing-library/dom')
const { visit } = require('graphql')

const BASE_URL = 'http://localhost:3000/'
// const BASE_URL = 'https://maria-antiques.vercel.app/'

const STRIPE_CHECKOUT_DOMAIN = 'https://checkout.stripe.com'
const STRIPE_DUMMY_DATA = {
  email: 'any@email.com',
  cardNumber: '4242424242424242',
  cardExpiry: '01/39',
  cardCvc: '111',
  billingName: 'vova',
  shippingName: 'Vladimir',
  shippingAddressLine1: '123 Main St',
  shippingLocality: 'Lisbon',
  shippingPostalCode: '2705-122'
}

describe('full customer flow', () => {
  beforeEach(() => {
    cy.visit(BASE_URL)
  })

  it('allows to add a product  to cart, proceed to checkout and then success page', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false
    })

    cy.get('[data-testid=product-card]').first().click()

    cy.get('[data-testid=product-page-price]')
      .invoke('text')
      .as('productPagePrice')

    cy.findByRole('button', { name: /add to cart/i }).click()

    cy.findByTestId('header-cart-total')
      .invoke('text')
      .as('headerCartTotal')
      .then(function () {
        // compare price of product added to cart and cart total from header
        expect(this.headerCartTotal).to.equal(this.productPagePrice)
      })

    cy.findByTestId('cart-link').click()

    cy.findByTestId('cart-total')
      .invoke('text')
      .as('cartTotal')
      .then(function () {
        // compare cart total from header and cart total from cart page
        expect(this.cartTotal).to.equal(this.headerCartTotal)
      })

    cy.findByRole('button', { name: /checkout/i }).click()
    cy.window().its('cypressCheckoutSessionSlug').should('not.equal', '')

    cy.window().then(function (window) {
      const cartTotal = this.cartTotal
      const checkoutSessionSlug = window.cypressCheckoutSessionSlug

      cy.origin(
        STRIPE_CHECKOUT_DOMAIN,
        { args: { checkoutSessionSlug, cartTotal, STRIPE_DUMMY_DATA } },
        function ({ checkoutSessionSlug, cartTotal, STRIPE_DUMMY_DATA }) {
          cy.visit(checkoutSessionSlug)
          cy.on('uncaught:exception', (err, runnable) => {
            return false
          })

          cy.wait(1000)
          //compare stripe total and cart total
          cy.get('#ProductSummary-totalAmount>span')
            .invoke('text')
            .as('stripeTotal')
            .then(function ($stripeTotal) {
              expect($stripeTotal).to.equal(cartTotal)
            })

          cy.get('#email').type(STRIPE_DUMMY_DATA['email'])
          cy.get('#shippingName').type(STRIPE_DUMMY_DATA['shippingName'])
          cy.get('#shippingAddressLine1').type(
            STRIPE_DUMMY_DATA['shippingAddressLine1']
          )
          cy.get('#shippingLocality').type(
            STRIPE_DUMMY_DATA['shippingLocality']
          )
          cy.get('#shippingPostalCode').type(
            STRIPE_DUMMY_DATA['shippingPostalCode']
          )
          cy.get('#cardNumber').type(STRIPE_DUMMY_DATA['cardNumber'])
          cy.get('#cardExpiry').type(STRIPE_DUMMY_DATA['cardExpiry'])
          cy.get('#cardCvc').type(STRIPE_DUMMY_DATA['cardCvc'])

          cy.wait(1000)

          cy.get('[data-testid=hosted-payment-submit-button]').click()
          // .then(() => {
          //   cy.get('[data-testid=hosted-payment-submit-button]', {
          //     timeout: 20000
          //   }).then(($payButton) => {
          //     expect($payButton.text()).to.match(/processing/i)
          //   })
          // })

          // here stripe starts redirecting
          // here cypress ends test. How to prevent early pass ???

          // cy.on('url:changed', (newUrl) => {
          //   console.log('newUrl ======= ', newUrl)
          // })
        }
      ).then(() => {
        console.log('then!!!!!!!!!!!!!!!!')
        cy.on('url:changed', (newUrl) => {
          console.log('newUrl = ', newUrl)
          expect(newUrl).to.contain('sucecess')
          debugger
        })
      })

      // .then(() => {
      //   cy.get(['data-testid=successful-order-total']).then(($total) => {
      //     console.log($total.text())
      //   })
      // })

      // })
    })
  })
})
