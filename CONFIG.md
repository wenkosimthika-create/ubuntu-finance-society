# Project Configuration

## Environment Variables

Copy `.env.example` to `.env` and update values:

### Database
```
DATABASE_URL=postgresql://user:password@localhost:5432/ubuntu_finance
```

### Server
```
NODE_ENV=development
PORT=3001
API_URL=http://localhost:3001
```

### Frontend
```
REACT_APP_API_URL=http://localhost:3001
```

### Authentication
```
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRY=7d
```

### Email (Optional)
```
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=user@example.com
SMTP_PASS=password
```

## Production Considerations

### Security
- [ ] Change `JWT_SECRET` to a strong random value
- [ ] Enable HTTPS only
- [ ] Set secure CORS policies
- [ ] Use environment-specific secrets
- [ ] Enable rate limiting
- [ ] Use security headers

### Database
- [ ] Use managed PostgreSQL service (AWS RDS, Azure Database, etc.)
- [ ] Enable automated backups
- [ ] Enable encryption at rest
- [ ] Use strong connection pooling
- [ ] Monitor database performance

### Deployment
- [ ] Use container orchestration (Docker, Kubernetes)
- [ ] Set up CI/CD pipelines
- [ ] Configure monitoring and logging
- [ ] Set up alerting
- [ ] Plan disaster recovery

### Compliance
- [ ] Review data privacy requirements
- [ ] Implement GDPR compliance if needed
- [ ] Document data retention policies
- [ ] Audit access logs regularly

## Monitoring

### Logging
- Backend logs: Check `logs/` directory
- Use Winston for structured logging
- Aggregate logs centrally for production

### Metrics
- Monitor API response times
- Track database query performance
- Monitor error rates
- Track active users

### Alerting
- Set up alerts for:
  - High error rates
  - Slow API responses
  - Database connection failures
  - Low disk space
  - Certificate expiration

## Maintenance

### Regular Tasks
- Review audit logs weekly
- Check security advisories monthly
- Update dependencies quarterly
- Review database performance monthly
- Test disaster recovery quarterly

### Database Maintenance
- Regular backups (daily minimum)
- VACUUM and ANALYZE maintenance
- Index optimization
- Connection pool tuning

### Performance
- Use database query caching
- Implement API response caching
- Use CDN for static assets
- Monitor and optimize slow queries
