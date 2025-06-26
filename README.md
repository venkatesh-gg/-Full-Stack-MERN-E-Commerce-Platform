# MERN E-commerce Application

A full-stack e-commerce application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring modern architecture, containerization, and Kubernetes deployment.

## 🚀 Features

### Backend (Express.js + TypeScript)
- **Authentication & Authorization**: JWT-based auth with role-based access control
- **RESTful API**: Complete CRUD operations for products, orders, and users
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Express-validator for input validation
- **Security**: Helmet, CORS, rate limiting
- **Monitoring**: Prometheus metrics integration
- **Error Handling**: Centralized error handling middleware

### Frontend (Next.js + TypeScript)
- **Modern UI**: Responsive design with Tailwind CSS
- **State Management**: Zustand for cart and authentication state
- **Payment Integration**: Stripe checkout implementation
- **Performance**: Optimized images and lazy loading
- **SEO**: Next.js built-in SEO optimization
- **Accessibility**: WCAG compliant components

### DevOps & Infrastructure
- **Containerization**: Docker multi-stage builds
- **Orchestration**: Kubernetes manifests with auto-scaling
- **Package Management**: Helm charts for easy deployment
- **CI/CD**: GitHub Actions pipeline
- **Monitoring**: Grafana dashboard for observability
- **Security**: Container vulnerability scanning

## 📋 Prerequisites

- Node.js 18+
- Docker & Docker Compose
- Kubernetes cluster (for production deployment)
- Helm 3.x
- MongoDB (local or cloud)

## 🛠️ Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mern-ecommerce
   ```

2. **Start with Docker Compose**
   ```bash
   docker-compose up -d
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - MongoDB: localhost:27017

### Manual Setup

1. **Backend Setup**
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Update .env with your MongoDB URI and JWT secret
   npm run dev
   ```

2. **Frontend Setup**
   ```bash
   cd client
   npm install
   npm run dev
   ```

## 🏗️ Architecture

```
mern-ecommerce/
├── server/                 # Express.js backend
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   └── config/         # Configuration files
│   ├── Dockerfile
│   └── package.json
├── client/                 # Next.js frontend
│   ├── app/                # Next.js 13+ app directory
│   ├── components/         # React components
│   ├── lib/                # Utilities and services
│   ├── Dockerfile
│   └── package.json
├── k8s/                    # Kubernetes manifests
├── chart/                  # Helm chart
├── .github/workflows/      # CI/CD pipelines
└── docker-compose.yml
```

## 🔧 Configuration

### Environment Variables

**Server (.env)**
```env
MONGO_URI=mongodb://localhost:27017/ecommerce
PORT=5000
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```

**Client**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
```

## 🚀 Deployment

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up --build -d

# Scale services
docker-compose up --scale server=3 --scale client=2
```

### Kubernetes Deployment
```bash
# Apply Kubernetes manifests
kubectl apply -f k8s/

# Or use Helm
helm install mern-ecommerce ./chart/mern-ecommerce
```

### Production Deployment with Helm
```bash
helm upgrade --install mern-ecommerce ./chart/mern-ecommerce \
  --set image.server.tag=v1.0.0 \
  --set image.client.tag=v1.0.0 \
  --set config.server.jwtSecret="production-jwt-secret" \
  --set mongodb.auth.rootPassword="secure-password"
```

## 📊 Monitoring

### Prometheus Metrics
The application exposes metrics at `/metrics` endpoint:
- HTTP request duration and count
- MongoDB connection status
- System resource usage

### Grafana Dashboard
Import the provided dashboard configuration from `k8s/grafana-dashboard.yaml` to monitor:
- Request rates and error rates
- Response times and latencies
- Database connection metrics
- System performance metrics

## 🧪 Testing

### Backend Tests
```bash
cd server
npm test
```

### Frontend Tests
```bash
cd client
npm test
```

### E2E Tests
```bash
npm run test:e2e
```

## 🔒 Security Features

- **Authentication**: JWT tokens with secure HTTP-only cookies
- **Authorization**: Role-based access control (user/admin)
- **Input Validation**: Comprehensive validation with express-validator
- **Rate Limiting**: API rate limiting to prevent abuse
- **Security Headers**: Helmet.js for security headers
- **CORS**: Configured CORS for cross-origin requests
- **Container Security**: Non-root user in Docker containers

## 📈 Performance Optimizations

- **Database**: MongoDB indexes for optimized queries
- **Caching**: Redis caching for frequently accessed data
- **Images**: Next.js Image optimization
- **Bundle Splitting**: Automatic code splitting with Next.js
- **CDN**: Static asset optimization
- **Compression**: Gzip compression for API responses

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Product Endpoints
- `GET /api/products` - Get all products (with pagination and filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Order Endpoints
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders (admin) or user orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/status` - Update order status (admin only)

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in .env file
   - Verify network connectivity

2. **Docker Build Fails**
   - Clear Docker cache: `docker system prune -a`
   - Check Dockerfile syntax
   - Ensure all dependencies are listed

3. **Kubernetes Deployment Issues**
   - Check pod logs: `kubectl logs -f deployment/ecommerce-server`
   - Verify secrets and configmaps
   - Check resource limits and requests

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Express.js](https://expressjs.com/) for the robust backend framework
- [MongoDB](https://www.mongodb.com/) for the flexible database
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Stripe](https://stripe.com/) for payment processing
- [Docker](https://www.docker.com/) for containerization
- [Kubernetes](https://kubernetes.io/) for orchestration

## 📞 Support

For support, email support@mernstore.com or create an issue in the GitHub repository.