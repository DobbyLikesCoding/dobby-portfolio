var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseHsts();
}

app.Use(async (context, next) =>
{
    context.Response.Headers["Content-Security-Policy"] =
        "default-src 'self'; " +
        "base-uri 'self'; " +
        "object-src 'none'; " +
        "frame-ancestors 'none'; " +
        "script-src 'self'; " +
        "style-src 'self' 'unsafe-inline'; " +
        "img-src 'self' data: https:; " +
        "font-src 'self' data:; " +
        "connect-src 'self'; " +
        "media-src 'self' https: blob:; " +
        "form-action 'self' mailto:;";
    context.Response.Headers["Referrer-Policy"] = "strict-origin-when-cross-origin";
    context.Response.Headers["X-Content-Type-Options"] = "nosniff";
    context.Response.Headers["X-Frame-Options"] = "DENY";
    context.Response.Headers["Permissions-Policy"] =
        "accelerometer=(), autoplay=(), camera=(), display-capture=(), geolocation=(), gyroscope=(), microphone=(), payment=(), usb=()";
    context.Response.Headers["Cross-Origin-Opener-Policy"] = "same-origin";
    context.Response.Headers["Cross-Origin-Resource-Policy"] = "same-origin";

    await next();
});

app.UseDefaultFiles();
app.UseStaticFiles();

//
// 1) Intro (/api/intro)  ─────────────────────────────────────────────
//
app.MapGet("/api/intro", () => new
{
    name = "Sunghyun Chang",
    title = "Senior Software & Systems Engineer",
    lead = "Systems thinking. Practical automation. Real-world impact.",
    tags = new[] { "System Architecture", "Automation", "Distributed Systems", "Data Systems" }
});

//
// 2) About ─────────────────────────────────────────────────────
//
app.MapGet("/api/about", () => new
{
    headline = "I see the whole system, find the root cause, and turn recurring problems into automation.",
    body = new[]
    {
        "With 13+ years of experience, I solve complex engineering problems by connecting people, processes, data, and technology — then turning what I learn into practical solutions.",
        "I connect people, processes, data, and technology to understand how a system really works. Working across different industries has taught me to look beyond individual components and see the bigger picture.",
        "I start by understanding the real need, then use data and system-level analysis to find the root cause. When a problem repeats, I look for a way to automate, simplify, or redesign it instead of solving the same problem again."
    }
});

//
// 3) What I Do (Services) ──────────────────────────────────────
//
app.MapGet("/api/services", () => new[]
{
    new {
        title = "SYSTEMS THINKING",
        body = "I connect people, processes, data, software, and infrastructure to understand how the whole system works before deciding what to change."
    },
    new
    {
        title = "AUTOMATION & OPTIMIZATION",
        body = "I identify repetitive work and operational friction, then use software and data to simplify processes, automate what can be automated, and make systems easier to operate."
    },
    new
    {
        title = "ROOT CAUSE & PREVENTION",
        body = "I use data and system-level analysis to separate symptoms from root causes. Instead of repeatedly reacting to problems, I look for ways to prevent them or detect them earlier."
    },
    new
    {
        title = "ARCHITECTURE & EXECUTION",
        body = "I turn solutions into production systems with the full lifecycle in mind — from architecture and interfaces to deployment, monitoring, and operations."
    }
});

//
// 4) Skills ─────────────────────────────────────────────────────
//
app.MapGet("/api/skills", () => new
{
    development = new[] {
        "C#", ".NET Core", ".NET Framework", "Python", "TypeScript", "React", "WPF", "WinForms", "C++"
    },
    platformTools = new[] {
        "Docker", "Kubernetes", "AWS", "Jenkins", "Git / GitHub", "Linux", "Windows", "Grafana", "Prometheus", "JIRA"
    },
    systemsData = new[] {
        "System Architecture", "Distributed Systems", "TCP/IP", "REST API", "Kafka / Pulsar", "Redis", "MySQL", "FIX Protocol", "Real-Time Data Systems"
    },
    engineeringPractice = new[] {
        "Automation", "System Design", "Data Analysis", "Root Cause Analysis", "Reliability", "Observability", "CI/CD", "Cross-functional Collaboration", "Mentorship", "Technical Leadership"
    },
});

//
// 5) Experience ─────────────────────────────────────────────────
//
app.MapGet("/api/experience", () => new object[]
{
    new {
    type = "Education",
    organization = "HANSEO University, South Korea",
    role = "B.E., Aerospace Software Engineering",
    period = "Feb 2006",
    description = "Enrolled in an interdisciplinary curriculum combining aerospace engineering and computer science, focusing on software development for aviation systems.",
    journeyVariant = "major",
    journeyLabel = "Foundation",
    journeySide = "left",
    showStoryLink = false,
    highlightText = "The beginning of my formal journey into engineering, software, and structured problem solving.",
    storyBlocks = new object[]
    {
        new { type = "heading", text = "Where It Started" },
        new { type = "paragraph", text = "Entering Hanseo University marked the start of a more serious commitment to engineering. I was drawn to the structure of aerospace systems, but I also found myself increasingly interested in software and logic." },
        new { type = "paragraph", text = "That combination shaped the way I learned. I did not see software as separate from engineering. I saw it as one of the most practical ways to make complex systems understandable and useful." },
        new { type = "divider" },
        new { type = "heading", text = "Early Curiosity" },
        new { type = "paragraph", text = "Those years gave me room to build technical fundamentals while also discovering what kind of work felt meaningful to me. Over time, my curiosity kept pulling me closer to software development." },
        new { type = "paragraph", text = "Looking back, this was the quiet beginning of a long path that would eventually lead me into system design, architecture, and production engineering." }
    }
    },

    new {
    type = "Service",
    organization = "Republic of Korea Army",
    role = "Wireless Communications Specialist (Sergeant, Honorable Discharge)",
    period = "Apr 2007 – Mar 2009",
    description = "Served on active duty as a wireless communications specialist, developing a strong sense of discipline and responsibility within a structured organization, while strengthening collaboration and problem-solving skills through team-based missions.",
    journeyVariant = "milestone",
    journeySide = "right",
    journeySummary = "Built discipline and collaborative problem-solving under operational constraints."
    },

    new {
    type = "Professional",
    organization = "MBC (Munhwa Broadcasting Corporation), South Korea",
    role = "Broadcast Technician",
    period = "May 2009 – May 2011",
    description = "Maintained broadcast and studio equipment and supported editorial room operations, ensuring stable on-air broadcasting and technical reliability.",
    journeyVariant = "milestone",
    journeySide = "left",
    journeySummary = "Learned operational reliability in live broadcast environments."
    },

    new {
    type = "Personal",
    organization = "Camino de Santiago, Europe",
    role = "Solo Pilgrimage",
    period = "Jun 2011 – Aug 2011",
    highlightText = "What started as a simple trip became the turning point that shaped the path of my life.",
    description = "Completed a 1,000 km solo pilgrimage along the Camino de Santiago, starting in St-Jean-Pied-de-Port, France, and continuing beyond Santiago de Compostela toward Portugal. What started as a simple travel plan eventually became a turning point that shaped my mindset, resilience, and long-term direction in life.",
    journeyVariant = "major",
    journeyLabel = "Turning Point",
    journeySide = "right",
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
                new { src = "/images/camino/13.jpg", alt = "Prepare" }
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
        new { type = "image", src = "/images/camino/27.jpg", alt = "" },
        new
        {
            type = "imageRow",
            images = new object[]
            {
                new { src = "/images/camino/21.jpg", alt = "" },
                new { src = "/images/camino/20.jpg", alt = "" },
                new { src = "/images/camino/25.jpg", alt = "" },
                new { src = "/images/camino/23.jpg", alt = "" },
            }
        },
        new { type = "divider" },

        new { type = "heading", text = "Looking Inward" },
        new { type = "paragraph", text = "At first I mostly noticed the landscape — fields, villages, mountains, and endless paths. But gradually my attention shifted inward." },
        new { type = "paragraph", text = "Walking day after day gave me time to reflect on my life and my future." },
        new { type = "paragraph", text = "Many of the worries that once felt overwhelming slowly started to feel smaller." },
        new { type = "paragraph", text = "Somewhere along the way, the Camino stopped feeling like a physical challenge and began to feel like a personal journey." },
        new { type = "image", src = "/images/camino/4.jpg", alt = "" },
        new
        {
            type = "imageRow",
            images = new object[]
            {
                new { src = "/images/camino/7.jpg", alt = "" },
                new { src = "/images/camino/18.jpg", alt = "" },
                new { src = "/images/camino/31.jpg", alt = "" },
                new { src = "/images/camino/30.jpg", alt = "" },
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
        new { type = "image", src = "/images/camino/17.jpg", alt = "" },
        new
        {
            type = "imageRow",
            images = new object[]
            {
                new { src = "/images/camino/2.jpg", alt = "" },
                new { src = "/images/camino/8.jpg", alt = "" },
            }
        }
    }},
    new {
    type = "Education",
    organization = "North-West University, Mafikeng, South Africa",
    role = "Exchange Student, Computer Science and Electronics",
    period = "Feb 2013 – Dec 2013",
    description = "Participated in an international exchange program, studying computer science and electronics while gaining cross-cultural experience in a global academic environment.",
    journeyVariant = "milestone",
    journeySide = "left",
    journeySummary = "Expanded technical perspective through an international academic year.",
    highlightText = "A year abroad widened both my technical perspective and my sense of how big the world could be.",
    storyBlocks = new object[]
    {
        new { type = "heading", text = "Leaving Familiar Ground" },
        new { type = "paragraph", text = "Studying in South Africa was more than an academic exchange for me. It was the first time I fully stepped into a different culture for an extended period and had to build a new daily life from scratch." },
        new { type = "paragraph", text = "That experience stretched me in practical ways: new people, new classroom styles, and a different pace of life. It also expanded how I thought about communication, adaptation, and independence." },
        new { type = "divider" },
        new { type = "heading", text = "Learning Beyond the Classroom" },
        new { type = "paragraph", text = "In class, I focused on computer science and electronics. Outside class, I was learning how to observe, listen, and connect across cultural differences. That combination made the year especially meaningful." },
        new { type = "paragraph", text = "The exchange taught me that technical growth and personal growth often happen together. When your environment changes, your thinking changes too." },
        new { type = "divider" },
        new { type = "heading", text = "What Stayed With Me" },
        new { type = "paragraph", text = "Looking back, that year strengthened my curiosity about the wider world and my confidence in unfamiliar environments. It helped prepare me for later transitions in both career and life." }
    }
    },

    new {
    type = "Education",
    organization = "HANSEO University, South Korea",
    role = "B.E., Aerospace Software Engineering",
    period = "Feb 2015",
    description = "Graduated with a Bachelor of Engineering in Aerospace Software Engineering.",
    journeyVariant = "milestone",
    journeySide = "right",
    highlightText = "This was the point where long-term interest turned into a professional direction.",
    storyBlocks = new object[]
    {
        new { type = "heading", text = "Choosing the Path" },
        new { type = "paragraph", text = "My academic path blended aerospace engineering with software, which suited me well because I was drawn to both structured systems and practical problem solving." },
        new { type = "paragraph", text = "Over time, I realized I was most energized by the software side: turning logic into something reliable, useful, and maintainable." },
        new { type = "divider" },
        new { type = "heading", text = "Building the Foundation" },
        new { type = "paragraph", text = "University gave me the technical base that would shape my career: programming fundamentals, engineering discipline, and the habit of thinking carefully about how systems behave under constraints." },
        new { type = "paragraph", text = "It was also where I began to understand that good engineering is not only about making something work once, but making it understandable, repeatable, and dependable." },
        new { type = "divider" },
        new { type = "heading", text = "A Quiet Turning Point" },
        new { type = "paragraph", text = "Graduation did not feel like a dramatic finish. It felt more like the moment when my direction became clear: I wanted to build software systems professionally and keep growing through real-world challenges." }
    }
    },

    new {
    type = "Professional",
    organization = "Pixoneer Geomatics",
    role = "Software Engineer",
    period = "Oct 2014 – Jun 2016",
    description = "Worked on aerospace and defense projects, including a helicopter condition monitoring system, gaining hands-on experience across the full software development life cycle from requirements analysis to deployment.",
    journeyVariant = "major",
    journeyLabel = "First Production Systems",
    journeySide = "left"
    },

    new {
    type = "Professional",
    organization = "QRAFT Technologies",
    role = "AXE Team Leader & Senior Software Development Engineer",
    period = "Nov 2016 – Nov 2023",
    description = "Led the AXE team and operated a real-time automated order execution system based on reinforcement learning, ensuring stable, low-latency trading operations for large institutional clients.",
    journeyVariant = "major",
    journeyLabel = "System Ownership",
    journeySide = "right",
    highlightText = "This was the chapter where software engineering, system ownership, and leadership all came together.",
    storyBlocks = new object[]
    {
        new { type = "heading", text = "From Engineer to System Owner" },
        new { type = "paragraph", text = "QRAFT was one of the most defining chapters of my career. I was not only writing software, but helping lead a system that had to operate reliably in real time under financial and operational pressure." },
        new { type = "paragraph", text = "That changed how I approached engineering. Performance, observability, resilience, and clarity stopped being nice-to-haves and became daily necessities." },
        new { type = "divider" },
        new { type = "heading", text = "Leading the AXE Team" },
        new { type = "paragraph", text = "As AXE Team Leader, I worked at the intersection of business requirements, algorithmic ideas, and production reality. My role involved turning complex needs into systems that could be trusted by internal teams and institutional clients." },
        new { type = "paragraph", text = "Much of the work was about making high-stakes systems stable: improving execution flows, reducing latency, maintaining operational confidence, and helping the team move with consistency." },
        new { type = "divider" },
        new { type = "heading", text = "What I Learned" },
        new { type = "paragraph", text = "That experience deepened my belief that strong software systems come from strong structure. Clear interfaces, measured tradeoffs, and disciplined operations matter just as much as technical ambition." },
        new { type = "paragraph", text = "It also strengthened my leadership style. I learned how to support people while keeping quality high, how to stay calm during production issues, and how to create momentum in technically complex work." }
    }
    },
    new
    {
        type = "Transition",
        organization = "Relocation",
        period = "Dec 2023 - Apr 2024",
        description = "A new beginning: I’ve made the big move to the United States and am ready for what lies ahead.",
        journeyVariant = "milestone",
        journeySide = "left",
        journeySummary = "A transition into the next chapter in the United States."
    },
    new {
    type = "Professional",
    organization = "LG Energy Solution Michigan",
    role = "Senior Smart Factory Engineer",
    period = "May 2024 – Present",
    description = "Operated and managed smart factory product traceability systems for EV and ESS battery manufacturing, ensuring stable production by supporting roll map and cell tracking systems across electrode and assembly processes.",
    journeyVariant = "major",
    journeyLabel = "Smart Manufacturing",
    journeySide = "left",
    isCurrent = true,
    highlightText = "A new country, a new industry, and another chance to build systems that matter in the real world.",
    storyBlocks = new object[]
    {
        new { type = "heading", text = "Starting Over in a New Environment" },
        new { type = "paragraph", text = "Joining LG Energy Solution Michigan marked another major transition in my life. I had recently relocated to the United States, and this role became the starting point of my next professional chapter." },
        new { type = "paragraph", text = "It also introduced me to a new domain: battery manufacturing and smart factory operations. I had to learn quickly, understand production-critical workflows, and contribute without losing sight of reliability." },
        new { type = "divider" },
        new { type = "heading", text = "Software Inside Manufacturing" },
        new { type = "paragraph", text = "What I found compelling was how directly software affected physical operations. Traceability systems, roll maps, and cell tracking are not abstract tools. They support production continuity, quality, and accountability on the factory floor." },
        new { type = "paragraph", text = "That made the work tangible. The systems had to be dependable because real operational decisions relied on them every day." },
        new { type = "divider" },
        new { type = "heading", text = "Looking Forward" },
        new { type = "paragraph", text = "This role continues to sharpen my ability to adapt across industries while staying grounded in the same engineering values: structure, stability, and practical impact. It feels less like a reset and more like an expansion of everything I have learned so far." }
    }
    }
});

//
// 6) Portfolio (Some of My Work) ───────────────────────────────
//
app.MapGet("/api/projects", () => new object[]
{
    new {
        company = "QRAFT",
        product = "AXE",
        title = "AI Execution Engine",
        category = "AI Execution",
        description = "A real-time automated order execution platform that connected reinforcement learning research with institutional trading operations.",
        outcome = "Outcome: built and operated a production AI execution platform trusted for low-latency institutional trading.",
        proofPoints = new[] { new { value = "LIVE", label = "Institutional execution" }, new { value = "PRODUCTION", label = "AI model to order flow" } },
        challenge = "Institutional trading required an execution system that could react to changing market conditions in real time while remaining observable, safe, and operationally stable.",
        whatIBuilt = new[]
        {
            "Designed and operated a low-latency execution platform that connected research models, trading infrastructure, and broker-facing order flows.",
            "Built OMS integration middleware for protocol translation, validation, and routing across multiple broker OMS environments.",
            "Implemented observability, CI/CD scenario tests, reporting, and backup automation to support safe day-to-day operation."
        },
        result = new[]
        {
            "Supported production-grade institutional execution with strong emphasis on reliability, rollout safety, and operational confidence.",
            "Enabled the team to ship and operate AI-driven execution logic in a live environment rather than keeping it as a research-only system."
        },
        lesson = "High-performance systems succeed when architecture, operations, and team communication are all treated as part of the product.",
        launched = "Aug 2019",
        age = "6Y",
        tech = new[] { "Python", ".NET Core", "Rust", "MySQL", "Redis", "AWS", "Docker", "Apache Pulsar", "WPF", "FIX Protocol", "TCP/IP", "Jenkins", "Kubernetes" },
        images = new [] { "/images/qraft_axe/6.png" },
        web = "https://www.qraftec.com/market-intelligence-execution",
        media = new[] { "/images/qraft_axe/1.png", "/images/qraft_axe/2.png", "/images/qraft_axe/3.png", "/images/qraft_axe/4.png", "/images/qraft_axe/5.png" },
    },
    new
    {
        company = "QRAFT",
        product = "ASAQ",
        title = "Real-Time Supply & Demand Analytics",
        category = "Retail Analytics",
        launched = "Apr 2018",
        discontinued = "Jul 2019",
        age = "1Y 4M",
        description = "A real-time supply/demand analytics service for Korean equities, built to surface actionable signals for retail investors.",
        outcome = "Outcome: reached 1,000+ active customers and proved reusable strategy logic later applied to AXE live testing.",
        proofPoints = new[] { new { value = "1,000+", label = "Active customers" }, new { value = "500+", label = "Play Store downloads" } },
        challenge = "Retail investors needed signals they could understand quickly, but the underlying market data was noisy, fast-moving, and difficult to turn into clear product value.",
        whatIBuilt = new[]
        {
            "Built the product end to end, covering ideation, architecture, data analysis, backend development, operations, and marketing.",
            "Developed a real-time analytics engine and SignalR streaming pipeline for thousands of Korean equities.",
            "Shipped both a Windows client and Android app with consistent, low-latency updates."
        },
        result = new[]
        {
            "Reached 500+ Play Store downloads and 1,000+ active customers.",
            "The project’s core selection logic was later reused in AXE live operational testing."
        },
        lesson = "Technical quality matters, but adoption, monetization, and sustainable distribution matter just as much in deciding whether a product truly succeeds.",
        tech = new[] { "ASP.NET Core", "WPF", "Xamarin", "MySQL", "SignalR" },
        images = new [] { "/images/qraft_asaq/1.png" },
        media = new[] { "/images/qraft_asaq/1.png", "/images/qraft_asaq/2.png", "/images/qraft_asaq/3.png", "/images/qraft_asaq/demo.mp4" },
    },
    new
    {
        company = "QRAFT",
        product = "UP&DOWN",
        title = "Futures & Options Trading Platform",
        category = "Trading Product",
        description = "A high-speed tick trading platform for futures and options across CME, EUREX, and ICE markets.",
        outcome = "Outcome: shipped a fast multi-exchange trading client and gained product lessons around adoption, regulation, and market fit.",
        proofPoints = new[] { new { value = "3", label = "Global exchanges" }, new { value = "END-TO-END", label = "Product ownership" } },
        challenge = "The goal was to deliver a fast and intuitive trading experience across multiple global exchanges while keeping the product understandable and operationally dependable.",
        whatIBuilt = new[]
        {
            "Led project management, architecture design, and core trading client development.",
            "Built a desktop trading client optimized for low-latency order entry and rapid position management.",
            "Handled planning, build, release operations, and marketing as a solo contributor in an early-stage environment."
        },
        result = new[]
        {
            "Delivered a working multi-exchange trading product with strong emphasis on responsiveness and user clarity.",
            "Exposed important business constraints around positioning, regulatory perception, and enterprise adoption."
        },
        lesson = "A polished product still needs the right market framing. UX, industry expectations, and business fit have to align together.",
        launched = "Feb 2017",
        discontinued = "Mar 2018",
        age = "1Y 1M",
        tech = new[] { "C#", ".NET Framework", "WPF", "MySQL"},
        images = new [] { "/images/qraft_und/1.png" },
        media = new[] { "/images/qraft_und/1.png", "/images/qraft_und/demo.mp4" },
    }
});

//
// 7) Contact ───────────────────────────────────────────────────
//
app.MapGet("/api/contact", () => new
{
    headline = "Let’s build systems that make complex work simpler.",
    text = "I'm always interested in meaningful engineering problems—especially where systems, automation, and real-world operations come together.",
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
