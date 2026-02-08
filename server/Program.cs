var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseDefaultFiles();
app.UseStaticFiles();

//
// 1) Intro (/api/intro)  ─────────────────────────────────────────────
//
app.MapGet("/api/intro", () => new
{
    name = "Sunghyun Chang",
    title = "Senior Software Engineer",
    lead = "Specialized in AI Integration and System Architecture", // :contentReference[oaicite:3]{index=3}
});

//
// 2) About ─────────────────────────────────────────────────────
//
app.MapGet("/api/about", () => new
{
    headline = "I'm Sunghyun",
    body = new[]
    {
        "AI integration engineer focused on turning business requirements into reliable, scalable systems that connect models to production workflows.",
        "11+ years in software engineering with a C#/.NET foundation, designing architectures that stay fast, observable, and maintainable under real-world load.",
        "I value clear problem framing, measurable outcomes, and delivering systems teams can operate confidently."
    }
});

//
// 3) What I Do (Services) ──────────────────────────────────────
//
app.MapGet("/api/services", () => new[]
{
    new {
        title = "AI INTEGRATION (PRODUCTION)",
        body = "I bridge research and production. I align interfaces, define message protocols, and build services that safely serve models at scale—turning prototypes into business value with clear contracts, versioning, and rollbacks." // :contentReference[oaicite:6]{index=6}
    },
    new
    {
        title = "REAL-TIME DISTRIBUTED SYSTEMS",
        body = "Design and optimize real-time distributed systems with low latency and high throughput. Built C#/.NET microservices on Docker/Kubernetes with Redis and Pulsar/Kafka, emphasizing observability, operability, and long-term maintainability."        
    },
    new
    {
        title = "PROBLEM SOLVING",
        body = "I break complex problems into clear, testable pieces, then solve the highest-impact part first. I start with the current constraints, define success metrics (latency, error rate, throughput), and validate with quick prototypes before scaling. In production, I favor simple, observable solutions—measure, iterate, and ship."
    },
    new
    {
        title = "SYSTEM DESIGN & RELIABILITY",
        body = "Architecture is a team sport. I document decisions, plan for failure, and design for operability—metrics, logs, alerts, and SLOs—so systems remain understandable and fixable long after launch."
    }
});

//
// 4) Skills ─────────────────────────────────────────────────────
//
app.MapGet("/api/skills", () => new
{ 
    development = new[] {
        "C#", ".NET Core", ".NET Framework", "WPF", "WinForms", "Xamarin", "React", "C++"
    }, // :contentReference[oaicite:10]{index=10}
    tools = new[] {
        "Git / GitHub", "Docker", "Kubernetes", "AWS", "Jenkins", "JIRA", "Linux", "Windows"
    }, // :contentReference[oaicite:11]{index=11}
    knowledge = new[] {
        "Network", "TCP/IP", "REST API", "Message Queue (Kafka, Pulsar)", "MySQL", "Redis", "CI/CD", "FIX Protocol"
    }, // :contentReference[oaicite:12]{index=12}
    softskill = new[] {
        "System Design", "Reliability", "Observability", "Architecture Documentation", "Cross-team Collaboration", "Mentorship", "Execution"
    }, // :contentReference[oaicite:13]{index=13}
});

//
// 5) Experience ─────────────────────────────────────────────────
//
app.MapGet("/api/experience", () => new[]
{    
    new {
    organization = "HANSEO University, South Korea",
    role = "B.E., Aerospace Software Engineering",
    period = "Feb 2006",
    description = "Enrolled in an interdisciplinary curriculum combining aerospace engineering and computer science, focusing on software development for aviation systems."
    },

    new {
    organization = "Republic of Korea Army",
    role = "Wireless Communications Specialist (Sergeant, Honorable Discharge)",
    period = "Apr 2007 – Mar 2009",
    description = "Served on active duty as a wireless communications specialist, developing a strong sense of discipline and responsibility within a structured organization, while strengthening collaboration and problem-solving skills through team-based missions."
    },

    new {
    organization = "MBC (Munhwa Broadcasting Corporation), South Korea",
    role = "Broadcast Technician",
    period = "May 2009 – May 2011",
    description = "Maintained broadcast and studio equipment and supported editorial room operations, ensuring stable on-air broadcasting and technical reliability."
    },

    new {
    organization = "Camino de Santiago, Europe",
    role = "Solo Pilgrimage",
    period = "Jun 2011 – Aug 2011",
    description = "Completed a 1,000 km solo pilgrimage from St-Jean-Pied-de-Port, France, to Porto, Portugal. Originally undertaken as a journey, it became a pivotal turning point that shaped my personal resilience, self-reflection, and long-term life direction."
    },

    new {
    organization = "North-West University, Mafikeng, South Africa",
    role = "Exchange Student, Computer Science and Electronics",
    period = "Feb 2013 – Dec 2013",
    description = "Participated in an international exchange program, studying computer science and electronics while gaining cross-cultural experience in a global academic environment."
    },

    new {
    organization = "HANSEO University, South Korea",
    role = "B.E., Aerospace Software Engineering",
    period = "Feb 2015",
    description = "Graduated with a Bachelor of Engineering in Aerospace Software Engineering."
    },

    new {
    organization = "Pixoneer Geomatics",
    role = "Software Engineer",
    period = "Oct 2014 – Jun 2016",
    description = "Worked on aerospace and defense projects, including a helicopter condition monitoring system, gaining hands-on experience across the full software development life cycle from requirements analysis to deployment."
    },

    new {
    organization = "QRAFT Technologies",
    role = "AXE Team Leader & Senior Software Development Engineer",
    period = "Nov 2016 – Nov 2023",
    description = "Led the AXE team and operated a real-time automated order execution system based on reinforcement learning, ensuring stable, low-latency trading operations for large institutional clients."
    },

    new {
    organization = "LG Energy Solution Michigan",
    role = "Smart Factory Senior Engineer",
    period = "May 2024 – Present",
    description = "Operated and managed smart factory product traceability systems for EV battery manufacturing, ensuring stable production by supporting roll map and cell tracking systems across electrode and assembly processes."
    }
});

//
// 6) Portfolio (Some of My Work) ───────────────────────────────
//
app.MapGet("/api/projects", () => new object[]
{
    new {
        title = "[QRAFT - AXE] AI Execution Engine System",
        description = "A real-time automated order execution platform using reinforcement learning to reduce market impact and transaction costs for institutional-sized orders.",
        tech = new[] { "Python", ".NET Core", "Rust", "MySQL", "Redis", "AWS", "Docker", "Apache Pulsar", "WPF", "FIX Protocol", "TCP/IP", "Jenkins", "Kubernetes" },
        images = new [] { "/images/qraft_axe/6.png" },
        web = "https://www.qraftec.com/market-intelligence-execution",
        details = new[] 
        {
            "Agent-based deep RL architecture that learns execution policies under changing liquidity and volatility.",
            "Consumes tick-level data (price, volume, order book, historical context) to optimize impact, fill quality, and risk.",
            "Designed for low-latency operation with observability, backtesting, and safe rollout of strategy updates."
        },
        tasks = new[]
        {
            "Built OMS integration middleware (protocol translation, validation, and routing for multiple broker OMS).",
            "Delivered CI/CD scenario tests, monitoring, and daily reporting/backup automation.",
            "Implemented trading integrations (OpenAPI) and managed performance history pipelines.",
            "Led a cross-functional team (4 research, 3 engineering, 1 QA) as team lead.",
            "Supported customer-facing technical sales and solution alignment with client stakeholders."
        },
        media = new[] { "/images/qraft_axe/1.png", "/images/qraft_axe/2.png", "/images/qraft_axe/3.png", "/images/qraft_axe/4.png", "/images/qraft_axe/5.png" },
    },
    new
    {
        title = "[QRAFT - ASAQ] Real-time supply-demand analysis system",
        description = "A real-time supply/demand analytics service for Korean equities, built to surface actionable signals for retail investors.",
        tech = new[] { "ASP.NET Core", "WPF", "Xamarin", "MySQL", "SignalR" },
        images = new [] { "/images/qraft_asaq/1.png" },
        details = new[] 
        { 
            "Processed large-scale market data across 2,300+ stocks to derive supply/demand indicators in real time.",
            "Focused on clear, fast insights for non-institutional investors in a noisy, fast-moving market.",
            "Result: 500+ Play Store downloads and 1,000+ active customers."
        },
        tasks = new[] 
        { 
            "Owned end-to-end delivery: architecture, data analysis, backend, and ops.",
            "Built the real-time analytics engine and SignalR streaming pipeline.",
            "Shipped Windows client + Android app with consistent UX and low-latency updates.",
            "Early-stage startup: handled planning, build, release operations, and marketing as a solo contributor."
        },
        media = new[] { "/images/qraft_asaq/1.png", "/images/qraft_asaq/2.png", "/images/qraft_asaq/3.png", "/images/qraft_asaq/demo.mp4" },
    },
    new
    {
        title = "[QRAFT - UP&DOWN] Tick Trading to futures option",
        description = "A high-speed tick trading platform for futures/options across CME, EUREX, and ICE markets.",
        tech = new[] { "C#, WPF, MySQL" },
        images = new [] { "/images/qraft_und/1.png" },
        details = new[]
        {
            "Optimized for low-latency order entry and rapid position management across multiple exchanges.",
            "Delivered a desktop client focused on speed, reliability, and clarity for retail traders."
        },
        tasks = new[]
        {
            "Project management, architecture design, and core trading client development.",
            "Early-stage startup: handled planning, build, release operations, and marketing as a solo contributor."
        },
        media = new[] { "/images/qraft_und/1.png", "/images/qraft_und/demo.mp4" },
    }
});

//
// 7) Contact ───────────────────────────────────────────────────
//
app.MapGet("/api/contact", () => new
{
    headline = "Get In Touch",
    text = "Have a sweet project in mind or just want to say hi? Feel free to send me a message!", // :contentReference[oaicite:14]{index=14}
    email = "samashe.chang@gmail.com",
    socials = new[] {
        new { label = "Email", url = "mailto:samashe.chang@gmail.com" },
        new { label = "LinkedIn", url = "https://www.linkedin.com/in/samashe/" },
        new { label = "GitHub", url = "https://github.com/DobbyLikesCoding" },
    }
});

// SPA fallback
app.MapFallbackToFile("index.html");

app.Run();
