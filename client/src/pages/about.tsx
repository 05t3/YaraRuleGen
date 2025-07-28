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

          {/* What are Sigma Rules */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">What are Sigma Rules?</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed">
                Sigma is an open and versatile signature format that empowers security analysts to document log events in an organized manner. 
                This facilitates the seamless exchange of detection techniques, signatures, and IOCs across different platforms and tools.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-4">Key Features</h3>
              <ul className="space-y-2">
                <li><strong>Real-Time Rule Generation:</strong> As you fill in the forms, the tool dynamically constructs the Yara rule and updates the preview window, reflecting changes instantly.</li>
                <li><strong>Flexible Input Options:</strong> Define rules with multiple strings (text or hex), logical conditions (e.g., all of them, any of them, 1 of them), and file size constraints. Add hashes to target specific samples.</li>
                <li><strong>Metadata Support</strong> Capture critical details—author, date, description, and references—to maintain context and traceability.</li>
                <li><strong>Export Capabilities:</strong> Copy the generated rule to your clipboard or download it as a .yar file, ready for integration with tools like Yara, ClamAV, or your SIEM.</li>
                <li><strong>Syntax Validation:</strong> Ensure every rule is valid before deployment, minimizing runtime errors.</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-4">How It Works</h3>
              <ul className="space-y-2">
                <li><strong>Rule Identification:</strong> Start by naming your rule and assigning a unique ID (UUID). This helps track rules across your organization.</li>
                <li><strong>Metadata Configuration:</strong> Add author details, creation date, a description of the malicious behavior, and relevant references (e.g., CVE IDs or threat reports).</li>
                <li><strong>String Definition:</strong> Input strings to match against files—use escape sequences for binary patterns (e.g., \x00) or plain text. Add multiple strings and decide how they should be evaluated (e.g., and, or, not).</li>
                <li><strong>Condition Logic:</strong> Build conditions using the form’s logical operators and predefined functions (e.g., uint16(), filesize). Combine strings and file properties to create robust detection logic.</li>
                <li><strong>Preview and Export:</strong> Review the generated rule in the live preview window. If the syntax is valid (indicated by a green checkmark), copy it or download it for use.</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-4">Who Benefits?</h3>
              <ul className="space-y-2">
                <li><strong>Threat Hunters:</strong> Quickly generate rules to track Indicators of Compromise (IOCs) during incident response.</li>
                <li><strong>Malware Analysts:</strong> ACreate signatures for new malware families based on reverse-engineering findings.</li>
                <li><strong>SOC Teams:</strong> Deploy rules to detect known attack patterns across endpoints and networks.</li>
                <li><strong>Security Researchers:</strong> Share well-documented rules with the community to enhance collective defense.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}