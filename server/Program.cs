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
        "As an AI Integration Engineer and architecture-minded problem solver, I specialize in designing scalable systems that translate business requirements into technical models, seamlessly connecting AI capabilities with real-world applications.", // :contentReference[oaicite:4]{index=4}
        "With over 11 years of experience in software engineering, I focus on solving complex challenges through clear structure, thoughtful design, and a deep understanding of how systems work. I combine architectural insight with practical engineering to design scalable solutions that turn business requirements into solid technical models, integrating AI capabilities to create real-world value. My background in C# and software architecture helps me build reliable, efficient systems that improve performance and maintainability.",
        "I’m driven by the challenge of transforming abstract ideas into tangible results—bridging design, technology, and meaningful impact.", // :contentReference[oaicite:5]{index=5}
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
app.MapGet("/api/experience", () => new object[]
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
    highlightText = "What started as a simple trip became the turning point that shaped the path of my life.",
    description = "Completed a 1,000 km solo pilgrimage along the Camino de Santiago, starting in St-Jean-Pied-de-Port, France, and continuing beyond Santiago de Compostela toward Portugal. What started as a simple travel plan eventually became a turning point that shaped my mindset, resilience, and long-term direction in life.",
    storyBlocks = new object[]
    {
        new { type = "heading", text = "The Beginning" },
        new { type = "paragraph", text = "The journey began with a simple goal: I wanted to travel through Europe for a longer period on a limited budget." },
        new { type = "paragraph", text = "While researching affordable ways to travel alone, I discovered the Camino de Santiago. The idea of walking across countries with only a backpack felt both intimidating and exciting." },
        new { type = "paragraph", text = "At the time, it was also my first time traveling abroad alone. I could barely speak English, and since the journey would take place in Spain, I spent about two months learning basic Spanish so I could manage simple conversations along the way." },
        new { type = "paragraph", text = "Before leaving, I prepared as much as I could: researching the route, estimating costs, and deciding what to pack for the pilgrimage." },
        new
        {
            type = "imageRow",
            images = new object[]
            {
                new { src = "/images/camino/route.jpg", alt =  "Camino route map" },
                new { src = "/images/camino/13.jpg", alt = "Backpack" }
            }
        },
        new { type = "divider" },

        new { type = "heading", text = "The Journey" },
        new { type = "paragraph", text = "The journey did not begin smoothly. My flight was delayed, and I arrived in France much later than expected. Late at night, in an unfamiliar country, I had to find a place to stay before heading to Saint-Jean-Pied-de-Port, the starting point of the pilgrimage." },
        new { type = "paragraph", text = "Standing there alone, tired and uncertain, I remember feeling overwhelmed." },
        new { type = "paragraph", text = "Once the walking began, the days quickly became physically demanding." },
        new { type = "paragraph", text = "Most mornings started around 6 a.m., and I would walk 20 to 30 kilometers until midday. Some days were painful — my toenails fell off, and on difficult days my only goal was to reach the next village." },
        new { type = "quote", text = "On the second day, I remember thinking to myself,\n\"Why did I choose to put myself through this?\"" },
        new { type = "paragraph", text = "But the Camino has a unique way of changing your perspective." },
        new { type = "paragraph", text = "Along the trail, I met pilgrims from many different countries. Even though my Spanish was far from perfect, we shared conversations, meals, and stories. Everyone I met had their own reason for walking." },
        new { type = "paragraph", text = "Some were searching for something. Some were recovering from difficult moments in life. Others simply wanted to experience the journey." },
<<<<<<< HEAD
=======
        new { type = "image", src = "/images/camino/27.jpg", alt = "" },
>>>>>>> 1b3412a (layout update)
        new
        {
            type = "imageRow",
            images = new object[]
            {
                new { src = "/images/camino/21.jpg", alt = "" },
<<<<<<< HEAD
                new { src = "/images/camino/27.jpg", alt = "" },
                new { src = "/images/camino/20.jpg", alt = "" },
                new { src = "/images/camino/25.jpg", alt = "" },
                new { src = "/images/camino/23.jpg", alt = "" },                
                new { src = "/images/camino/11.jpg", alt = "" },
=======
                new { src = "/images/camino/20.jpg", alt = "" },
                new { src = "/images/camino/25.jpg", alt = "" },
                new { src = "/images/camino/23.jpg", alt = "" },
>>>>>>> 1b3412a (layout update)
            }
        },
        new { type = "divider" },

        new { type = "heading", text = "Looking Inward" },
        new { type = "paragraph", text = "At first I mostly noticed the landscape — fields, villages, mountains, and endless paths. But gradually my attention shifted inward." },
        new { type = "paragraph", text = "Walking day after day gave me time to reflect on my life and my future." },
        new { type = "paragraph", text = "Many of the worries that once felt overwhelming slowly started to feel smaller." },
        new { type = "paragraph", text = "Somewhere along the way, the Camino stopped feeling like a physical challenge and began to feel like a personal journey." },
        new
        {
            type = "imageRow",
            images = new object[]
            {
                new { src = "/images/camino/7.jpg", alt = "" },
                new { src = "/images/camino/12.jpg", alt = "" },
                new { src = "/images/camino/18.jpg", alt = "" },
                new { src = "/images/camino/19.jpg", alt = "" },
            }
        },
        new { type = "divider" },

        new { type = "heading", text = "Beyond the Destination" },
        new { type = "paragraph", text = "Originally, the goal was to reach Santiago de Compostela." },
        new { type = "paragraph", text = "But when I finally arrived, it didn’t feel like the end of the journey." },
        new { type = "paragraph", text = "Instead, it felt like a new beginning.." },
        new { type = "paragraph", text = "So rather than stopping there, I continued walking toward Portugal." },
        new { type = "image", src = "/images/camino/16.jpg", alt = "Camino destination" },
        new { type = "image", src = "/images/camino/28.jpg", alt = "" },
        new { type = "divider" },

        new { type = "heading", text = "Reflection" },
        new { type = "paragraph", text = "Looking back now, the Camino became a turning point in my life." },
        new { type = "paragraph", text = "It showed me that I was capable of doing things that once felt impossible." },
        new { type = "paragraph", text = "More importantly, it gave me the confidence to start asking what I truly wanted to do with my life." },
        new { type = "paragraph", text = "In many ways, that journey helped shape the person I am today." },
        new
        {
            type = "imageRow",
            images = new object[]
            {
                new { src = "/images/camino/2.jpg", alt = "" },
                new { src = "/images/camino/8.jpg", alt = "" },
            }
        },
        new { type = "image", src = "/images/camino/17.jpg", alt = "" }
    }},
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
    new
    {
        organization = "Relocation",
        period = "Dec 2023 - Apr 2024",
        description = "A new beginning: I’ve made the big move to the United States and am ready for what lies ahead."
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
