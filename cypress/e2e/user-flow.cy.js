const BASE_URL = 'http://localhost:3000/'
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

describe('Stripe checkout happy path', () => {
  beforeEach(() => {
    cy.visit(BASE_URL)
  })

  it('allows to add a product to cart, proceed to checkout and then success page', () => {
    Cypress.on('uncaught:exception', () => {
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
        expect(this.headerCartTotal).to.equal(this.productPagePrice)
      })

    cy.findByTestId('cart-link').click()

    cy.findByTestId('cart-total')
      .invoke('text')
      .as('cartTotal')
      .then(function () {
        expect(this.cartTotal).to.equal(this.headerCartTotal)
      })

    cy.intercept('POST', '/api/stripe/create-checkout-session').as(
      'createCheckoutSession'
    )

    cy.findByRole('button', { name: /checkout/i }).click()

    cy.wait('@createCheckoutSession').then((interception) => {
      const stripeUrl = interception.response.body.session.url
      cy.origin(
        STRIPE_CHECKOUT_DOMAIN,
        { args: { stripeUrl, STRIPE_DUMMY_DATA } },
        function ({ stripeUrl, STRIPE_DUMMY_DATA }) {
          cy.visit(stripeUrl)
          cy.on('uncaught:exception', (err, runnable) => {
            return false
          })

          cy.wait(1000)

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
        }
      )
    })
    cy.location('pathname', { timeout: 20000 }).should('include', '/success')
    cy.contains('Successful Order').should('be.visible')
  })
})
