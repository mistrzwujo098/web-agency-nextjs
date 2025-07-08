// MailerLite API Integration
// Documentation: https://developers.mailerlite.com/docs

interface MailerLiteSubscriber {
  email: string
  fields?: {
    name?: string
    last_name?: string
    company?: string
    phone?: string
    city?: string
    state?: string
    country?: string
    z_i_p?: string
    [key: string]: any
  }
  groups?: string[]
  status?: 'active' | 'unsubscribed' | 'unconfirmed' | 'bounced' | 'junk'
}

interface MailerLiteGroup {
  id: string
  name: string
}

class MailerLiteService {
  private apiKey: string
  private baseUrl = 'https://connect.mailerlite.com/api'
  
  constructor() {
    // API key should be set in environment variables
    this.apiKey = process.env.MAILERLITE_API_KEY || ''
  }

  // Add or update subscriber
  async addSubscriber(data: MailerLiteSubscriber): Promise<any> {
    const url = `${this.baseUrl}/subscribers`
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          email: data.email,
          fields: data.fields,
          groups: data.groups,
          status: data.status || 'active'
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(`MailerLite API error: ${error.message || response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error adding subscriber to MailerLite:', error)
      throw error
    }
  }

  // Update subscriber
  async updateSubscriber(subscriberId: string, data: Partial<MailerLiteSubscriber>): Promise<any> {
    const url = `${this.baseUrl}/subscribers/${subscriberId}`
    
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          fields: data.fields,
          groups: data.groups
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(`MailerLite API error: ${error.message || response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error updating subscriber in MailerLite:', error)
      throw error
    }
  }

  // Get subscriber by email
  async getSubscriberByEmail(email: string): Promise<any> {
    const url = `${this.baseUrl}/subscribers/${encodeURIComponent(email)}`
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        }
      })

      if (response.status === 404) {
        return null
      }

      if (!response.ok) {
        const error = await response.json()
        throw new Error(`MailerLite API error: ${error.message || response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error getting subscriber from MailerLite:', error)
      throw error
    }
  }

  // Add subscriber to group
  async addSubscriberToGroup(subscriberId: string, groupId: string): Promise<any> {
    const url = `${this.baseUrl}/subscribers/${subscriberId}/groups/${groupId}`
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        }
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(`MailerLite API error: ${error.message || response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error adding subscriber to group:', error)
      throw error
    }
  }

  // Remove subscriber from group
  async removeSubscriberFromGroup(subscriberId: string, groupId: string): Promise<any> {
    const url = `${this.baseUrl}/subscribers/${subscriberId}/groups/${groupId}`
    
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        }
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(`MailerLite API error: ${error.message || response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error removing subscriber from group:', error)
      throw error
    }
  }

  // Get all groups
  async getGroups(): Promise<MailerLiteGroup[]> {
    const url = `${this.baseUrl}/groups`
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        }
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(`MailerLite API error: ${error.message || response.statusText}`)
      }

      const data = await response.json()
      return data.data || []
    } catch (error) {
      console.error('Error getting groups from MailerLite:', error)
      throw error
    }
  }

  // Create automation trigger
  async triggerAutomation(automationId: string, subscriberEmail: string): Promise<any> {
    const url = `${this.baseUrl}/automations/${automationId}/triggers`
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          email: subscriberEmail
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(`MailerLite API error: ${error.message || response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error triggering automation:', error)
      throw error
    }
  }

  // Helper method to add subscriber with groups
  async addSubscriberWithGroups(email: string, fields: any = {}, groupIds: string[] = []): Promise<any> {
    try {
      // First, add or update the subscriber
      const subscriber = await this.addSubscriber({
        email,
        fields,
        groups: groupIds
      })

      return subscriber
    } catch (error) {
      console.error('Error adding subscriber with groups:', error)
      throw error
    }
  }
}

// Export singleton instance
export const mailerLite = new MailerLiteService()

// Group IDs for different purposes (these should be set in env vars)
export const MAILERLITE_GROUPS = {
  NEWSLETTER: process.env.MAILERLITE_GROUP_NEWSLETTER || '',
  CONTACT: process.env.MAILERLITE_GROUP_CONTACT || '',
  QUIZ: process.env.MAILERLITE_GROUP_QUIZ || '',
  DOWNLOAD: process.env.MAILERLITE_GROUP_DOWNLOAD || '',
  FREE_ANALYSIS: process.env.MAILERLITE_GROUP_FREE_ANALYSIS || '',
  HIGH_INTENT: process.env.MAILERLITE_GROUP_HIGH_INTENT || '',
  CUSTOMER: process.env.MAILERLITE_GROUP_CUSTOMER || ''
}

// Automation IDs (these should be set in env vars)
export const MAILERLITE_AUTOMATIONS = {
  WELCOME: process.env.MAILERLITE_AUTOMATION_WELCOME || '',
  DOWNLOAD_FOLLOWUP: process.env.MAILERLITE_AUTOMATION_DOWNLOAD || '',
  QUIZ_RESULTS: process.env.MAILERLITE_AUTOMATION_QUIZ || '',
  CONTACT_FOLLOWUP: process.env.MAILERLITE_AUTOMATION_CONTACT || ''
}