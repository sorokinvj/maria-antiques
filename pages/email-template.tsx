import React, { ReactNode } from 'react'
import ReactDOMServer from 'react-dom/server'
import { Box, Email, Image, Item } from 'react-html-email'

// Features:
// - preview email template
//   - version control
//   - output email template html as string to send via sendgrid

// TODO:
// - fix google font embedding
// - fix types for external libraries
// - find best way to insert CSR in Next

// What to do with types for external libraries?
// How to make a purely CSR page in Next?
// How to get rid of <Layout/> on one page?
// Can I edit external library code?

// get dummy Json:
import emailData from './email.json'

interface Props {
  children?: ReactNode
}


const ClientOnly = ({ children, ...delegated }: Props) => {
  const [hasMounted, setHasMounted] = React.useState(false)
  React.useEffect(() => {
    setHasMounted(true)
  }, [])
  if (!hasMounted) {
    return null
  }
  return <div {...delegated}>{children}</div>
}

const emailHeadCSS = `
  body {
    background-color: #ffffff;
    font-family: "Quicksand", sans-serif;
    font-size: 16px;
    line-height: 24px;
    margin: 0;
    color: #000000
  }
  p, h1 {
    margin-bottom: 20px
  }
  table {
    margin-bottom: 20px
  }
  img {
    -ms-interpolation-mode: bicubic;
    border: 0;
    height: auto;
    text-decoration: none;
    width: inherit;
    display: inline-block
}

  a img {
      border: 0;
  }

`.trim()

const pStyle = {
  paddingBottom: '20px'
}

const subject = 'Subject'

const Template = () => {
  const username = emailData.shippingName
  const products = emailData.products
  const total = emailData.total
  const orderId = emailData.orderId
  const city = emailData.shippingInfo.address.city
  const addressLine1 = emailData.shippingInfo.address.line1
  const addressLine2 = emailData.shippingInfo.address.line2
  const country = emailData.shippingInfo.address.country

  return (
    <>
      <Email align="center" headCSS={emailHeadCSS} title={subject}>
        <Box>
          <Box cellPadding={10} width="600" align="left">
            <Item style={{ height: '100px' }} align="left" valign="top">
              <Image
                align="left"
                alt="Maria's Antiques"
                width={220}
                height={42}
                src="/Maria-Antiques-logo.png"
                style={{ width: '220px', height: '42px', marginTop: '20px' }}
              />
            </Item>
            <Item>
              <h1
                style={{
                  fontSize: '32px',
                  padding: '0 0 20px 0',
                  margin: '0',
                  fontWeight: 'bold'
                }}
              >
                Hello {username}!
              </h1>
              <p>
                It&apos;s Maria from Maria&apos;s Antiques Store. Thank you very
                much for your order, we are going to ship it in 2 days.
              </p>

              <p>
                <strong>Here are your order details:</strong>
              </p>

              <table cellPadding={5}>
                {products.map((product) => {
                  return (
                    <>
                      <tr style={{ background: '#f9fafb' }}>
                        <td width={70}>
                          <Image
                            align="left"
                            alt="Maria's Antiques"
                            width={80}
                            height={120}
                            src={product.imageUrl}
                            style={{ width: '70px', height: 'auto' }}
                          />
                        </td>
                        <td width={450}>{product.name}</td>
                        <td width={100} align="right">
                          €{product.price}
                        </td>
                      </tr>
                    </>
                  )
                })}

                <tr>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td align="right">
                    <strong>Total:</strong>
                  </td>
                  <td align="right">
                    <strong>€{total}</strong>
                  </td>
                </tr>
              </table>
              <p>
                <strong>Shipping address: </strong>
                {country}, {city}, {addressLine1}{' '}
                {addressLine2 && `, ${addressLine2}`}
              </p>
              <p>
                When we ship the order please expect another email with tracking
                information. In the meantime if you have any questions, please
                just reply to this email and I will be happy to assist you.
              </p>

              <p>
                <a
                  style={{
                    background: '#cb3a32',
                    display: 'inline-block',
                    color: '#ffffff',
                    padding: '8px 20px',
                    textAlign: 'center',
                    borderRadius: '5px',
                    textDecoration: 'none'
                  }}
                  href={`https://maria-antiques.vercel.app/order?id=${orderId}`}
                >
                  Check yor order status
                </a>
              </p>

              <Item style={{ padding: '20px 0' }}>
                <a style={{ color: 'silver', textDecoration: 'none' }} href="#">
                  mariasantiques.com
                </a>
              </Item>
            </Item>
          </Box>
        </Box>
      </Email>
    </>
  )
}

const ShowEmailTemplate = () => {
  return (
    <ClientOnly>
      <Template />
    </ClientOnly>
  )
}

// Output html to string:
console.log(ReactDOMServer.renderToStaticMarkup(Template()))

export default ShowEmailTemplate
