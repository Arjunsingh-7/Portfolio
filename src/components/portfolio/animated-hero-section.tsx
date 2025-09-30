"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code2, Terminal, Download } from "lucide-react"
import Image from "next/image"

const floatingElements = [
  { 
    code: "const developer = { name: 'Arjun Singh' };", 
    delay: 0,
    x: "10%",
    y: "20%"
  },
  { 
    code: "function buildAI() { return innovation; }", 
    delay: 0.5,
    x: "80%",
    y: "15%"
  },
  { 
    code: "export default scalableApps;", 
    delay: 1,
    x: "15%",
    y: "70%"
  },
  { 
    code: "npm install passion --save", 
    delay: 1.5,
    x: "75%",
    y: "65%"
  },
  { 
    code: "<Innovation />", 
    delay: 2,
    x: "60%",
    y: "40%"
  }
]

const geometricShapes = [
  { 
    shape: "square",
    delay: 0.3,
    x: "25%",
    y: "30%",
    size: 40
  },
  { 
    shape: "circle",
    delay: 0.8,
    x: "70%",
    y: "25%",
    size: 60
  },
  { 
    shape: "triangle",
    delay: 1.3,
    x: "20%",
    y: "60%",
    size: 50
  },
  { 
    shape: "hexagon",
    delay: 1.8,
    x: "85%",
    y: "75%",
    size: 45
  }
]

export default function AnimatedHeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollY } = useScroll()
  
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150])
  const contentY = useTransform(scrollY, [0, 500], [0, -50])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleViewWork = () => {
    const projectsSection = document.getElementById("projects")
    projectsSection?.scrollIntoView({ behavior: "smooth" })
  }

  const handleGetInTouch = () => {
    const contactSection = document.getElementById("contact")
    contactSection?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen bg-background overflow-hidden flex items-center">
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{ y: backgroundY }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent" />
        
        {/* Floating Code Snippets */}
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            className="absolute font-mono text-sm text-muted-foreground/40 pointer-events-none select-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: [0.3, 0.6, 0.3], 
              y: [0, -10, 0],
              x: [0, 5, 0]
            }}
            transition={{
              duration: 6,
              delay: element.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              left: element.x,
              top: element.y,
              transform: `translate(-50%, -50%) translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
            }}
          >
            {element.code}
          </motion.div>
        ))}

        {/* Geometric Shapes */}
        {geometricShapes.map((shape, index) => (
          <motion.div
            key={index}
            className="absolute opacity-20"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              scale: [0.8, 1.2, 0.8],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 8,
              delay: shape.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              left: shape.x,
              top: shape.y,
              width: shape.size,
              height: shape.size,
              transform: `translate(-50%, -50%) translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`
            }}
          >
            {shape.shape === "square" && (
              <div className="w-full h-full border-2 border-accent/30" />
            )}
            {shape.shape === "circle" && (
              <div className="w-full h-full border-2 border-primary/30 rounded-full" />
            )}
            {shape.shape === "triangle" && (
              <div 
                className="w-full h-full border-l-2 border-r-2 border-b-2 border-success/30"
                style={{
                  clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)"
                }}
              />
            )}
            {shape.shape === "hexagon" && (
              <div 
                className="w-full h-full border-2 border-accent/30"
                style={{
                  clipPath: "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)"
                }}
              />
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content */}
      <div className="container relative z-10">
        <motion.div 
          className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
          style={{ y: contentY }}
        >
          
          {/* Text Content */}
          <motion.div 
            className="flex-1 text-center lg:text-left order-1 lg:order-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Glassmorphic Card */}
            <motion.div 
              className="backdrop-blur-xl bg-surface/40 border border-border/30 rounded-3xl p-8 lg:p-12 shadow-2xl"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Name */}
              <motion.h1 
                className="text-5xl lg:text-7xl xl:text-8xl font-extrabold font-display mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Arjun Singh
              </motion.h1>

              {/* Subtitle */}
              <motion.h2 
                className="text-xl lg:text-2xl xl:text-3xl font-semibold text-muted-foreground mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Full-Stack Developer & AI Enthusiast
              </motion.h2>

              {/* Description */}
              <motion.p 
                className="text-lg lg:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Passionate about crafting scalable web applications and exploring the frontiers of AI technology. 
                I transform complex problems into elegant solutions, bridging the gap between innovative ideas and 
                real-world implementations.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 group"
                  onClick={handleViewWork}
                >
                  View My Work
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary px-8 py-6 text-lg font-semibold rounded-xl backdrop-blur-sm transition-all duration-300 group"
                  onClick={handleGetInTouch}
                >
                  Get In Touch
                  <Download className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <motion.div 
          className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center"
          animate={{ 
            borderColor: ["rgba(203, 213, 225, 0.3)", "rgba(59, 130, 246, 0.6)", "rgba(203, 213, 225, 0.3)"]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div 
            className="w-1 h-3 bg-primary rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}