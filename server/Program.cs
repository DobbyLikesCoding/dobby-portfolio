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
    name = "Sunghyun 'Sam' Chang",
    title = "Senior Software Engineer",
    lead = "Specialized in AI Integration and System Architecture", // :contentReference[oaicite:3]{index=3}
});

//
// 2) About ─────────────────────────────────────────────────────
//
app.MapGet("/api/about", () => new
{
    headline = "Hey, I'm Sunghyun",
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
        title = "",
        body = ""
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
        "", "",
    }, // :contentReference[oaicite:10]{index=10}
    design = new[] {
        ""
    }, // :contentReference[oaicite:11]{index=11}
    tools = new[] {
        "Git + GitHub", "Command Line"
    }, // :contentReference[oaicite:12]{index=12}
    knowledge = new[] {
        ""
    } // :contentReference[oaicite:13]{index=13}
});

//
// 5) Experience ─────────────────────────────────────────────────
//
app.MapGet("/api/experience", () => new[]
{
    new {
        organization = "",
        role = "",
        period = "",
        description = "",
        link = ""
    },
});

//
// 6) Portfolio (Some of My Work) ───────────────────────────────
//
app.MapGet("/api/projects", () => new object[]
{
    new {
        title = "",
        description = "",
        tech = new[] { "React", "Sass" },
        demo = "https://github.com",
        code = "https://github.com"
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