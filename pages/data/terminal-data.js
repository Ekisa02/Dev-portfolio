// Enhanced terminal data with proper organization
const terminalData = {
  commands: {
    help: {
      description: "Show available commands",
      execute: () => {
        return `
                <div class="cmd-output">
                    <p>Available commands:</p>
                    <div class="cmd-item">
                        <div class="cmd-title">about</div>
                        <div class="cmd-desc">Learn about Ekisa Joseph</div>
                    </div>
                    <div class="cmd-item">
                        <div class="cmd-title">projects</div>
                        <div class="cmd-desc">View featured projects</div>
                    </div>
                    <div class="cmd-item">
                        <div class="cmd-title">experience</div>
                        <div class="cmd-desc">View professional experience</div>
                    </div>
                    <div class="cmd-item">
                        <div class="cmd-title">achievements</div>
                        <div class="cmd-desc">View awards and certifications</div>
                    </div>
                    <div class="cmd-item">
                        <div class="cmd-title">architecture</div>
                        <div class="cmd-desc">View system architecture expertise</div>
                    </div>
                    <div class="cmd-item">
                        <div class="cmd-title">skills</div>
                        <div class="cmd-desc">View technical skills</div>
                    </div>
                    <div class="cmd-item">
                        <div class="cmd-title">contact</div>
                        <div class="cmd-desc">Get contact information</div>
                    </div>
                    <div class="cmd-item">
                        <div class="cmd-title">clear</div>
                        <div class="cmd-desc">Clear the terminal</div>
                    </div>
                </div>
                `;
      },
    },
    about: {
      description: "Learn about Ekisa Joseph",
      execute: () => {
        return `
                <div class="cmd-output">
                    <p style="color: var(--terminal-green); font-weight: bold;">Ekisa Joseph Opurong'o</p>
                    <p style="color: var(--terminal-blue);">Software Engineer & Mobile Developer</p>
                    <p>Building reliable digital systems for organizations, businesses, and startups.</p>
                    <p>Specializing in mobile development, AI integrations, and socially impactful applications.</p>
                    <p>Google Play Console Developer: EkisaTech</p>
                    <br>
                    <p><strong>Focus Areas:</strong></p>
                    <ul>
                        <li>Mobile Application Development</li>
                        <li>AI & Machine Learning Integration</li>
                        <li>Scalable System Architecture</li>
                        <li>Social Impact Technology</li>
                        <li>Reverse Engineering</li>
                    </ul>
                </div>
                `;
      },
    },
    projects: {
      description: "View featured projects",
      execute: () => {
        return `
                <div class="cmd-output">
                    <p style="color: var(--terminal-green); font-weight: bold;">Featured Projects</p>
                    ${terminalData.projects
                      .map(
                        (project) => `
                        <div class="cmd-item">
                            <div class="cmd-title">${project.title}</div>
                            <div class="cmd-desc">${project.description}</div>
                            <div style="color: var(--terminal-blue); margin-top: 5px;">
                                <strong>Technologies:</strong> ${project.technologies.join(
                                  ", "
                                )}
                            </div>
                            <div style="color: var(--terminal-yellow);">
                                <strong>Status:</strong> ${project.status}
                            </div>
                        </div>
                    `
                      )
                      .join("")}
                    <p>Type 'project &lt;name&gt;' for detailed information about a specific project.</p>
                </div>
                `;
      },
    },
    project: {
      description: "Get details about a specific project",
      execute: (args) => {
        if (args.length === 0) {
          return `<div class="cmd-output"><p style="color: var(--terminal-red);">Please specify a project name. Type 'projects' to see available projects.</p></div>`;
        }

        const projectName = args.join(" ").toLowerCase();
        const project = terminalData.projects.find(
          (p) =>
            p.title.toLowerCase().includes(projectName) ||
            p.keywords.some((kw) => kw.toLowerCase().includes(projectName))
        );

        if (project) {
          return `
                    <div class="cmd-output">
                        <div class="project-details">
                            <h3 style="color: var(--terminal-green);">${
                              project.title
                            }</h3>
                            <p><strong style="color: var(--terminal-blue);">Role:</strong> ${
                              project.role
                            }</p>
                            <p><strong style="color: var(--terminal-blue);">Status:</strong> ${
                              project.status
                            }</p>
                            <p><strong style="color: var(--terminal-blue);">Description:</strong> ${
                              project.detailedDescription
                            }</p>
                            <p><strong style="color: var(--terminal-blue);">Technologies:</strong> ${project.technologies.join(
                              ", "
                            )}</p>
                            <p><strong style="color: var(--terminal-blue);">Key Features:</strong></p>
                            <ul>
                                ${project.features
                                  .map((feature) => `<li>${feature}</li>`)
                                  .join("")}
                            </ul>
                            <p><strong style="color: var(--terminal-blue);">Impact:</strong> ${
                              project.impact
                            }</p>
                        </div>
                    </div>
                    `;
        } else {
          return `<div class="cmd-output"><p style="color: var(--terminal-red);">Project '${args.join(
            " "
          )}' not found. Type 'projects' to see available projects.</p></div>`;
        }
      },
    },
    experience: {
      description: "View professional experience",
      execute: () => {
        return `
                <div class="cmd-output">
                    <p style="color: var(--terminal-green); font-weight: bold;">Professional Experience</p>
                    ${terminalData.experience
                      .map(
                        (exp) => `
                        <div class="cmd-item">
                            <div class="cmd-title">${exp.title} - ${
                          exp.company
                        }</div>
                            <div class="cmd-desc" style="color: var(--terminal-yellow);">${
                              exp.period
                            }</div>
                            <div class="cmd-desc">${exp.description}</div>
                            ${
                              exp.achievements
                                ? `
                                <div style="margin-top: 5px;">
                                    <strong style="color: var(--terminal-blue);">Key Achievements:</strong>
                                    <ul>
                                        ${exp.achievements
                                          .map(
                                            (achievement) =>
                                              `<li>${achievement}</li>`
                                          )
                                          .join("")}
                                    </ul>
                                </div>
                            `
                                : ""
                            }
                        </div>
                    `
                      )
                      .join("")}
                </div>
                `;
      },
    },
    achievements: {
      description: "View awards and certifications",
      execute: () => {
        return `
                <div class="cmd-output">
                    <p style="color: var(--terminal-green); font-weight: bold;">Achievements & Certifications</p>
                    ${terminalData.achievements
                      .map(
                        (achievement) => `
                        <div class="cmd-item">
                            <div class="cmd-title">${achievement.title}</div>
                            <div class="cmd-desc" style="color: var(--terminal-yellow);">${achievement.date}</div>
                            <div class="cmd-desc">${achievement.organization}</div>
                            <div class="cmd-desc">${achievement.description}</div>
                        </div>
                    `
                      )
                      .join("")}
                </div>
                `;
      },
    },
    architecture: {
      description: "View system architecture expertise",
      execute: () => {
        return `
                <div class="cmd-output">
                    <p style="color: var(--terminal-green); font-weight: bold;">System Architecture Expertise</p>
                    <div class="cmd-item">
                        <div class="cmd-title">Mobile Architecture</div>
                        <div class="cmd-desc">MVVM, Clean Architecture, Component-based design</div>
                    </div>
                    <div class="cmd-item">
                        <div class="cmd-title">Backend Architecture</div>
                        <div class="cmd-desc">Microservices, REST APIs, Event-driven architecture</div>
                    </div>
                    <div class="cmd-item">
                        <div class="cmd-title">AI/ML Integration</div>
                        <div class="cmd-desc">Model serving, Real-time inference, Edge computing</div>
                    </div>
                    <div class="cmd-item">
                        <div class="cmd-title">Cloud Infrastructure</div>
                        <div class="cmd-desc">AWS, Google Cloud, Containerization, CI/CD pipelines</div>
                    </div>
                    <br>
                    <p><strong style="color: var(--terminal-blue);">Architecture Principles:</strong></p>
                    <ul>
                        <li>Scalability and Performance</li>
                        <li>Security and Data Protection</li>
                        <li>Maintainability and Code Quality</li>
                        <li>User Experience Focus</li>
                        <li>Cost Optimization</li>
                    </ul>
                </div>
                `;
      },
    },
    skills: {
      description: "View technical skills",
      execute: () => {
        return `
                <div class="cmd-output">
                    <p style="color: var(--terminal-green); font-weight: bold;">Technical Skills</p>
                    ${Object.entries(terminalData.skills)
                      .map(
                        ([category, skills]) => `
                        <div class="cmd-item">
                            <div class="cmd-title">${category}</div>
                            <div class="cmd-desc">${skills.join(", ")}</div>
                        </div>
                    `
                      )
                      .join("")}
                </div>
                `;
      },
    },
    contact: {
      description: "Get contact information",
      execute: () => {
        return `
                <div class="cmd-output">
                    <p style="color: var(--terminal-green); font-weight: bold;">Contact Information</p>
                    <div class="contact-info-terminal">
                     <div class="contact-item-terminal">
                            <div class="contact-icon-terminal"><i class="fas fa-phone"></i></div>
                            <div>+254741187375</div>
                        </div>
                        <div class="contact-item-terminal">
                            <div class="contact-icon-terminal"><i class="fas fa-envelope"></i></div>
                            <div>josephekisaopurongo.com</div>
                        </div>
                        <div class="contact-item-terminal">
                            <div class="contact-icon-terminal"><i class="fab fa-google-play"></i></div>
                            <div>Google Play: EkisaTech</div>
                        </div>
                        <div class="contact-item-terminal">
                            <div class="contact-icon-terminal"><i class="fab fa-github"></i></div>
                            <div>GitHub: github.com/Ekisa02</div>
                        </div>
                        <div class="contact-item-terminal">
                            <div class="contact-icon-terminal"><i class="fas fa-map-marker-alt"></i></div>
                            <div>Based in Kenya</div>
                        </div>
                    </div>
                    <br>
                    <p>Feel free to reach out for collaborations, projects, or just to connect!</p>
                </div>
                `;
      },
    },
    clear: {
      description: "Clear the terminal",
      execute: () => {
        document.getElementById("terminalBody").innerHTML = "";
        return "";
      },
    },
  },

  projects: [
    {
      id: 1,
      title: "WEE Gender Tracker",
      description:
        "Mobile application tracking gender-based activities and policies with real-time community feedback.",
      detailedDescription:
        "A comprehensive mobile solution that tracks gender-based activities and policies across multiple counties. Integrates policy analysis with reporting dashboard for real-time community feedback and engagement.",
      technologies: [
        "Android",
        "Java",
        "Firebase",
        "Google Maps API",
        "REST APIs",
        "Data Visualization",
      ],
      projectLink:
        "https://play.google.com/store/apps/details?id=com.Joseph.WEE_GEnder_Tracker&pcampaignid=web_share",
      githubLink: "https://github.com/Ekisa02",
      status: "Live on Google Play",
      role: "Lead Developer & Architect",
      features: [
        "Real-time policy tracking and analysis",
        "Interactive reporting dashboard",
        "Community feedback integration",
        "Multi-county data synchronization",
        "Offline capability with cloud sync",
      ],
      impact:
        "Empowers communities with real-time gender policy insights and facilitates better policy-making through data-driven feedback.",
      keywords: ["wee", "gender", "tracker", "policy"],
    },
    {
      id: 2,
      title: "AgroShield360° App",
      description:
        "AI-powered mobile application for crop disease detection and farm management.",
      detailedDescription:
        "An innovative mobile application designed to empower smallholder farmers with AI-powered crop disease detection, farm-level data monitoring, and a built-in marketplace for agro-inputs. Promotes climate-smart farming and data-driven agricultural practices.",
      projectLink:
        "https://play.google.com/store/apps/details?id=com.Joseph.agroshieldapp&pcampaignid=web_share",
      githubLink: "https://github.com/Ekisa02",
      technologies: [
        "AI/ML",
        "React Native",
        "Python",
        "TensorFlow",
        "Cloud Computing",
        "Computer Vision",
      ],
      status: "Live on Google Play",
      role: "Founder & Lead Developer",
      features: [
        "AI-powered crop disease detection using computer vision",
        "Real-time farm monitoring and analytics",
        "Integrated marketplace for agricultural inputs",
        "Weather integration and climate advice",
        "Multi-language support for local farmers",
      ],
      impact:
        "Helps smallholder farmers reduce crop losses by up to 40%, improve productivity, and access better market opportunities.",
      keywords: ["agro", "shield", "360", "farm", "agriculture", "ai"],
    },
    {
      id: 3,
      title: "JusticeNet App",
      description:
        "Legal assistance and rights awareness platform for underserved communities.",
      detailedDescription:
        "A civic-tech mobile application providing legal assistance, rights awareness, and access to justice resources for underserved communities. Features include legal document templates, lawyer directory, and rights education modules.",
      projectLink:
        "https://play.google.com/store/apps/details?id=com.Joseph.justicenetapp&pcampaignid=web_share",
      githubLink: "https://github.com/Ekisa02",
      technologies: [
        "Flutter",
        "Node.js",
        "MongoDB",
        "Firebase Auth",
        "Payment Integration",
      ],
      status: "In Development",
      role: "Full Stack Developer",
      features: [
        "Legal document template library",
        "Lawyer and legal aid directory",
        "Rights education and awareness modules",
        "Case tracking and management",
        "Secure messaging platform",
      ],
      impact:
        "Increases access to legal resources and rights awareness for communities with limited legal support.",
      keywords: ["justice", "net", "legal", "rights"],
    },
  ],

  experience: [
    {
      id: 1,
      title: "Lead Mobile Developer",
      company: "EkisaTech",
      period: "2022 - Present",
      description:
        "Leading development of mobile applications focused on social impact and innovation.",
      achievements: [
        "Published 10+ applications on Google Play Store",
        "Developed AI-integrated solutions for agriculture and healthcare",
        "Mentored junior developers in mobile development best practices",
        "Implemented scalable architecture for multi-platform applications",
      ],
    },
    {
      id: 2,
      title: "Mobile App Development Trainer",
      company: "KNUTCOM/UNESCO Program",
      period: "2023",
      description:
        "Conducted mobile application development training sessions for students and professionals.",
      achievements: [
        "Trained 50+ participants in Android development",
        "Developed comprehensive curriculum for mobile development",
        "Mentored participants in building real-world applications",
      ],
    },
  ],

  "achievements": [


    {
      "id": 1,
      "title": "Mobile App Development Program Completion",
      "organization": "KNUTCOM/UNESCO",
      "date": "2023",
      "description": "Completed intensive mobile application development program with focus on social impact solutions.",
      "icon": "graduation-cap",
      "certificateId": "MAD-2023-012",
      "certificateImage": "/docs/files/unesco.jpeg"
    },
     {
      "id": 2,
      "title": "3rd Place - Hult Prize On-Campus",
      "organization": "Hult Prize - University of Eldoret",
      "date": "February 26, 2025",
      "description": "Achieved third-best position for the innovation 'MTICARBO' in the 2024-2025 Hult Prize On-Campus Program.",
      "icon": "medal",
      "certificateId": null,
      "certificateImage": "docs/files/Hultprize.jpeg"
    },

    {
      "id": 3,
      "title": "Youth Innovative Technologies Training",
      "organization": "Moi University, KNATCOM & UNESCO",
      "date": "Jan 29 - Feb 16, 2024",
      "description": "Participated in a three-week training competition on enhancing the capacity of youth on innovative technologies.",
      "icon": "graduation-cap",
      "certificateId": null,
      "certificateImage": "docs/files/unesco.jpeg"
    },
    {
      "id": 4,
      "title": "Research to Commercialization Training",
      "organization": "University of Eldoret",
      "date": "October 14-15, 2024",
      "description": "Participated in training focused on Design Thinking, Business Model Canvas, Intellectual Property Rights, and Pitching.",
      "icon": "file-graduation-cap",
      "certificateId": null,
      "certificateImage": "docs/files/R&C.jpeg"
    },
     {
      "id": 5,
      "title": "National World Skills Kenya Representative",
      "organization": "University of Eldoret",
      "date": "2024",
      "description": "Represented University of Eldoret at national competition showcasing mobile development skills and innovations.",
      "icon": "trophy",
      "certificateId": "WSK-2024-001",
      "certificateImage": "docs/files/world-skills-certificate.jpg"
    },
     {
      "id": 6,
      "title": "Innovation Challenge Participant (Mticarbo)",
      "organization": "University of Eldoret",
      "date": "October 16-18, 2024",
      "description": "Presented the 'Mticarbo' innovation in the 2nd Innovation Challenge on Digital Innovations for Social Sustainability during the 6th Annual Innovation Week.",
      "icon": "graduation-cap",
      "certificateId": null,
      "certificateImage": "docs/files/2ndUOEchallenge.jpeg"
    },
    {
      "id": 7,
      "title": "Certificate of Completion - Python",
      "organization": "Kaggle",
      "date": "September 28, 2025",
      "description": "Successfully completed the 'Python' course on Kaggle, covering core programming concepts.",
      "icon": "laptop-code",
      "certificateId": null,
      "certificateImage": "docs/files/Python.png"
    },
    {
      "id": 8,
      "title": "Certificate of Completion - Intro to Machine Learning",
      "organization": "Kaggle",
      "date": "September 28, 2025",
      "description": "Successfully completed the 'Intro to Machine Learning' course on Kaggle.",
      "icon": "brain",
      "certificateId": null,
      "certificateImage": "docs/files/intro-to-ML.png"
    },{
      "id": 9,
      "title": "Participant – Kenya AI Summit",
      "organization": "Kenya AI Summit & Expo",
      "date": "2025",
      "description": "Participated in the Kenya AI Summit, engaging in workshops, networking sessions, and live demonstrations on the future of artificial intelligence, data science, and machine learning in Kenya.",
      "icon": "graduation-cap",
      "certificateId": null,
      "certificateImage": "docs/files/AIsummit.jpeg"
    },
    {
      "id": 10,
      "title": "Participant – EldoHub TechRun Hackathon (2nd Edition)",
      "organization": "EldoHub / ICT Authority / Moi University",
      "date": "2025",
      "description": "Participated in the TechRun Hackathon where teams developed innovative solutions in AI, cybersecurity, agriculture, and digital transformation. Engaged in mentorship sessions and built a functional prototype presented during the final pitch.",
      "icon": "code",
      "certificateId": null,
      "certificateImage": "docs/files/Techrun.jpeg"
    }
  ],

  skills: {
    "Mobile Development": [
      "Android",
      "React Native",
      "Kotlin",
      "Java",
    ],
    "AI & Machine Learning": [
      "TensorFlow",
      "PyTorch",
      "Computer Vision",
      "Natural Language Processing",
      "ML Models",
    ],
    "Backend Technologies": [
      "Node.js",
      "Python",
      "Firebase",
      "REST APIs",
      "MongoDB",
      "Supabase",
    ],
    "Cloud & DevOps": [
      "AWS",
      "Google Cloud",
      "Docker",
      "CI/CD",
      "Kubernetes",
      "Git",
    ],
    "Tools & Platforms": [
      "Android Studio",
      "VS Code",
      "Figma",
      "Postman",
      "GitHub",
      "Google Play Console",
    ],
    "Architecture & Design": [
      "Clean Architecture",
      "Microservices",
      "API Design",
      "System Design",
    ],
  },
};

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = terminalData;
}
