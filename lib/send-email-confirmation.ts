import { parseErrorMessage } from '@/utils/parseErrorMessage'
import { Order } from 'types'
import { getOrderDataById } from './get-order-data-by-id'

export const sendEmailConfirmation = async (orderId: string): Promise<any> => {
  const order = (await getOrderDataById(orderId)) as Order
  const body = {
    from: {
      email: 'wynorobeira1960@outlook.pt',
      name: "Maria's Antiques"
    },
    template_id: 'd-5e2a6d9bbf81451db0cf5927a46f90cb',
    asm: {
      group_id: 32454
    },
    tracking_settings: {
      click_tracking: {
        enable: true
      },
      open_tracking: {
        enable: true
      }
    },
    categories: ['Order Confirmation'],
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
          total: order.total,
          products: order.orderItems.map((item) => ({
            name: item.product.name,
            price: item.product.price,
            image: item.product.images[0].url
          })),
          shippingInfo: order.shippingInfo
        }
      }
    ]
  }

  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`
      },
      body: JSON.stringify(body)
    })
    console.log(response)
    return response
  } catch (error) {
    console.error(parseErrorMessage(error))
    return error
  }
}
