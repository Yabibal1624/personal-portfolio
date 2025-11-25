# Personal Portfolio Website

This is my personal portfolio website.  
It shows my work, skills, and the projects I’ve been involved in.  
The site is built with Vite and modern front-end tools, and it loads fast on any device.

## Features
- Clean and simple design
- Smooth animations
- Responsive layout (works on phone, tablet, and desktop)
- Easy to update and customize

## Tech Used
- Vite
- HTML, CSS, JavaScript
- Modern animations

## Getting Started

### Install dependencies
npm install

### Run the project in development
npm run dev

### Build for production
npm run build

The production files will be created in the **dist** folder.

## Deployment
This site can be deployed to platforms like:
- Vercel
- Netlify
- GitHub Pages

If deploying to Vercel, make sure you use this `vercel.json` file:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "outputDirectory": "dist",
  "framework": "vite"
}
