"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Code2, Database, Globe, Wrench } from "lucide-react"

interface Skill {
  name: string
  proficiency: "Beginner" | "Intermediate" | "Advanced"
  progress: number
}

interface SkillCategory {
  title: string
  icon: React.ComponentType<any>
  skills: Skill[]
  color: string
}

const skillsData: SkillCategory[] = [
  {
    title: "Programming Languages",
    icon: Code2,
    color: "bg-accent",
    skills: [
      { name: "Java", proficiency: "Advanced", progress: 85 },
      { name: "Python", proficiency: "Advanced", progress: 90 }
    ]
  },
  {
    title: "Web Development",
    icon: Globe,
    color: "bg-primary",
    skills: [
      { name: "HTML5", proficiency: "Advanced", progress: 95 },
      { name: "CSS3", proficiency: "Advanced", progress: 90 },
      { name: "JavaScript", proficiency: "Intermediate", progress: 75 },
      { name: "React.js", proficiency: "Intermediate", progress: 70 },
      { name: "Bootstrap", proficiency: "Advanced", progress: 85 }
    ]
  },
  {
    title: "Developer Tools",
    icon: Wrench,
    color: "bg-success",
    skills: [
      { name: "Git", proficiency: "Advanced", progress: 90 },
      { name: "MySQL Workbench", proficiency: "Intermediate", progress: 75 },
      { name: "Jupyter Notebook", proficiency: "Advanced", progress: 85 },
      { name: "IntelliJ IDEA", proficiency: "Advanced", progress: 88 },
      { name: "PyCharm", proficiency: "Advanced", progress: 85 }
    ]
  },
  {
    title: "Libraries/Frameworks",
    icon: Database,
    color: "bg-chart-4",
    skills: [
      { name: "NumPy", proficiency: "Advanced", progress: 90 },
      { name: "Pandas", proficiency: "Advanced", progress: 88 },
      { name: "Matplotlib", proficiency: "Intermediate", progress: 75 }
    ]
  }
]

const getProficiencyColor = (proficiency: string) => {
  switch (proficiency) {
    case "Beginner":
      return "bg-chart-5 text-white"
    case "Intermediate":
      return "bg-chart-4 text-white"
    case "Advanced":
      return "bg-success text-white"
    default:
      return "bg-primary text-white"
  }
}

interface CircularProgressProps {
  progress: number
  size?: number
  strokeWidth?: number
  delay?: number
}

const CircularProgress = ({ progress, size = 80, strokeWidth = 8, delay = 0 }: CircularProgressProps) => {
  const [animatedProgress, setAnimatedProgress] = useState(0)
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedProgress(prev => {
          if (prev >= progress) {
            clearInterval(interval)
            return progress
          }
          return prev + 1
        })
      }, 20)
      return () => clearInterval(interval)
    }, delay)
    
    return () => clearTimeout(timer)
  }, [progress, delay])

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-muted opacity-20"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (animatedProgress / 100) * circumference}
          className="text-primary transition-all duration-500 ease-out"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-semibold text-foreground">
          {animatedProgress}%
        </span>
      </div>
    </div>
  )
}

interface SkillCardProps {
  category: SkillCategory
  index: number
}

const SkillCard = ({ category, index }: SkillCardProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const Icon = category.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card className="bg-surface border-border hover:border-accent/50 transition-all duration-300 group h-full">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-lg">
            <div className={`p-2 rounded-lg ${category.color} text-white`}>
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-accent group-hover:text-accent/80 transition-colors">
              {category.title}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-3">
            {category.skills.map((skill, skillIndex) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    {skill.name}
                  </span>
                  <Badge 
                    variant="secondary" 
                    className={`text-xs ${getProficiencyColor(skill.proficiency)}`}
                  >
                    {skill.proficiency}
                  </Badge>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <motion.div
                    className="h-2 bg-gradient-to-r from-primary to-accent rounded-full"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.progress}%` } : { width: 0 }}
                    transition={{ 
                      duration: 1, 
                      delay: (index * 0.1) + (skillIndex * 0.1),
                      ease: "easeOut"
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          {/* Key Skills Circular Progress */}
          {category.skills.length <= 3 && (
            <div className="flex justify-center gap-4 pt-4 border-t border-border">
              {category.skills.slice(0, 2).map((skill, skillIndex) => (
                <div key={skill.name} className="text-center">
                  <CircularProgress 
                    progress={skill.progress}
                    size={60}
                    strokeWidth={6}
                    delay={(index * 100) + (skillIndex * 200)}
                  />
                  <p className="text-xs text-muted-foreground mt-2 font-medium">
                    {skill.name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function InteractiveSkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-200px" })

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-display">
            Technical <span className="text-accent">Skills</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise across various domains of software development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {skillsData.map((category, index) => (
            <SkillCard
              key={category.title}
              category={category}
              index={index}
            />
          ))}
        </div>

        {/* Floating Code Elements */}
        <div className="absolute top-20 left-10 opacity-10">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-accent font-mono text-2xl"
          >
            &#123;&#125;
          </motion.div>
        </div>
        
        <div className="absolute bottom-20 right-10 opacity-10">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="text-primary font-mono text-3xl"
          >
            &lt;/&gt;
          </motion.div>
        </div>
      </div>
    </section>
  )
}