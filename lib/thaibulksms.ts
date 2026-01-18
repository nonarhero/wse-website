import axios from 'axios'

const THAIBULKSMS_API_URL = 'https://api-v2.thaibulksms.com'

export interface SMSResponse {
  status: string
  message?: string
  data?: any
}

export async function sendOTP(phone: string, message: string): Promise<SMSResponse> {
  try {
    const apiKey = process.env.THAIBULKSMS_API_KEY
    const apiSecret = process.env.THAIBULKSMS_API_SECRET

    if (!apiKey || !apiSecret) {
      throw new Error('Thaibulksms API credentials not configured')
    }

    // Generate OTP code
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString()

    const response = await axios.post(
      `${THAIBULKSMS_API_URL}/sms`,
      {
        msisdn: phone,
        message: `${message} ${otpCode}`,
        sender: 'WSE',
      },
      {
        headers: {
          'Authorization': `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
      }
    )

    return {
      status: 'success',
      message: 'OTP sent successfully',
      data: { otpCode, response: response.data },
    }
  } catch (error: any) {
    console.error('Thaibulksms API Error:', error)
    return {
      status: 'error',
      message: error.response?.data?.message || error.message || 'Failed to send OTP',
    }
  }
}

export async function sendSMS(phone: string, message: string): Promise<SMSResponse> {
  try {
    const apiKey = process.env.THAIBULKSMS_API_KEY
    const apiSecret = process.env.THAIBULKSMS_API_SECRET

    if (!apiKey || !apiSecret) {
      throw new Error('Thaibulksms API credentials not configured')
    }

    const response = await axios.post(
      `${THAIBULKSMS_API_URL}/sms`,
      {
        msisdn: phone,
        message: message,
        sender: 'WSE',
      },
      {
        headers: {
          'Authorization': `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
      }
    )

    return {
      status: 'success',
      message: 'SMS sent successfully',
      data: response.data,
    }
  } catch (error: any) {
    console.error('Thaibulksms API Error:', error)
    return {
      status: 'error',
      message: error.response?.data?.message || error.message || 'Failed to send SMS',
    }
  }
}
