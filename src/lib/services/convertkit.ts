// Kit (formerly ConvertKit) API Integration
// Documentation: https://developers.kit.com/

interface KitSubscriber {
  email: string
  first_name?: string
  fields?: Record<string, any>
  tags?: string[]
}

interface KitFormSubmission {
  email: string
  first_name?: string
  fields?: Record<string, any>
}

class ConvertKitService {
  private apiKey: string
  private apiSecret: string
  private baseUrl = 'https://api.kit.com/v4'
  
  constructor() {
    // These should be set in environment variables
    this.apiKey = process.env.KIT_API_KEY || ''
    this.apiSecret = process.env.KIT_API_SECRET || ''
  }

  // Add subscriber to a form
  async addSubscriberToForm(formId: string, data: KitFormSubmission): Promise<any> {
    const url = `${this.baseUrl}/forms/${formId}/subscribe`
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          api_key: this.apiKey,
          email: data.email,
          first_name: data.first_name,
          fields: data.fields
        })
      })

      if (!response.ok) {
        throw new Error(`Kit API error: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error adding subscriber to Kit:', error)
      throw error
    }
  }

  // Add subscriber with tags
  async addSubscriberWithTags(subscriber: KitSubscriber): Promise<any> {
    const url = `${this.baseUrl}/subscribers`
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          api_key: this.apiKey,
          email: subscriber.email,
          first_name: subscriber.first_name,
          fields: subscriber.fields,
          tags: subscriber.tags
        })
      })

      if (!response.ok) {
        throw new Error(`Kit API error: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error adding subscriber with tags:', error)
      throw error
    }
  }

  // Tag a subscriber
  async tagSubscriber(email: string, tagId: string): Promise<any> {
    const url = `${this.baseUrl}/tags/${tagId}/subscribe`
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          api_key: this.apiKey,
          email: email
        })
      })

      if (!response.ok) {
        throw new Error(`Kit API error: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error tagging subscriber:', error)
      throw error
    }
  }

  // Send broadcast email
  async sendBroadcast(broadcastId: string): Promise<any> {
    const url = `${this.baseUrl}/broadcasts/${broadcastId}/send`
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          api_secret: this.apiSecret
        })
      })

      if (!response.ok) {
        throw new Error(`Kit API error: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error sending broadcast:', error)
      throw error
    }
  }

  // Get subscriber by email
  async getSubscriber(email: string): Promise<any> {
    const url = `${this.baseUrl}/subscribers?email=${encodeURIComponent(email)}`
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      })

      if (!response.ok) {
        throw new Error(`Kit API error: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error getting subscriber:', error)
      throw error
    }
  }
}

// Export singleton instance
export const convertKit = new ConvertKitService()

// Form IDs for different purposes (these should be set in env vars)
export const KIT_FORMS = {
  NEWSLETTER: process.env.KIT_FORM_NEWSLETTER || '',
  CONTACT: process.env.KIT_FORM_CONTACT || '',
  QUIZ: process.env.KIT_FORM_QUIZ || '',
  DOWNLOAD: process.env.KIT_FORM_DOWNLOAD || '',
  FREE_ANALYSIS: process.env.KIT_FORM_FREE_ANALYSIS || ''
}

// Tag IDs for segmentation (these should be set in env vars)
export const KIT_TAGS = {
  NEWSLETTER_SUBSCRIBER: process.env.KIT_TAG_NEWSLETTER || '',
  CONTACTED: process.env.KIT_TAG_CONTACTED || '',
  QUIZ_COMPLETED: process.env.KIT_TAG_QUIZ || '',
  DOWNLOADED_RESOURCE: process.env.KIT_TAG_DOWNLOAD || '',
  REQUESTED_ANALYSIS: process.env.KIT_TAG_ANALYSIS || '',
  HIGH_INTENT: process.env.KIT_TAG_HIGH_INTENT || '',
  CUSTOMER: process.env.KIT_TAG_CUSTOMER || ''
}