# Netlify Deployment Guide - Ubuntu Finance Society

## Overview

This guide provides step-by-step instructions to deploy the Ubuntu Finance Society frontend on Netlify.

## Prerequisites

- GitHub account with access to the repository
- Netlify account (free tier available)
- Backend API deployed and accessible
- Environment variables ready

## Step 1: Connect GitHub to Netlify

### 1.1 Create Netlify Account
1. Go to [netlify.com](https://netlify.com)
2. Click "Sign up"
3. Select "GitHub" for authentication
4. Authorize Netlify to access your GitHub account

### 1.2 Connect Repository
1. In Netlify dashboard, click "New site from Git"
2. Select "GitHub" as Git provider
3. Search for `ubuntu-finance-society` repository
4. Click to connect

## Step 2: Configure Build Settings

### 2.1 Build Command
Set the following build settings:

**Build command:**
```bash
npm run build -w packages/frontend
```

**Publish directory:**
```
packages/frontend/.next
```

**Node version:**
```
18
```

### 2.2 Environment Variables

In Netlify Dashboard → Site settings → Build & deploy → Environment:

Add the following variables:

```
REACT_APP_API_URL=https://your-backend-api.railway.app
NEXT_PUBLIC_API_URL=https://your-backend-api.railway.app
```

Replace `https://your-backend-api.railway.app` with your actual backend URL.

### 2.3 Build Settings Configuration File (Optional)

Create `netlify.toml` in project root (already included):

```toml
[build]
  command = "npm run build -w packages/frontend"
  publish = "packages/frontend/.next"
  functions = "packages/frontend/api"

[build.environment]
  NODE_VERSION = "18"
  NPM_VERSION = "9"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "geolocation=(), microphone=(), camera=()"

[[headers]]
  for = "/api/*"
  [headers.values]
    Access-Control-Allow-Origin = "*"
    Access-Control-Allow-Methods = "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    Access-Control-Allow-Headers = "Content-Type, Authorization"
```

## Step 3: Deploy to Netlify

### 3.1 Initial Deployment
1. Click "Deploy site" button
2. Netlify will automatically:
   - Clone repository
   - Install dependencies
   - Run build command
   - Deploy to Netlify's CDN

### 3.2 Monitor Deployment
1. Watch the build logs in real-time
2. Deployment completes when build succeeds
3. Netlify assigns temporary URL: `https://{random-name}.netlify.app`

### 3.3 Access Your Site
- **Temporary URL**: `https://{random-name}.netlify.app`
- **Production URL**: Configure custom domain (Step 4)

## Step 4: Configure Custom Domain

### 4.1 Add Custom Domain
1. In Netlify dashboard → Site settings → Domain management
2. Click "Add custom domain"
3. Enter your domain: `ubuntu-finance-society.com`
4. Netlify will check domain availability

### 4.2 Configure DNS
Follow Netlify's DNS setup instructions:
- Option 1: Point domain nameservers to Netlify (recommended)
- Option 2: Add Netlify DNS records to your existing provider

### 4.3 Enable HTTPS
- Netlify automatically provisions SSL certificate
- HTTPS enabled within minutes
- Certificate auto-renews annually

## Step 5: Continuous Deployment Setup

### 5.1 Automatic Deploys on Git Push
Netlify automatically deploys when you push to `main`:

```bash
git add .
git commit -m "feat: add new feature"
git push origin main
```

Netlify will:
1. Detect push to `main`
2. Run build command
3. Deploy to production
4. Notify on success/failure

### 5.2 Preview Deploys for Pull Requests
Every pull request gets a preview deployment:

1. Create feature branch and push
2. Open pull request on GitHub
3. Netlify automatically builds preview
4. See preview URL in PR checks
5. Review changes before merge

## Step 6: Environment Management

### 6.1 Development Environment
For development on your local machine:

```bash
# Clone repository
git clone https://github.com/wenkosimthika-create/ubuntu-finance-society.git

# Install dependencies
npm install

# Create .env.local
cat > packages/frontend/.env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:3001
EOF

# Start development server
npm run dev -w packages/frontend
```

### 6.2 Staging Environment (Optional)
Create a `develop` branch for staging:

```bash
# Deploy develop branch to staging URL
# In Netlify: Add branch deploy
# Branch: develop
# Subdomain: staging
```

### 6.3 Production Environment
Main branch automatically deploys to production:
- Domain: `ubuntu-finance-society.com`
- Environment: Production
- SSL: Enabled
- CDN: Global

## Step 7: Verify Deployment

### 7.1 Health Check
```bash
# Check if frontend is accessible
curl https://your-domain.netlify.app/

# Check API connectivity
curl https://your-domain.netlify.app/api/health
```

### 7.2 Test Features
1. Open frontend in browser
2. Test authentication flow
3. Verify API calls succeed
4. Check browser console for errors
5. Test on mobile device

### 7.3 Monitor Logs
In Netlify dashboard → Logs:
- Deployment logs
- Function logs
- Edge function logs

## Step 8: Configure Monitoring & Analytics

### 8.1 Enable Netlify Analytics
1. Site settings → Analytics
2. Enable Netlify Analytics
3. View real-time visitor data

### 8.2 Setup Error Tracking (Optional)
Integrate with Sentry:

1. Create Sentry project
2. Add Sentry DSN to environment variables
3. Configure error reporting in frontend

### 8.3 Performance Monitoring
1. Use Netlify's built-in performance stats
2. Monitor Core Web Vitals
3. Optimize images and assets

## Step 9: Troubleshooting

### 9.1 Build Failures

**Issue**: Build fails with dependency error

**Solution**:
```bash
# Clear cache
# In Netlify: Site settings → Build & deploy → Clear cache and redeploy

# Or regenerate lock file
rm package-lock.json
npm install
git add package-lock.json
git commit -m "chore: regenerate lock file"
git push origin main
```

### 9.2 API Connection Issues

**Issue**: Frontend can't connect to backend API

**Solution**:
1. Verify `REACT_APP_API_URL` environment variable
2. Check backend API is running and accessible
3. Verify CORS headers on backend
4. Check browser console for errors

### 9.3 Runtime Errors

**Issue**: Page shows blank or error

**Solution**:
1. Check browser console for JavaScript errors
2. Review Netlify build logs
3. Test locally: `npm run dev`
4. Check environment variables are set

### 9.4 Slow Performance

**Issue**: Pages loading slowly

**Solution**:
1. Enable image optimization
2. Implement code splitting
3. Use Netlify's CDN caching
4. Optimize database queries
5. Enable gzip compression

## Step 10: Maintenance & Updates

### 10.1 Regular Updates
Keep dependencies current:

```bash
# Check outdated packages
npm outdated

# Update packages
npm update

# Update major versions
npm install -g npm-check-updates
ncu -u
npm install
```

### 10.2 Monitoring Uptime
Set up uptime monitoring:
- Use Netlify's status page
- Setup external monitoring (UptimeRobot, StatusPage)
- Configure alerts

### 10.3 Backup & Recovery
- GitHub is your primary backup
- Netlify keeps deployment history
- Can rollback to previous versions

## Step 11: Security Configuration

### 11.1 Environment Variable Protection
- Never commit `.env` files
- Use Netlify dashboard for variables
- Rotate API keys regularly

### 11.2 HTTP Security Headers
Headers are configured in `netlify.toml`:
- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options
- Strict-Transport-Security

### 11.3 DDoS Protection
- Netlify includes basic DDoS protection
- Enable WAF (Web Application Firewall) for additional protection
- Monitor suspicious traffic

## Step 12: Advanced Configuration

### 12.1 Edge Functions
Deploy serverless functions at edge:

```javascript
// netlify/edge-functions/auth.js
export default async (request, context) => {
  const token = request.headers.get("authorization");
  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }
  return context.next();
};
```

### 12.2 Redirect Rules
Configure URL rewrites in `netlify.toml`:

```toml
[[redirects]]
  from = "/api/*"
  to = "https://your-api.railway.app/:splat"
  status = 200
  force = true

[[redirects]]
  from = "/old-path"
  to = "/new-path"
  status = 301
```

### 12.3 Form Handling
Netlify Forms for contact forms:

```tsx
// Form component
<form name="contact" method="POST" netlify>
  <input type="email" name="email" required />
  <textarea name="message" required></textarea>
  <button type="submit">Send</button>
</form>
```

## Deployment Checklist

- [ ] GitHub repository cloned locally
- [ ] Netlify account created
- [ ] GitHub connected to Netlify
- [ ] Build command configured
- [ ] Publish directory set correctly
- [ ] Node version set to 18
- [ ] Environment variables added
- [ ] Backend API deployed
- [ ] First deployment successful
- [ ] Custom domain configured
- [ ] SSL certificate verified
- [ ] Preview deploys working
- [ ] Monitoring enabled
- [ ] Uptime monitoring configured
- [ ] Security headers verified
- [ ] Performance optimized

## Useful Commands

```bash
# Build locally
npm run build -w packages/frontend

# Preview production build
npm run start -w packages/frontend

# Check for build errors
npm run lint -w packages/frontend

# Run tests
npm test -w packages/frontend

# View build logs
netlify logs

# Deploy specific branch
git push origin feature/new-feature

# Force redeploy
# In Netlify: Site settings → Deploys → Trigger deploy
```

## Support & Resources

- **Netlify Documentation**: https://docs.netlify.com
- **GitHub Actions**: https://github.com/features/actions
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **API Documentation**: See `packages/backend/API.md`

## Next Steps

1. ✅ Deploy frontend to Netlify
2. ✅ Deploy backend to Railway/Render
3. ✅ Configure database connection
4. ✅ Run database migrations
5. ✅ Test end-to-end flow
6. ✅ Setup monitoring and alerts
7. ✅ Configure backups
8. ✅ Document deployment procedures

---

**Your Ubuntu Finance Society application is ready for production!** 🚀

The group keeps the money. Ubuntu Finance Society keeps the record.
