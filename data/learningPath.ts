import { type Module } from '../types';

export const learningPathData: Module[] = [
  {
    id: 1,
    title: "Module 1: SVG Foundations (Scalable Vector Graphics)",
    description: "Understand the structure, basic elements, and coordinate system of SVG.",
    lessons: [
      {
        title: "Introduction to SVG",
        concepts: [
          "What is SVG and why use it?",
          "Structure of an SVG document: `<svg>`, `width`, `height`, `viewBox`.",
          "Embedding SVG in HTML: `<img>`, `<object>`, `<iframe>`, and inline.",
        ],
        example: {
          title: "Creating Your First SVG Icon",
          description: "Set up a basic SVG canvas and draw a simple circle on it.",
          code: `
<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="blue" />
</svg>`,
          visual: '<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" stroke="#94a3b8" stroke-width="3" fill="#3b82f6" /></svg>'
        }
      },
      {
        title: "Basic Shapes and the Coordinate System",
        concepts: [
          "Primitive shapes: `<rect>`, `<circle>`, `<ellipse>`, `<line>`, `<polyline>`, `<polygon>`.",
          "The SVG coordinate system (origin is top-left).",
          "Basic attributes: `x`, `y`, `cx`, `cy`, `r`, `rx`, `ry`, `points`."
        ],
        example: {
          title: "Composing a Simple Scene",
          description: "Create a small illustration (e.g., a simple house) by combining several basic shapes.",
          code: `
<svg width="200" height="200" viewBox="0 0 100 100">
  <!-- House body -->
  <rect x="20" y="50" width="60" height="40" fill="lightblue" />
  <!-- Roof -->
  <polygon points="10,50 90,50 50,20" fill="darkred" />
</svg>`,
          visual: '<svg width="150" height="150" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="50" width="60" height="40" fill="#a5f3fc" /><polygon points="10,50 90,50 50,20" fill="#be123c" /></svg>'
        }
      },
      {
        title: "The Power of <path>",
        concepts: [
          "Syntax of the `d` attribute: `M`, `L`, `H`, `V`, `C`, `S`, `Q`, `T`, `A`, `Z`.",
          "Understanding absolute (uppercase) and relative (lowercase) commands.",
          "Creating complex shapes and Bézier curves."
        ],
        example: {
          title: "Drawing a Wave",
          description: "Use the cubic Bézier curve command (C) to draw a smooth, wavy line.",
          code: `
<svg width="200" height="100" viewBox="0 0 200 100">
  <path d="M 10 50 C 50 10, 100 10, 140 50 S 230 90, 190 50" 
        stroke="cyan" stroke-width="4" fill="transparent" />
</svg>`,
          visual: '<svg width="200" height="100" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg"><path d="M 10 50 C 50 10, 100 10, 140 50 S 230 90, 190 50" stroke="#22d3ee" stroke-width="4" fill="transparent" /></svg>'
        }
      }
    ]
  },
  {
    id: 2,
    title: "Module 2: Animating with Native Methods and CSS",
    description: "Explore declarative animation techniques directly within SVG (SMIL) and via CSS stylesheets.",
    lessons: [
      {
        title: "Native SVG Animation (SMIL)",
        concepts: [
          "Introduction to SMIL (Synchronized Multimedia Integration Language).",
          "Animating attributes with `<animate>`.",
          "Animating transformations with `<animateTransform>` (translate, rotate, scale).",
          "Animating along a path with `<animateMotion>`.",
          "Controlling timing: `begin`, `dur`, `end`, `repeatCount`."
        ],
        example: {
          title: "Creating a Simple Loader",
          description: "Rotate a circle along a circular path using `<animateTransform>`.",
          code: `
<svg width="100" height="100" viewBox="0 0 100 100">
  <circle cx="50" cy="20" r="8" fill="#67e8f9">
    <animateTransform 
      attributeName="transform"
      type="rotate"
      from="0 50 50"
      to="360 50 50"
      dur="2s"
      repeatCount="indefinite" />
  </circle>
</svg>`,
          visual: '<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="20" r="8" fill="#67e8f9"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="2s" repeatCount="indefinite" /></circle></svg>'
        },
        tools: ["SMIL (native)"]
      },
      {
        title: "Animation via CSS Transitions",
        concepts: [
          "Applying `transition`s to SVG properties (`fill`, `stroke`, `opacity`, `transform`).",
          "Triggering transitions with pseudo-classes like `:hover`.",
          "Limitations of CSS transitions on SVG attributes (e.g., `d`, `points`)."
        ],
        example: {
          title: "Interactive SVG Button",
          description: "Change the background color and size of an SVG icon on hover with a smooth transition.",
          code: `
/* CSS */
.interactive-icon {
  transition: transform 0.3s ease, fill 0.3s ease;
}
.interactive-icon:hover {
  transform: scale(1.2);
  fill: #22d3ee;
}

<!-- HTML -->
<svg width="50" height="50" viewBox="0 0 20 20">
  <path class="interactive-icon" fill="#94a3b8" d="M10 18.35L8.55 17.03C3.4 12.36 0 9.28 0 5.5 0 2.42 2.42 0 5.5 0c1.74 0 3.41.81 4.5 2.09C11.09.81 12.76 0 14.5 0 17.58 0 20 2.42 20 5.5c0 3.78-3.4 6.86-8.55 11.54L10 18.35z"/>
</svg>`,
          visual: '<svg width="50" height="50" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><style>.interactive-icon-2-2{transition:transform .3s ease,fill .3s ease}.interactive-icon-2-2:hover{transform:scale(1.2);fill:#22d3ee}</style><path class="interactive-icon-2-2" fill="#94a3b8" d="M10 18.35L8.55 17.03C3.4 12.36 0 9.28 0 5.5 0 2.42 2.42 0 5.5 0c1.74 0 3.41.81 4.5 2.09C11.09.81 12.76 0 14.5 0 17.58 0 20 2.42 20 5.5c0 3.78-3.4 6.86-8.55 11.54L10 18.35z"/></svg>'
        },
        tools: ["CSS Transitions"]
      },
      {
        title: "Animation via CSS Keyframes",
        concepts: [
          "Creating complex animation sequences with `@keyframes`.",
          "Applying looping animations with `animation-iteration-count: infinite`.",
          "Animating `stroke-dasharray` and `stroke-dashoffset` for drawing effects.",
        ],
        example: {
          title: "Signature Self-Drawing Effect",
          description: "Animate the stroke of an SVG path to give the illusion of it being drawn in real-time.",
          code: `
/* CSS */
.signature-path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: draw 3s linear forwards;
}
@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}

<!-- HTML -->
<svg viewBox="0 0 500 100">
  <path class="signature-path" stroke="#22d3ee" stroke-width="4" fill="transparent" d="M 50,80 C 150,0 250,150 450,50" />
</svg>`,
          visual: '<svg viewBox="0 0 500 100" xmlns="http://www.w3.org/2000/svg"><style>.signature-path-2-3{stroke-dasharray:610;stroke-dashoffset:610;animation:draw-2-3 3s linear infinite}@keyframes draw-2-3{to{stroke-dashoffset:0}}</style><path class="signature-path-2-3" d="M 50,80 C 150,0 250,150 450,50" stroke="#22d3ee" stroke-width="4" fill="transparent"/></svg>'
        },
        tools: ["CSS Keyframes"]
      }
    ]
  },
  {
    id: 3,
    title: "Module 3: Animation and Interactivity with JavaScript",
    description: "Take full control of animations and interactions by manipulating SVG via JavaScript.",
    lessons: [
      {
        title: "Manipulating the SVG DOM",
        concepts: [
          "Selecting SVG elements with `querySelector` and `getElementById`.",
          "Modifying attributes with `setAttribute()` and `getAttribute()`.",
          "Creating and appending SVG elements dynamically with `createElementNS()`."
        ],
        example: {
          title: "Dynamic Bar Chart",
          description: "Generate an SVG bar chart from a JavaScript array of data.",
          code: `
const data = [10, 40, 32, 68, 54];
const svg = document.querySelector('#barchart');
data.forEach((value, index) => {
  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttribute('x', index * 25);
  rect.setAttribute('y', 100 - value);
  rect.setAttribute('width', 20);
  rect.setAttribute('height', value);
  rect.setAttribute('fill', 'cyan');
  svg.appendChild(rect);
});`,
          visual: '<svg width="125" height="100" viewBox="0 0 125 100" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="90" width="20" height="10" fill="cyan" /><rect x="25" y="60" width="20" height="40" fill="cyan" /><rect x="50" y="68" width="20" height="32" fill="cyan" /><rect x="75" y="32" width="20" height="68" fill="cyan" /><rect x="100" y="46" width="20" height="54" fill="cyan" /></svg>'
        },
        tools: ["DOM API"]
      },
      {
        title: "Performant Animations with requestAnimationFrame",
        concepts: [
          "Why `requestAnimationFrame` is better than `setTimeout` for animations.",
          "Creating a basic animation loop.",
          "Calculating animation state based on elapsed time for smoothness."
        ],
        example: {
          title: "Bouncing a Ball",
          description: "Animate the `cy` position of a circle to simulate a bouncing ball with simple gravity.",
          code: `
const ball = document.querySelector('#ball');
let y = 10;
let vy = 0;
const gravity = 0.5;

function animate() {
  vy += gravity;
  y += vy;
  if (y > 90) { y = 90; vy *= -0.8; }
  ball.setAttribute('cy', y);
  requestAnimationFrame(animate);
}
animate();`,
          visual: '<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><style>@keyframes bounce-3-2{0%{transform:translateY(0);animation-timing-function:ease-in}40%{transform:translateY(80px);animation-timing-function:ease-out}55%{transform:translateY(45px);animation-timing-function:ease-in}70%{transform:translateY(80px);animation-timing-function:ease-out}80%{transform:translateY(65px);animation-timing-function:ease-in}90%{transform:translateY(80px);animation-timing-function:ease-out}95%{transform:translateY(75px);animation-timing-function:ease-in}100%{transform:translateY(80px);animation-timing-function:ease-out}}.ball-3-2{animation:bounce-3-2 2s infinite}</style><circle class="ball-3-2" cx="50" cy="10" r="10" fill="#67e8f9" /><line x1="0" y1="100" x2="100" y2="100" stroke="#94a3b8" stroke-width="2" /></svg>'
        },
        tools: ["requestAnimationFrame"]
      },
      {
        title: "Interactivity via Events",
        concepts: [
          "Adding event listeners (`click`, `mouseover`, `mouseout`, `mousemove`) to SVG elements.",
          "Getting mouse coordinates within the SVG coordinate system.",
          "Creating animations that react to user actions."
        ],
        example: {
          title: "Cursor Tracking",
          description: "Make an SVG element (e.g., an eye) follow the mouse cursor's movement.",
          code: `
const svg = document.querySelector('svg');
const pupil = document.querySelector('#pupil');
const svgRect = svg.getBoundingClientRect();

svg.addEventListener('mousemove', (e) => {
  const x = e.clientX - svgRect.left;
  const y = e.clientY - svgRect.top;
  // Complex logic to move pupil towards x/y within eye boundary
  // gsap.to(pupil, { x: ..., y: ... });
});`,
          visual: '<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="30" fill="white" stroke="#475569" stroke-width="3" /><g id="pupil-3-3"><circle cx="50" cy="50" r="15" fill="#1e293b" /><circle cx="55" cy="45" r="5" fill="white" fill-opacity="0.7" /></g><animateMotion href="#pupil-3-3" dur="4s" repeatCount="indefinite" path="M0,0 C5,5 10,-5 0,0 C-5,5 -10,-5 0,0 Z" /></svg>'
        }
      },
      {
        title: "Animating Paths (`<path>`) Dynamically",
        concepts: [
          "Interpolating the `d` attribute for shape morphing.",
          "Using `requestAnimationFrame` for custom path transitions.",
          "Introduction to libraries like GSAP (`MorphSVGPlugin`) to simplify path animation."
        ],
        example: {
          title: "Animated Line Chart",
          description: "Animate a path's transition between two data sets to illustrate dynamic data visualization.",
          code: `
const path = document.querySelector('#chart-path');
const dataSet1 = "M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80";
const dataSet2 = "M10 50 C 40 90, 65 90, 95 50 S 150 10, 180 50";

// Conceptual use of GSAP for animation
gsap.to(path, {
  attr: { d: dataSet2 },
  duration: 1.5,
  ease: 'power2.inOut',
  yoyo: true,
  repeat: -1
});`,
          visual: '<svg width="200" height="100" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#34d399" stroke-width="3"><animate attributeName="d" dur="2s" repeatCount="indefinite" values="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80; M10 50 C 40 90, 65 90, 95 50 S 150 10, 180 50; M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80" calcMode="spline" keyTimes="0; 0.5; 1" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" /></path></svg>'
        },
        tools: ["requestAnimationFrame", "GSAP"]
      }
    ]
  },
  {
    id: 4,
    title: "Module 4: Advanced Animation Libraries",
    description: "Use professional JavaScript libraries to simplify and enhance SVG animations.",
    lessons: [
      {
        title: "Introduction to GSAP (GreenSock Animation Platform)",
        concepts: [
          "Why GSAP is the industry standard for web animation.",
          "Basic syntax: `gsap.to()`, `gsap.from()`, `gsap.fromTo()`.",
          "Animating any SVG attribute, including transforms and paths.",
          "Creating complex sequences with `timelines`."
        ],
        example: {
          title: "Animating a Game Intro Icon",
          description: "Create a complex animation sequence for an icon (e.g., a logo) using a GSAP timeline.",
          code: `
const tl = gsap.timeline({ repeat: -1, yoyo: true });
tl.to('#logo-part1', { scale: 1.1, duration: 0.5, ease: 'power1.inOut' })
  .to('#logo-part2', { rotate: 360, duration: 1, ease: 'elastic.out(1, 0.5)' }, '-=0.5');`,
          visual: '<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><style>#logo-part1-4-1{animation:scale-4-1 1s ease-in-out infinite alternate;transform-origin:50% 63%}#logo-part2-4-1{animation:rotate-4-1 1.5s ease-in-out infinite alternate;transform-origin:center}@keyframes scale-4-1{to{transform:scale(1.1)}}@keyframes rotate-4-1{to{transform:rotate(360deg)}}</style><g><path id="logo-part1-4-1" fill="#4ade80" d="M50 10 L90 90 L10 90 Z" /><circle id="logo-part2-4-1" cx="50" cy="63" r="15" fill="#38bdf8" /></g></svg>'
        },
        tools: ["GSAP"]
      },
      {
        title: "Shape Morphing with GSAP MorphSVGPlugin",
        concepts: [
          "The concept of morphing: transforming one SVG path into another.",
          "Using GSAP's MorphSVG plugin for smooth shape transitions.",
          "Tips for successful morphs (similar number of points)."
        ],
        example: {
          title: "Animated Play/Pause Button",
          description: "Smoothly transform the shape of a triangle (Play) into two vertical bars (Pause) on click.",
          code: `
const playPath = "M 10 10 L 40 25 L 10 40 Z";
const pausePath = "M 12 10 H 22 V 40 H 12 Z M 28 10 H 38 V 40 H 28 Z";

gsap.to('#icon-shape', {
  morphSVG: isPlaying ? pausePath : playPath,
  duration: 0.5,
  ease: 'power2.inOut'
});`,
          visual: '<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><path fill="white"><animate attributeName="d" dur="1s" repeatCount="indefinite" calcMode="spline" keyTimes="0; 0.5; 1" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" values="M 10 10 L 40 25 L 10 40 Z; M 12 10 H 22 V 40 H 12 Z M 28 10 H 38 V 40 H 28 Z; M 10 10 L 40 25 L 10 40 Z" /></path></svg>'
        },
        tools: ["GSAP", "MorphSVGPlugin"]
      },
      {
        title: "Other Libraries and Use Cases",
        concepts: [
          "**Snap.svg**: A lightweight library for SVG manipulation and animation, created by the developers of Adobe Illustrator.",
          "**D3.js**: More than an animation library, it's a powerful tool for binding data to the DOM and creating interactive, animated data visualizations.",
          "When to choose which library?"
        ],
        example: {
          title: "Mention of a D3.js Chart",
          description: "Understand how D3.js uses a data-driven approach to create complex and animated charts.",
          code: `
// D3.js concept
d3.select('svg').selectAll('circle')
  .data(myDataset)
  .enter()
  .append('circle')
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .transition()
    .duration(1000)
    .attr('r', d => d.radius);`,
          visual: '<svg width="200" height="100" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg"><style>@keyframes appear-4-3{from{r:0;opacity:0}to{r:var(--r);opacity:1}}.circle-4-3{animation:appear-4-3 .5s ease-out forwards}</style><circle class="circle-4-3" cx="30" cy="50" style="--r:10" fill="#f472b6" /><circle class="circle-4-3" cx="70" cy="30" style="--r:15;animation-delay:.1s" fill="#60a5fa" /><circle class="circle-4-3" cx="120" cy="60" style="--r:8;animation-delay:.2s" fill="#34d399" /><circle class="circle-4-3" cx="160" cy="40" style="--r:12;animation-delay:.3s" fill="#facc15" /></svg>'
        },
        tools: ["Snap.svg", "D3.js"]
      }
    ]
  },
   {
    id: 5,
    title: "Module 5: Optimization and Best Practices",
    description: "Ensure smooth and performant animations on all devices.",
    lessons: [
        {
            title: "Performance Optimization",
            concepts: [
                "Simplifying SVG paths (fewer points = faster).",
                "Using tools like SVGOMG to clean and optimize SVG files.",
                "Animating `transform` and `opacity` primarily, as they are hardware-accelerated by the GPU.",
                "Avoiding animation of expensive properties like `width`, `height`, or complex filters."
            ],
            example: {
                title: "Before/After Optimization",
                description: "Compare the code and performance of a complex SVG before and after running it through an optimizer.",
                code: `
<!-- Before: Lots of decimal places, unnecessary IDs -->
<path id="path4155" style="fill:#d1e2f3" d="M 120.12345,50.54321 C ..."/>

<!-- After: Reduced precision, cleaned attributes -->
<path fill="#d1e2f3" d="M120.12 50.54C..."/>`,
                visual: '<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M20 50 L40 70 L80 30" stroke="#4ade80" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text x="50" y="90" font-size="12" fill="white" text-anchor="middle">Optimized!</text></svg>'
            },
            tools: ["SVGOMG"]
        },
        {
            title: "Accessibility (a11y) and SVG",
            concepts: [
                "Using `<title>` and `<desc>` tags to describe SVG content.",
                "Adding `role=\"img\"` and `aria-labelledby` for screen readers.",
                "Using the `prefers-reduced-motion` media query to disable or reduce animations for sensitive users."
            ],
            example: {
                title: "Making an Icon Accessible",
                description: "Add the necessary metadata to an icon so it can be correctly interpreted by assistive technologies.",
                code: `
<svg role="img" aria-labelledby="iconTitle iconDesc" ...>
  <title id="iconTitle">Close</title>
  <desc id="iconDesc">An X-shaped icon to close the modal.</desc>
  <path d="..."/>
</svg>

/* CSS to reduce motion */
@media (prefers-reduced-motion: reduce) {
  .animated-element {
    animation: none;
    transition: none;
  }
}`,
                visual: '<svg width="80" height="80" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="white"><title>Accessible Icon</title><path d="M12,2A2,2,0,1,0,14,4,2,2,0,0,0,12,2Zm3.5,2.14a4,4,0,1,1-4.08,4.08A4,4,0,0,1,15.5,4.14ZM12.83,9.15,11,13.33V22H13V15h1v7h2V13.33L14.17,9.15ZM8.5,10a2.5,2.5,0,1,0,2.5,2.5A2.5,2.5,0,0,0,8.5,10Z"/></svg>'
            }
        }
    ]
  }
];
