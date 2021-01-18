const Page = require('../pageObjects/main.page')

describe('Homepage test', () => {
  it('should open correct app', () => {
    Page.open()
    expect(browser).toHaveTitle('Flutterwave events')
  })

  it('should have correct heading', () => {
    Page.open()
    const $heading = $('h1')

    expect($heading).toBeDisplayed()
    expect($heading).toHaveText('The best events happening now.')
  })
})
