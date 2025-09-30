"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  CheckCircle2, 
  Terminal, 
  Globe, 
  Settings, 
  AlertCircle, 
  Zap, 
  Github,
  ExternalLink,
  Copy,
  ChevronRight,
  Rocket,
  Cloud,
  Server
} from 'lucide-react';

export const DeploymentGuide = () => {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = (text: string, identifier: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(identifier);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const CodeBlock = ({ code, language = "bash", identifier }: { code: string; language?: string; identifier: string }) => (
    <div className="relative group">
      <pre className="bg-slate-800 text-slate-100 p-4 rounded-lg overflow-x-auto border border-slate-700">
        <code className="font-mono text-sm">{code}</code>
      </pre>
      <Button
        size="sm"
        variant="outline"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => copyToClipboard(code, identifier)}
      >
        {copiedText === identifier ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </Button>
    </div>
  );

  const StepCard = ({ number, title, children }: { number: number; title: string; children: React.ReactNode }) => (
    <Card className="mb-6 bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-slate-100">
          <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
            {number}
          </div>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 py-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Rocket className="w-12 h-12 text-primary" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Next.js 15 Deployment Guide
            </h1>
          </div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Comprehensive step-by-step instructions to deploy your Next.js 15 portfolio website across multiple platforms
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Badge variant="outline" className="px-4 py-2 text-lg">
              <Cloud className="w-4 h-4 mr-2" />
              Vercel
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-lg">
              <Server className="w-4 h-4 mr-2" />
              Netlify
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-lg">
              <Github className="w-4 h-4 mr-2" />
              GitHub Pages
            </Badge>
          </div>
        </div>

        {/* Prerequisites */}
        <Card className="bg-slate-800/30 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              Prerequisites
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-slate-200">Required Tools</h3>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Node.js 18.18+ installed
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Git installed and configured
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Next.js 15 project ready
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Code editor (VS Code recommended)
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-slate-200">Required Accounts</h3>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-slate-400" />
                    GitHub account
                  </li>
                  <li className="flex items-center gap-2">
                    <Cloud className="w-4 h-4 text-slate-400" />
                    Vercel account (recommended)
                  </li>
                  <li className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-slate-400" />
                    Netlify account (optional)
                  </li>
                  <li className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-slate-400" />
                    Domain provider (optional)
                  </li>
                </ul>
              </div>
            </div>
            
            <Alert className="bg-blue-500/10 border-blue-500/20">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Quick Setup Check</AlertTitle>
              <AlertDescription>
                Verify your setup by running these commands in your terminal:
              </AlertDescription>
            </Alert>
            
            <CodeBlock 
              code={`node --version
git --version
npx create-next-app@latest --version`}
              identifier="setup-check"
            />
          </CardContent>
        </Card>

        {/* Deployment Platforms */}
        <Tabs defaultValue="vercel" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800 border-slate-700">
            <TabsTrigger value="vercel" className="data-[state=active]:bg-primary">
              <Cloud className="w-4 h-4 mr-2" />
              Vercel
            </TabsTrigger>
            <TabsTrigger value="netlify" className="data-[state=active]:bg-primary">
              <Server className="w-4 h-4 mr-2" />
              Netlify
            </TabsTrigger>
            <TabsTrigger value="github-pages" className="data-[state=active]:bg-primary">
              <Github className="w-4 h-4 mr-2" />
              GitHub Pages
            </TabsTrigger>
          </TabsList>

          {/* Vercel Deployment */}
          <TabsContent value="vercel" className="space-y-6">
            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 border-slate-600">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Cloud className="w-8 h-8 text-primary" />
                  Vercel Deployment (Recommended)
                </CardTitle>
                <p className="text-slate-300">
                  Vercel offers the best Next.js hosting experience with zero-configuration deployments and automatic optimizations.
                </p>
              </CardHeader>
            </Card>

            <StepCard number={1} title="Push Code to GitHub">
              <p className="text-slate-300">
                First, ensure your Next.js project is pushed to a GitHub repository:
              </p>
              <CodeBlock 
                code={`git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/your-portfolio.git
git push -u origin main`}
                identifier="github-setup"
              />
            </StepCard>

            <StepCard number={2} title="Connect to Vercel">
              <div className="space-y-4">
                <p className="text-slate-300">
                  Sign up for Vercel and connect your GitHub account:
                </p>
                <ul className="space-y-2 text-slate-300 ml-4">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-primary" />
                    Visit <a href="https://vercel.com" className="text-primary underline">vercel.com</a>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-primary" />
                    Click "Start Deploying" and sign up with GitHub
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-primary" />
                    Authorize Vercel to access your repositories
                  </li>
                </ul>
              </div>
            </StepCard>

            <StepCard number={3} title="Deploy Your Project">
              <div className="space-y-4">
                <p className="text-slate-300">
                  Import and deploy your Next.js project:
                </p>
                <ul className="space-y-2 text-slate-300 ml-4">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-primary" />
                    Click "New Project" in your Vercel dashboard
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-primary" />
                    Select your GitHub repository
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-primary" />
                    Configure build settings (usually auto-detected)
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-primary" />
                    Click "Deploy"
                  </li>
                </ul>
                
                <Alert className="bg-emerald-500/10 border-emerald-500/20">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle>Auto-Configuration</AlertTitle>
                  <AlertDescription>
                    Vercel automatically detects Next.js projects and configures optimal build settings.
                  </AlertDescription>
                </Alert>
              </div>
            </StepCard>

            <StepCard number={4} title="Automatic Deployments">
              <div className="space-y-4">
                <p className="text-slate-300">
                  Configure automatic deployments for continuous integration:
                </p>
                <ul className="space-y-2 text-slate-300 ml-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Production deployments trigger on pushes to main branch
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Preview deployments for all pull requests
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Instant rollbacks available in dashboard
                  </li>
                </ul>
              </div>
            </StepCard>
          </TabsContent>

          {/* Netlify Deployment */}
          <TabsContent value="netlify" className="space-y-6">
            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 border-slate-600">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Server className="w-8 h-8 text-primary" />
                  Netlify Deployment
                </CardTitle>
                <p className="text-slate-300">
                  Netlify provides excellent static site hosting with powerful build tools and edge functions.
                </p>
              </CardHeader>
            </Card>

            <StepCard number={1} title="Prepare Build Configuration">
              <p className="text-slate-300">
                Create a netlify.toml file in your project root:
              </p>
              <CodeBlock 
                code={`[build]
  command = "npm run build"
  publish = "out"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200`}
                identifier="netlify-config"
              />
              
              <p className="text-slate-300 mt-4">
                Update your package.json build script for static export:
              </p>
              <CodeBlock 
                code={`{
  "scripts": {
    "build": "next build && next export"
  }
}`}
                identifier="package-json-netlify"
              />
            </StepCard>

            <StepCard number={2} title="Configure Next.js for Static Export">
              <p className="text-slate-300">
                Update your next.config.js:
              </p>
              <CodeBlock 
                code={`/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig`}
                identifier="nextjs-static-config"
              />
            </StepCard>

            <StepCard number={3} title="Deploy to Netlify">
              <div className="space-y-4">
                <p className="text-slate-300">Deploy using Netlify CLI or web interface:</p>
                
                <h4 className="font-semibold text-slate-200">Method 1: Netlify CLI</h4>
                <CodeBlock 
                  code={`npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod`}
                  identifier="netlify-cli"
                />

                <h4 className="font-semibold text-slate-200">Method 2: Web Interface</h4>
                <ul className="space-y-2 text-slate-300 ml-4">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-primary" />
                    Visit <a href="https://netlify.com" className="text-primary underline">netlify.com</a>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-primary" />
                    Connect your GitHub repository
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-primary" />
                    Configure build settings
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-primary" />
                    Deploy site
                  </li>
                </ul>
              </div>
            </StepCard>
          </TabsContent>

          {/* GitHub Pages Deployment */}
          <TabsContent value="github-pages" className="space-y-6">
            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 border-slate-600">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Github className="w-8 h-8 text-primary" />
                  GitHub Pages Deployment
                </CardTitle>
                <p className="text-slate-300">
                  Free hosting directly from your GitHub repository with automated GitHub Actions.
                </p>
              </CardHeader>
            </Card>

            <StepCard number={1} title="Configure Next.js for GitHub Pages">
              <p className="text-slate-300">
                Update next.config.js for GitHub Pages:
              </p>
              <CodeBlock 
                code={`/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig`}
                identifier="nextjs-github-config"
              />
            </StepCard>

            <StepCard number={2} title="Create GitHub Actions Workflow">
              <p className="text-slate-300">
                Create .github/workflows/deploy.yml:
              </p>
              <CodeBlock 
                code={`name: Deploy Next.js to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    permissions:
      contents: read
      pages: write
      id-token: write
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Setup Pages
      uses: actions/configure-pages@v4
    
    - name: Upload artifact
      uses: actions/upload-pages-artifact@v3
      with:
        path: ./out
    
    - name: Deploy to GitHub Pages
      id: deployment
      uses: actions/deploy-pages@v4`}
                identifier="github-actions"
              />
            </StepCard>

            <StepCard number={3} title="Enable GitHub Pages">
              <div className="space-y-4">
                <p className="text-slate-300">Configure GitHub Pages in repository settings:</p>
                <ul className="space-y-2 text-slate-300 ml-4">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-primary" />
                    Go to repository Settings → Pages
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-primary" />
                    Select "GitHub Actions" as source
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-primary" />
                    Push changes to trigger deployment
                  </li>
                </ul>
              </div>
            </StepCard>
          </TabsContent>
        </Tabs>

        {/* Additional Sections */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Custom Domain Setup */}
          <Card className="bg-slate-800/30 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Globe className="w-6 h-6 text-primary" />
                Custom Domain Setup
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-slate-200">DNS Configuration</h4>
                <CodeBlock 
                  code={`# For apex domain (example.com)
A Record: 76.76.19.61

# For www subdomain
CNAME Record: www.example.com → cname.vercel-dns.com`}
                  identifier="dns-config"
                />
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-200">Platform-Specific Steps</h4>
                <ul className="space-y-1 text-slate-300 text-sm">
                  <li>• Vercel: Add domain in project settings</li>
                  <li>• Netlify: Configure in Site settings → Domain management</li>
                  <li>• GitHub Pages: Add CNAME file to repository</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Environment Variables */}
          <Card className="bg-slate-800/30 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Settings className="w-6 h-6 text-primary" />
                Environment Variables
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-slate-200">Local Development</h4>
                <CodeBlock 
                  code={`# .env.local
NEXT_PUBLIC_SITE_URL=http://localhost:3000
DATABASE_URL=your_database_url
API_SECRET_KEY=your_secret_key`}
                  identifier="env-local"
                />
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-200">Production Setup</h4>
                <ul className="space-y-1 text-slate-300 text-sm">
                  <li>• Add variables in platform dashboard</li>
                  <li>• Use NEXT_PUBLIC_ prefix for client-side vars</li>
                  <li>• Never commit sensitive data to Git</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Troubleshooting */}
        <Card className="bg-slate-800/30 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-orange-500" />
              Common Issues & Solutions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-200">Build Failures</h4>
                <div className="space-y-2 text-sm">
                  <Alert className="bg-red-500/10 border-red-500/20">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Issue:</strong> Module not found errors<br/>
                      <strong>Solution:</strong> Check import paths and dependencies
                    </AlertDescription>
                  </Alert>
                  
                  <CodeBlock 
                    code={`npm install
npm run build
# Check for TypeScript errors`}
                    identifier="build-debug"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-200">Routing Issues</h4>
                <div className="space-y-2 text-sm">
                  <Alert className="bg-yellow-500/10 border-yellow-500/20">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Issue:</strong> 404 on page refresh<br/>
                      <strong>Solution:</strong> Configure redirects properly
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Optimization */}
        <Card className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border-emerald-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-emerald-500" />
              Performance Optimization Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-200">Image Optimization</h4>
                <ul className="space-y-1 text-slate-300 text-sm">
                  <li>• Use Next.js Image component</li>
                  <li>• Enable WebP format</li>
                  <li>• Implement lazy loading</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-200">Code Splitting</h4>
                <ul className="space-y-1 text-slate-300 text-sm">
                  <li>• Use dynamic imports</li>
                  <li>• Implement route-based splitting</li>
                  <li>• Minimize bundle size</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-200">Caching Strategy</h4>
                <ul className="space-y-1 text-slate-300 text-sm">
                  <li>• Configure HTTP headers</li>
                  <li>• Use ISR for dynamic content</li>
                  <li>• Implement CDN caching</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center py-8 border-t border-slate-700">
          <p className="text-slate-400">
            Need more help? Check the{' '}
            <a href="https://nextjs.org/docs" className="text-primary underline">
              Next.js documentation
            </a>{' '}
            or platform-specific guides.
          </p>
        </div>
      </div>
    </div>
  );
};