"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Github, Linkedin, Mail } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

export default function AboutSection() {
  const highlights = [
    "400+ Problems Solved on GeeksforGeeks",
    "AWS Certified Solutions Architect",
    "Final Year AI & Data Science Student",
    "Full-Stack Developer"
  ]

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/Arjunsingh-7",
      color: "hover:text-white"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/arjun-singh-2519ab280/",
      color: "hover:text-blue-400"
    },
    {
      name: "Email",
      icon: Mail,
      href: "mailto:arjunsingh792002@gmail.com",
      color: "hover:text-primary"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const handleResumeDownload = (resumeType: 'resume1' | 'resume2') => {
    const link = document.createElement('a')
    if (resumeType === 'resume1') {
      link.href = 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/ArjunSingh_RESUME-1-1759214969363.pdf'
      link.download = 'Arjun_Singh_Resume_1.pdf'
    } else {
      link.href = 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/RESUME-2-1759214958934.pdf'
      link.download = 'Arjun_Singh_Resume_2.pdf'
    }
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section className="bg-background py-20">
      <div className="container max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-16"
        >
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-5xl font-display font-bold text-foreground mb-4">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={itemVariants} className="flex justify-center lg:justify-start">
              <div className="relative">
                <div className="w-80 h-80 bg-surface rounded-2xl shadow-2xl overflow-hidden border border-border">
                  <Image
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/WhatsApp-Image-2025-09-30-at-12.17.55-PM-1759214955178.jpeg"
                    alt="Arjun Singh - Full Stack Developer"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover object-[50%_20%]"
                    priority
                  />
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl -z-10 blur-xl"></div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-8">
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Hello! I'm <span className="text-primary font-semibold">Arjun Singh</span>, a passionate final-year B.Tech student 
                  specializing in AI & Data Science at Pranveer Singh Institute Of Technology, Kanpur. With strong full-stack 
                  development skills and expertise in React, Django, and Python, I build scalable solutions that solve complex problems.
                </p>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  As an <span className="text-primary font-semibold">AWS Certified Solutions Architect</span>, I combine cloud 
                  architecture expertise with modern web development. My technical arsenal includes Java, Python, React.js, Django, 
                  and machine learning frameworks like TensorFlow and OpenCV.
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Beyond coding, I'm actively engaged in competitive programming with <span className="text-primary font-semibold">400+ 
                  problems solved on GeeksforGeeks</span> (3★ rating), 100+ on LeetCode, and 150+ on HackerRank. I'm passionate 
                  about exploring AI research areas like Generative AI and Automation.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-foreground">Key Highlights</h4>
                <div className="flex flex-wrap gap-3">
                  {highlights.map((highlight, index) => (
                    <Badge 
                      key={index}
                      variant="secondary" 
                      className="px-4 py-2 text-sm bg-surface border border-primary/20 text-primary hover:bg-primary/10 transition-colors"
                    >
                      {highlight}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-6 pt-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    onClick={() => handleResumeDownload('resume1')}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Resume Version 1
                  </Button>
                  <Button 
                    size="lg" 
                    onClick={() => handleResumeDownload('resume2')}
                    variant="outline"
                    className="border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary font-medium px-8 py-3 rounded-lg transition-all duration-300"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Resume Version 2
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <span className="text-sm text-muted-foreground font-medium">Connect with me:</span>
                  <div className="flex gap-3">
                    {socialLinks.map((link) => (
                      <Button
                        key={link.name}
                        variant="ghost"
                        size="icon"
                        asChild
                        className="w-10 h-10 rounded-full border border-border hover:border-primary/50 text-muted-foreground hover:bg-surface-light transition-all duration-300"
                      >
                        <a 
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={link.color}
                        >
                          <link.icon className="w-5 h-5" />
                          <span className="sr-only">{link.name}</span>
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}