# Social Media Poster

A simple web app to post content to Facebook and Twitter accounts.

## Features

- Clean, minimal UI with link and description inputs
- Post to Facebook using Graph API
- Post to Twitter using API v2
- Real-time success/error feedback
- Responsive design

## Setup

### 1. Install Dependencies

```bash
npm install
cd client && npm install
```

### 2. Configure API Keys

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your API credentials:

```
FACEBOOK_ACCESS_TOKEN=your_facebook_access_token_here
TWITTER_BEARER_TOKEN=your_twitter_bearer_token_here
```

### 3. Get API Credentials

#### Facebook Access Token:
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create an app and get your access token
3. Ensure your token has `pages_manage_posts` permission

#### Twitter Bearer Token:
1. Go to [Twitter Developer Portal](https://developer.twitter.com/)
2. Create an app and generate Bearer Token
3. Ensure your app has write permissions

### 4. Run the Application

Start both backend and frontend:

```bash
npm run dev
```

Or run separately:

```bash
# Backend (port 5000)
npm run server

# Frontend (port 3000)
npm run client
```

## Usage

1. Open http://localhost:3000
2. Enter a link and description
3. Click "Post to Facebook" or "Post to Twitter"
4. See success/error message

## API Endpoints

- `POST /post/facebook` - Post to Facebook
- `POST /post/twitter` - Post to Twitter

Both endpoints expect:
```json
{
  "link": "https://example.com",
  "description": "Your post description"
}
```

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js + Express
- **APIs**: Facebook Graph API, Twitter API v2