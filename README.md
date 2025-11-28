# Django + Angular + Docker + AWS Deployment Guide

This README explains the complete workflow for building Docker containers and hosting a full-stack Django + Angular application on AWS.

---

**Project Overview**

This project uses:

* **Angular** – Frontend
* **Django + Django REST Framework** – Backend API
* **SQLite / PostgreSQL** – Database
* **Docker & Docker Compose** – Containerization
* **AWS EC2** – Hosting
* **NGINX** – Reverse proxy

---

1. Prerequisites

* AWS EC2 Instance (Ubuntu or Amazon Linux)
* Docker Installed
* Docker Compose Installed
* Git Installed

---
 2. Clone the Project

```bash
sudo su
cd /home/ec2-user
git clone <your-repo-url>
cd django-angular-ecommerce-aws
```

---

3. Project Structure (Example)

```
project/
│── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── django settings...
│
│── frontend/
│   ├── Dockerfile
│   ├── package.json
│
│── nginx/
│   ├── default.conf
│
│── docker-compose.yml
```

---

4. Docker Compose Setup

Your `docker-compose.yml` defines:

* Backend container
* Frontend container
* NGINX container

To build and start containers:

```bash
docker-compose build
docker-compose up -d
```

Verify containers:

```bash
docker ps
```

---

5. Backend Database Setup

If you are using **SQLite**, Django will auto-create `db.sqlite3` inside the backend container.
To locate it:

```bash
docker exec -it <backend_container_id> bash
find /app -name "*.sqlite3"
```

If using PostgreSQL, ensure environment variables are set correctly in `docker-compose.yml`.

---

6. Running Migrations

```bash
docker exec -it backend_container bash
python manage.py migrate
python manage.py createsuperuser
```

---

7. NGINX Reverse Proxy

Your NGINX container acts as a reverse proxy:

* Serves Angular
* Redirects `/api/` requests to Django backend

Ensure `default.conf` is correctly configured.
Restart container:

```bash
docker-compose restart nginx
```

---

 8. AWS Security Group Setup

Open ports:

* **80 (HTTP)**
* **443 (HTTPS)**
* **22 (SSH)**

---

 9. Accessing the Application

After deployment, visit:

```
http://YOUR_EC2_PUBLIC_IP
```

Superadmin panel:

```
http://YOUR_EC2_PUBLIC_IP/api/admin/
```

---

 10. Logs and Debugging

View container logs:

```bash
docker logs backend
```

Enter shell:

```bash
docker exec -it backend bash
```

Restart all containers:

```bash
docker-compose down
docker-compose up -d
```

---

11. Deployment Updates

When pushing updates:

```bash
git pull
docker-compose build
docker-compose up -d
```

---

 Final Notes

This README provides a complete, production-ready deployment workflow.
You can extend it further by adding:

* AWS RDS PostgreSQL setup
* HTTPS with Certbot + NGINX
* CI/CD (GitHub Actions)

For any updates or improvements, feel free to modify the file.
