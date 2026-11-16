import Link from "next/link";

const tools = [
  {
    tag: "Desktop",
    title: "Scalp Desk",
    description:
      "A compact trading workspace for quick option entries, exits and position monitoring.",
    fields: [
      ["Instrument", "BANKNIFTY"],
      ["Order mode", "Paper trading"],
      ["Risk control", "Enabled"]
    ]
  },
  {
    tag: "Desktop",
    title: "One-Click Adjust",
    description:
      "Manage multi-leg structures with a unified interface for reviewing and adjusting positions.",
    fields: [
      ["Structure", "Iron condor"],
      ["Action", "Adjust legs"],
      ["Execution", "Paper mode"]
    ]
  },
  {
    tag: "Desktop",
    title: "Timer Bots",
    description:
      "Configure scheduled strategies with entry times, exit times and predefined risk limits.",
    fields: [
      ["Entry", "09:20"],
      ["Exit", "15:10"],
      ["Daily risk", "Configurable"]
    ]
  },
  {
    tag: "Web",
    title: "Timer Bots Cloud",
    description:
      "Monitor scheduled strategies from a browser with status information and control options.",
    fields: [
      ["Bots", "Research mode"],
      ["Monitoring", "Available"],
      ["Execution", "Disabled"]
    ]
  },
  {
    tag: "Web",
    title: "Account Hub",
    description:
      "A unified view for broker connections, positions, orders and account-level risk monitoring.",
    fields: [
      ["Broker adapters", "Zerodha / Kotak Neo"],
      ["Positions", "Monitoring"],
      ["Risk alerts", "Planned"]
    ]
  }
];

const ladder = [
  ["24500 CE", "112.0", "112.5", "112.30", "up"],
  ["24600 CE", "71.4", "71.9", "71.60", "down"],
  ["24500 PE", "96.2", "96.8", "96.50", "up"],
  ["24400 PE", "64.0", "64.4", "64.20", "down"]
];

const workflow = [
  {
    title: "Pick a strategy",
    description: "Choose a research strategy or configure your own trading rules."
  },
  {
    title: "Backtest it",
    description: "Evaluate historical performance with brokerage and transaction costs."
  },
  {
    title: "Paper trade",
    description: "Validate signals and execution logic using simulated capital."
  },
  {
    title: "Validate before live",
    description: "Live execution remains disabled until testing and risk validation are complete."
  }
];

const faqs = [
  {
    question: "Do the tools come with ready-made strategies?",
    answer:
      "VM Algo provides strategy research and execution infrastructure. Strategy performance must be independently tested and validated."
  },
  {
    question: "Do I need programming knowledge?",
    answer:
      "The platform is being designed to support both configurable workflows and advanced strategy development."
  },
  {
    question: "Can you promise trading returns?",
    answer:
      "No. Trading involves market risk. We do not promise returns or guaranteed accuracy."
  },
  {
    question: "Which brokers are supported?",
    answer:
      "Zerodha and Kotak Neo are the planned initial broker integrations. Availability depends on successful integration and testing."
  },
  {
    question: "Can I test strategies without real money?",
    answer:
      "Yes. Paper trading and backtesting are core parts of the platform development."
  },
  {
    question: "Can you build custom trading tools?",
    answer:
      "Custom strategy and automation development can be discussed based on technical feasibility and risk requirements."
  }
];

export default function HomePage() {
  return (
    <>
      <header className="site-header">
        <div className="wrap nav-bar">
          <Link href="/" className="logo">
            VM<span>Algo</span>
          </Link>

          <nav className="nav-links" aria-label="Main navigation">
            <a href="#tools">Tools</a>
            <a href="#strategies">Strategies</a>
            <a href="#platform">Platform</a>
            <a href="#markets">Markets</a>
            <a href="#extras">Indicators &amp; learning</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact</a>
            <a href="#contact" className="button">
              Get started
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero wrap">
          <div className="hero-copy">
            <span className="eyebrow">VM ALGO · TRADING TECHNOLOGY</span>
            <h1>Place the order before the move is over.</h1>
            <p>
              Research, execution and automation tools for Indian options
              and equity traders. Manage entries, exits, strategies and risk
              from one connected trading workspace.
            </p>

            <div className="hero-actions">
              <a className="button" href="#contact">
                Get started
              </a>
              <a className="button button-outline" href="#tools">
                Explore the tools
              </a>
            </div>

            <div className="hero-note">
              <span className="status-dot" />
              Research and paper-trading environment
            </div>
          </div>

          <div className="ladder terminal-panel">
            <div className="ladder-heading">
              <h2>Option ladder</h2>
              <span className="demo-label">SIMULATED</span>
            </div>

            <div className="ladder-grid ladder-head">
              <span>Strike</span>
              <span>Bid</span>
              <span>Ask</span>
              <span>LTP</span>
            </div>

            {ladder.map((item) => (
              <div className="ladder-grid ladder-row" key={item[0]}>
                <strong>{item[0]}</strong>
                <span>{item[1]}</span>
                <span>{item[2]}</span>
                <span className={item[4] === "up" ? "positive" : "negative"}>
                  {item[3]}
                </span>
              </div>
            ))}

            <div className="ladder-footer">
              Illustrative demo data only. Not live market prices.
            </div>
          </div>
        </section>

        <section id="tools" className="section section-dark">
          <div className="wrap">
            <span className="eyebrow">PRODUCT SUITE</span>
            <h2>Five tools, one trading workspace.</h2>
            <p className="section-intro">
              From fast execution to strategy automation and account
              monitoring, build your trading workflow in one place.
            </p>

            <div className="product-grid">
              {tools.map((tool, index) => (
                <article className="product-card" key={tool.title}>
                  <div className="product-top">
                    <span className="product-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="tag">{tool.tag}</span>
                  </div>

                  <h3>{tool.title}</h3>
                  <p>{tool.description}</p>

                  <div className="mock-panel">
                    {tool.fields.map(([label, value]) => (
                      <div className="mock-row" key={label}>
                        <span>{label}</span>
                        <strong>{value}</strong>
                      </div>
                    ))}
                  </div>

                  <a href="#contact" className="text-link">
                    Explore product →
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="extras" className="section wrap two-column">
          <div>
            <span className="eyebrow">CHARTING</span>
            <h2>Indicators for TradingView</h2>
            <p>
              Technical research tools for trend, momentum, volatility and
              risk analysis across Indian indices and stocks.
            </p>
            <a className="button button-outline" href="#contact">
              Ask about indicators
            </a>
          </div>

          <div>
            <span className="eyebrow">EDUCATION</span>
            <h2>Trader-led workshops</h2>
            <p>
              Learn systematic research, position sizing, backtesting and
              disciplined execution through practical workshops.
            </p>
            <a className="button button-outline" href="#contact">
              Join the waitlist
            </a>
          </div>
        </section>

        <section id="platform" className="section section-dark">
          <div className="wrap">
            <span className="eyebrow">OUR WORKFLOW</span>
            <h2>From idea to validated execution.</h2>
            <p className="section-intro">
              Every strategy moves through research, testing and risk
              validation before any live deployment.
            </p>

            <ol className="steps">
              {workflow.map((step, index) => (
                <li key={step.title}>
                  <span className="step-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="strategies" className="section wrap">
          <span className="eyebrow">STRATEGY RESEARCH</span>
          <h2>Build. Test. Validate.</h2>
          <p className="section-intro">
            Develop rule-based strategies, analyze historical data, inspect
            signals and evaluate risk before considering deployment.
          </p>
          <div className="feature-strip">
            <div>
              <strong>ADX Engine</strong>
              <span>Directional movement research</span>
            </div>
            <div>
              <strong>Backtesting</strong>
              <span>Historical strategy evaluation</span>
            </div>
            <div>
              <strong>Risk Engine</strong>
              <span>Position and daily-loss controls</span>
            </div>
          </div>
        </section>

        <section id="markets" className="section section-dark">
          <div className="wrap">
            <span className="eyebrow">MARKET COVERAGE</span>
            <h2>Built for Indian markets.</h2>
            <div className="market-list">
              <span>NSE</span>
              <span>BSE</span>
              <span>NIFTY</span>
              <span>BANKNIFTY</span>
              <span>STOCK OPTIONS</span>
              <span>EQUITY</span>
            </div>
            <p className="terminal-muted">
              Market availability depends on data-provider and broker
              integration status.
            </p>
          </div>
        </section>

        <section id="faq" className="section wrap">
          <span className="eyebrow">FAQ</span>
          <h2>Questions traders ask.</h2>

          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="pricing" className="section section-dark">
          <div className="wrap two-column">
            <div>
              <span className="eyebrow">ABOUT VM ALGO</span>
              <h2>Technology for disciplined trading.</h2>
              <p>
                VM Algo is building research, automation and execution
                software for traders in Indian markets, with an emphasis on
                systematic processes and risk controls.
              </p>
            </div>

            <div id="contact">
              <span className="eyebrow">GET IN TOUCH</span>
              <h2>Build your trading workflow.</h2>
              <p>
                Contact us to discuss platform access, broker integrations,
                strategy research and custom tools.
              </p>
              <a className="button" href="mailto:contact@vmalgo.com">
                Contact VM Algo
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap">
          <div className="footer-grid">
            <div>
              <Link href="/" className="logo">
                VM<span>Algo</span>
              </Link>
              <p>
                Trading research, execution and automation tools for
                Indian markets.
              </p>
            </div>

            <div>
              <strong>Explore</strong>
              <a href="#tools">Tools</a>
              <a href="#strategies">Strategies</a>
              <a href="#platform">Platform</a>
              <a href="#markets">Markets</a>
            </div>

            <div>
              <strong>Company</strong>
              <a href="#extras">Learning</a>
              <a href="#faq">FAQ</a>
              <a href="#contact">Contact</a>
            </div>
          </div>

          <p className="risk-disclosure">
            Risk disclosure: Trading in securities and derivatives involves
            substantial risk of loss. VM Algo tools do not guarantee
            profits or investment returns. Simulated examples are for
            illustration only. Past performance does not guarantee future
            results. Validate strategies and risk controls before use.
          </p>

          <div className="copyright">
            © {new Date().getFullYear()} VM Algo. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
