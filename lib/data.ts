import { demoPromises } from "./demo-promises";
export type Status = "Completed" | "In Progress" | "Not Started" | "Modified" | "Broken / Abandoned" | "Insufficient Evidence";
export type Confidence = "High" | "Medium" | "Low" | "Unrated";
export type Evidence = { id:string; type:string; title:string; publisher:string; date:string; url:string; excerpt:string };
export type Project = { slug:string; name:string; description:string; location:string; status:Status; promiseSlug?:string; unpromised?:boolean; progress:number; budget?:string; fundedBy:string; implementedBy:string; contractor?:string; evidence:Evidence[] };
export type PromiseRecord = { origin?:"simulated"|"sourced"; target?:string; slug:string; title:string; quote:string; source:string; sourceUrl:string; published:string; sector:string; level:string; leader:string; officialSlugs:string[]; location:string; status:Status; confidence:Confidence; progress:number; updated:string; why:string; projectSlugs:string[]; change?:{previous:string;current:string;reason:string;date:string;source:string} };

export type Representative = {
  slug:string;
  role:string;
  name:string;
  level:"Federal"|"State"|"Local";
  jurisdiction:string;
  term:string;
  party:string;
  initials:string;
  image?:string;
  pairedWith?:string;
  responsibility:string;
  commitmentType:string;
};

export const representatives: Representative[] = [
  {slug:"president",role:"President",name:"Bola Ahmed Tinubu",level:"Federal",jurisdiction:"Federal Republic of Nigeria",term:"2023–2027",party:"APC",initials:"BAT",image:"/officials/bola-tinubu.jpg",pairedWith:"vice-president",responsibility:"Leads the federal executive and directs national policy, programmes and federally funded delivery.",commitmentType:"National policy and delivery promises"},
  {slug:"vice-president",role:"Vice President",name:"Kashim Shettima",level:"Federal",jurisdiction:"Federal Republic of Nigeria",term:"2023–2027",party:"APC",initials:"KS",image:"/officials/kashim-shettima.jpg",pairedWith:"president",responsibility:"Supports the President and leads responsibilities assigned by the federal administration.",commitmentType:"Joint-ticket and assigned initiatives"},
  {slug:"rivers-east-senator",role:"Senator",name:"Allwell Onyesoh",level:"Federal",jurisdiction:"Rivers East Senatorial District",term:"2023–2027",party:"PDP",initials:"AO",image:"/officials/allwell-onyesoh.jpg",responsibility:"Represents Rivers East in the Senate through legislation, oversight and constituency advocacy.",commitmentType:"Legislation, oversight and constituency commitments"},
  {slug:"ph-federal-representative",role:"House of Representatives",name:"Blessing Amadi",level:"Federal",jurisdiction:"Port Harcourt Federal Constituency II",term:"2023–2027",party:"PDP",initials:"BA",image:"/officials/blessing-amadi.jpeg",responsibility:"Represents the federal constituency through legislation, oversight and constituency advocacy.",commitmentType:"Legislation, oversight and constituency commitments"},
  {slug:"rivers-governor",role:"Governor",name:"Siminalayi Fubara",level:"State",jurisdiction:"Rivers State",term:"2023–2027",party:"PDP",initials:"SF",image:"/officials/siminalayi-fubara.jpg",pairedWith:"rivers-deputy-governor",responsibility:"Leads the state executive and is responsible for Rivers State policy, programmes and agencies.",commitmentType:"State policy and delivery promises"},
  {slug:"rivers-deputy-governor",role:"Deputy Governor",name:"Ngozi Odu",level:"State",jurisdiction:"Rivers State",term:"2023–2027",party:"PDP",initials:"NO",image:"/officials/ngozi-odu.jpg",pairedWith:"rivers-governor",responsibility:"Supports the Governor and leads responsibilities assigned by the state administration.",commitmentType:"Joint-ticket and assigned initiatives"},
  {slug:"ph-state-assembly",role:"State Assembly Member",name:"Demo representative",level:"State",jurisdiction:"Port Harcourt State Constituency II",term:"2023–2027",party:"PDP",initials:"SA",responsibility:"Represents the state constituency through legislation, oversight and local advocacy.",commitmentType:"Legislation, oversight and constituency commitments"},
  {slug:"ph-chairman",role:"LGA Chairman",name:"Ezebunwo Ichemati",level:"Local",jurisdiction:"Port Harcourt City LGA",term:"2024–2027",party:"PDP",initials:"EI",image:"/officials/ezebunwo-ichemati.jpg",pairedWith:"ph-vice-chairman",responsibility:"Leads the local government executive and oversees municipal programmes and services.",commitmentType:"Local services and delivery promises"},
  {slug:"ph-vice-chairman",role:"Vice Chairman",name:"Demo office holder",level:"Local",jurisdiction:"Port Harcourt City LGA",term:"2024–2027",party:"PDP",initials:"VC",pairedWith:"ph-chairman",responsibility:"Supports the LGA Chairman and leads responsibilities assigned by the local administration.",commitmentType:"Joint-ticket and assigned initiatives"},
  {slug:"ward-6-councillor",role:"Councillor",name:"Demo ward representative",level:"Local",jurisdiction:"Ward 6, Port Harcourt City",term:"2024–2027",party:"PDP",initials:"W6",responsibility:"Represents Ward 6 in the local legislative council and advocates for ward priorities.",commitmentType:"By-laws, oversight and ward commitments"}
];

export const leaders = representatives;

export const projects: Project[] = [
  {slug:"port-harcourt-ring-road",name:"Port Harcourt Ring Road",description:"A multi-junction road project intended to improve movement around greater Port Harcourt.",location:"Port Harcourt and adjoining LGAs",status:"In Progress",promiseSlug:"complete-ring-road",progress:46,budget:"₦195.3bn reported contract value",fundedBy:"Rivers State Government",implementedBy:"Rivers State Ministry of Works",contractor:"Julius Berger Nigeria Plc",evidence:[{id:"e1",type:"Government update",title:"Construction progress update",publisher:"Rivers State Government",date:"2025-05-12",url:"https://www.riversstate.gov.ng/",excerpt:"The state reported active construction across multiple sections of the route."},{id:"e2",type:"Independent reporting",title:"Ring road construction enters new phase",publisher:"The Guardian Nigeria",date:"2025-06-03",url:"https://guardian.ng/",excerpt:"Reporting documented ongoing works and the stated delivery timeline."}]},
  {slug:"primary-health-centre-upgrade",name:"Orogbum Primary Health Centre Upgrade",description:"Rehabilitation and equipment upgrade for a community primary healthcare facility.",location:"Orogbum, Port Harcourt City",status:"Completed",promiseSlug:"upgrade-primary-healthcare",progress:100,budget:"Not publicly itemised",fundedBy:"Rivers State Government",implementedBy:"Rivers State Primary Health Care Management Board",evidence:[{id:"e3",type:"Government document",title:"PHC rehabilitation programme update",publisher:"RSPHCMB",date:"2025-02-18",url:"https://www.riversstate.gov.ng/",excerpt:"The facility was listed among completed rehabilitation works."},{id:"e4",type:"Field evidence",title:"Community verification photographs",publisher:"CivicLedger reviewer",date:"2025-03-01",url:"#community-evidence",excerpt:"Dated photographs show the renovated exterior and clinical rooms in use."}]},
  {slug:"waterfront-drainage-repair",name:"Diobu Waterfront Drainage Repair",description:"Drainage clearance and targeted repairs intended to reduce seasonal flooding.",location:"Diobu, Port Harcourt City",status:"Insufficient Evidence",progress:20,unpromised:true,budget:"Not available",fundedBy:"Port Harcourt City LGA",implementedBy:"Port Harcourt City Works Department",evidence:[{id:"e5",type:"Government update",title:"Local drainage intervention notice",publisher:"Port Harcourt City LGA",date:"2025-04-07",url:"https://www.riversstate.gov.ng/",excerpt:"A public notice announced drainage works but did not provide completion evidence."}]}
];

export const promises: PromiseRecord[] = [
 {slug:"complete-ring-road",title:"Complete the Port Harcourt Ring Road",quote:"We will deliver the Port Harcourt Ring Road to unlock communities and reduce congestion.",source:"Rivers State policy address",sourceUrl:"https://www.riversstate.gov.ng/",published:"2024-01-29",sector:"Infrastructure",level:"State",leader:"Siminalayi Fubara",officialSlugs:["rivers-governor","rivers-deputy-governor"],location:"Greater Port Harcourt",status:"In Progress",confidence:"High",progress:46,updated:"2026-09-12",why:"Construction is visible across multiple sections and is supported by both state updates and independent reporting. The road is not yet open end-to-end.",projectSlugs:["port-harcourt-ring-road"]},
 {slug:"upgrade-primary-healthcare",title:"Upgrade primary healthcare facilities",quote:"Primary healthcare centres will be rehabilitated and equipped to bring quality care closer to communities.",source:"Rivers State health programme briefing",sourceUrl:"https://www.riversstate.gov.ng/",published:"2024-03-14",sector:"Healthcare",level:"State",leader:"Rivers State administration",officialSlugs:["rivers-governor","rivers-deputy-governor"],location:"Rivers State",status:"Modified",confidence:"Medium",progress:64,updated:"2026-09-10",why:"Several facilities show credible completion evidence, but the programme target and timeline were revised and public facility-level reporting remains incomplete.",projectSlugs:["primary-health-centre-upgrade"],change:{previous:"Upgrade all targeted PHCs within the 2024 programme year.",current:"Deliver upgrades in phases through 2025–2026.",reason:"The implementing programme was publicly moved to phased delivery.",date:"2025-01-22",source:"Rivers State health programme update"}},
 {slug:"rehabilitate-public-schools",title:"Rehabilitate public primary schools",quote:"We will renew learning environments in public schools across the state.",source:"Education policy statement",sourceUrl:"https://www.riversstate.gov.ng/",published:"2024-02-10",sector:"Education",level:"State",leader:"Rivers State administration",officialSlugs:["rivers-governor","rivers-deputy-governor"],location:"Port Harcourt City",status:"Insufficient Evidence",confidence:"Low",progress:10,updated:"2026-09-08",why:"The commitment is documented, but CivicLedger has not found sufficiently specific project records or independent evidence for Port Harcourt City.",projectSlugs:[]},
 {slug:"student-loan-access",title:"Expand access to student loans",quote:"No Nigerian student should be denied higher education because of financial need.",source:"Federal campaign commitment",sourceUrl:"https://statehouse.gov.ng/",published:"2023-02-01",sector:"Education",level:"Federal",leader:"Federal administration",officialSlugs:["president","vice-president"],location:"Nigeria",status:"In Progress",confidence:"Medium",progress:58,updated:"2026-09-11",why:"The programme has launched and recorded disbursements, but evidence does not yet show that the stated reach has been achieved.",projectSlugs:[]},
 {slug:"east-west-road-oversight",title:"Press for completion of the East–West Road",quote:"We will use legislation and oversight to keep the East–West Road on the national agenda.",source:"Constituency campaign statement",sourceUrl:"https://nass.gov.ng/",published:"2023-01-20",sector:"Infrastructure",level:"Federal",leader:"Rivers East Senate office",officialSlugs:["rivers-east-senator"],location:"Rivers East Senatorial District",status:"In Progress",confidence:"Medium",progress:40,updated:"2026-09-09",why:"Legislative advocacy is documented, while physical delivery remains the responsibility of the federal executive and implementing agencies.",projectSlugs:[]},
 {slug:"constituency-skills-centres",title:"Support constituency skills centres",quote:"Young people in the constituency will have better access to practical skills and employment support.",source:"Constituency campaign statement",sourceUrl:"https://nass.gov.ng/",published:"2023-01-24",sector:"Education",level:"Federal",leader:"Port Harcourt Federal Constituency II office",officialSlugs:["ph-federal-representative"],location:"Port Harcourt Federal Constituency II",status:"Insufficient Evidence",confidence:"Low",progress:15,updated:"2026-09-06",why:"The commitment is documented, but CivicLedger has not found sufficiently specific implementation records to assess delivery.",projectSlugs:[]},
 {slug:"ward-drainage-maintenance",title:"Improve routine drainage maintenance",quote:"We will keep priority drains clear and respond faster to flooding risks.",source:"Local campaign commitment",sourceUrl:"https://www.riversstate.gov.ng/",published:"2024-09-01",sector:"Infrastructure",level:"Local",leader:"Port Harcourt City LGA administration",officialSlugs:["ph-chairman","ph-vice-chairman","ward-6-councillor"],location:"Port Harcourt City",status:"In Progress",confidence:"Low",progress:32,updated:"2026-09-07",why:"Some local interventions have been announced, but coverage, completion and ward-level evidence remain incomplete.",projectSlugs:["waterfront-drainage-repair"]}
];

promises.push(...demoPromises);
for (const record of promises) {
  record.origin ??= "simulated";
  record.confidence = "Unrated";
  if (record.origin === "simulated") {
    record.source = "Simulated campaign scenario";
    record.sourceUrl = "";
    record.why = "Illustrative hackathon scenario. This commitment and its fulfilment assessment are simulated, not verified political claims.";
    if (record.change) record.change.source = "Simulated change record";
  }
}
const studentLoan = promises.find(record => record.slug === "student-loan-access");
const drainagePromise = promises.find(record => record.slug === "ward-drainage-maintenance");
if (drainagePromise) drainagePromise.projectSlugs = [];
if (studentLoan) Object.assign(studentLoan, {
  origin: "sourced", quote: "Introduce a pilot student-loan programme and expand access to education.",
  source: "APC Renewed Hope manifesto (2023 election)", sourceUrl: "https://www.apc.com.ng/img/apc_renewed_hope.pdf",
  published: "2022", target: "Pilot a student-loan programme; manifesto commitment paraphrased, not a verbatim quote.",
  why: "The student-loan commitment is drawn from the APC manifesto. The 58% progress and In Progress status are simulated for the hackathon, not an evidence-backed assessment."
});

const primaryCare = promises.find(record => record.slug === "federal-primary-care");
if (primaryCare) Object.assign(primaryCare, {
  origin: "sourced", quote: "Make primary healthcare the foundation of the health system and strengthen early detection and treatment.",
  source: "APC Renewed Hope manifesto (2023 election)", sourceUrl: "https://www.apc.com.ng/img/apc_renewed_hope.pdf",
  published: "2022", target: "Strengthen primary healthcare. The 100-facility pilot target used in this demo is simulated, not a manifesto target.",
  why: "The broad primary-healthcare commitment is paraphrased from the APC manifesto. The 62% progress, status and pilot target are simulated, not verified delivery claims."
});

export function getPromise(slug:string){return promises.find(p=>p.slug===slug)}
export function getProject(slug:string){return projects.find(p=>p.slug===slug)}
export function getRepresentative(slug:string){return representatives.find(r=>r.slug===slug)}
export function getRepresentativePromises(slug:string){return promises.filter(p=>p.officialSlugs.includes(slug))}
export function statusClass(status:Status){return "status "+status.toLowerCase().replaceAll(" ","-").replaceAll("/","")}
