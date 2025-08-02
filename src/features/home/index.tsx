import {
  Code2,
  Zap,
  Shield,
  Palette,
  Rocket,
  BookOpen,
  Github,
  ExternalLink,
  CheckCircle,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

export function HomePage() {
  const features = [
    {
      icon: <Code2 className="h-8 w-8 text-blue-600" />,
      title: "TypeScript First",
      description:
        "Built with TypeScript for better developer experience and type safety.",
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-600" />,
      title: "Lightning Fast",
      description:
        "Powered by Vite for instant hot module replacement and optimized builds.",
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "Type-Safe Routing",
      description:
        "TanStack Router provides fully type-safe, file-based routing out of the box.",
    },
    {
      icon: <Palette className="h-8 w-8 text-purple-600" />,
      title: "Tailwind CSS",
      description:
        "Beautiful, responsive designs with utility-first CSS framework.",
    },
  ];

  const techStack = [
    { name: "React 18", version: "^18.3.1" },
    { name: "TypeScript", version: "^5.5.3" },
    { name: "Vite", version: "^5.4.2" },
    { name: "TanStack Router", version: "latest" },
    { name: "Tailwind CSS", version: "^3.4.1" },
    { name: "Lucide React", version: "^0.344.0" },
  ];

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link
                to="/"
                className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
              >
                React Boilerplate
              </Link>
            </div>
            <div className="flex items-center space-x-8">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                activeProps={{
                  className: "text-blue-600 bg-blue-50",
                }}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                activeProps={{
                  className: "text-blue-600 bg-blue-50",
                }}
              >
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div className="relative">
        {/* Hero Section */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="relative z-10">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-8">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  React Boilerplate
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
                A modern, production-ready React boilerplate with TypeScript,
                TanStack Router, Vite, and Tailwind CSS. Everything you need to
                build amazing applications.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  <Rocket className="inline-block w-5 h-5 mr-2" />
                  Get Started
                </button>
                <a
                  href="https://github.com"
                  className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 border-2 border-gray-200 hover:border-gray-300 inline-flex items-center"
                >
                  <Github className="inline-block w-5 h-5 mr-2" />
                  View on GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Floating elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-200 rounded-full opacity-20 animate-pulse delay-500"></div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Built for Modern Development
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                This boilerplate combines the best tools and practices to give
                you a head start on your next project.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-8 hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100"
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Powerful Tech Stack
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Built with industry-leading tools and frameworks for maximum
                performance and developer experience.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {techStack.map((tech, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {tech.name}
                      </h3>
                      <p className="text-gray-500 text-sm mt-1">
                        Version {tech.version}
                      </p>
                    </div>
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Start your next React project with this powerful boilerplate and
              save hours of setup time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://tanstack.com/router"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 inline-flex items-center justify-center"
              >
                <BookOpen className="inline-block w-5 h-5 mr-2" />
                Router Documentation
                <ExternalLink className="inline-block w-4 h-4 ml-2" />
              </a>
              <a
                href="https://vitejs.dev"
                className="bg-transparent hover:bg-white/10 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 border-2 border-white/20 hover:border-white/40 inline-flex items-center justify-center"
              >
                <Zap className="inline-block w-5 h-5 mr-2" />
                Vite Documentation
                <ExternalLink className="inline-block w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
