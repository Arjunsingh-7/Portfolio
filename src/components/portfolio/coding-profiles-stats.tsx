"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ExternalLink, Trophy, Target, Code2, Star, Award } from 'lucide-react'

interface PlatformStats {
  platform: string
  logo: string
  primaryStat: { label: string; value: number; suffix?: string }
  secondaryStat: { label: string; value: number; suffix?: string }
  tertiaryStat?: { label: string; value: number; suffix?: string }
  rating?: { label: string; value: number; stars?: number }
  profileUrl: string
  accentColor: string
  bgGradient: string
}

interface AnimatedCounterProps {
  value: number
  suffix?: string
  duration?: number
}

const AnimatedCounter = ({ value, suffix = '', duration = 2000 }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView && !isVisible) {
      setIsVisible(true)
      const startTime = Date.now()
      const animate = () => {
        const now = Date.now()
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        // Easing function for smooth animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3)
        const currentCount = Math.floor(easeOutCubic * value)
        
        setCount(currentCount)
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      animate()
    }
  }, [isInView, value, duration, isVisible])

  return (
    <span ref={ref} className="font-mono font-semibold">
      {count.toLocaleString()}{suffix}
    </span>
  )
}

const CircularProgress = ({ percentage, color, size = 80 }: { percentage: number; color: string; size?: number }) => {
  const [progress, setProgress] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setProgress(percentage), 200)
      return () => clearTimeout(timer)
    }
  }, [isInView, percentage])

  const circumference = 2 * Math.PI * (size / 2 - 8)
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div ref={ref} className="relative flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 8}
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          className="text-surface-light opacity-30"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 8}
          stroke={color}
          strokeWidth="4"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold text-foreground">{Math.round(progress)}%</span>
      </div>
    </div>
  )
}

const StarRating = ({ rating, maxStars = 5 }: { rating: number; maxStars?: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(maxStars)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating 
              ? 'text-yellow-400 fill-yellow-400' 
              : 'text-muted-foreground'
          }`}
        />
      ))}
    </div>
  )
}

export default function CodingProfilesStats() {
  const platforms: PlatformStats[] = [
    {
      platform: 'GeeksforGeeks',
      logo: 'https://media.geeksforgeeks.org/gfg-gg-logo.svg',
      primaryStat: { label: 'Problems Solved', value: 400, suffix: '+' },
      secondaryStat: { label: 'Coding Score', value: 1148 },
      tertiaryStat: { label: 'Contest Rating', value: 1632 },
      rating: { label: 'Rating', value: 3, stars: 5 },
      profileUrl: 'https://geeksforgeeks.org/user/arjunsingh',
      accentColor: '#10b981',
      bgGradient: 'from-emerald-500/10 to-emerald-600/5'
    },
    {
      platform: 'LeetCode',
      logo: 'https://leetcode.com/_next/static/images/logo-ff2b712834cf26bf50454e2da4b24158.png',
      primaryStat: { label: 'Problems Solved', value: 100, suffix: '+' },
      secondaryStat: { label: 'Contest Rating', value: 1850 },
      tertiaryStat: { label: 'Global Ranking', value: 25000, suffix: 'th' },
      profileUrl: 'https://leetcode.com/arjunsingh',
      accentColor: '#f59e0b',
      bgGradient: 'from-amber-500/10 to-amber-600/5'
    },
    {
      platform: 'HackerRank',
      logo: 'https://hrcdn.net/fcore/assets/favicon-ddc852f75a.png',
      primaryStat: { label: 'Problems Solved', value: 150, suffix: '+' },
      secondaryStat: { label: 'Coding Score', value: 400 },
      tertiaryStat: { label: 'Badges Earned', value: 12 },
      profileUrl: 'https://hackerrank.com/arjunsingh',
      accentColor: '#3b82f6',
      bgGradient: 'from-blue-500/10 to-blue-600/5'
    }
  ]

  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section 
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent mb-6">
            <Trophy className="w-4 h-4" />
            <span className="text-sm font-medium">Competitive Programming</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Coding Achievements
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track record of consistent problem-solving across major competitive programming platforms
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.platform}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="relative overflow-hidden bg-surface border border-border hover:border-border/60 transition-all duration-300 group hover:shadow-xl hover:shadow-black/10">
                <div className={`absolute inset-0 bg-gradient-to-br ${platform.bgGradient} opacity-50`} />
                
                <CardContent className="relative p-8">
                  {/* Platform Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${platform.accentColor}20` }}
                      >
                        <img 
                          src={platform.logo} 
                          alt={`${platform.platform} logo`}
                          className="w-6 h-6 object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                            const parent = target.parentElement
                            if (parent) {
                              const icon = platform.platform === 'GeeksforGeeks' ? Code2 :
                                          platform.platform === 'LeetCode' ? Target : Award
                              const IconComponent = icon
                              const iconEl = document.createElement('div')
                              iconEl.innerHTML = '<svg class="w-6 h-6" fill="currentColor"><use href="#icon"></use></svg>'
                              iconEl.style.color = platform.accentColor
                              parent.appendChild(iconEl)
                            }
                          }}
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{platform.platform}</h3>
                        <div className="flex items-center gap-2">
                          {platform.rating && (
                            <>
                              <StarRating rating={platform.rating.value} />
                              <span className="text-sm text-muted-foreground">
                                {platform.rating.label}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <CircularProgress 
                      percentage={platform.primaryStat.value > 300 ? 85 : platform.primaryStat.value > 100 ? 70 : 60}
                      color={platform.accentColor}
                      size={60}
                    />
                  </div>

                  {/* Statistics */}
                  <div className="space-y-6 mb-8">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm font-medium">
                        {platform.primaryStat.label}
                      </span>
                      <span 
                        className="text-2xl font-bold"
                        style={{ color: platform.accentColor }}
                      >
                        <AnimatedCounter 
                          value={platform.primaryStat.value} 
                          suffix={platform.primaryStat.suffix}
                        />
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm font-medium">
                        {platform.secondaryStat.label}
                      </span>
                      <span className="text-lg font-semibold text-foreground">
                        <AnimatedCounter 
                          value={platform.secondaryStat.value} 
                          suffix={platform.secondaryStat.suffix}
                        />
                      </span>
                    </div>

                    {platform.tertiaryStat && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground text-sm font-medium">
                          {platform.tertiaryStat.label}
                        </span>
                        <span className="text-lg font-semibold text-foreground">
                          <AnimatedCounter 
                            value={platform.tertiaryStat.value} 
                            suffix={platform.tertiaryStat.suffix}
                          />
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-8">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">
                        {platform.primaryStat.value > 300 ? '85' : platform.primaryStat.value > 100 ? '70' : '60'}%
                      </span>
                    </div>
                    <div className="h-2 bg-surface-light rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { 
                          width: `${platform.primaryStat.value > 300 ? 85 : platform.primaryStat.value > 100 ? 70 : 60}%` 
                        } : { width: 0 }}
                        transition={{ duration: 1.5, delay: index * 0.3 + 0.5 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: platform.accentColor }}
                      />
                    </div>
                  </div>

                  {/* View Profile Button */}
                  <Button
                    asChild
                    className="w-full bg-surface-light hover:bg-surface-light/80 text-foreground border border-border hover:border-border/60 transition-all duration-300 group-hover:shadow-lg"
                  >
                    <a 
                      href={platform.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <span>View Profile</span>
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <Card className="inline-block bg-surface border border-border p-8">
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">
                  <AnimatedCounter value={650} suffix="+" />
                </div>
                <div className="text-sm text-muted-foreground font-medium">Total Problems</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success mb-2">
                  <AnimatedCounter value={15} suffix="+" />
                </div>
                <div className="text-sm text-muted-foreground font-medium">Contests</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-chart-4 mb-2">
                  <AnimatedCounter value={3} />
                </div>
                <div className="text-sm text-muted-foreground font-medium">Platforms</div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}