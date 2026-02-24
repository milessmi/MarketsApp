export type Course = {
    id: string
    title: string
    description: string
    level: 'beginner' | 'intermediate' | 'advanced'
    riskProfile: 'conservative' | 'moderate' | 'aggressive' | 'all'
    duration: string
    lessons: Lesson[]
  }
  
  export type Lesson = {
    id: string
    title: string
    content: string
    duration: string
    quiz?: Quiz
  }
  
  export type Quiz = {
    question: string
    options: string[]
    correctAnswer: number
    explanation: string
  }
  
  export const courses: Course[] = [
    {
      id: 'investing-101',
      title: 'Investing 101: The Fundamentals',
      description: 'Learn the essential concepts every investor needs to know before making their first investment.',
      level: 'beginner',
      riskProfile: 'all',
      duration: '30 min',
      lessons: [
        {
          id: 'what-are-stocks',
          title: 'What Are Stocks?',
          duration: '5 min',
          content: `
  # What Are Stocks?
  
  When you buy a stock, you're purchasing a small piece of ownership in a company. This makes you a **shareholder**.
  
  ## Key Concepts:
  
  **Share Price**: The current market value of one share of stock. This changes throughout the trading day based on supply and demand.
  
  **Market Capitalization**: Total value of a company (share price × total shares). Companies are categorized as:
  - Large-cap: Over $10 billion
  - Mid-cap: $2-10 billion  
  - Small-cap: Under $2 billion
  
  **Dividends**: Some companies share profits with shareholders through regular cash payments. Not all stocks pay dividends.
  
  ## Why Stock Prices Move:
  
  1. **Company Performance**: Strong earnings reports typically increase stock prices
  2. **Economic Conditions**: Interest rates, inflation, employment data
  3. **Market Sentiment**: Investor confidence and market trends
  4. **Supply & Demand**: More buyers than sellers drives prices up
  
  ## Example:
  
  If Apple (AAPL) trades at $180 per share and you buy 10 shares:
  - Investment: $1,800
  - If price rises to $200: Your shares are worth $2,000 (11% gain)
  - If price drops to $160: Your shares are worth $1,600 (11% loss)
  
  **Remember**: You only realize gains/losses when you sell!
          `,
          quiz: {
            question: 'What makes you a shareholder in a company?',
            options: [
              'Buying their products',
              'Working for the company',
              'Owning shares of their stock',
              'Following them on social media'
            ],
            correctAnswer: 2,
            explanation: 'When you buy stock, you own a piece of the company, making you a shareholder with ownership rights.'
          }
        },
        {
          id: 'stocks-vs-etfs',
          title: 'Stocks vs ETFs vs Bonds',
          duration: '7 min',
          content: `
  # Stocks vs ETFs vs Bonds
  
  Understanding different investment types is crucial for building a balanced portfolio.
  
  ## Individual Stocks
  
  **What**: Ownership in a single company
  
  **Pros**:
  - Higher potential returns
  - Direct control over holdings
  - Vote in shareholder meetings
  
  **Cons**:
  - Higher risk (company-specific)
  - Requires research and monitoring
  - Less diversification
  
  **Best For**: Experienced investors with time to research
  
  ---
  
  ## ETFs (Exchange-Traded Funds)
  
  **What**: A basket of stocks/bonds traded like a single stock
  
  **Pros**:
  - Instant diversification
  - Lower fees than mutual funds
  - Easy to buy/sell
  - Professional management
  
  **Cons**:
  - Less control over individual holdings
  - Small management fees
  - Can't outperform the market (index ETFs)
  
  **Best For**: Beginners and hands-off investors
  
  **Popular Examples**:
  - **SPY** or **VOO**: Tracks S&P 500 (500 largest US companies)
  - **QQQ**: Tech-focused (Nasdaq 100)
  - **VTI**: Total US stock market
  
  ---
  
  ## Bonds
  
  **What**: Loans to companies/governments that pay interest
  
  **Pros**:
  - Predictable income
  - Lower volatility than stocks
  - Portfolio stability
  
  **Cons**:
  - Lower returns than stocks historically
  - Interest rate risk
  - Inflation can erode value
  
  **Best For**: Conservative investors, near retirement
  
  ---
  
  ## Building a Balanced Portfolio:
  
  **Aggressive (Age 20-30)**:
  - 80% Stocks/ETFs
  - 15% International
  - 5% Bonds
  
  **Moderate (Age 30-50)**:
  - 60% Stocks/ETFs
  - 20% International
  - 20% Bonds
  
  **Conservative (Age 50+)**:
  - 40% Stocks/ETFs
  - 20% International
  - 40% Bonds
          `,
          quiz: {
            question: 'What is the main advantage of ETFs over individual stocks?',
            options: [
              'Higher returns',
              'Instant diversification',
              'No fees',
              'Guaranteed profits'
            ],
            correctAnswer: 1,
            explanation: 'ETFs provide instant diversification by holding many stocks in one fund, reducing company-specific risk.'
          }
        },
        {
          id: 'risk-and-reward',
          title: 'Understanding Risk and Reward',
          duration: '6 min',
          content: `
  # Understanding Risk and Reward
  
  One of investing's fundamental principles: higher potential returns come with higher risk.
  
  ## The Risk-Return Relationship
  
  **Low Risk, Low Return**:
  - Savings accounts: ~0.5% annual return
  - Government bonds: ~3-5% annual return
  - Very safe, but growth barely beats inflation
  
  **Moderate Risk, Moderate Return**:
  - Diversified ETFs: ~7-10% average annual return
  - Balanced stock/bond portfolios
  - Good for long-term growth
  
  **High Risk, High Return**:
  - Individual growth stocks: -50% to +200% or more
  - Cryptocurrency: Extreme volatility
  - Can lead to significant gains OR losses
  
  ---
  
  ## Types of Investment Risk
  
  **Market Risk**: Overall market declines affect all investments
  - 2008 Financial Crisis: S&P 500 dropped 37%
  - 2020 COVID-19: Quick 34% drop, then recovery
  
  **Company Risk**: Individual company problems
  - Bankruptcy, poor management, competition
  - Why diversification matters!
  
  **Inflation Risk**: Your returns don't keep pace with rising prices
  - If inflation is 3% and you earn 2%, you're losing buying power
  
  **Liquidity Risk**: Difficulty selling quickly without loss
  - Real estate, some bonds, small-cap stocks
  
  ---
  
  ## Your Risk Tolerance Matters
  
  Ask yourself:
  1. **Time Horizon**: When do you need this money?
     - 1-3 years → Lower risk
     - 10+ years → Can handle higher risk
  
  2. **Financial Situation**: Can you afford losses?
     - Emergency fund in place → More flexibility
     - No safety net → Stay conservative
  
  3. **Emotional Tolerance**: How will you react to a 20% drop?
     - Panic sell → Stick with stable investments
     - Stay calm or buy more → Higher risk OK
  
  ---
  
  ## The Power of Time
  
  **Historical S&P 500 Returns**:
  - 1-year period: Can be +40% or -40%
  - 10-year period: Almost never negative
  - 30-year period: Always positive (historically)
  
  **Lesson**: Time reduces risk! Long-term investors can weather short-term volatility.
  
  ---
  
  ## Diversification: Your Best Friend
  
  Don't put all eggs in one basket:
  
  **Bad**: 100% in Tesla stock
  - If Tesla tanks, you're wiped out
  
  **Good**: 60% S&P 500 ETF, 30% International ETF, 10% Bonds
  - If tech crashes, you're partially protected
  - Different sectors balance each other
          `,
          quiz: {
            question: 'Why does time reduce investment risk?',
            options: [
              'Stock prices always go up over time',
              'Long-term trends smooth out short-term volatility',
              'You earn more dividends',
              'Inflation decreases over time'
            ],
            correctAnswer: 1,
            explanation: 'While short-term markets are unpredictable, historical data shows markets trend upward over decades, smoothing out crashes and volatility.'
          }
        },
        {
          id: 'getting-started',
          title: 'How to Start Investing',
          duration: '8 min',
          content: `
  # How to Start Investing
  
  A practical step-by-step guide to making your first investment.
  
  ## Step 1: Build Your Foundation
  
  Before investing a single dollar:
  
  **Emergency Fund**: Save 3-6 months of expenses
  - Keep in high-yield savings account
  - This protects you from selling investments during emergencies
  
  **Pay Off High-Interest Debt**: Credit cards, personal loans
  - If you're paying 18% interest, that's better than any investment return
  - Exception: Low-interest student loans or mortgages are OK
  
  **Employer Match**: Max out 401(k) match if available
  - Free money! Always take it
  
  ---
  
  ## Step 2: Choose a Brokerage
  
  Popular platforms for beginners:
  
  **Fidelity**:
  - No account minimums
  - Excellent research tools
  - Great customer service
  
  **Charles Schwab**:
  - User-friendly interface
  - Free financial planning
  - Wide range of investments
  
  **Robinhood**:
  - Simple, mobile-first
  - Fractional shares
  - Good for small accounts
  
  **Vanguard**:
  - Low-cost index funds
  - Long-term focus
  - Higher minimums
  
  **What to look for**:
  - $0 commissions on stocks/ETFs
  - No account minimums
  - User-friendly app
  - Educational resources
  
  ---
  
  ## Step 3: Start Small and Simple
  
  **Your First Investment** (if you have $100-1000):
  
  **Option 1: S&P 500 Index Fund**
  - Ticker: SPY, VOO, or IVV
  - Instant exposure to 500 largest US companies
  - Historical average: ~10% annual return
  
  **Option 2: Total Market Fund**
  - Ticker: VTI or ITOT
  - Even broader than S&P 500
  - Includes small and mid-cap stocks
  
  **Don't**: Pick individual stocks until you understand them
  **Don't**: Try to time the market
  **Don't**: Invest money you need within 5 years
  
  ---
  
  ## Step 4: Dollar-Cost Averaging
  
  Instead of investing $1,000 at once, spread it out:
  
  **Example**:
  - Invest $100 per month for 10 months
  - If price drops, you buy more shares
  - If price rises, you still own shares
  
  **Why this works**:
  - Reduces timing risk
  - Builds discipline
  - Lowers average cost over time
  
  ---
  
  ## Step 5: Automate and Ignore
  
  **Set it and forget it**:
  1. Set up automatic monthly transfers
  2. Auto-invest in your chosen ETF
  3. Check quarterly, not daily
  4. Rebalance once per year
  
  **Avoid**:
  - Checking prices constantly
  - Panic selling during dips
  - Chasing hot stocks
  - Trading too frequently
  
  ---
  
  ## Common Beginner Mistakes
  
  **Mistake #1**: Waiting for the "perfect time"
  - Time in market > timing the market
  - Start now, even if small
  
  **Mistake #2**: Picking individual stocks without research
  - 90% of active traders underperform index funds
  - Stick to ETFs until you're experienced
  
  **Mistake #3**: Selling during market dips
  - Markets recover historically
  - Selling locks in losses
  
  **Mistake #4**: Ignoring fees
  - 1% fee = ~25% less money after 30 years
  - Choose low-cost index funds (< 0.1% expense ratio)
  
  ---
  
  ## Your Action Plan
  
  **This Week**:
  1. Open a brokerage account
  2. Link your bank account
  3. Transfer $50-500
  
  **This Month**:
  4. Buy your first S&P 500 ETF share
  5. Set up automatic monthly investments
  6. Continue learning
  
  **This Year**:
  7. Build to 3-6 months emergency fund
  8. Increase monthly investments
  9. Explore other investment types
  
  **Remember**: Investing is a marathon, not a sprint. Start small, stay consistent, and let time work for you!
          `,
          quiz: {
            question: 'What should you do BEFORE investing in stocks?',
            options: [
              'Buy cryptocurrency',
              'Build an emergency fund',
              'Quit your job',
              'Max out credit cards'
            ],
            correctAnswer: 1,
            explanation: 'An emergency fund (3-6 months expenses) protects you from needing to sell investments during emergencies, which could lock in losses.'
          }
        }
      ]
    },
    
    {
      id: 'building-portfolio',
      title: 'Building Your First Portfolio',
      description: 'Learn how to construct a diversified investment portfolio that matches your goals and risk tolerance.',
      level: 'beginner',
      riskProfile: 'all',
      duration: '45 min',
      lessons: [
        {
          id: 'asset-allocation',
          title: 'Asset Allocation Basics',
          duration: '10 min',
          content: `
  # Asset Allocation Basics
  
  Asset allocation is how you divide your money among different investment types. It's the #1 factor determining your portfolio's performance.
  
  ## The Big Three Asset Classes
  
  **Stocks (Equities)**:
  - Ownership in companies
  - Higher growth potential
  - More volatile
  - Best for: Long-term growth
  
  **Bonds (Fixed Income)**:
  - Loans to companies/governments
  - Regular interest payments
  - Lower returns, lower risk
  - Best for: Stability and income
  
  **Cash & Equivalents**:
  - Savings accounts, money market funds
  - Very safe, very low returns
  - Best for: Emergency fund, short-term needs
  
  ---
  
  ## The 100 Minus Age Rule (Old School)
  
  **Formula**: 100 - your age = % in stocks
  
  - Age 25: 75% stocks, 25% bonds
  - Age 50: 50% stocks, 50% bonds
  - Age 70: 30% stocks, 70% bonds
  
  **Problem**: People are living longer, retiring later
  **Modern version**: 110 or 120 minus age
  
  ---
  
  ## Modern Allocation Strategies
  
  **Aggressive (High Growth)**:
  - 80-90% Stocks
  - 10-15% Bonds
  - 0-5% Cash
  - Best for: Age 20-35, high risk tolerance, 10+ year horizon
  
  **Moderate (Balanced)**:
  - 60-70% Stocks
  - 25-35% Bonds
  - 5-10% Cash
  - Best for: Age 35-55, moderate risk tolerance, 5-10 year horizon
  
  **Conservative (Capital Preservation)**:
  - 30-40% Stocks
  - 50-60% Bonds
  - 10-15% Cash
  - Best for: Age 55+, low risk tolerance, nearing retirement
  
  ---
  
  ## Diversify Within Asset Classes
  
  **Don't**: Put 100% in one stock
  **Do**: Spread across:
  
  **US Stocks**:
  - Large-cap (Apple, Microsoft)
  - Mid-cap (Regional banks, growing companies)
  - Small-cap (Emerging companies)
  
  **International**:
  - Developed markets (Europe, Japan)
  - Emerging markets (China, India, Brazil)
  
  **Bonds**:
  - Government (US Treasury)
  - Corporate (Company bonds)
  - Municipal (Tax-advantaged)
  
  ---
  
  ## Sample Beginner Portfolios
  
  **"Three-Fund Portfolio" (Simple & Effective)**:
  - 70% US Total Market ETF (VTI)
  - 20% International ETF (VXUS)
  - 10% Bond ETF (BND)
  
  **"Lazy Portfolio" (Even Simpler)**:
  - 60% Target Date Fund (automatically adjusts over time)
  - 40% Cash/Bonds
  
  **"Aggressive Growth" (For Young Investors)**:
  - 50% S&P 500 ETF (VOO)
  - 25% Total Market ETF (VTI)
  - 15% International (VXUS)
  - 10% Small-Cap Growth (VB)
  
  ---
  
  ## Rebalancing: Keeping Your Plan on Track
  
  Markets move, changing your allocation:
  
  **Example**:
  - Start: 70% stocks, 30% bonds
  - After great stock year: 80% stocks, 20% bonds
  - **Action**: Sell some stocks, buy bonds → back to 70/30
  
  **How Often**: Once or twice per year
  **Why**: Maintains your target risk level
  
  ---
  
  ## Key Takeaway
  
  Asset allocation matters more than picking individual stocks. A balanced, diversified portfolio reduces risk while maintaining growth potential.
          `
        }
      ]
    },
  
    {
      id: 'income-investing',
      title: 'Income Investing for Conservative Investors',
      description: 'Learn how to generate steady income from your investments through dividends, bonds, and stable assets.',
      level: 'intermediate',
      riskProfile: 'conservative',
      duration: '40 min',
      lessons: [
        {
          id: 'dividend-stocks',
          title: 'Dividend Stocks Explained',
          duration: '12 min',
          content: `
  # Dividend Stocks: Passive Income Basics
  
  Dividend stocks pay you regular cash just for owning them. Perfect for conservative investors seeking income.
  
  ## What Are Dividends?
  
  When profitable companies make money, they can:
  1. **Reinvest** in growth (Amazon, Google)
  2. **Pay dividends** to shareholders (Coca-Cola, Johnson & Johnson)
  
  **Dividend Yield** = Annual Dividend / Stock Price
  
  Example:
  - Stock price: $100
  - Annual dividend: $4
  - Yield: 4%
  
  ---
  
  ## Types of Dividend Stocks
  
  **Dividend Aristocrats**:
  - Increased dividends for 25+ consecutive years
  - Very stable, blue-chip companies
  - Examples: Coca-Cola, Procter & Gamble, 3M
  
  **High-Yield Dividends**:
  - 5-8%+ yields
  - Higher risk (yields can be cut)
  - Examples: REITs, utilities, some energy companies
  
  **Dividend Growth**:
  - Lower current yield (2-3%)
  - Rapidly growing dividends
  - Examples: Microsoft, Visa, Apple
  
  ---
  
  ## Building a Dividend Portfolio
  
  **Strategy**: Focus on quality over yield
  
  **Look for**:
  - Dividend growth history (10+ years)
  - Payout ratio < 60% (room to maintain/grow)
  - Strong cash flow
  - Recession-resistant businesses
  
  **Sample Conservative Dividend Portfolio**:
  - 30% Dividend Aristocrat ETF (NOBL)
  - 25% Utilities (XLU)
  - 20% Consumer Staples (XLP)
  - 15% REITs (VNQ)
  - 10% High-Quality Bonds (AGG)
  
  **Expected Income**: 3-4% annual yield
  
  ---
  
  ## The Power of Dividend Reinvestment
  
  **DRIP** (Dividend Reinvestment Plan):
  - Automatically buy more shares with dividends
  - Compounds your returns
  - No transaction fees
  
  **Example**: $10,000 investment, 4% yield, 25 years
  - Without DRIP: $10,000 + $10,000 dividends = $20,000
  - With DRIP: $26,658 (compounding effect)
  
  ---
  
  ## When Dividends Get Cut (Red Flags)
  
  **Warning signs**:
  - Payout ratio > 80%
  - Declining revenue
  - High debt levels
  - Industry disruption
  
  **What to do**:
  - Don't panic over one cut
  - Evaluate the business fundamentals
  - Consider selling if trend continues
          `
        }
      ]
    },
  
    {
      id: 'growth-investing',
      title: 'Growth Investing Strategies',
      description: 'Master the art of identifying and investing in high-growth companies for maximum returns.',
      level: 'intermediate',
      riskProfile: 'aggressive',
      duration: '50 min',
      lessons: [
        {
          id: 'growth-stocks',
          title: 'What Makes a Growth Stock',
          duration: '15 min',
          content: `
  # Growth Investing: High Risk, High Reward
  
  Growth stocks prioritize expansion over profits. Higher potential returns, but significantly more volatile.
  
  ## Characteristics of Growth Stocks
  
  **Revenue Growth**: 15%+ annual growth
  **Market Disruption**: New technology or business model
  **Reinvestment**: Profits go back into the business
  **High Valuation**: Trade at premium P/E ratios
  **No Dividends**: Cash used for growth, not payouts
  
  **Examples**:
  - Tesla (electric vehicles)
  - NVIDIA (AI chips)
  - Netflix (streaming)
  - Shopify (e-commerce)
  
  ---
  
  ## Growth vs Value Investing
  
  **Growth Stocks**:
  - High P/E ratios (30-100+)
  - Betting on future potential
  - More volatile
  - Can deliver 50-500%+ returns (or drop 50%)
  
  **Value Stocks**:
  - Low P/E ratios (10-20)
  - Undervalued by market
  - More stable
  - Steady 8-12% returns typically
  
  **Your approach depends on risk tolerance and time horizon**
  
  ---
  
  ## Identifying Growth Opportunities
  
  **Key Metrics to Watch**:
  
  1. **Revenue Growth Rate**:
     - Look for 20%+ annually
     - Consistent quarter-over-quarter growth
  
  2. **Total Addressable Market (TAM)**:
     - Is the market big enough?
     - Room for 10x growth?
  
  3. **Competitive Advantage** (Moat):
     - Network effects (Facebook, Uber)
     - Brand power (Apple, Nike)
     - Technology patents
     - High switching costs
  
  4. **Management Team**:
     - Track record of execution
     - Clear vision for growth
     - Insider ownership (skin in the game)
  
  ---
  
  ## Growth Stock Sectors
  
  **Technology**: Software, AI, Cloud Computing
  - Highest growth potential
  - Most volatility
  - Examples: MSFT, GOOGL, META
  
  **Healthcare/Biotech**: New drugs, medical devices
  - FDA approval can 10x stock
  - Clinical trial failures can tank it
  - Examples: MRNA, REGN, ISRG
  
  **Consumer Discretionary**: E-commerce, luxury
  - Economic cycle dependent
  - Changing consumer behaviors
  - Examples: AMZN, TSLA, LULU
  
  **Fintech**: Digital payments, crypto platforms
  - Disrupting traditional finance
  - Regulatory risk
  - Examples: SQ, PYPL, COIN
  
  ---
  
  ## Risk Management for Growth Investing
  
  **Position Sizing**:
  - No more than 5% in any single stock
  - Limit total growth exposure to 30-50%
  - Balance with stable index funds
  
  **Exit Strategy**:
  - Set stop-losses (10-15% below purchase)
  - Take profits at predetermined targets
  - Don't marry your positions
  
  **Diversify Across**:
  - Different sectors
  - Company stages (startups vs established)
  - Market caps (small, mid, large)
  
  ---
  
  ## Common Growth Investing Mistakes
  
  **Mistake #1**: Chasing momentum
  - Don't buy just because it's going up
  - Have a thesis for WHY it will grow
  
  **Mistake #2**: Ignoring valuation
  - Even great companies can be overpriced
  - P/E of 200 needs LOTS of growth to justify
  
  **Mistake #3**: Panic selling on dips
  - Growth stocks are volatile
  - 20-30% pullbacks are normal
  - Have conviction in your thesis
  
  **Mistake #4**: Over-concentration
  - Don't put 50% in one growth stock
  - One bad earnings can devastate
  
  ---
  
  ## Sample Aggressive Growth Portfolio
  
  **Core Holdings (60%)**:
  - 30% QQQ (Nasdaq 100 - tech heavy)
  - 30% ARKK (Innovation ETF)
  
  **Individual Growth Stocks (30%)**:
  - 10% AI/Cloud (NVDA, AMD)
  - 10% E-commerce (SHOP, MELI)
  - 10% Biotech (CRSP, BEAM)
  
  **Stability (10%)**:
  - 10% Bonds or cash for rebalancing
  
  **Expected Volatility**: 30-50% annual swings
  **Potential Returns**: 15-25% annually (long-term)
  **Risk**: Can lose 50%+ in bear markets
  
  ---
  
  ## The Bottom Line
  
  Growth investing is for:
  - Young investors (10+ year horizon)
  - High risk tolerance
  - Active monitoring
  - Belief in emerging technologies
  
  Not for:
  - Conservative investors
  - Short time horizons
  - Hands-off approaches
          `
        }
      ]
    }
  ]
  
  export function getCoursesForUser(user: {
    experienceLevel: string | null
    riskScore: number
    portfolioType: string
  }) {
    // Prioritize courses based on user profile
    const scoredCourses = courses.map(course => {
      let priority = 0
  
      // Match experience level
      if (user.experienceLevel === 'beginner' && course.level === 'beginner') priority += 10
      if (user.experienceLevel === 'basic' && course.level === 'beginner') priority += 8
      if (user.experienceLevel === 'intermediate' && course.level === 'intermediate') priority += 10
      if (user.experienceLevel === 'advanced' && course.level === 'advanced') priority += 10
  
      // Match risk profile
      if (course.riskProfile === 'all') priority += 5
      if (user.riskScore < 35 && course.riskProfile === 'conservative') priority += 10
      if (user.riskScore >= 35 && user.riskScore < 65 && course.riskProfile === 'moderate') priority += 10
      if (user.riskScore >= 65 && course.riskProfile === 'aggressive') priority += 10
  
      return { ...course, priority }
    })
  
    return scoredCourses.sort((a, b) => b.priority - a.priority)
  }
  
  export function getCourseById(id: string) {
    return courses.find(course => course.id === id)
  }