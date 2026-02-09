---
title: "Local DynamoDB Development Setup Guide"
slug: "local-dynamodb-development-setup-guide"
date: "2026-02-09"
excerpt: "This document guides developers through setting up Amazon DynamoDB Local for local development using Docker, configuring the application to connect to it, and viewing data via NoSQL Workbench."
---

This document guides developers through setting up **Amazon DynamoDB Local** for local development using Docker, configuring the application to connect to it, and viewing data via **NoSQL Workbench**.

---

## 1. Run DynamoDB Local with Docker Compose

We use the official DynamoDB Local Docker image and run it as a service.

### 1.1 Create `docker-compose.yml`

Create a file named `docker-compose.yml` with the following content:

```yaml
version: "3.8"

services:
  dynamodb:
    image: amazon/dynamodb-local
    container_name: dynamodb-local
    ports:
      - "8000:8000"
    command: "-jar DynamoDBLocal.jar -sharedDb"
    volumes:
      - dynamodb_data:/home/dynamodblocal/data
    networks:
      - mysql_database

volumes:
  dynamodb_data:

networks:
  mysql_database:
    external: true
```

### 1.2 Start DynamoDB Local

Run the following command from the directory containing `docker-compose.yml`:

```bash
docker compose up -d
```

After this, DynamoDB Local will be available at:

```
http://localhost:8000
```

---

## 2. Update Application DynamoDB Endpoint

When running inside Docker, the application should connect to DynamoDB using the **service name** (`dynamodb`) instead of `localhost`.

### 2.1 Update `dynamo_impl.py`

In `dynamo_impl.py`, update the endpoint URL at **line 32** and **line 39**:

**Before**

```python
endpoint_url='http://localhost:8000'
```

**After**

```python
endpoint_url='http://dynamodb:8000'
```

### 2.2 Final Code Snippet

The final local DynamoDB initialization should look like this:

```python
if is_local:
    # Connect to local DynamoDB instead of skipping
    self.dynamodb = boto3.resource(
        'dynamodb',
        endpoint_url='http://dynamodb:8000',  # Local DynamoDB endpoint
        region_name='us-east-1',
        aws_access_key_id='dummy',
        aws_secret_access_key='dummy'
    )
    self.dynamodb_client = boto3.client(
        'dynamodb',
        endpoint_url='http://dynamodb:8000',
        region_name='us-east-1',
        aws_access_key_id='dummy',
        aws_secret_access_key='dummy'
    )
    self.table = self.dynamodb.Table(table_name)
    logger.info(f"Connected to local DynamoDB for table: {table_name}")
    return
```

> Note: Dummy AWS credentials are required because the AWS SDK expects them, even for local DynamoDB.

---

## 3. View and Query Data Using NoSQL Workbench

To inspect and query DynamoDB tables locally, use **NoSQL Workbench for DynamoDB**.

### 3.1 Download NoSQL Workbench

Download from the official AWS documentation:

[https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/workbench.settingup.html](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/workbench.settingup.html)

* Click **Download**
* Choose **Windows**
* Install the application

### 3.2 Connect to DynamoDB Local

1. Open **NoSQL Workbench**
2. Select **Operation Builder**
3. Click **Add connection**
4. Choose **DynamoDB local**
5. Enter the following settings:
    | Field           | Value      |
    | --------------- | ---------- |
    | Connection name | (Any name) |
    | Hostname        | localhost  |
    | Port            | 8000       |

6. Save the connection

You can now browse tables, run queries, and inspect data stored in your local DynamoDB instance.

---

## Summary

* DynamoDB Local runs via Docker Compose on port `8000`
* Application connects using `http://dynamodb:8000` inside Docker
* NoSQL Workbench provides a GUI for viewing and querying local DynamoDB data

This setup enables fast, isolated, and production-like DynamoDB development on local machines.

