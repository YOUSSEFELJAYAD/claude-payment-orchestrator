# Examples: AWS Athena SQL

## Find Root Login

```sql
SELECT event_time, source_ip_address, region
FROM cloudtrail_logs
WHERE user_identity.type = 'Root'
ORDER BY event_time DESC;
```

## Find Rejected SSH Traffic

```sql
SELECT srcaddr, dstaddr, dstport
FROM vpc_flow_logs
WHERE dstport = 22 AND action = 'REJECT'
LIMIT 10;
```
