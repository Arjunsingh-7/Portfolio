"use client";

import React from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Github, Linkedin, Code } from "lucide-react";

const ComprehensiveContactForm = () => {
  return (
    <section className="relative mx-2.5 mt-2.5 rounded-t-2xl rounded-b-[36px] bg-background py-32 lg:mx-4">
      <div className="container max-w-2xl">
        <h1 className="text-center text-4xl font-semibold tracking-tight lg:text-5xl">
          Let's Connect
        </h1>
        <p className="mt-4 text-center leading-snug font-medium text-muted-foreground lg:mx-auto">
          Ready to collaborate or discuss opportunities? I'd love to hear from you.
        </p>
        <div className="mt-10 flex justify-between gap-8 max-sm:flex-col md:mt-14 lg:mt-20 lg:gap-12">
          <div>
            <h2 className="font-semibold">Contact Info</h2>
            <div className="mt-3 space-y-3 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a
                  href="mailto:arjunsingh792002@gmail.com"
                  className="hover:text-foreground"
                >
                  arjunsingh792002@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a
                  href="tel:+91-8957979925"
                  className="hover:text-foreground"
                >
                  +91-8957979925
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Kanpur, Uttar Pradesh</span>
              </div>
            </div>
          </div>
          <div>
            <h2 className="font-semibold">Connect With Me</h2>
            <div className="mt-3 space-y-3">
              <div className="flex items-center gap-2">
                <Github className="h-4 w-4" />
                <a
                  href="https://github.com/Arjunsingh-7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  GitHub
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" />
                <a
                  href="https://linkedin.com/in/arjun-singh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  LinkedIn
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                <a
                  href="https://leetcode.com/u/arjunsingh792002/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  LeetCode
                </a>
              </div>
            </div>
          </div>
        </div>
        <DashedLine className="my-12" />
        {/* Inquiry Form */}
        <div className="mx-auto">
          <h2 className="text-lg font-semibold">Send me a message</h2>
          <form className="mt-8 space-y-5">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input placeholder="Your full name" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input placeholder="your.email@example.com" type="email" />
            </div>
            <div className="space-y-2">
              <Label>Subject</Label>
              <Input placeholder="What's this about?" />
            </div>
            <div className="space-y-2">
              <Label>Message</Label>
              <Textarea
                placeholder="Tell me about your project or opportunity..."
                className="min-h-[120px] resize-none"
              />
            </div>
            <div className="flex justify-end">
              <Button size="lg" type="submit" className="">
                Send Message
              </Button>
            </div>
          </form>
          <p className="mt-4 text-sm text-muted-foreground text-center">
            I'll get back to you within 24 hours.
          </p>
        </div>
      </div>
    </section>
  );
};

interface DashedLineProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

const DashedLine = ({
  orientation = "horizontal",
  className,
}: DashedLineProps) => {
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      className={cn(
        "relative text-muted-foreground",
        isHorizontal ? "h-px w-full" : "h-full w-px",
        className
      )}
    >
      <div
        className={cn(
          isHorizontal
            ? [
                "h-px w-full",
                "bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,currentColor_4px,currentColor_10px)]",
                "[mask-image:linear-gradient(90deg,transparent,black_25%,black_75%,transparent)]",
              ]
            : [
                "h-full w-px",
                "bg-[repeating-linear-gradient(180deg,transparent,transparent_4px,currentColor_4px,currentColor_8px)]",
                "[mask-image:linear-gradient(180deg,transparent,black_25%,black_75%,transparent)]",
              ]
        )}
      />
    </div>
  );
};

export { ComprehensiveContactForm };