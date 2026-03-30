/**
 * ElevenLabs Referral Link Endpoint
 *
 * Returns the ElevenLabs partner referral link if configured
 * This is an optional feature for affiliate/referral links
 */

import { setCorsHeaders } from './_utils/cors.js';

export default async function handler(req, res) {
  setCorsHeaders(req, res);

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed. Use GET.' });
  }

  try {
    const referralLink = process.env.ELEVEN_LABS_PARTNER_REFERRAL_LINK;

    if (!referralLink || referralLink.trim() === '') {
      return res.status(200).json({
        referralLink: null,
        message: 'ElevenLabs referral link not configured'
      });
    }

    return res.status(200).json({
      referralLink: referralLink,
      message: 'Referral link available'
    });

  } catch (error) {
    return res.status(500).json({
      error: 'Failed to retrieve referral link',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
