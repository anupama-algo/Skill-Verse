setTimeout(()=>{
    document.getElementById('splash').style.display='none';
    document.getElementById('loginPopup').style.display='flex';
},3500);

function openPanel(){
    let msg = document.getElementById("robotMsg");
    msg.style.display = "block";
    msg.innerText = "Let's find your perfect skill 🚀";
    
    setTimeout(()=>{
        msg.style.display = "none";
        currentQ = 0;
        scoreMap = {};
        
        document.getElementById("quizPopup").style.display = "flex";
        loadQuestion();
    },2000);
}

let step=0;
let fromSkills=false;
let user={levels:[],domains:[],sub:[]};
let mode = "explore";

let domains={
"Web Development":"🌐","Data Analytics":"📊","Artificial Intelligence":"🤖","Cyber Security":"🔐",
"Cloud Computing":"☁️","UI / UX Design":"🎨","Mobile App Development":"📱","Machine Learning":"🧠",
"Data Science":"📈","Blockchain":"⛓️","Game Development":"🎮","Internet of Things (IoT)":"📡",
"Digital Marketing":"📣","Graphic Design":"🖌️","Software Engineering":"💻","DevOps":"⚙️",
"Networking":"🌍","Database Management":"🗄️","AR / VR Development":"🥽","Robotics":"🦾"
};

let subCategories={
"Web Development":["HTML","CSS","JavaScript","React","Node.js","Full Stack"],
"Artificial Intelligence":["AI Fundamentals","Deep Learning","Computer Vision","NLP"],
"Data Science":["Python","R Programming","Data Visualization","Big Data"],
"Mobile App Development":["Flutter","Android","iOS"],
"Cyber Security":["Ethical Hacking","Network Security"],
"Cloud Computing":["AWS","Azure","Google Cloud"],
"Game Development":["Unity","Unreal Engine"],
"Digital Marketing":["SEO","Social Media"],
"DevOps":["Docker","Kubernetes"],
"Networking":["CCNA","Routing"],
"Database Management":["MySQL","MongoDB"],
"Robotics":["Robot Programming","Automation"],
"Data Analytics":["Data Collection","Data Cleaning","Exploratory Data Analysis","Data Visualization","Statistical Analysis","Business Intelligence"],
"UI / UX Design":["User Research","Wireframing","Prototyping","Visual Design","Interaction Design","Usability Testing"],
"Machine Learning":["Data Preprocessing","Supervised Learning","Unsupervised Learning","Model Training","Model Evaluation","Deep Learning"],
"Blockchain":["Blockchain Fundamentals","Cryptography","Smart Contracts","Decentralized Applications (DApps)","Consensus Mechanisms","Blockchain Security"],
"Internet of Things (IoT)":["Sensors & Devices","Embedded Systems","IoT Communication","Cloud Integration","IoT Data Analytics","Smart Systems"],
"Graphic Design":["Typography","Color Theory","Logo Design","Illustration","Photo Editing","Brand Identity"],
"Software Engineering":["Programming Fundamentals","Object Oriented Programming","Software Development Life Cycle","Version Control","Testing & Debugging","System Design"],
"AR / VR Development":["3D Modeling","Game Engines","AR Application Development","VR Environment Development","Interaction Design","Immersive UX"]
};

let careerData = {
"Web Development": {
roles: ["Frontend Developer", "Backend Developer", "Full Stack Developer"],
skills: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
roadmap: [
"Learn HTML, CSS basics",
"Master JavaScript fundamentals",
"Build small projects",
"Learn React",
"Learn Backend (Node.js)",
"Build Full Stack Projects"
]
},

"Data Analytics": {
roles: ["Data Analyst", "Business Analyst", "BI Analyst"],
skills: ["Excel", "SQL", "Python", "Power BI"],
roadmap: [
"Learn Excel basics",
"Learn SQL",
"Learn Python for data",
"Data visualization",
"Build dashboards",
"Work on datasets"
]
},

"Artificial Intelligence": {
roles: ["AI Engineer", "NLP Engineer", "ML Engineer"],
skills: ["Python", "Math", "Machine Learning", "Deep Learning"],
roadmap: [
"Python basics",
"Linear algebra & stats",
"Machine Learning basics",
"Deep Learning",
"Projects with AI models"
]
},

"Cyber Security": {
roles: ["Ethical Hacker", "Security Analyst", "Penetration Tester"],
skills: ["Networking", "Linux", "Kali Linux", "Cryptography"],
roadmap: [
"Networking basics",
"Linux fundamentals",
"Security tools",
"Hacking basics",
"Ethical hacking labs"
]
},

"Cloud Computing": {
roles: ["Cloud Engineer", "AWS Engineer", "DevOps Cloud Specialist"],
skills: ["AWS", "Azure", "Docker", "Networking"],
roadmap: [
"Cloud basics",
"AWS fundamentals",
"Virtual machines",
"Docker basics",
"Deploy applications"
]
},

"UI / UX Design": {
roles: ["UI Designer", "UX Designer", "Product Designer"],
skills: ["Figma", "Adobe XD", "Wireframing", "Prototyping"],
roadmap: [
"Design basics",
"Learn Figma",
"Wireframing",
"UI principles",
"Create UI projects"
]
},

"Mobile App Development": {
roles: ["Android Developer", "iOS Developer", "Flutter Developer"],
skills: ["Flutter", "Dart", "Java", "Kotlin"],
roadmap: [
"Programming basics",
"Learn Flutter",
"UI building",
"API integration",
"App publishing"
]
},

"Machine Learning": {
roles: ["ML Engineer", "Data Scientist", "AI Developer"],
skills: ["Python", "ML Algorithms", "Pandas", "Scikit-learn"],
roadmap: [
"Python basics",
"Math for ML",
"ML algorithms",
"Model training",
"Projects"
]
},

"Data Science": {
roles: ["Data Scientist", "Data Analyst", "ML Engineer"],
skills: ["Python", "Statistics", "SQL", "Visualization"],
roadmap: [
"Python basics",
"Statistics",
"Data cleaning",
"Visualization",
"ML basics"
]
},

"Blockchain": {
roles: ["Blockchain Developer", "Web3 Developer"],
skills: ["Solidity", "Smart Contracts", "Ethereum"],
roadmap: [
"Blockchain basics",
"Ethereum",
"Solidity",
"Smart contracts",
"DApps"
]
},

"Game Development": {
roles: ["Game Developer", "Unity Developer"],
skills: ["Unity", "C#", "Game Design"],
roadmap: [
"Game basics",
"Unity engine",
"Game logic",
"3D development",
"Build games"
]
},

"Internet of Things (IoT)": {
roles: ["IoT Engineer", "Embedded Developer"],
skills: ["Sensors", "Arduino", "Networking"],
roadmap: [
"Electronics basics",
"Arduino",
"Sensors",
"IoT projects",
"Smart systems"
]
},

"Digital Marketing": {
roles: ["SEO Expert", "Social Media Manager"],
skills: ["SEO", "Ads", "Content Marketing"],
roadmap: [
"Marketing basics",
"SEO learning",
"Social media",
"Ads campaigns",
"Brand building"
]
},

"Graphic Design": {
roles: ["Graphic Designer", "Brand Designer"],
skills: ["Photoshop", "Illustrator", "Typography"],
roadmap: [
"Design basics",
"Typography",
"Logo design",
"Photoshop",
"Portfolio building"
]
},

"Software Engineering": {
roles: ["Software Engineer", "Backend Developer"],
skills: ["Java", "Python", "DSA", "System Design"],
roadmap: [
"Programming basics",
"DSA",
"OOP concepts",
"System design",
"Projects"
]
},

"DevOps": {
roles: ["DevOps Engineer", "CI/CD Engineer"],
skills: ["Docker", "Kubernetes", "Linux"],
roadmap: [
"Linux basics",
"Docker",
"Kubernetes",
"CI/CD pipelines",
"Cloud deployment"
]
},

"Networking": {
roles: ["Network Engineer", "System Admin"],
skills: ["TCP/IP", "Routing", "Switching"],
roadmap: [
"Networking basics",
"IP addressing",
"Routing",
"Security",
"Setup networks"
]
},

"Database Management": {
roles: ["DBA", "Database Engineer"],
skills: ["SQL", "MySQL", "MongoDB"],
roadmap: [
"SQL basics",
"Queries",
"Database design",
"Optimization",
"Projects"
]
},

"AR / VR Development": {
roles: ["AR Developer", "VR Developer"],
skills: ["Unity", "3D Modeling", "C#"],
roadmap: [
"3D basics",
"Unity engine",
"AR/VR concepts",
"Interaction design",
"Projects"
]
},

"Robotics": {
roles: ["Robotics Engineer", "Automation Engineer"],
skills: ["Arduino", "Sensors", "AI"],
roadmap: [
"Electronics basics",
"Robotics fundamentals",
"Arduino projects",
"Automation",
"AI integration"
]
}
};

let steps=[
    {title:"Choose what describes you best.",options:["Working Professional","College Faculty","Student","Others"]},
    {title:"Let's choose the course level. Choose as many as you want",options:["Beginner","Intermediate","Advanced"]},
    {title:"Choose the domain you want to learn.",options:Object.keys(domains)},
    {title:"Choose course type",options:["Undergraduate degree","Postgraduate degree","Free Courses","With Certificate","Short Duration","Long Duration","Guided Projects"]}
];

function startExplore(){
    mode = "explore";
    step = 0;
    fromSkills = false;
    user.domains = [];
    user.sub = [];
    
    document.getElementById("popup").style.display = "flex";
    loadStep();
}

function showSkillPreview(domain){
    let data = careerData[domain];
    document.getElementById("title").innerHTML = `
    <h2>${domain}</h2>
    <p><b>Career Roles:</b> ${data.roles.join(", ")}</p>
    <p><b>Skills Required:</b> ${data.skills.join(", ")}</p>
    <h3>Roadmap:</h3>
    <ol>${data.roadmap.map(s => `<li>${s}</li>`).join("")}\</ol><br>
    
    <a class="course" target="_blank"
    href="https://www.coursera.org/search?query=${encodeURIComponent(domain)}">📚 Explore Courses</a>`;
    
    document.getElementById("options").innerHTML = "";
    document.getElementById("subOptions").innerHTML = "";
    document.getElementById("subTitle").innerHTML = "";
    document.querySelector(".progress").style.display = "none";
}

function loadStep(){
    updateButtons();
    if(mode === "skill") return;
    if(fromSkills && step==2){}else{document.getElementById("title").innerText=steps[step].title;}
    
    let progressBar=document.querySelector(".progress");
    if(fromSkills){progressBar.style.display="none";}else{progressBar.style.display="flex";}
    
    let optionsDiv=document.getElementById("options");
    let subDiv=document.getElementById("subOptions");
    let subTitle=document.getElementById("subTitle");
    
    optionsDiv.innerHTML="";
    subDiv.innerHTML="";
    subTitle.innerHTML="";
    
    if(fromSkills && step==2){return;}
    steps[step].options.forEach(function(opt){
        let div=document.createElement("div");
        div.className="option";
        
        if(step==2){div.innerHTML="<span>"+domains[opt]+"</span> "+opt;}
        else{div.innerText=opt;}
        
        div.onclick=function(){
            div.classList.toggle("selected");
            
            if(step==1){
                if(user.levels.includes(opt))user.levels=user.levels.filter(x=>x!=opt);
                else user.levels.push(opt);
            }
            else if(step==2 && mode === "explore"){
                if(user.domains.includes(opt))
                    user.domains = user.domains.filter(x => x != opt);
                else user.domains.push(opt);
        loadSubCategories();
    }
};

optionsDiv.appendChild(div);
});
}

function loadSubCategories(){
    let subDiv=document.getElementById("subOptions");
    subDiv.innerHTML="";
    subDiv.style.display="flex";
    subDiv.style.flexWrap="wrap";
    subDiv.style.justifyContent="center";
    
    if(user.domains.length>0){
        user.domains.forEach(function(domain){
            if(subCategories[domain]){
                subCategories[domain].forEach(function(sub){
                    let s=document.createElement("div");
                    s.className="option";
                    s.innerText=sub;
                    s.onclick=function(){
                        s.classList.toggle("selected");
                        if(user.sub.includes(sub))user.sub=user.sub.filter(x=>x!=sub);
                        else user.sub.push(sub);
                    };
                    subDiv.appendChild(s);
                });
            }
        });
    }
}

function nextStep(){
    if(step===2 && user.domains.length===0){if(!fromSkills){showAlert();}return;}
    if(step<steps.length-1){step++;loadStep();}
    else{fromSkills=false;showCourses();}
}

function prevStep(){if(step>0){step--;loadStep();}}
function showAlert(){
    let alertDiv=document.getElementById("alertPopup");
    alertDiv.style.display="block";
    setTimeout(()=>{alertDiv.style.display="none";},2000);
}

function fetchCourses(){
    return new Promise((resolve,reject)=>{
        
        setTimeout(()=>{
            if(user.domains.length>0){
                resolve(user.domains);
            }else{
                reject("No domains selected");
            }
        },1500);
    });
}

function showCourses(){
    document.getElementById("popup").style.display="none";
    
    let list=document.getElementById("courseList");
    list.innerHTML="<p>Loading courses...</p>";
    document.getElementById("coursesPopup").style.display="flex";
    fetchCourses()
    .then((domains)=>{
        list.innerHTML="";
        domains.forEach(function(domain){
            let a=document.createElement("a");
            a.href="https://www.coursera.org/search?query="+ encodeURIComponent(domain);
            a.target="_blank";
            a.className="course";
            a.innerText="Explore "+domain+" Courses";
            list.appendChild(a);
        });
    })
    .catch((error)=>{
        list.innerHTML=`<p>${error}</p>`;
    });
}

function closeCourses(){document.getElementById("coursesPopup").style.display="none";}

function closePopup(){
    document.getElementById("popup").style.display="none";
    mode = "explore";
    fromSkills = false;
    step = 0;
    document.getElementById("nextBtn").style.display = "inline-block";
    document.getElementById("backBtn").style.display = "inline-block";
}

function toggleMode(){
    switch(document.body.classList.contains("dark")){
        case true:
            document.body.classList.remove("dark");
            document.querySelector(".modeBtn").innerHTML="🌙 Dark Mode";
            break;
        case false:
            document.body.classList.add("dark");
            document.querySelector(".modeBtn").innerHTML="☀ Light Mode";
            break;
        }
    }

function loadSavedUser(){
    let savedUser =
    JSON.parse(localStorage.getItem("skillverseUser"));
    
    if(savedUser){
        document.getElementById("username").value =savedUser.username;
        document.getElementById("email").value =savedUser.email;
        document.getElementById("contact").value =savedUser.contact;
    }
}

function loadSkills(){
    let container = document.getElementById("skillContainer");
    container.innerHTML = "";

    Object.keys(domains).forEach(function(domain){
        let data = careerData[domain];
        const {roles, skills, roadmap} = data;
        let card = document.createElement("div");
        card.className = "skillCard";
        card.innerHTML = `
        
        <div class="cardInner">
        <!-- FRONT -->
        <div class="cardFront">
        <div style="font-size:24px">${domains[domain]}</div>
        <h3>${domain}</h3>
        <p class="cardText"><b>Roles:</b> ${roles.join(", ")}</p>
        <p class="cardText"><b>Skills:</b> ${skills.join(", ")}</p>
        </div>
        <!-- BACK -->
        <div class="cardBack">
        <h3>Roadmap</h3>
        <ol>${roadmap.map(step => `<li>${step}</li>`).join("")}</ol>
        <a class="course" target="_blank"href="https://www.coursera.org/search?query=${encodeURIComponent(domain)}">📚 Explore Courses</a>
        </div>
        </div>
        `;
        
        card.onclick = function(){
            card.classList.toggle("flip");
        };
        container.appendChild(card);
    });
}

function openSkillDomain(domain){
    mode = "skill";
    fromSkills = true;
    step = 0;
    user.domains = [domain];
    user.sub = [];
    
    document.getElementById("popup").style.display = "flex";
    showSkillPreview(domain);
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("backBtn").style.display = "none";
}

document.getElementById("skillSearch").addEventListener("keyup",function(){
    let filter=this.value.toLowerCase();
    document.querySelectorAll(".skillCard").forEach(function(card){
        card.style.display=card.innerText.toLowerCase().includes(filter)?"block":"none";
    });
});

document.getElementById("skillContainer")
.addEventListener("click",function(event){
    console.log("Event Bubbling Working");
    console.log("Clicked Element:", event.target);
});

const text="Discover Skills. Explore Careers. Build Your Future.";
let i=0;

function typeEffect(){
    if(i<text.length){
        document.getElementById("typingText").innerHTML+=text.charAt(i);
        i++;
        setTimeout(typeEffect,40);
    }
}

let quizData = [{
    q:"What do you enjoy the most?",
    a:[
        {text:"Designing UI",type:"UI / UX Design"},
        {text:"Coding websites",type:"Web Development"},
        {text:"Analyzing data",type:"Data Science"},
        {text:"Security systems",type:"Cyber Security"}
    ]},{
    q:"Which tool sounds interesting?",
    a:[
        {text:"Figma",type:"UI / UX Design"},
        {text:"VS Code",type:"Web Development"},
        {text:"Python",type:"Data Science"},
        {text:"Kali Linux",type:"Cyber Security"}
    ]},{
    q:"Your working style?",
    a:[
        {text:"Creative",type:"UI / UX Design"},
        {text:"Logical",type:"Web Development"},
        {text:"Analytical",type:"Data Science"},
        {text:"Investigative",type:"Cyber Security"}
    ]}
];

let currentQ = 0;
let scoreMap = {};
function loadQuestion(){
    let q = quizData[currentQ];
    document.getElementById("question").innerText = q.q;
    let ansDiv = document.getElementById("answers");
    ansDiv.innerHTML = "";
    q.a.forEach(function(option){
        let btn = document.createElement("button");
        btn.className = "option";
        btn.innerText = option.text;
        btn.onclick = function(){
            scoreMap[option.type] = (scoreMap[option.type] || 0) + 1;
            nextQuestion();
        };
        ansDiv.appendChild(btn);
    })
}

function nextQuestion(){
    currentQ++;
    if(currentQ < quizData.length){
        loadQuestion();
    }else{
        showResult();
    }
}

function showResult(){
    let best = Object.keys(scoreMap).reduce((a,b)=>scoreMap[a]>scoreMap[b]?a:b);
    document.getElementById("quizPopup").style.display="none";
    user.domains = [best];
    showCourses();
}

function restartQuiz(){
    currentQ = 0;
    scoreMap = {};
    loadQuestion();
}

function closeQuiz(){
    document.getElementById("quizPopup").style.display="none";
}

function openLogin(){
    document.getElementById("loginPopup").style.display="flex";
}

function closeLogin(){
    document.getElementById("loginPopup").style.display="none";
}

function submitForm(){
    let username=document.getElementById("username").value.trim();
    let email=document.getElementById("email").value.trim();
    let contact=document.getElementById("contact").value.trim();
    let password=document.getElementById("password").value.trim();
    let userData = {username,email,contact};
    
    localStorage.setItem(
        "skillverseUser",
        JSON.stringify(userData)
    );
    
    if(username=="" || email=="" || contact=="" || password==""){
        showLoginAlert();
        return;
    }
    if(contact.length<10){
        showLoginAlert();
        return;
    }
    
    let alertBox=document.getElementById("loginAlert");
    alertBox.style.display="block";
    alertBox.style.background="#d1fae5";
    alertBox.style.color="#065f46";
    alertBox.innerText="Welcome "+username+" 🎉 Signup Successful!";
    
    setTimeout(()=>{
        closeLogin();
        document.getElementById("mainBody").style.display="block";
    },2000);
}

function showLoginAlert(){
    let alertBox=document.getElementById("loginAlert");
    alertBox.style.display="block";
    alertBox.style.background="#ffe4e4";
    alertBox.style.color="#b30000";
    alertBox.innerText="Please fill all fields correctly!";
}

function openProfile(){
    document.getElementById("profilePopup").style.display="flex";
    document.getElementById("pUsername").innerText = document.getElementById("username")?.value || "Guest";
    document.getElementById("pEmail").innerText = document.getElementById("email")?.value || "Not added";
    document.getElementById("pContact").innerText = document.getElementById("contact")?.value || "Not added";
}

function closeProfile(){
    document.getElementById("profilePopup").style.display="none";
}

function updateButtons(){
    let nextBtn = document.getElementById("nextBtn");
    let backBtn = document.getElementById("backBtn");
    
    if(mode === "skill"){
        nextBtn.style.display = "none";
        backBtn.style.display = "none";
    }else{
        nextBtn.style.display = "inline-block";
        backBtn.style.display = "inline-block";
    }
}

function openChangePassword(){
    document.getElementById("passwordPopup").style.display = "flex";
}

function closePassword(){
    document.getElementById("passwordPopup").style.display = "none";
}

function changePassword(){
    let oldPass = document.getElementById("oldPass").value.trim();
    let newPass = document.getElementById("newPass").value.trim();
    let currentPass = document.getElementById("password").value;
    let alertBox = document.getElementById("passAlert");
    
    if(oldPass === "" || newPass === ""){
        alertBox.style.display = "block";
        alertBox.innerText = "Please fill all fields!";
        return;
    }
    
    if(oldPass !== currentPass){
        alertBox.style.display = "block";
        alertBox.innerText = "Current password is incorrect!";
        return;
    }
    
    document.getElementById("password").value = newPass;
    alertBox.style.display = "block";
    alertBox.style.color = "green";
    alertBox.innerText = "Password updated successfully!";
    
    setTimeout(()=>{
        closePassword();
        alertBox.style.display = "none";
    },1500);
}

function logoutUser(){
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
    document.getElementById("contact").value = "";
    document.getElementById("password").value = "";
    user = {levels:[], domains:[], sub:[]};
    closeProfile();
    openLogin();
}

async function loadQuote(){
    try{
        let response = await fetch("https://dummyjson.com/quotes/random");
        let data = await response.json();
        document.getElementById("quoteBox")
        .innerText =`"${data.quote}" — ${data.author}`;}
    catch(error){
        document.getElementById("quoteBox")
        .innerText ="Keep learning and growing every day.";}
}

loadSkills();
loadSavedUser();
loadStep();
typeEffect();
loadQuestion();
loadQuote();
