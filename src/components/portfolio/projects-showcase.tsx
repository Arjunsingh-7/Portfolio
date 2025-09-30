"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Github, Play, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  techStack: Array<{
    name: string
    color: string
  }>
  links: {
    github?: string
    demo?: string
  }
  status: "completed" | "ongoing"
  features: string[]
}

const projects: Project[] = [
  {
    id: "alfred",
    title: "ALFRED Virtual Assistant",
    description: "AI-powered voice-activated virtual assistant with natural language processing and multi-modal interactions.",
    longDescription: "A sophisticated virtual assistant built with advanced Web Speech API integration, featuring real-time voice recognition, natural language processing, and contextual response generation. Includes multi-language support and custom voice commands.",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Screenshot-2025-09-30-123712-1759216048728.png",
    techStack: [
      { name: "JavaScript", color: "bg-amber-500" },
      { name: "Web Speech API", color: "bg-blue-500" },
      { name: "Node.js", color: "bg-green-500" },
      { name: "HTML5", color: "bg-orange-500" },
      { name: "CSS3", color: "bg-blue-600" }
    ],
    links: {
      github: "https://github.com/arjunsingh/alfred",
      demo: "https://alfred-demo.vercel.app"
    },
    status: "completed",
    features: [
      "Voice-activated commands",
      "Natural language processing",
      "Multi-modal interactions",
      "Real-time speech recognition"
    ]
  },
  {
    id: "waste-wizard",
    title: "Waste Wizard System",
    description: "IoT-enabled smart waste management system with real-time monitoring and predictive analytics dashboard.",
    longDescription: "An innovative IoT solution combining NodeMCU microcontrollers with advanced sensors to monitor waste levels in real-time. Features a responsive web dashboard with predictive analytics, route optimization, and automated alerts for efficient waste management.",
    image: "/api/placeholder/600/400",
    techStack: [
      { name: "IoT", color: "bg-purple-500" },
      { name: "NodeMCU", color: "bg-cyan-500" },
      { name: "React", color: "bg-blue-400" },
      { name: "Node.js", color: "bg-green-500" },
      { name: "MongoDB", color: "bg-green-600" },
      { name: "Arduino", color: "bg-teal-500" }
    ],
    links: {
      github: "https://github.com/arjunsingh/waste-wizard"
    },
    status: "ongoing",
    features: [
      "Real-time sensor monitoring",
      "Predictive analytics",
      "Responsive web dashboard",
      "Automated alert system"
    ]
  }
]

export default function ProjectsShowcase() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  return (
    <section className="bg-background py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Showcasing innovative solutions that blend cutting-edge technology with practical applications
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
              className="group"
            >
              <Card className="bg-surface border-border h-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-transparent to-transparent" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge
                      variant={project.status === "completed" ? "default" : "secondary"}
                      className={project.status === "completed" 
                        ? "bg-success text-white" 
                        : "bg-accent text-white"
                      }
                    >
                      {project.status === "completed" ? "Completed" : "Ongoing"}
                    </Badge>
                  </div>

                  {/* Hover Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: hoveredProject === project.id ? 1 : 0 
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-primary/20 backdrop-blur-sm flex items-center justify-center"
                  >
                    <div className="flex gap-3">
                      {project.links.demo && (
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          <Play className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                      )}
                      <Button size="sm" variant="outline" className="bg-surface/80 backdrop-blur">
                        <Eye className="w-4 h-4 mr-2" />
                        Details
                      </Button>
                    </div>
                  </motion.div>
                </div>

                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {hoveredProject === project.id ? project.longDescription : project.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-foreground mb-3">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, techIndex) => (
                        <motion.div
                          key={tech.name}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ 
                            duration: 0.3, 
                            delay: index * 0.2 + techIndex * 0.1 
                          }}
                        >
                          <Badge
                            className={`${tech.color} text-white hover:opacity-80 transition-opacity`}
                          >
                            {tech.name}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Features (shown on hover) */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: hoveredProject === project.id ? 1 : 0,
                      height: hoveredProject === project.id ? "auto" : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mb-6"
                  >
                    <h4 className="text-sm font-semibold text-foreground mb-2">Key Features</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {project.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    {project.links.demo && (
                      <Button 
                        size="sm" 
                        className="flex-1 bg-primary hover:bg-primary/90"
                        asChild
                      >
                        <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                    {project.links.github && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        className={`${project.links.demo ? 'flex-1' : 'w-full'} border-border hover:bg-surface-light`}
                        asChild
                      >
                        <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          GitHub
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Button 
            size="lg" 
            variant="outline"
            className="border-border hover:bg-surface-light hover:border-primary transition-all duration-300 px-8 py-3"
          >
            <Github className="w-5 h-5 mr-2" />
            View All Projects
          </Button>
        </motion.div>
      </div>
    </section>
  )
}