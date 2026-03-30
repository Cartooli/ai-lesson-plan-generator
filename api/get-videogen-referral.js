/**
 * VideoGen Referral Code Endpoint
 *
 * Returns the VideoGen partner referral code if configured
 * This is an optional feature for affiliate/referral codes
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
    const referralCode = process.env.VIDEOGEN_PARTNER_REFERRAL_CODE;

    if (!referralCode || referralCode.trim() === '') {
      return res.status(200).json({
        referralCode: null,
        message: 'VideoGen referral code not configured'
      });
    }

    return res.status(200).json({
      referralCode: referralCode,
      message: 'Referral code available'
    });

  } catch (error) {
    return res.status(500).json({
      error: 'Failed to retrieve referral code',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
