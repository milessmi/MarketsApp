import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-7xl font-bold text-white mb-4">
            Allorca
          </h1>
          <p className="text-2xl text-gray-400 mb-8">
            Education-First Investing for USC students 
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/sign-up"
              className="bg-green-500 hover:bg-green-600 text-black px-8 py-4 rounded-lg font-semibold text-lg transition"
            >
              Get Started Free
            </Link>
            <Link 
              href="/sign-in"
              className="bg-gray-900 hover:bg-gray-800 text-white border border-green-500 px-8 py-4 rounded-lg font-semibold text-lg transition"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-gray-900 p-8 rounded-xl border border-green-500/20 hover:border-green-500/50 transition">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold text-white mb-3">AI-Driven Insights</h3>
            <p className="text-gray-400">
              Claude AI explains every portfolio decision
            </p>
          </div>

          <div className="bg-gray-900 p-8 rounded-xl border border-green-500/20 hover:border-green-500/50 transition">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-white mb-3">Risk Management</h3>
            <p className="text-gray-400">
              Institutional-grade risk monitoring
            </p>
          </div>

          <div className="bg-gray-900 p-8 rounded-xl border border-green-500/20 hover:border-green-500/50 transition">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-xl font-bold text-white mb-3">Discipline Score</h3>
            <p className="text-gray-400">
              Track your investment maturity
            </p>
          </div>
        </div>

{/* Stats */}
<div className="mt-20 text-center">
  <p className="text-gray-400 mb-8 text-lg">Built at USC for USC Students</p>
  <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
    <div className="bg-gray-900 p-6 rounded-lg border border-green-500/20">
      <div className="text-5xl font-bold text-green-500">30M+</div>
      <div className="text-gray-400 mt-2">Gen Z Investors</div>
    </div>
    <div className="bg-gray-900 p-6 rounded-lg border border-green-500/20">
      <div className="text-5xl font-bold text-green-500">4,000+</div>
      <div className="text-gray-400 mt-2">USC Target Users</div>
    </div>
    <div className="bg-gray-900 p-6 rounded-lg border border-green-500/20">
      <div className="text-5xl font-bold text-green-500">$460B+</div>
      <div className="text-gray-400 mt-2">Fintech Market</div>
    </div>
  </div>
</div>

{/* Why Allorca for Students */}
<div className="mt-20 max-w-4xl mx-auto">
  <div className="bg-gray-900 border border-green-500/20 rounded-xl p-8">
    <h3 className="text-2xl font-bold text-white mb-6 text-center">
      Built for Students, By Students
    </h3>
    <div className="grid md:grid-cols-2 gap-6 text-gray-300">
      <div>
        <h4 className="text-green-500 font-semibold mb-2">🎓 Education-First</h4>
        <p className="text-sm">
          Unlike trading apps that encourage risky behavior, Allorca prioritizes learning before investing.
        </p>
      </div>
      <div>
        <h4 className="text-green-500 font-semibold mb-2">📊 Discipline-Driven</h4>
        <p className="text-sm">
          AI-powered guardrails reduce emotional decision-making and build healthy investing habits.
        </p>
      </div>
      <div>
        <h4 className="text-green-500 font-semibold mb-2">💰 Student-Focused</h4>
        <p className="text-sm">
          Designed for low-balance investors starting their journey, not just experienced traders.
        </p>
      </div>
      <div>
        <h4 className="text-green-500 font-semibold mb-2">🚀 USC Built</h4>
        <p className="text-sm">
          Created at USC Stevens Center for Innovation, tested with real USC students.
        </p>
      </div>
    </div>
  </div>
</div>

        {/* Beta Disclaimer */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6 text-center">
            <p className="text-yellow-500 font-semibold mb-2">⚠️ Beta Version</p>
            <p className="text-gray-300 text-sm">
              Allorca is currently in beta. Your data is encrypted and secure, but this platform is for educational purposes only. 
              Paper trading only - do not invest real money.
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-12 border-t border-gray-800">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {/* About */}
              <div>
                <h4 className="text-white font-bold mb-4">About Allorca</h4>
                <p className="text-gray-400 text-sm">
                  AI-driven investment platform empowering smarter investing for everyone.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-white font-bold mb-4">Platform</h4>
                <div className="space-y-2">
                  <Link href="/sign-up" className="block text-gray-400 hover:text-green-500 text-sm transition">
                    Get Started
                  </Link>
                  <Link href="/sign-in" className="block text-gray-400 hover:text-green-500 text-sm transition">
                    Sign In
                  </Link>
                </div>
              </div>

              {/* Partnership */}
              <div>
                <h4 className="text-white font-bold mb-4">Partnership</h4>
                <p className="text-gray-400 text-sm">
                  USC Stevens Center for Innovation
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Marshall School of Business
                </p>
              </div>
            </div>

            {/* Team */}
            <div className="py-6 border-t border-gray-800">
              <p className="text-center text-gray-400 text-sm mb-3">
                Built by <span className="text-white font-semibold">Miles Smith</span>
              </p>
              <div className="flex justify-center gap-6 text-sm text-gray-400">
                <span>Co-founders: 
                  <span className="text-gray-300"> Vaska Wysocki</span>, 
                  <span className="text-gray-300"> Aaniya Ahuja</span>, 
                  <span className="text-gray-300"> Evan Inrig</span>
                </span>
              </div>
            </div>

            {/* Copyright */}
            <div className="pt-6 border-t border-gray-800 text-center">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} Allorca. All rights reserved.
              </p>
              <div className="flex justify-center gap-6 mt-3 text-xs text-gray-500">
                <a href="#" className="hover:text-gray-400 transition">Privacy Policy</a>
                <a href="#" className="hover:text-gray-400 transition">Terms of Service</a>
                <a href="#" className="hover:text-gray-400 transition">Contact</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}