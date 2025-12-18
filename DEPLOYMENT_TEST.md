# Deployment Test Checklist

Use this checklist to verify your Vercel deployment is working correctly.

## Pre-Deployment Checklist

Before testing, ensure:

- [ ] Code is pushed to GitHub `main` branch
- [ ] Vercel project is connected to GitHub repository
- [ ] Environment variables are set in Vercel dashboard:
  - [ ] `ANTHROPIC_API_KEY` is set (REQUIRED)
  - [ ] `NODE_ENV` is set to `production` (optional but recommended)
- [ ] Latest deployment has completed successfully

## Step 1: Verify Deployment Status

1. Go to [Vercel Dashboard](https://vercel.com/dashboard) and select your project
2. Check **Deployments** tab:
   - [ ] Latest deployment shows "Ready" status
   - [ ] No build errors in logs
   - [ ] Deployment completed successfully

## Step 2: Test Frontend Access

1. Visit your deployment URL: `https://your-project-name.vercel.app`
2. Check the page loads:
   - [ ] Page loads without errors
   - [ ] Form is visible and functional
   - [ ] No console errors (open DevTools F12)
   - [ ] CSS styles are applied correctly

## Step 3: Test API Endpoint

### Option A: Browser DevTools

1. Open browser DevTools (F12)
2. Go to **Network** tab
3. Fill out the form and submit
4. Check the API request:
   - [ ] Request to `/api/generate-lesson` is made
   - [ ] Request method is `POST`
   - [ ] Request includes JSON body with form data
   - [ ] Response status is `200` (success) or check error message

### Option B: curl Command

```bash
curl -X POST https://your-project-name.vercel.app/api/generate-lesson \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Photosynthesis",
    "grade": "5th Grade",
    "subject": "Science",
    "duration": "45"
  }'
```

Expected response:
- ✅ Success: `{"success": true, "lessonPlan": "...", ...}`
- ❌ Error: Check error message

## Step 4: Test Lesson Generation

1. Fill out the form:
   - [ ] Enter a topic (e.g., "Photosynthesis")
   - [ ] Select a grade level (optional)
   - [ ] Enter subject (optional)
   - [ ] Enter duration (optional)

2. Click "Generate Lesson Plan"

3. Verify behavior:
   - [ ] Loading state appears ("Generating...")
   - [ ] Button is disabled during generation
   - [ ] Lesson plan appears after generation (30-60 seconds)
   - [ ] Lesson plan is formatted correctly
   - [ ] Copy button works

## Step 5: Test Error Handling

### Test Missing API Key (if possible)

If you temporarily remove the API key:
- [ ] Error message displays: "API key not configured..."
- [ ] Error is user-friendly (not technical)

### Test Invalid Input

1. Submit form with empty topic:
   - [ ] Validation error appears
   - [ ] Form doesn't submit

2. Submit with very long topic:
   - [ ] Request is sent
   - [ ] Either succeeds or shows appropriate error

## Step 6: Check Vercel Logs

1. Go to Vercel Dashboard → **Deployments** → Click on latest deployment
2. Check **Logs** tab:
   - [ ] No error messages
   - [ ] Function invocations are logged
   - [ ] API calls to Anthropic are successful

3. Check **Function Logs**:
   - [ ] No "API key not configured" errors
   - [ ] No timeout errors
   - [ ] Response times are reasonable (< 60 seconds)

## Step 7: Test CORS (if accessing from different domain)

If testing from a different origin:
- [ ] CORS headers are present
- [ ] API requests work from browser
- [ ] No CORS errors in console

## Step 8: Performance Check

- [ ] Page loads quickly (< 2 seconds)
- [ ] API response time is reasonable (5-30 seconds for AI generation)
- [ ] No timeout errors
- [ ] Mobile responsive (test on phone/tablet)

## Common Issues & Solutions

### Issue: "API key not configured"

**Solution:**
1. Go to Vercel → Settings → Environment Variables
2. Verify `ANTHROPIC_API_KEY` exists
3. Check it's set for correct environment (Production)
4. Redeploy after adding/updating

### Issue: Page loads but form doesn't work

**Solution:**
1. Check browser console for JavaScript errors
2. Verify API endpoint URL is correct
3. Check Network tab for failed requests
4. Verify CORS headers are set

### Issue: "Function timeout"

**Solution:**
1. Check Anthropic API status
2. Verify API key is valid and has credits
3. Check Vercel function timeout limits
4. Optimize prompt length if needed

### Issue: 404 on API endpoint

**Solution:**
1. Verify `vercel.json` is correct
2. Check API files are in `/api` directory
3. Verify file names match routes
4. Check Vercel build logs

## Success Criteria

Your deployment is working if:

✅ Frontend loads without errors  
✅ Form submission works  
✅ API endpoint responds correctly  
✅ Lesson plans are generated successfully  
✅ Error handling works gracefully  
✅ No errors in Vercel logs  

## Next Steps After Successful Test

- [ ] Update README.md with actual deployment URL (if different)
- [ ] Test on mobile devices
- [ ] Set up custom domain (optional)
- [ ] Configure rate limiting (if needed)
- [ ] Monitor usage and costs
- [ ] Share the live demo URL!

## Quick Test Command

```bash
# Test if deployment is accessible
curl -I https://your-project-name.vercel.app

# Should return: HTTP/2 200
```

## Need Help?

- Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for common issues
- Review [VERCEL_SETUP.md](VERCEL_SETUP.md) for setup details
- Check Vercel logs for specific errors
- Open a GitHub issue if problems persist

---

**Last Updated**: After deployment verification




