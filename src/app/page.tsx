export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-7xl font-bold text-white mb-4">
            Allorca
          </h1>
          <p className="text-2xl text-blue-200 mb-8">
            Empowering Smarter Investing for Everyone
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition">
              Get Started Free
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg transition">
              Sign In
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl border border-white/20">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold text-white mb-3">AI-Driven Insights</h3>
            <p className="text-blue-100">
              Claude AI explains every portfolio decision
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl border border-white/20">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-white mb-3">Risk Management</h3>
            <p className="text-blue-100">
              Institutional-grade risk monitoring
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl border border-white/20">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-xl font-bold text-white mb-3">Discipline Score</h3>
            <p className="text-blue-100">
              Track your investment maturity
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 text-center">
          <p className="text-blue-200 mb-8 text-lg">Partnering with USC</p>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/5 p-6 rounded-lg">
              <div className="text-5xl font-bold text-blue-400">$150K</div>
              <div className="text-blue-200 mt-2">Seed Funding</div>
            </div>
            <div className="bg-white/5 p-6 rounded-lg">
              <div className="text-5xl font-bold text-blue-400">87</div>
              <div className="text-blue-200 mt-2">Discipline Score</div>
            </div>
            <div className="bg-white/5 p-6 rounded-lg">
              <div className="text-5xl font-bold text-blue-400">30%</div>
              <div className="text-blue-200 mt-2">Retention</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}