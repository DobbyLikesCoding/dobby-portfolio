using Microsoft.OpenApi.Models;
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
        body = "Drawing on my experience at Qraft Technologies, I specialize in designing and optimizing real-time distributed systems that process large volumes of data with minimal latency. Using C#/.NET, I’ve built microservice-based architectures deployed with Docker and Kubernetes, integrating Redis for in-memory performance and Pulsar/Kafka for reliable messaging. Across the software lifecycle—from system design and development to deployment, monitoring, and optimization—I emphasize clarity, observability, and long-term maintainability. My goal is to deliver systems that are fast under pressure, easy to understand, and effortless to evolve."        
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
        "C#", ".NET Core", ".NET Framework", "WPF", "WinForms", "Xamarin",  "React", "C++"
    }, // :contentReference[oaicite:10]{index=10}
    tools = new[] {
        "Git / GitHub", "Docker", "Kubernetes", "AWS", "Jenkins", "JIRA", "Windows", "Linux"
    }, // :contentReference[oaicite:11]{index=11}
    knowledge = new[] {
        "Network", "TCP/IP", "REST API", "Message Queue (Kafka, Pulsar)", "MySQL", "Redis", "CI/CD", "FIX Protocol"
    }, // :contentReference[oaicite:12]{index=12}
    softskill = new[] {
        "Problem Solving", "Software Lifecycle", "Architecture Design", "Microservice", "Teamwork", "Team Building", "Project Planning", "Agile", "Self-Motivated", "Responsibility"
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
        description = "AXE is a real-time automated order execution system based on reinforcement learning models. It aims to minimize market impact and reduce transaction costs when large institutional clients place large stock orders.",
        tech = new[] { "Python", ".NET Core", "Rust", "MySQL", "Redis", "AWS", "Docker", "Apache Pulsar", "WPF", "FIX Protocol", "TCP/IP", "Jenkins", "Kubernetes" },
        images = new [] { "/images/qraft_axe/6.png" },
        web = "https://www.qraftec.com/market-intelligence-execution",
        details = new[] 
        {
            "AXE is agent-based deep reinforcement learning architecture and this model adeptly navigates complex market scenarios, optimizes order execution, and minimizes trading costs. ",
            "By processing extensive tick-level data, including price, volume, order book dynamics, and historical patterns through the reinforcement learning, AXE fine-tunes trading strategies, considering factors such as market impact, liquidity, and risk.",
            "This enables real-time enhance execution efficiency while reducing trading costs."
        },
        tasks = new[]
        {
            "Developed Middleware Endpoint for AXE(AI Execution Engine), the connection for several client Securities Firm Companies’s Order Management Systems (OMS), and converted protocol data between OMS and AXE.",
            "Developed integration scenario test program to CI/CD",
            "Developed monitoring program",
            "Developed daily report/backup program",
            "Developed trading system through OpenAPI of EBEST Investment & securities Co.,Ltd. and connected AXE",
            "Developed strategy and stock selection program",
            "Managed trading system for AXE performance history data"
        },
        media = new[] { "/images/qraft_axe/1.png", "/images/qraft_axe/2.png", "/images/qraft_axe/3.png", "/images/qraft_axe/4.png", "/images/qraft_axe/5.png" },
    },
    new
    {
        title = "[QRAFT - ASAQ] Real-time supply-demand analysis system",
        description = "ASAQ service provides real-time investment information based on the supply and demand of Korean stocks. It analyzes data in real time to help individual retail investors make informed investment decisions effectively.",
        tech = new[] { "ASP.NET Core", "WPF", "Xamarin", "MySQL", "SignalR" },
        images = new [] { "/images/qraft_asaq/1.png" },
        details = new[] 
        { 
            "There are 2,300 stocks on the Korean stock market. In a market that changes every day, each event has so many factors that it is very difficult to analyze.",
            "Furthermore, in a fast-changing market every day, individual investors are bound to lack information compared to institutions and foreign securities.",
            "ASAQ aims to analyze and calculate market big market data and help secure effective investments by determining market conditions based on real-time data provided.",
            "Performace : 500+ downloads in Play Store and over 1000+ customers"
        },
        tasks = new[] 
        { 
            "Project Management, Architecture Design, Data Analysis, Software Development, Operations and Maintenance, Marketing",
            "Development of real-time supply and demand analysis algorithm engine",
            "Development server",
            "Development Windows Client Program",
            "Development Android App"
        },
        media = new[] { "/images/qraft_asaq/1.png", "/images/qraft_asaq/2.png", "/images/qraft_asaq/3.png", "/images/qraft_asaq/demo.mp4" },
    },
    new
    {
        title = "[QRAFT - UP&DOWN] Tick Trading to futures option",
        description = "A trading program developed to enable retail clients to perform scapling trades across a wide range of instruments, including stock indices, currencies, energy, on multiple exchanges such a CEM, EUREX and ICE.",
        tech = new[] { "C#, WPF, MySQL" },
        images = new [] { "/images/qraft_und/1.png" },
        tasks = new[] { "Project Management, Architecture Design, Software Development" },
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