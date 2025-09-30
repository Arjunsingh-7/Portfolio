"use client"

import { motion } from "framer-motion"
import { GraduationCap, Award, Trophy, Calendar, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const educationData = [
  {
    id: 1,
    institution: "Pranveer Singh Institute Of Technology",
    degree: "B.Tech in AI & Data Science",
    percentage: "80%",
    period: "Dec 2022 - Present",
    status: "current",
    location: "Kanpur, India"
  },
  {
    id: 2,
    institution: "Saraswati Vidya Mandir",
    degree: "Intermediate (12th)",
    percentage: "73%",
    period: "2018 - 2019",
    status: "completed",
    location: "Kanpur, India"
  },
  {
    id: 3,
    institution: "Saraswati Vidya Mandir",
    degree: "High School (10th)",
    percentage: "77%",
    period: "2016 - 2017",
    status: "completed",
    location: "Kanpur, India"
  }
]

const certificationData = [
  {
    id: 1,
    category: "Infosys Certifications",
    certifications: ["HTML", "CSS", "JavaScript", "Python"],
    provider: "Infosys Springboard",
    type: "Technical Skills"
  },
  {
    id: 2,
    category: "Udemy Certifications",
    certifications: ["Python Advanced", "Java OOPs"],
    provider: "Udemy",
    type: "Programming"
  },
  {
    id: 3,
    category: "NACT Participation",
    certifications: ["National Assessment of Competency in Technology"],
    provider: "NACT",
    type: "Assessment"
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

const timelineVariants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
}

export default function EducationTimeline() {
  return (
    <section className="bg-background py-24">
      <div className="container max-w-6xl mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
              Education & Certifications
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              My academic journey and professional certifications that have shaped my expertise in technology and development
            </p>
          </motion.div>

          {/* Education Timeline */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h3 className="text-2xl font-display font-bold text-foreground flex items-center gap-3">
              <GraduationCap className="w-7 h-7 text-success" />
              Education
            </h3>

            <div className="relative">
              {/* Timeline Line */}
              <motion.div
                variants={timelineVariants}
                className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-success to-success/30 origin-top"
              />

              {/* Timeline Items */}
              <div className="space-y-8">
                {educationData.map((item, index) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    className="relative flex gap-6"
                  >
                    {/* Timeline Dot */}
                    <div className="relative z-10">
                      <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center ${
                        item.status === 'current' 
                          ? 'bg-success border-success/30 shadow-lg shadow-success/20' 
                          : 'bg-surface border-success/50'
                      }`}>
                        <GraduationCap className={`w-5 h-5 ${
                          item.status === 'current' ? 'text-background' : 'text-success'
                        }`} />
                      </div>
                    </div>

                    {/* Content Card */}
                    <Card className="flex-1 bg-surface border-border hover:border-success/50 transition-colors duration-300">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                          <div className="space-y-3">
                            <div className="flex items-center gap-3 flex-wrap">
                              <h4 className="text-xl font-semibold text-foreground">
                                {item.degree}
                              </h4>
                              {item.status === 'current' && (
                                <Badge variant="default" className="bg-success text-background">
                                  Current
                                </Badge>
                              )}
                            </div>
                            
                            <p className="text-lg font-medium text-accent">
                              {item.institution}
                            </p>
                            
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{item.period}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>{item.location}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-2xl font-bold text-success">
                              {item.percentage}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Score
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Certifications Grid */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h3 className="text-2xl font-display font-bold text-foreground flex items-center gap-3">
              <Award className="w-7 h-7 text-success" />
              Certifications & Achievements
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificationData.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="h-full bg-surface border-border hover:border-success/50 transition-all duration-300 group">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <h4 className="text-lg font-semibold text-foreground group-hover:text-success transition-colors duration-300">
                            {cert.category}
                          </h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Trophy className="w-4 h-4 text-success" />
                            <span>{cert.provider}</span>
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {cert.type}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div className="text-sm text-muted-foreground">
                          Skills Acquired:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {cert.certifications.map((skill, skillIndex) => (
                            <Badge 
                              key={skillIndex}
                              variant="outline"
                              className="text-xs border-success/30 text-success hover:bg-success hover:text-background transition-colors duration-200"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Achievement Summary */}
          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-r from-success/5 to-accent/5 border-success/20">
              <CardContent className="p-8 text-center">
                <div className="flex items-center justify-center gap-12 flex-wrap">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-success">80%</div>
                    <div className="text-sm text-muted-foreground">Current CGPA</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-success">6+</div>
                    <div className="text-sm text-muted-foreground">Certifications</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-success">4+</div>
                    <div className="text-sm text-muted-foreground">Technologies</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}