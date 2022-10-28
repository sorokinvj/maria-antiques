import { CURRENCY } from '@/constants'
import { formatCurrencyValue } from '@/utils/format-currency-value'
import { parseErrorMessage } from '@/utils/parseErrorMessage'
import { Order } from 'types'
import { getOrderDataById } from './get-order-data-by-id'

export const sendEmailConfirmation = async (orderId: string): Promise<any> => {
  try {
    const order = (await getOrderDataById(orderId)) as Order
    const subTotal = order.orderItems.reduce(
      (acc, item) => acc + item.product.price,
      0
    )
    const taxTotal = subTotal * 0.23
    const body = {
      from: {
        email: 'wynorobeira1960@outlook.pt',
        name: "Maria's Antiques"
      },
      template_id: 'd-4a358a8b065a4ccbb4f06b0de4a29ff4',
      tracking_settings: {
        click_tracking: {
          enable: true
        },
        open_tracking: {
          enable: true
        }
      },
      personalizations: [
        {
          to: [
            {
              email: order.email
            }
          ],
          dynamic_template_data: {
            orderId: order.id,
            shippingName: order.shippingInfo?.name,
            total: formatCurrencyValue({
              currency: CURRENCY,
              value: order.total
            }),
            subTotal: formatCurrencyValue({
              currency: CURRENCY,
              value: subTotal
            }),
            taxTotal: formatCurrencyValue({
              currency: CURRENCY,
              value: taxTotal
            }),
            shippingInfo: order.shippingInfo,
            shippingCost: order.shippingCost,
            products: order.orderItems.map((item) => ({
              name: item.product.name,
              price: formatCurrencyValue({
                currency: CURRENCY,
                value: item.product.price
              }),
              imageUrl: item.product.images[0].url
            }))
          }
        }
      ]
    }
    await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`
      },
      body: JSON.stringify(body)
    })
  } catch (error) {
    console.error('send email error', parseErrorMessage(error))
  }
}
