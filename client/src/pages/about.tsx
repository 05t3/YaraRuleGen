import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileJson2, GitPullRequestArrow, BugOff, Target, UsersIcon } from "lucide-react";
import { Link } from "wouter";
import { Footer } from "@/components/footer";

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <Button variant="ghost" className="flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Generator
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <FileJson2 className="w-8 h-8 text-primary" />
              <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
                About Yara Rules
              </h1>
            </div>
          </div>
        </div>

      </header>



      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
              About Yara Rule Generator
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              The Yara Rule Generator is a powerful, intuitive tool designed to empower cybersecurity professionals, including threat hunters, malware analysts, and SOC teams, by simplifying the creation of precise Yara rules—pattern-matching signatures used to detect malicious behavior across environments. This web-based interface allows you to define rule parameters such as identifiers, metadata, strings, and conditions through user-friendly forms, generating a fully functional Yara rule in real-time.
            </p>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white">

              Why Use the Yara Rule Generator?
            </h2>
          </div>



          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <GitPullRequestArrow className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Accelerating Rule Development</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300">
                  Input data through user-friendly forms—rule name, ID, author, date, hashes, strings, and conditions—and get a syntactically correct rule instantly.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <BugOff className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Reducing Errors</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300">
                  The built-in syntax validator ensures your rule is compilable, saving time on debugging.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <UsersIcon className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Supporting Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300">
                  Include metadata like references and scores to document intent and share rules with your team or the broader security community.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Target className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Enhancing Precision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300">
                  Leverage detailed options for string definitions (e.g., hexadecimal patterns, text strings, wildcards) and logical conditions to target specific malware traits.
                </p>
              </CardContent>
            </Card>
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}